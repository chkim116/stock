import puppeteer, { Browser, Page } from "puppeteer";
import cheerio from "cheerio";

function getOrThrow<T>(something: T) {
  if (!something) {
    throw new Error("something is falsy!");
  }
  return something;
}

interface DividendData {
  /**
   * 종목명
   */
  name: string;
  /**
   * 현재가
   */
  currentStock: string;
  /**
   * 배당 기준월
   */
  payoutMonth: string;
  /**
   * 배당성향
   */
  payoutRatio: string;
  /**
   * 배당금
   */
  dividend: string;
  /**
   * ROE
   */
  roe: string;
  /**
   * 1년전 배당금
   */
  year1: string;
  /**
   * 2년전 배당금
   */
  year2: string;
  /**
   * 3년전 배당금
   */
  year3: string;
}

class DividendScraper {
  private _lastPage = 0;
  private _page: Page | null = null;
  private _browser: Browser | null = null;
  scrapedData: DividendData[] = [];

  private async prepare() {
    this._browser = await puppeteer.launch();
    this._page = await this._browser.newPage();
    this._lastPage = 0;
  }

  private async prepareDestroy() {
    await this._browser?.close();
    this._browser = null;
    this._page = null;
    this._lastPage = 0;
  }

  async scrapeData(page: number) {
    await getOrThrow(this._page).goto(
      `https://finance.naver.com/sise/dividend_list.naver?page=${page}`
    );
    const html = await getOrThrow(this._page).content();
    const $ = cheerio.load(html);

    // 스크랩할 데이터 선택자를 찾아서 처리합니다.
    $("#contentarea_left > table.type_1.tb_ty > tbody").each((_, element) => {
      $(element)
        .find("tr")
        .each((_, element) => {
          const name = $(element).find("td:nth-child(1)").text();

          if (/\s/.test(name)) {
            return;
          }

          const dividendData = {
            name,
            currentStock: $(element).find("td:nth-child(2)").text(),
            payoutMonth: $(element)
              .find("td:nth-child(3)")
              .text()
              .replace(/\s/g, ""),
            payoutRatio: $(element).find("td:nth-child(6)").text(),
            roe: $(element).find("td:nth-child(7)").text(),
            dividend: $(element).find("td:nth-child(4)").text(),
            year1: $(element).find("td:nth-child(10)").text(),
            year2: $(element).find("td:nth-child(11)").text(),
            year3: $(element).find("td:nth-child(12)").text(),
          };

          this.scrapedData.push(dividendData);
        });
    });
  }

  async getLastPage() {
    await getOrThrow(this._page).goto(
      `https://finance.naver.com/sise/dividend_list.naver?page=1`
    );
    const html = await getOrThrow(this._page).content();
    const $ = cheerio.load(html);

    try {
      const last = $(".pgRR > a").attr("href")?.split("page=")[1];
      this._lastPage = Number.isNaN(last) ? 0 : Number(last);
    } finally {
      //
    }
  }

  // 3년전, 2년전, 1년전 배당금이 증가하거나 동일하고 배당성향률이 100% 이하인지 확인
  async filterData(data: DividendData[]) {
    return data.filter((item) => {
      return (
        item.year3 <= item.year2 &&
        item.year2 <= item.year1 &&
        Number(item.payoutRatio) <= 100
      );
    });
  }

  async main() {
    try {
      this.prepareDestroy();

      await this.prepare();
      console.log(`Initializing...`);

      await this.getLastPage();
      console.log(`find last page success! => ${this._lastPage}`);

      console.log(`Scraping page 1`);
      await this.scrapeData(1);

      const pageList = Array.from(
        { length: this._lastPage - 1 },
        (_, i) => i + 2
      );

      for await (const page of pageList) {
        console.log(`Scraping page ${page}`);
        await this.scrapeData(page);
      }

      this.prepareDestroy();
    } catch (error) {
      console.error(error);
    }
  }
}

const scraper = new DividendScraper();
scraper.main().then(() => {
  console.log(scraper.filterData(scraper.scrapedData));
});

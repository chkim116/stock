import puppeteer, { Browser, Page } from "puppeteer";
import cheerio from "cheerio";
import { ScarperService } from "./scraperService.type";
import { DividendEntity } from "../entities";

function getOrThrow<T>(something: T) {
  if (!something) {
    throw new Error("something is falsy!");
  }
  return something;
}

export class DividendScraperService implements ScarperService<DividendEntity> {
  private _lastPage = 0;
  private _page: Page | null = null;
  private _browser: Browser | null = null;
  private _scrapedData: DividendEntity[] = [];

  getData(): DividendEntity[] {
    return this._scrapedData;
  }

  async scrape(): Promise<DividendEntity[]> {
    if (this._scrapedData.length) {
      return this.getData();
    }

    try {
      await this.prepare();
      await this.getLastPage();

      const pageList = Array.from(
        { length: this._lastPage - 1 },
        (_, i) => i + 1
      );

      for await (const page of pageList) {
        await this.scrapeData(page);
      }
    } finally {
      this.prepareDestroy();
    }

    console.log(this.getData());
    return this.getData();
  }

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

  private async scrapeData(page: number) {
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
          const code =
            $(element)
              .find("td:nth-child(1)")
              .attr("href")
              ?.split("code=")[1] || "";

          if (/\s/.test(name)) {
            return;
          }

          const dividendData = {
            name,
            code,
            currentStock: $(element).find("td:nth-child(2)").text(),
            payoutMonth: $(element)
              .find("td:nth-child(3)")
              .text()
              .replace(/\s/g, ""),
            payoutRatio: $(element).find("td:nth-child(6)").text(),
            roe: $(element).find("td:nth-child(7)").text(),
            per: $(element).find("td:nth-child(8)").text(),
            dividend: $(element).find("td:nth-child(4)").text(),
            year1: $(element).find("td:nth-child(10)").text(),
            year2: $(element).find("td:nth-child(11)").text(),
            year3: $(element).find("td:nth-child(12)").text(),
          };

          this._scrapedData.push(dividendData);
        });
    });
  }

  private async getLastPage() {
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
}

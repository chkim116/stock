import puppeteer, { Browser, Page } from "puppeteer";
import cheerio from "cheerio";
import { ScarperService } from "./scraperService.type";
import { DividendEntity } from "../entities";
import { LRUCache } from "lru-cache";
import dayjs from "dayjs";
import { replace, toNumber } from "safers";

function refineNumber(value: unknown) {
  return toNumber(replace(value, /,/g, ""));
}

function getOrThrow<T>(something: T) {
  if (!something) {
    throw new Error("something is falsy!");
  }
  return something;
}

export class DividendScraperService implements ScarperService<DividendEntity> {
  private _cache: LRUCache<string, DividendEntity[]> = new LRUCache<
    string,
    DividendEntity[]
  >({ max: 50 });
  private _key = "";

  private _lastPage = 0;
  private _page: Page | null = null;
  private _browser: Browser | null = null;
  private _scrapedData: DividendEntity[] = [];
  private _pending = false;

  getData(): DividendEntity[] {
    return this._cache.get(this._key) || [];
  }

  getScrapedTime(): string {
    return this._key;
  }

  async scrape(): Promise<DividendEntity[]> {
    const currentDate = dayjs(new Date()).format("YYYY-MM-DD");
    const cachedData = this._cache.get(currentDate);

    if (cachedData) {
      return cachedData;
    }

    if (this._pending) {
      console.log("Pending...");
      return this.getData();
    }

    try {
      console.log("Scraping...");
      await this.prepareScrap();
      await this.getLastPage();

      const pageList = Array.from(
        { length: this._lastPage - 1 },
        (_, i) => i + 1
      );

      for await (const page of pageList) {
        await this.scrapeData(page);
      }

      console.log("Scraping done!");
    } finally {
      this.prepareScrapDestroy();
    }

    this._key = currentDate;
    this._cache.set(this._key, this._scrapedData);

    return this.getData();
  }

  private async prepareScrap() {
    this._browser = await puppeteer.launch();
    this._page = await this._browser.newPage();
    this._lastPage = 0;
    this._pending = true;
  }

  private async prepareScrapDestroy() {
    await this._browser?.close();
    this._browser = null;
    this._page = null;
    this._lastPage = 0;
    this._pending = false;
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
              .find("td:nth-child(1) > a")
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
            payoutRatio: refineNumber(
              $(element).find("td:nth-child(6)").text()
            ),
            roe: refineNumber($(element).find("td:nth-child(7)").text()),
            per: refineNumber($(element).find("td:nth-child(8)").text()),
            dividend: refineNumber($(element).find("td:nth-child(4)").text()),
            year1: refineNumber($(element).find("td:nth-child(10)").text()),
            year2: refineNumber($(element).find("td:nth-child(11)").text()),
            year3: refineNumber($(element).find("td:nth-child(12)").text()),
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
      this._lastPage = toNumber(last);
    } finally {
      //
    }
  }
}

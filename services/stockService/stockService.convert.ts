import cheerio from "cheerio";
import { BodyTexts, HeadText } from "core";

export function convertToObject(headText: HeadText[], bodyTexts: string[]) {
  const results: BodyTexts[] = [];
  bodyTexts.reduce((acc, cur) => {
    const texts = cur.split("\n");
    const obj: BodyTexts = {
      종목: "",
      종가: "",
      고가: "",
      저가: "",
      변동: "",
      "변동%": "",
      거래량: "",
      시간: "",
    };

    texts.forEach((text, i) => {
      obj[headText[i].replace(/[^가-힣%]/g, "") as HeadText] = text;
    });

    results.push(obj);
    return acc;
  }, {} as BodyTexts);

  return results;
}

export function convertToTableTexts(data: string) {
  const $ = cheerio.load(data);
  const $base = $("#stockPageInnerContent > table");

  const headText: HeadText[] = [];
  const bodyTexts: string[] = [];

  $base.each(function () {
    const $this = $(this);
    const tHead = $this.find("thead > tr > th").toArray();
    const tBody = $this.find("tbody > tr").toArray();

    for (const th of tHead) {
      headText.push($(th).text().trim().replace(" ", "") as HeadText);
    }

    for (const td of tBody) {
      const link = $(td).find("a").attr("href");
      const withLink = $(td)
        .text()
        .replace(/(^\n|\n$)/g, "")
        .split("\n")
        .slice(1, 9);

      withLink[0] += `@${link}`;
      bodyTexts.push(withLink.join("\n"));
    }
  });

  return {
    headText: headText.slice(1, 9),
    bodyTexts: convertToObject(headText.slice(1, 9), bodyTexts),
  };
}

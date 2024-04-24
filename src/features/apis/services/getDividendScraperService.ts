import { DividendEntity } from "../entities";
import { DividendScraperService } from "./DividendScraperService";
import { ScarperService } from "./scraperService.type";

let instance: ScarperService<DividendEntity> | null = null;

export function getDividendScraperService(): ScarperService<DividendEntity> {
  if (!instance) {
    instance = new DividendScraperService();
  }

  return instance;
}

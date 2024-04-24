export interface ScarperService<T> {
  getData(): T[];
  getScrapedTime(): string;
  scrape(): Promise<T[]>;
}

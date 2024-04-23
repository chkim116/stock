export interface ScarperService<T> {
  getData(): T[];
  scrape(): Promise<T[]>;
}

import { chromium, Browser as PlaywrightBrowser, Page } from 'playwright-chromium';

export class Browser {
  private browser: PlaywrightBrowser|undefined;
  private page: Page|undefined;

  constructor() {}

  async initialize() {
    this.browser = await chromium.launch({
      headless: true,
      chromiumSandbox: false,
    });
    this.page = await this.browser.newPage();
  }

  async goto(address: string) {
    await this.page!.goto(address);
  }

  getPage(): Page {
    return this.page!;
  }

  url(): string {
    return this.page!.url();
  }

  async close() {
    return this.browser!.close();
  }
}

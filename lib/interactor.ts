import { Browser } from './browser';

export class Interactor {
  private readonly browser: Browser;
  private readonly slotTimeLocator: string;

  constructor(browser: Browser) {
    this.browser = browser;
    this.slotTimeLocator = 'text=' + process.env.SLOT_TIME!;
  }

  async maybeChooseSlot(): Promise<boolean> {
    const locator = this.browser.getPage().locator(this.slotTimeLocator);
    
    if (await locator.count() <= 0) {
      return false;
    }

    if (await locator.first().isEnabled() == false) {
      return false;
    }

    await locator.first().click();

    return true;
  }

  async fillForm(): Promise<void> {
    await this.browser.getPage().fill("[id=label1]", process.env.NAME!);
    await this.browser.getPage().fill("[id=label2]", process.env.APARTMENT!);
    await this.browser.getPage().fill("[id=label3]", process.env.EMAIL!);
  }

  async submitForm(): Promise<void> {
    console.log("Submitting form...");
    // TODO.
  }
}

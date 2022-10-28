import { Browser } from './lib/browser';
import { getDates } from './lib/dates';
import * as urlHelper from './lib/url';
import { Interactor } from './lib/interactor';

require('dotenv').config({ path: __dirname+'/vars.env' });

(async () => {
  const browser = new Browser();
  const interactor = new Interactor(browser);

  await browser.initialize();

  const dates = getDates();
  for (let i = 0; i < dates.length; ++i) {
    await browser.goto(urlHelper.getUrl(dates[i]));

    if (!urlHelper.isValid(browser.url())) {
      // There are no more available dates.
      break;
    }

    if (await interactor.maybeChooseSlot() == false) {
      console.log('No slot available');
      continue;
    }
    console.log('Slot available');

    // Wait for the page to load.
    await browser.getPage().waitForLoadState();

    await interactor.fillForm();
  };

  await browser.close();
})();

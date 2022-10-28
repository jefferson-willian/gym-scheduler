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
      console.log('No more dates available. Aborted.');
      // There are no more available dates.
      break;
    }

    if (await interactor.maybeChooseSlot() == false) {
      console.log(dates[i] + ': no slot available');
      continue;
    }
    console.log(dates[i] + ': slot available');

    // Wait for the page to load.
    await browser.getPage().waitForLoadState();

    await interactor.fillForm();

    if (process.env.SMOKE == undefined) {
      await interactor.submitForm();
    }
  };

  await browser.close();
})();

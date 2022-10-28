import {Browser} from './lib/browser';

(async () => {
  const browser = new Browser();

  await browser.initialize();
  await browser.goto('https://google.com');
  await browser.close();
})();

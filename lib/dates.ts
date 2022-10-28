export function getDates(): Array<string> {
  const now = Date.now();

  const ret = [];

  // Get at most a day two weeks in the future.
  for (let i = 0; i < 14; ++i) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);

    const day = date.getDay();
    // Skip if not Tuesday or Thursday.
    if (day != 2 && day != 4) {
      continue;
    }

    ret.push(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
  }

  return ret;
}

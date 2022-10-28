export function getDates(): Array<string> {
  const now = Date.now();

  const ret = [];

  // Get at most a day two weeks in the future.
  for (let i = 0; i < 14; ++i) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);

    const day = date.getDay();
    // Skip if not Tuesday or Thursday.
    if (day != 1 && day != 3) {
      continue;
    }

    ret.push(date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate());

    console.log(date);
  }

  return ret;
}

export function getUrl(date: string): string {
  const url = process.env.URL;
  const calendar = process.env.CALENDAR;
  return `${url}/service/jsps/cal.jsp?jumpDate=${date}&cal=${calendar}`;
}

export function isValid(url: string): boolean {
  const match = url.match(/https:\/\/.*\/service\/jsps\/cal.jsp.*/);
  return match != null && match.length > 0;
}

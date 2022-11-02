export const dateFormat = (date: string) => {
  const time = new Date(date)
  const utcNow = time.getTime() + (time.getTimezoneOffset() * 60 * 1000);
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const koreaNow = new Date(utcNow + koreaTimeDiff * 2).toLocaleString();
  const split = koreaNow.split('. ')

  return `${split[0]}.${split[1]}.${split[2]}`
}
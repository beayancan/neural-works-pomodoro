export const dateNumberFormatter = (value: number | string) => {
  return `${value}`.length < 2 ? `0${value}` : value;
}

export const formatterTime = (value: Date) => {
  const date = new Date(value);
  const minutes = dateNumberFormatter(date.getMinutes());
  const hours = dateNumberFormatter(date.getHours());

  return `${hours}:${minutes}`;
}

export const formatterDate = (value: Date) => {
  const date = new Date(value);
  const day = dateNumberFormatter(date.getDate());
  const month = dateNumberFormatter(date.getMonth()+1);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export const formatterTimeWithDate = (value: Date) => {
  const dateFormatted = formatterDate(value);
  const timeFormatted = formatterTime(value);

  return `${timeFormatted} (${dateFormatted})`;
}

export const addMinutes = (date: Date, minutes: number) => {
  return new Date(date.getTime() + minutes*60000);
}

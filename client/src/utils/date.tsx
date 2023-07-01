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
  const day = dateNumberFormatter(date.getDay());
  const month = dateNumberFormatter(date.getMonth());
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export const formatterTimeWithDate = (value: Date) => {
  const dateFormatted = formatterDate(value);
  const timeFormatted = formatterTime(value);

  return `${timeFormatted} (${dateFormatted})`;
}

import moment from 'moment';

export function sortByObj<T>(list: T[], key: string) {
  let sorted = true;
  for (let i = 0; i < list.length - 1; i++) {
    if (list[i][key] > list[i + 1][key]) {
      sorted = false;
      break;
    }
  }
  if (sorted) {
    return list.sort((a, b) => ((a[key] < b[key]) ? 1 : -1));
  }
  return list.sort((a, b) => ((a[key] > b[key]) ? 1 : -1));
}

export function formatPrintString(text: string) {
  return text.replace('_', ' ');
}

export function formatPrintDate(time: number) {
  return moment(time).format('Do MMM YYYY, h:mm:ss');
}

export const dateToString = (date: Date | null): string => {
  return `${date?.toISOString().substring(0, 10)} ${date?.toISOString().substring(11, 16)}`;
};

export const sortByDateAsc = arr => {
  return arr.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);

    return aDate.getTime() - bDate.getTime();
  });
};

export const sortByDateDesc = arr => {
  return arr.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);

    return bDate.getTime() - aDate.getTime();
  });
};

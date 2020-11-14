export const truncateString = (str, num) =>
  str.length <= num ? str : str.slice(0, num) + "...";

export const getParams = (pathname) => {
  const split = pathname.split("/").slice(1);
  const where = split[0];
  const versionId = split[1];
  const bookId = split[2];
  const chapter = split[3];
  return { where, versionId, bookId, chapter };
};

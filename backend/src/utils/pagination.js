export const buildPagination = (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Number(query.limit) || 10, 100);
  const skip = (page - 1) * limit;

  const allowedSorts = ["createdAt", "name"];
  const sort = allowedSorts.includes(query.sort) ? query.sort : "-createdAt";

  return {
    page,
    limit,
    skip,
    sort,
  };
};

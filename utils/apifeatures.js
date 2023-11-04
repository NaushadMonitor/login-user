const pagination = async (model, page, resultPerPage) => {
  const skip = (page - 1) * resultPerPage;
  const totalDocuments = await model.countDocuments();
  const totalPages = Math.ceil(totalDocuments / resultPerPage);

  const results = await model.find().skip(skip).limit(resultPerPage);

  return {
    currentPage: page,
    totalPages,
    totalDocuments,
    resultPerPage,
    results,
  };
};

const filterPagination = async (
  model,
  page,
  resultPerPage,
  searchQuery,
  filter
) => {
  const skip = (page - 1) * resultPerPage;
  const totalDocuments = await model.countDocuments(filter);
  const totalPages = Math.ceil(totalDocuments / resultPerPage);

  const results = await model.find(filter).skip(skip).limit(resultPerPage);

  const searchItems = searchList(searchQuery, results);

  return {
    currentPage: page,
    totalPages,
    totalDocuments,
    resultPerPage,
    searchItems,
  };
};

function searchList(searchQuery, result) {
  const searchItems = result.filter((item) => {
    for (const key in item) {
      if (
        typeof item[key] === "string" &&
        item[key].toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  });
  return searchItems;
}

module.exports = { pagination, filterPagination };

const pagination = async (model, page, resultPerPage, searchQuery) => {
  const skip = (page - 1) * resultPerPage;
  const totalDocuments = await model.countDocuments();
  const totalPages = Math.ceil(totalDocuments / resultPerPage);

  const result = await model.find().skip(skip).limit(resultPerPage);

  const results = searchList(searchQuery, result);


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
  filter,
  searchQuery
) => {
  const skip = (page - 1) * resultPerPage;
  const totalDocuments = await model.countDocuments(filter);
  const totalPages = Math.ceil(totalDocuments / resultPerPage);

  const result = await model.find(filter).skip(skip).limit(resultPerPage);
  const results = searchList(searchQuery, result);

  return {
    currentPage: page,
    totalPages,
    totalDocuments,
    resultPerPage,
    results,
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

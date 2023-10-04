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


const filterPagination = async (model, page, resultPerPage ,filter) => {
  const skip = (page - 1) * resultPerPage;
  const totalDocuments = await model.countDocuments();
  const totalPages = Math.ceil(totalDocuments / resultPerPage);

  const results = await model.find(filter).skip(skip).limit(resultPerPage);

  return {
    currentPage: page,
    totalPages,
    totalDocuments,
    resultPerPage,
    results,
  };
};

module.exports = { pagination, filterPagination };

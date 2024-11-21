const APIData = (data) => {
  return (req, res) => {
    if (Object.values(data).length > 0)
      return res.status(200).json({
        success: true,
        status: 200,
        message: "Data fetched successfully!",
        data: data,
      });
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Data not found!",
      data: null,
    });
  };
};

const authError = (errorData) => {
  return errorData.details.map((data) => {
    const results = {
      status: 422,
      label: data.context.label,
      message: data.message,
    };
    return results;
  });
};

const customResponse = (response, statusCode, success) => {
  return (req, res) => {
    return res.status(statusCode).json({
      success: success,
      status: statusCode,
      message: response,
    });
  };
};

module.exports = {
  APIData,
  authError,
  customResponse,
};

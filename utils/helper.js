
exports.successResponse = (res, data, message = 'Success', status = 200) => {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  };
  
  exports.errorResponse = (res, error, message = 'Error', status = 500) => {
    return res.status(status).json({
      success: false,
      message,
      error: error.message || error,
    });
  };
  
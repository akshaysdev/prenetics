const response = (error) => {
  if (error.status === 500) {
    return {
      success: false,
      message: 'Internal Server Error',
    };
  }
  return {
    success: false,
    message: error.message,
  };
};

module.exports = { response };

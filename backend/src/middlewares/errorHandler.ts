const errorHandler = (err, req, res, next) => {
  console.log(err);

  let message = err.message || "Internal server error";
  let statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    message = "Duplicate key";

    if (err.keyValue.email) {
      message = "The email is already taken";
    }

    if (err.keyValue.username) {
      message = "The username is already taken";
    }

    statusCode = 400;
  }
  message = err?._message || err?.message || '';

  if (err.name === "ValidationError") {
    statusCode = 400;
  }

  if (err.name === "CastError") {
    message = "The ObjectID is malformed";
    statusCode = 400;
  }
  
  res.status(statusCode).json({ success: false, message });

};

export default errorHandler;

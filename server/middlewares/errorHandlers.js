const errorHandle = (err, req, res, next) => {
  console.log(err, "======== error handle");
  if (err.name === "SequelizeValidationError") {
    res.status(400).json({
      message: err.errors[0].message,
    });
  } else if (err.name === "SequelizeUniqueConstraintError") {
    res.status(400).json({
      message: err.errors[0].message,
    });
  } else if (err.name === "NotFound") {
    res.status(404).json({
      message: "User not found",
    });
  } else if (err.name === "InvalidPassword") {
    res.status(400).json({
      message: "Invalid username or password",
    });
  } else if (err.name === "Username is required") {
    res.status(400).json({
      message: err.name,
    });
  } else if (err.name === "Password is required") {
    res.status(400).json({
      message: err.name,
    });
  } else if (err.name === "InvalidToken") {
    res.status(401).json({
      message: "Not authorized",
    });
  } else if (err.name === "Forbidden") {
    res.status(401).json({
      message: err.name,
    });
  } else {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  errorHandle,
};

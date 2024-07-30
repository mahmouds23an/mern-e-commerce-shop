const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(400).json({
        message: "User not authorized",
        error: true,
        success: false,
      });
    }
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        console.log(err);
      }
      req.userId = decoded?._id;
      next();
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
};

module.exports = authToken;

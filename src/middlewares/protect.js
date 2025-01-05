const protect = (req, res, next) => {
    req.user = { id: "64c7b2e6e13e4b001e7d52a4" }; // Example user ID
    next();
  };

  module.exports = protect;
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      if (typeof next === "function") return next(err);
      // If next isn't provided (shouldn't happen in Express), fail safely:
      res.status(500).json({ message: err?.message || "Server Error" });
    });
  };
};

module.exports = asyncHandler;

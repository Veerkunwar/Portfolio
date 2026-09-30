/* eslint-disable no-unused-vars */

export function notFoundHandler(req, res, next) {
  res.status(404).json({ success: false, message: "Route not found." });
}

// Express recognizes an error-handling middleware by its 4 arguments.
export function errorHandler(err, req, res, next) {
  console.error("[error]", err.message);

  const status = err.statusCode || 500;
  const message =
    status === 500
      ? "Something went wrong on our end. Please try again shortly."
      : err.message;

  res.status(status).json({ success: false, message });
}

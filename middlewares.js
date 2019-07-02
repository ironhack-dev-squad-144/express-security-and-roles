// Middleware that redirects the user to the login page if not connected
function checkConnected(req, res, next) {
  if (req.user) next();
  else res.redirect("/auth/login");
}

function checkAdmin(req, res, next) {
  if (req.user && req.user.role === "ADMIN") next();
  else res.redirect("/auth/login");
}

module.exports = { checkConnected, checkAdmin };

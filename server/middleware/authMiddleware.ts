export function isLoggedIn (req, res, next) {
  req.isAuthenticated() ? next() : res.sendStatus(401);
}

export function isAdmin (req, res, next) {
  req.isAuthenticated() && req.user['isAdmin'] ? next() : res.sendStatus(401);
}


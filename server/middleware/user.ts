interface ReturnUserInfo {
    firstName: string;
    lastName: string;
    email: string;
    isAdmin?: boolean;
}

export function parseUserData (req, res, next) {
    const userInfo: ReturnUserInfo = {
        firstName: req.user['firstName'],
        lastName: req.user['lastName'],
        email: req.user['email']
    }

    if(req.user['isAdmin']) userInfo.isAdmin = true;
    req.user = userInfo;
    next();
}
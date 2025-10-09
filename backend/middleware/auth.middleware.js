function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Authorization header missing",
        });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({
            success: false,
            message: "Invalid authorization format",
        });
    }

    const token = parts[1];

    try {
        const decoded = JSON.parse(atob(token));
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
}

module.exports = { authMiddleware };

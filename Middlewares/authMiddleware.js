const jwt = require('jsonwebtoken');
require("dotenv").config()

const JWT_SECRET  = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized Access' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized Access' });
    }
}

module.exports = verifyToken;
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) {
		return res.status(401).json({ message: 'Access Denied' });
	}

	try {
		console.log("Token received: ", process.env.JWT_TOKEN);
		const verified = jwt.verify(token, process.env.JWT_TOKEN);
		req.user = verified; // Attaching user info to the request
		console.log("verify", verified);
		next();
	} catch (error) {
		res.status(400).json({ message: 'Invalid Token' });
	}
};

module.exports = { verifyToken };

import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) {
		return res.status(401).json({ message: 'Access Denied' });
	}

	try {
		const verified = jwt.verify(token, process.env.JWT_TOKEN);
		if (!verified.userId || !verified.role) {
			return res.status(400).json({ message: 'Invalid token data' });
		}
		req.user = { id: verified.userId, role: verified.role };
		console.log(req.user);
		next();
	} catch (error) {
		res.status(400).json({ message: 'Invalid Token' });
	}
};


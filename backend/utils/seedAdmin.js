import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const seedAdmin = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);

		const adminExists = await Admin.findOne({ email: 'testadmin@gmail.com' });
		if (adminExists) {
			console.log('Admin user already exists');
			return;
		}

		// Create the admin user
		const hashedPassword = await bcrypt.hash('admin123', 10);
		const admin = new Admin({
			name: 'Admin',
			email: 'testadmin@gmail.com',
			password: hashedPassword,
			role: 'admin',
		});

		await admin.save();
		console.log('Admin user created successfully');
	} catch (error) {
		console.error('Error seeding admin user:', error);
	}
};

export default seedAdmin;

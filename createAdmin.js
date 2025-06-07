import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const adminSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: "admin"},
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB Atlas");

        // Create admin user
        const hashedPassword = await bcrypt.hash("demo123", 10); // Changed password
        const admin = await Admin.create({
            email: "demo@ezlearn.in", // Changed email
            password: hashedPassword,
            role: "admin"
        });

        console.log("Admin user created successfully:", admin.email);
    } catch (error) {
        console.error("Error creating admin:", error);
    } finally {
        await mongoose.disconnect();
    }
}

createAdmin(); 
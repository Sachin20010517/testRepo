const userModel = require('../models/user-model');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
dotenv.config();

async function registerUser(username, email, password, role) {
    try {
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            throw new Error(`Username '${username}' already exists`);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({ 
            username,
            email,
            password: hashedPassword,
            role
        });

        const result = await newUser.save();
        if (!result) {
            throw new Error(`Failed to save user ${username}`);
        }

        return { status: 200, message: `User ${username} registered successfully.` };
    } catch (err) {
        console.error("Error registering user:", err);
        return { status: 500, error: err.message };
    }
}


// Login function to authenticate user and generate token
async function login(req) {
    const {username,password} = req.body;
    
    try {
        const user = await userModel.findOne({ username: username });
        if (!user) {
            throw new Error('User not found');
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const token = generateToken(user.username, user.role);
        return { status: 200, message: 'Login successful', token: token };
    } catch (error) {
        console.log(error);
        return { status: 401, error: error.message };
    }
}



function generateToken(username, role) {
    const payload = {
        username: username,
        role: role
    };

    const secretKey = "your_secret_key_here"; 
    const options = {
        expiresIn: '1h'
    };

    return jwt.sign(payload, secretKey, options);
}



async function getAllUsers() {
    try {
        const users = await userModel.find();
        return { status: 200, users };
    } catch (error) {
        console.error("Error getting all users:", error);
        return { status: 500, error: error.message };
    }
}


async function deleteUserById(userId) {
    try {
        const deletedUser = await userModel.findByIdAndDelete(userId);
        console.log(deletedUser);
        if(deletedUser === null){
            throw new Error(`User with ID '${userId}' not found`);
        }
        return { status: 200, message: `User with ID '${userId}' deleted successfully` };
        
    } catch (error) {
        console.error("Error deleting user:", error);
        return { status: 500, error: error.message };
    }
}

async function updateUserById(userId, updates) {
    try {
        // Check if the updates include the password field
        if (updates.password) {
            // Hash the new password
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, updates, { new: true });
        if (!updatedUser) {
            throw new Error(`User with ID '${userId}' not found`);
        }
        return { status: 200, message: `User with ID '${userId}' updated successfully`, user: updatedUser };
    } catch (error) {
        console.error("Error updating user:", error);
        return { status: 500, error: "Error updating user" };
    }
}




module.exports = {
    registerUser,
    deleteUserById,
    updateUserById,
    getAllUsers,
    generateToken,
    login
};

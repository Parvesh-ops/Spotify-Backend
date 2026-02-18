import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password, role = "user" } = req.body  // -> middelware + usermodel  // if in req.body there is no role then defult value is user
    // console.log(username, email, password,role);

    if (!username || !email || !password) {
        res.status(401);
        throw new Error("All fields are required");
    }

    //check if user already  exist 
    const isUserAlreadyExist = await User.findOne({ username, email, })
    if (isUserAlreadyExist) {
        res.status(401)
        throw new Error("Email is already exist");
    }

    //hash password
    const hashPassword = await bcrypt.hash(password, 10)  //-> password come form destructure req.body(user model), 10-> salt
    console.log(hashPassword);


    //create user
    const createdUser = await User.create({
        username,
        email,
        password: hashPassword,
        role
    })

    res.status(201).json({
        _id: createdUser.id,
        username: createdUser.username,
        email: createdUser.email,
        password: createdUser.password,
        role: createdUser.role,
        message: "User registered successfully",
    })
});

export const loginUser = asyncHandler(async (req, res) => {
    res.status(201).json({ message: 'user Login!! ' })
});
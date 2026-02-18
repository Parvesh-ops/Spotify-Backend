import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

//register user
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

//login user
export const loginUser = asyncHandler(async (req, res) => {

    const { username ,email, password } = req.body;

    // //validate
    // if (!email || !password) {
    //     res.status(401);
    //     throw new Error("All field required");
    // }

    //find user
    const existedUser = await User.findOne({ email })
    if (!existedUser) {
        res.status(401)
        throw new Error("Invalid email or password");
    };

    //compare password
    const comparePassword = await bcrypt.compare(password, existedUser.password);
    if (!comparePassword) {
        res.status(401);
        throw new Error("Invalid  password");
    }

    //generate token  -> used from utils generate.token
    const token = generateToken(existedUser.id, existedUser.role)

    res.cookie('accessToken', token, {
        httpOnly: true,          // JS can't access (secure)
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
        _id: existedUser.id,
        username: existedUser.username,
        email: existedUser.email,
        message: 'User logged in'
    })
});
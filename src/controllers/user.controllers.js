import asyncHandler from 'express-async-handler'

export const registerUser = asyncHandler(async (req, res) => {
    res.status(201).json({ message: 'user Register!! ' })
});

export const loginUser =  asyncHandler(async (req, res) => {
    res.status(201).json({ message: 'user Login!! ' })
});
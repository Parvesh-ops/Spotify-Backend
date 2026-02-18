import asyncHandler from 'express-async-handler'

export const uploadMusic = asyncHandler(async (req, res) => {
    res.status(201).json({ message: 'Uploaded music!!' })
});
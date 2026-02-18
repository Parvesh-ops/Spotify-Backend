// for music artist only artist can add music

import mongoose from "mongoose";

//Schema
const musicSchema = new mongoose.Schema({
    uri: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"  // -> come from userModel
    }
},
    {
        timestamps: true
    }
)

//model
const musicModel = ('music', musicSchema)
export default musicModel;

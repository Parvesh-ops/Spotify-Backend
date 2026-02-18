import mongoose from "mongoose";

//Schema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please add the username'],
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'Please add the email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add the password'],
        },
        role: {
           type: String,
           enum: ['user','artist'],
           default: 'user'
        }
    },
    {
        timestamps: true
    }
)

//model
const User = mongoose.model('User', userSchema);
export default User;
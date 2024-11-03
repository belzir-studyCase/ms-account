import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true,
    },
    imageUrl: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    givenName: {
        type: String,
    },
    role: {
        type: String,
    },
    familyName: {
        type: String,
    }
}, {
    timestamps: true,
});

const User = mongoose.model('users', userSchema);

export default User;

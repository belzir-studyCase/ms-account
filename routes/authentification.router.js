
import express from "express";
import User from '../models/user.js';
import axios from "axios";
const router = express.Router();

router.post("/login", async (req, res) => { 
    try {
        try {
            const { googleId, imageUrl, email, name, givenName, familyName } = req.body;  
            let user = await User.findOne({ googleId });
            if (!user) {
                const role = "Client";
                user = new User({ googleId, imageUrl, email, name, givenName, familyName , role });
                await user.save();
            }
            await axios.post(`http://localhost:3000/notification/newauth/${email}`);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
});

router.get("/all/users", async (req, res) => {
    try {
        let users = await User.find({ role: "Client" });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get("/admin", async (req, res) => {
    try {
        let user = await User.findOne({ role: "Admin" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
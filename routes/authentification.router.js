
import express from "express";
import User from '../models/user.js';


const router = express.Router();

router.post("/login", async (req, res) => { 
    try {
        const { googleId, imageUrl, email, name, givenName, familyName } = req.body;  // Get data from req.body

        try {
            let user = await User.findOne({ googleId });

            if (!user) {
                user = new User({ googleId, imageUrl, email, name, givenName, familyName });
                await user.save();
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
});




export default router;
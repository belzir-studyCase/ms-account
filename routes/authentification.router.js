import express from "express";
import User from '../models/user.js';
import axios from "axios";
const router = express.Router();

/**
 * @swagger
 * /account/login:
 *   post:
 *     summary: User login or registration using Google credentials
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               googleId:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               givenName:
 *                 type: string
 *               familyName:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully logged in or registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 googleId:
 *                   type: string
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *                 role:
 *                   type: string
 *       500:
 *         description: Error processing request
 */
router.post("/login", async (req, res) => { 
    try {
        const { googleId, imageUrl, email, name, givenName, familyName } = req.body;  
        let user = await User.findOne({ googleId });
        if (!user) {
            const role = "Client";
            user = new User({ googleId, imageUrl, email, name, givenName, familyName , role });
            await user.save();
        }
        await axios.post(`https://gateway-9pxx.onrender.com/notification/newauth/${email}`);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /account/all/users:
 *   get:
 *     summary: Get all users with the role of "Client"
 *     responses:
 *       200:
 *         description: List of client users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   googleId:
 *                     type: string
 *                   email:
 *                     type: string
 *                   name:
 *                     type: string
 *                   role:
 *                     type: string
 *       500:
 *         description: Error fetching users
 */
router.get("/all/users", async (req, res) => {
    try {
        let users = await User.find({ role: "Client" });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /account/admin:
 *   get:
 *     summary: Get a user with the role of "Admin"
 *     responses:
 *       200:
 *         description: Admin user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 googleId:
 *                   type: string
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *                 role:
 *                   type: string
 *       500:
 *         description: Error fetching admin user
 */
router.get("/admin", async (req, res) => {
    try {
        let user = await User.findOne({ role: "Admin" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authantication = require("../authantication/authantication");
const router = express.Router();

require("../db/conn");
const User = require("../model/model");

router.post("/register", async (req, res) => {
    const { name, email, phone, work, password, cpassword, nameError } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "please, enter filelds properly" });
    }
    if (!name) {
        return res.status(422).json({nameError: "Name is required"});
    } else {
        return res.status(422).json({nameError: "Name is invalid"})
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ error: "please, fill all data properly" });
        }

        const loginEmail = await User.findOne({ email: email });
        const token = await loginEmail.generateAuthToken();
        res.cookie("jwtToken", token, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true
        });
        if (loginEmail) {
            const loginPassword = await bcrypt.compare(password, loginEmail.password);
            if (!loginPassword) {
                res.status(422).json({ error: "Invalid credintials" });
            } else {
                res.status(201).json({ message: "User logged in successfully!" });
            }
        } else { 
            res.status(422).json({ error: "Invalid credintials" });
        }
    } catch (err) {    
        console.log(err);
    }
});

router.get("/about", authantication, async (req, res) => {
    const data = await req.rootUser;
    res.send(data);
});

router.get("/getData", authantication, async (req, res) => {
    const data = await req.rootUser;
    res.send(data);
});

router.post("/contact", authantication, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            return res.json({ error: "please, fill all data properly" });
        }

        const userContact = await User.findOne({ _id: req._id });

        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            res.status(201).json({ message: "User contacted successfully!" });
        }
    } catch (err) {
        console.log(err);
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("jwtToken");
    res.status(200).send("user logged out");
});

module.exports = router;
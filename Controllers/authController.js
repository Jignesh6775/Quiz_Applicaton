const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/userModel');
const saltRounds = 5;
require("dotenv").config()

const JWT_SECRET  = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    const { username, password } = req.body
    try{
        const isUserExist = await UserModel.findOne({ username })
        if(isUserExist){
            res.status(400).json({ message: 'User already exists' })
        }
        
        const hash = await bcrypt.hash(password, saltRounds)
        const user =  new UserModel({ username, password: hash })
        await user.save()
        res.status(201).json({ message: 'User registered successfully' })
    } catch(error){
        res.status(500).json({ message: error.message })
    }
}


exports.login = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await UserModel.findOne({ username })
        
        if(!user) return res.status(400).json({ message: 'User not found' })

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) return res.status(400).json({ message: 'Invalid password' })

        const token = jwt.sign({ user: { id: user._id, username: user.username } }, JWT_SECRET)
        res.status(200).json({ token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
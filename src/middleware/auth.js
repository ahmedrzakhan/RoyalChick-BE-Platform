const jwt = require('jsonwebtoken')
const {UserService} = require('../services/user.service')
const verifyToken = async(req,res,next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split('Bearer ')[1]
        if(token == null) return res.status(401);
        //verify token
        const email =  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        //verify from db
        const user = await UserService.getUserByEmail(email.email)
        if(!user[0]) return res.status(404).send('User not found');
        req.user = user[0][0]
        next()
    } catch (error) {
        next(error)
    }
}


module.exports={verifyToken}
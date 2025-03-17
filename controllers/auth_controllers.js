const Users = require('../modules/user_module');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

function createToken(id){
    return jwt.sign({id},process.env.secretTokenString,{
        expiresIn: 24*60*60
    })
}

async function  signup(req,res){
    let {username,email,password} = req.body;
    try{
        const user = new Users({
            username,
            email,
            password: await bcrypt.hash(password,10),
        });
        token = createToken(user._id);
        res.cookie('token',token,{httpOnly:true, maxAge:24*60*60*1000});
        await user.save();
        res.status(201).json({
            "success": true,
            "message": "User registered successfully"
          });
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"couldn't create the user"});
    }
}

async function login(req,res){
    let {email,password} = req.body;
    try{
        const user = await Users.findOne({email : email});
        if(user){
            const auth = await bcrypt.compare(password,user.password);
            if(auth){
                token = createToken(user._id)
                res.cookie("token",token,{httpOnly:true,maxAge:24*60*60*1000})
                res.status(200).json({"success":true,"user":{"id": user._id ,"username":user.username,"email":user.email}})
            }else{
                res.status(400).json({"success":false,"msg":"the password is incorrect"});
            }
        }else{
            res.status(400).json({"success":false,"msg":"the email not registred please create an accound first"})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"couldn't login"});
    }
}

function authenMid(req,res,next){
    const token = req.cookies.token;
    if(token){
        jwt.verify(token,process.env.secretTokenString,(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.status(400).json({"msg":"you must be loged in to enter this page"})
            }else{
                next()
            }
        })
        
    }else{
        console.log(err.message);
        res.status(400).json({"msg":"you must be loged in to enter this page"})
    }
}

async function verifyUser(req,res,next){
    token = req.cookies.token;
    let id = 0;
    if(!token){
        res.status(401).json({"msg":"unauthorized access"});
    }else{
        jwt.verify(token,process.env.secretTokenString,(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.status(401).json({"msg":"unauthorized access"});
            }else{
                 id = decodedToken.id;
            }
        })
    }
    const user = await Users.findById(id);
    if(!user){
        res.status(404).json({"msg":"user not found"})
    }else{
        req.id = id;
        next();
    }
}

function logout(req,res){
    try{
    res.cookie('token',"",{httpOnly:true, maxAge:1});
    res.status(204).json({
        "success": true,
        "message": "User signed out successfully"
      })
    }catch(err){
        console.log(err);
    }
}
// router.post('/signout',)

module.exports = {signup,login,authenMid,verifyUser,logout}
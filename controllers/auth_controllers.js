const Users = require('../modules/user_module');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function createToken(id){
    return jwt.sign({id},"my secret",{
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

function authMid(req,res,next){
    const token = req.cookies.token;
    console.log("hellp")
    if(token){
        jwt.verify(token,"my secret",(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.status(400).json({"msg":"you must be loged in to enter this page"})
            }else{
                console.log(decodedToken);
                next()
            }
        })
        
    }else{
        console.log(err.message);
        res.status(400).json({"msg":"you must be loged in to enter this page"})
    }
}


// router.post('/login',)
// router.post('/signout',)

module.exports = {signup,login,authMid}
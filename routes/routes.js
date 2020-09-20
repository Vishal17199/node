const express = require('express')
const mongoose  = require('mongoose')
const router = express.Router()
const UserW = mongoose.model("UserW")
const jwt = require('jsonwebtoken')
const JWT_SECRET ="hjhjhdjjdjf"
var bcrypt = require('bcryptjs');
const requirelogin = require("./../requirelogin")

router.all("/signup",(req,res)=>{
    const { name , number , password} = req.body
    if (!name || !number || !password) {
        return res.json({ error: "please fill all the fields" })
    }
    UserW.findOne({ number: number })
    .then((saveduser) => {
        if (saveduser) {
            return res.json({ msg: "user already exists" })
        } else {
            var salt = bcrypt.genSaltSync(10);
            var hashPassword = bcrypt.hashSync(password, salt);
            const user = new UserW({
                name,
                number,
                password:hashPassword
            })
            user.save()
            .then(result=>{
                res.json({result})
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    })
})


router.post('/signin', (req, res) => {
    const { number, password } = req.body;
    if (!number || !password) {
        return res.json({ error: "please fill all the fields" })
    }
    UserW.findOne({ number: number })
        .then((saveduser) => {
            if (!saveduser) {
                return res.json({ error: "user not found" })
            } else {
                bcrypt.compare(password, saveduser.password)
                    .then((doMatch) => {
                        if (doMatch) {
                            const token = jwt.sign({ _id: saveduser._id }, JWT_SECRET)
                            const { _id,number,name} = saveduser;
                            res.json({ token, id:_id,number,name})
                        } else {
                            return res.json({ error: "invaild email or password" })
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        })
        .catch(error => {
            console.log(error)
        })
})

router.post('/userData',requirelogin,(req,res)=>{
    UserW.find()
    .then(data=>{
        console.log("userData")
        console.log({result:data})
        res.json(data)
    })
    .catch(error=>{
        res.json({error})
    })
})


module.exports=router
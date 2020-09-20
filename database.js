const assert = require('assert')
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://vishal171999:NKOX9bMcLML7qwOm@cluster0-bspfl.mongodb.net/twitter-clone?retryWrites=true&w=majority",{
useFindAndModify:false,
useCreateIndex:true,
useMongoClient:true,
useUnifiedTopology:true
},function(error,link){
    assert.equal(error,null , "db connection failed")
    console.log("db connection success")
    console.log(link)
})


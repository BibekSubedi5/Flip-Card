import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"



const userSchema= new mongoose.Schema({

email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true

},
username:{
    type:String,
    required:true,
    trim:true,

},
password:{
    type:String,
    required:true,
    
  
  
},

cards:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Card"
}

},{timestamps:true})


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    console.log("generated",this.password)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    console.log(this.password)
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

// userSchema.pre("save",async function(next){
//     if(!this.isModified("password")) return next();
//    this.password=await bcrypt.hash(this.password,10);
//    console.log("hashde id",this.password)
//    next(); 
   
// });



// userSchema.methods.isPasswordMatched = async function (password) {
//     console.log("Plain Password:", password);
//     console.log("compared hashed:", this.password);
//     return await bcrypt.compare(password, this.password);
// };

// userSchema.methods.GenerateAccessToken= function(){
// return jwt.sign({
//     _id:this._id,
//     email:this.email,
//     username:this.username,
    
// },

// process.env.ACCESS_TOKEN_SECRET,
// {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
// )
// }

// userSchema.methods.GenerateRefreshToken= function(){
//     return jwt.sign({
//         _id:this._id
    
//     },
    
//     process.env.REFRESH_TOKEN,
//     {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
//     )
//     }

export  const User =mongoose.model("User",userSchema)
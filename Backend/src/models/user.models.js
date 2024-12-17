import mongoose from "mongoose";
import bcrypt from "bcrypt";



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
    unique:true,
    lowercase:true
},

cards:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Card"
}

},{timestamps:true})




userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
   this.password=await bcrypt.hash(this.password,10);
   next(); 
   
});

userSchema.method.isPasswordMatched= async function(password){
    return await bcrypt.compare(password,this.password);

}


userSchema.method.GenerateAccessToken= function(){
return jwt.sign({
    _id:this._id,
    email:this.email,
    
},

process.env.ACCESS_TOKEN_SECRET,
{expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
)
}

userSchema.method.GenerateRefreshToken= function(){
    return jwt.sign({
        _id:this._id,
   
        
    },
    
    process.env.REFRESH_TOKEN,
    {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
    )
    }

export  const User =mongoose.model("User",userSchema)
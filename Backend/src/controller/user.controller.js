import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models//user.models.js"
import {ApiResponse} from "../utils//ApiResponse.js"





const generateAccessAndRefreshToken= asyncHandler(async(userId)=>{

  const user =  await User.findById(userId);
  const accessToken=user.GenerateAccessToken();
  const refreshToken=user.geGenerateRefreshToken();

  user.refreshToken=refreshToken;
  await user.save({validateBeforeSave:false})
  return {accessToken,refreshToken}

})

const registerUser =asyncHandler( async(req,res)=>{
    const {username,email,password}=req.body;
    console.log("email",email)

    if(
        [username,email,password].some((fields)=>fields?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required")
    }

  const existedUser= await User.findOne({
        $or: [{ email: email }, { username: username }]
     })

     if(existedUser){
        throw new ApiError(409,"User already Existed")
     }
   const user =await User.create({
    username,
    email,
    password,

   });
   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  
  if (!createdUser) {
    throw new ApiError(500, "Something Went wrong while registring the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, "User registered successfully", createdUser));

})

const loginUser=asyncHandler(async(req,res)=>{

const {email,password}=req.body
if(!email && !password){
    throw new ApiError(400,"Invalid Details")
}

const user=await User.findOne({
    $or: [{email:email},{password:password}]
})

if(!user){
  throw new ApiError(400,"Invalid user")
}

const matchedPassword= await user.isPasswordMatched(password)

if(!matchedPassword){
  throw new ApiError(401,"invalid password")
}
const { accessToken, refreshToken } =  generateAccessAndRefreshToken(
  user._id
);
const loggedInUser = await User.findById(user._id).select(
  "-password -refreshToken"
);

const options = {
  httpOnly: true,
  secure: true,
};

return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(
      200,
      { user: loggedInUser, refreshToken, accessToken },
      "User loggedIn Succesfully"
    )
  );
})





export {registerUser,loginUser}
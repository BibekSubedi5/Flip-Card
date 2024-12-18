import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models//user.models.js"
import { ApiResponse } from "../utils//ApiResponse.js"




const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating refreshand access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log("email", email)

  if (
    [username, email, password].some((fields) => fields?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required")
  }

  const existedUser = await User.findOne({
    $or: [{ email: email }]
  })

  if (existedUser) {
    throw new ApiError(409, "User already Existed")
  }
  const user = await User.create({
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


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({
    email
  });

  if (!user) {
    throw new ApiError(404, " user not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
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
});

// const loginUser=asyncHandler(async(req,res)=>{

// const {email,password}=req.body
// if(!email ){
//     throw new ApiError(400,"Invalid Details")
// }
// const user = await User.findOne({email});


// if(!user){
//   throw new ApiError(400,"Invalid user")
// }

//   const matchedPassword= await user.isPasswordMatched(password)

// if(!matchedPassword){
//     throw new ApiError(401,"password Doesnot matched")
// }
// const { accessToken, refreshToken } = await  generateAccessAndRefreshToken(
//   user._id

// );
// console.log(accessToken,refreshToken)
// const loggedInUser = await User.findById(user._id).select(
//   "-password -refreshToken"
// );

// const options = {
//   httpOnly: true,
//   secure: true,
// };

// return res
//   .status(200)
//   .cookie("accessToken", accessToken, options)
//   .cookie("refreshToken", refreshToken, options)
//   .json(
//     new ApiResponse(
//       200,
//       { user: loggedInUser, refreshToken, accessToken },
//       "User loggedIn Succesfully"
//     )
//   );
// })





export { registerUser, loginUser }
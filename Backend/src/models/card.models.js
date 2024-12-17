import mongoose from "mongoose";



const cardSchema = new mongoose.Schema({

genre:{
    type:String,
    require:true,

},

firstFact:{
    type:String,
    require:true,
},
secondFact:{
    type:String,
    require:true,
},
frontImg:{
    type:String,
    require:true,
},
backImg:{
    type:String,
    require:true,
}

},{timestamps:true})


export const Card= mongoose.model("Card",cardSchema)
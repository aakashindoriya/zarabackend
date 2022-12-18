let mongoose=require("mongoose")
mongoose.set('strictQuery', false);
let connect= async ()=>{
    return mongoose.connect("mongodb+srv://aakashindoriya:aakash123@cluster0.tbtucsa.mongodb.net/?retryWrites=true&w=majority")
}

module.exports=connect
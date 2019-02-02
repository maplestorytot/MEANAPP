const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    //ref to which model it relates to
    // mongoose.Schema.Types.ObjectId is a string and its the object's id
    creator:{type:mongoose.Schema.Types.ObjectId, required: true,ref:'User' },
   //field and type of data
    //can learn more on mongoose db
    //can use default instead of required
    title:{type:String, required:true},
    content:{type:String, required:true},
    imagePath:{type:String,required:true}


});


//first is name of model, second is schema
module.exports=mongoose.model('Post',postSchema);

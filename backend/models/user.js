const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);

/*const mongoose = require('mongoose');
///npm install --save mongoose-unique-validator
//use as a plugin on the schema. a hook that checks the data before adding to the db
const uniqueValidator=require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    //unique is not a validator and will not throw errors
    //unique helps with optimizations
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}
  });

userSchema.plugin(uniqueValidator);

//first is name of model, second is schema
module.exports=mongoose.model('User',userSchema);

*/

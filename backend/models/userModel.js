const mongosose = require ('mongoose');

const userSchema = new mongosose.Schema({
    name: {type:String, required:true},
    email: { type: String, required: true, unique: true, index: true, dropDups: true,},
    password:{type: String, required:true},
    isAdmin: {type:Boolean, required:true, default:false}
});

const userModel = mongosose.model("User", userSchema);


module.exports = userModel;
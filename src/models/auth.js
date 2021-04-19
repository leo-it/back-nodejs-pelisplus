const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RoleSchema = new Schema({
roleId:{
type:String,
unique:true,
required:[true,"Role Id required"]
},
type:{
type:String,
unique:true,
required:[true,"Role type is required"]
},
rights:[{
name: String,
path: String,
url: String
}]
});
module.exports = Role = mongoose.model('role',RoleSchema);
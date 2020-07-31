const mongoose=require('mongoose');  //here if we import same module again then the previous refernce will be used...this saves lot of space
const Schema=mongoose.Schema;
const contactSchema=new Schema(
    {
        name:{
            type:String,
            required:true
        },
        phone : {
            type:String,
            required:true
        }
    }
);

const Contacts=mongoose.model('Contact',contactSchema);

module.exports=Contacts;
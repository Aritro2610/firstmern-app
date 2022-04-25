const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    creator:{
        type:String,
        required:true
    },
    tags:{
        type:String
    },
    selectedFile:{
        type:String
    },
    likeCount:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('PostMessage',postSchema);
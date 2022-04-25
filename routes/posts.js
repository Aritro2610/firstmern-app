const express = require('express');
const router = express.Router();
const PostMessage = require('../model/postMessage');
router.get('/',async(req,res)=>{
    try {
        const postMessages = await PostMessage.find();
        res.json(postMessages);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
});
router.post('/',async(req,res)=>{
    try {
        // const addPost = await PostMessage.findById(req.params.id)
        const post = req.body;
        // await PostMessage.create(req.body)
        const newPost = new PostMessage(post);
        await newPost.save();
        res.json(newPost);
    } catch (error) {
        console.log(error);
    }
});
router.patch('/:id',async(req,res)=>{
    const {id: _id} = req.params;
    const find = await PostMessage.findById(req.params.id);
    const post = req.body;
    if(req.params.id!==find.id){
        res.send("POSTS not found");
    }else;
    const updatedPost = await PostMessage.findByIdAndUpdate(_id,post,{new:true});
    res.json(updatedPost);
});
router.delete('/:id',async(req,res)=>{
    const {id} = req.params;
    // const find = await PostMessage.findById(req.params.id);
    if(req.params.id){
        await PostMessage.findByIdAndRemove(id);
        console.log("Post deleted Succesfully");
        res.json({message:"post deleted succesfully"});
    }else{
        console.log("Did not found post");
    }
});
router.patch('/:id/likePost',async(req,res)=>{
    const {id} = req.params;
    try {        
        if(req.params.id){
           const post = await PostMessage.findById(id);
           const updatedPost = await PostMessage.findByIdAndUpdate(id,{likeCount: post.likeCount + 1},{new:true});
           res.json(updatedPost);
        }
        console.log("post liked")
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;
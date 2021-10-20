const express = require ('express');
const router = express.Router();
const multer = require('multer');
const {category} = require('../models/category');

const storage = multer.diskStorage({
destination:function(req,file,cb){
    cb(null,'./Categoryuploads/')
    cb(null,new Date().toISOString()+ file.originalname);
},
filename:function(req,file,cb){
    cb(null,new Date().toISOString()+ file.originalname);
}
});
const upload = multer({storage : storage});
// Get all categorys

router.get('/api/category',(req,res)=>{
    item.find({},(err,data)=>{
        if(!err){
            res.send(data);
        }else{
            console.log(err);
        }
    });
});

//Save categorys

router.post('/api/category/add',upload.single('CategoryImage'), (req,res)=>{
    const itemm = new category({
        name: req.body.name,
        image: req.file.path,
    })
    category.save((err,data)=>{
        res.status(200).json({code:200 , message:'category added', addCategory:data})
    });
});

//Get single category
router.get('/api/category/:id', (req,res)=>{
   item.findById(req.params.id,(err,data)=>{
    if(!err){
        res.send(data);
    }else{
        console.log(err);
    }
   });      
});
    

//Update category
router.put('/api/category/update/:id', (req, res) => {


    const ctgry = {
        name: req.body.name,
        image: req.body.image,
    };
    item.findByIdAndUpdate(req.params.id, { $set: ctgry }, { new: true }, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'Item Updated Successfully', updateItem: data})
        } else {
            console.log(err);
        }
    });
});

// Delete category
router.delete('/api/category/:id', (req, res) => {

    category.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'category deleted', deleteCateogry: data})
        } else {
            console.log(err);
        }
    });
});


module.exports = router;
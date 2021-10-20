const express = require ('express');
const router = express.Router();
const multer = require('multer');
const {item} = require('../models/items');



const storage = multer.diskStorage({
destination:function(req,file,cb){
    cb(null,'./Itemuploads/')
    cb(null,new Date().toISOString()+ file.originalname);
},
filename:function(req,file,cb){
    cb(null,new Date().toISOString()+ file.originalname);
}
});
const upload = multer({storage : storage});

// Get all items

router.get('/api/items',(req,res)=>{
    item.find({},(err,data)=>{
        if(!err){
            res.send(data);
        }else{
            console.log(err);
        }
    });
});

//Save items

router.post('/api/items/add',upload.single('itemImage'), (req,res)=>{
    console.log(req.file);
    const itemm = new item({
        name: req.body.name,
        unit: req.body.unit,
        price: req.body.price,
        image: req.file.path,
    })
    item.save((err,data)=>{
        res.status(200).json({code:200 , message:'item added', addItem:data})
    });
});

//Get single item
router.get('/api/items/:id', (req,res)=>{
   item.findById(req.params.id,(err,data)=>{
    if(!err){
        res.send(data);
    }else{
        console.log(err);
    }

   });      
});
    

//Update item
router.put('/api/item/update/:id', (req, res) => {


    const itm = {
        name: req.body.name,
        unit: req.body.unit,
        price: req.body.price,
        image: req.body.image,
    };
    item.findByIdAndUpdate(req.params.id, { $set: itm }, { new: true }, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'Item Updated Successfully', updateItem: data})
        } else {
            console.log(err);
        }
    });
});

// Delete item
router.delete('/api/items/:id', (req, res) => {

    item.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'item deleted', deleteItem: data})
        } else {
            console.log(err);
        }
    });
});


module.exports = router;
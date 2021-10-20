const mongoose = require('mongoose');

const item = mongoose.model('item',{
    name:{
        type:String,
        required:true
    },
    unit:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }

});

module.exports = {item}
const mongoose = require('mongoose');

const category = mongoose.model('category',{
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }

});

module.exports = {category}
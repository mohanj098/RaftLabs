const mongoose= require("mongoose");

const memeschema = new mongoose.Schema({
    key:{
        type:Number,
        required: true,
    },
    person1: {
        type: String,
        required: true,
    },
    person2: {
        type: String,
        required: true
    },
    relation: {
        type: String,
        required: true
    }
})


const Table =new mongoose.model('Table', memeschema);

module.exports = Table;
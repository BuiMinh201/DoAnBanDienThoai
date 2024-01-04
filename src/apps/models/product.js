const mongoose = require("../../common/database")();
const productSchema = new mongoose.Schema({
    cat_id:{
        type: mongoose.Types.ObjectId,
        ref:"Categories",
        require:true,
    },
    name:{
        type: String,
        require:true,
    },
    slug:{
        type: String,
        require:true,
    },
    price:{
        type: String,
    },
    warranty:{
        type: String,
    },
    status:{
        type: String,
    },
    description:{
        type: String,
    },
    accessories:{
        type: String,
    },
    thumbnail:{
        type: String,
    },
    promotion:{
        type: String,
    },
    featured:{
        type: Boolean,
        default: false,
    },
    is_stock:{
        type: Boolean,
        default: true,
    },
},{timestamps: true});
const ProductModel = mongoose.model("Products",productSchema,"products");
module.exports = ProductModel;
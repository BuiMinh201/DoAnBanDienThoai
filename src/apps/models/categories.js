const mongoose = require("../../common/database")();
const categoriesSchema = new mongoose.Schema({
    description:{
        type: String,
    },
    slug:{
        type: String,
        require: true,
    },
    title:{
        type:String,
        require: true,
    },
},{timestamps:true});
const CategoriesModel = mongoose.model("Categories",categoriesSchema,"categories")
module.exports = CategoriesModel;

const CategoriesModel = require("../models/categories")
module.exports = async(req,res,next)=>{
    res.locals.categories = await CategoriesModel.find();
    res.locals.totalCartItems = req.session.cart.reduce((total,item)=>total+ item.qty,0);
    next();
}
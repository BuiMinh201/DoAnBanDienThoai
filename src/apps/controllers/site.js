const moment = require("moment")

const CategoriesModel = require("../models/categories");
const ProductModel = require("../models/product");
const CommentModel = require("../models/comment");
const ejs = require("ejs");
const path = require("path");
const transporter = require("../../common/transporter");
const home = async (req,res)=>{
    const featuredProduct = await ProductModel
    .find({
        featured: true,
        is_stock: true,
    })
    .sort({_id: -1})
    .limit(6)
    const latestProduct = await ProductModel
    .find({
        is_stock: true,
    })
    .sort({_id: -1})
    .limit(6)
    res.render("site/index",{featuredProduct,latestProduct});
}
const category = async (req,res)=>{
    const {id} = req.params;
    const Categories = await CategoriesModel.findById(id);
    const title = Categories.title;
    const products = await ProductModel
    .find({cat_id: id})
    .sort({_id: -1});
    const total = products.length;
    res.render("site/category",{products,title,total});
}
const product = async (req,res)=>{
    const {id} = req.params;
    const product = await ProductModel.findById(id);
    const comments = await CommentModel.find({prd_id:id}).sort({_id: -1});
    res.render("site/product",{product,comments,moment});
}
const comment = async (req,res)=>{
    const {id} = req.params;
    const {full_name,email,body} = req.body;
    const comment = {
        prd_id: id,
        full_name,
        email,
        body,
    }
    await new CommentModel(comment).save();
    res.redirect(req.path);
}
const search = (req,res)=>{
    res.render("site/search");
}
const addToCart = async(req,res)=>{
    
    const id = req.body.id;
    const qty = parseInt(req.body.qty)
    const items = req.session.cart;
    let isproductExists = false;

    items.map((item)=>{
        if(item.id===id){
            item.qty += qty;
            isproductExists = true;
        }
        return item;
    });
    if(!isproductExists){
        const product = await ProductModel.findById(id);
        items.push({
            id,
            name: product.name,
            thumbnail: product.thumbnail,
            price:product.price,
            qty,
        });
    }
    req.session.cart = items;
    res.redirect("/cart");
}
const cart = (req,res)=>{
    const cart = req.session.cart;
    res.render("site/cart",{cart});
}
const updateCart = (req,res)=>{
    const products = req.body.products
    let items = req.session.cart;
    const newItems = items.map((item)=>{
        item.qty = parseInt(products[item.id]["qty"])
        return item;
    })
    req.session.cart = newItems;
    res.redirect("/cart");
}
const deleteCart = (req,res)=>{
    const {id} = req.params;
    let items = req.session.cart;
    const newItems =items.filter((item)=>item.id !=id);
    req.session.cart = newItems;
    res.redirect("/cart");
}
const order = async (req,res)=>{
    const items = req.session.cart;
    const body = req.body;
    const html = await ejs.renderFile(
        path.join(req.app.get("views"),"site/email-order.ejs"),
        {
            name: body.name,
            phone: body.phone,
            mail:body.mail,
            add: body.add,
            items
        }
    );
    await transporter.sendMail({
        from: '"Vietpro Shop" <quantri.vietproshop@gmail.com>', // sender address
        to: body.mail, // list of receivers
        subject: "Xác nhận đơn hàng từ Vietpro Shop ✔", // Subject line
        html, // html body
      });
      req.session.cart = [];
      res.redirect("/success");
}
const success = (req,res)=>{
    res.render("site/success");
}
module.exports = {
    home,
    category,
    product,
    addToCart,
    comment,
    search,
    cart,
    updateCart,
    deleteCart,
    order,
    success
}

const UserModel = require("../models/user")
const pagination = require("../../common/pagination")
const index = async (req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = page*limit - limit;
    const totalRows = await UserModel.find().countDocuments();
    const totalPages = Math.ceil(totalRows/limit);
    const user = await UserModel
    .find({})
    .populate({path:"_id"})
    .skip(skip)
    .limit(limit);
    const next = page + 1;
    const hasNext = page < totalPages? true: false;
    const prev = page - 1;
    const hasPrev = page >1? true: false;
    res.render("admin/user/user",{
        user,
        page,
        totalPages,
        next,
        hasNext,
        prev,
        hasPrev,
        pagination: pagination(page,totalPages),
    });
}
const create = (req,res)=>{
    res.render("admin/user/add_user");
}
const edit = (req,res)=>{
    res.render("admin/user/edit_user");
}
const del = (req,res)=>{
    res.send("del");
}
module.exports = {
    index,
    create,
    edit,
    del,
}
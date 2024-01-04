const UserModel = require("../models/user");
const getlogin=(req,res)=>{
    res.render("admin/login",{data:{}});
}
const postlogin=async(req,res)=>{
    let{email,password} = req.body;
    const users = await UserModel.find({email,password});
    if(users.length > 0){
        req.session.email = email;
        res.redirect("/admin/dashboard")
    }

    else{
        res.render("admin/login",{data:{error: "Tai Khoan khong hop le"}})
    }
    
}
const logout=(req,res)=>{
    req.session.destroy();
    res.redirect("/admin/login");
}
module.exports = {
    getlogin,
    postlogin,
    logout,
}
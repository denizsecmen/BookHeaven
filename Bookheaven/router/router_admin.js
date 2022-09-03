var express=require('express');
var path=require('path');
var router=express.Router();
var admin=require("../controller/controller_admin");
router.get("/",function(req,res)
{
res.render("adminet");
});
module.exports=router;
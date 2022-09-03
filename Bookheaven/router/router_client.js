var express=require('express');
var path=require('path');
var client=require("../controller/controller_client");
var router=express.Router();
var mysql=require('mysql2');
var qs = require('querystring');
var cookie=require('cookie-parser');
var multer=require('multer');
const upload = multer({ dest: './public/data/uploads/' });
const awaupload = multer({ dest: './public/data/uploads/avatar/' });
var http=require("http");
const { Console } = require('console');
const { connect, Http2ServerRequest } = require('http2');
const session = require('express-session');
const { callbackify } = require('util');
let user="";
var con=mysql.createConnection(
    {
        multipleStatements: true,
        host: "localhost",
        user: "root",
        password: "password"
    }
);
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("use mydb;select * from book;");
  });
router.get("/",function(req,res)
{
    con.connect(function(){con.query('select * from book;',function(err,data,field)
    {
    res.render("index",{Loader:"./../views/dashsett/main",datab:data});    
})});
});
router.get("/about",function(req,res)
{
res.render("about");
});
router.get("/login",function(req,res)
{
    res.render("login");
});
router.get("/singup",function(req,res)
{
    res.render("singup");
}
)
router.post("/singup",function(req,res)
{
    let a=req.body.Nick;
    let b=req.body.Password;
    let c=req.body.email;
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth();
    var day=date.getDay();
    let stdate=year.toString()+"-"+month.toString()+"-"+day.toString();
    console.log(stdate);
    con.connect(function(err){con.query('use mydb;select Nickname from user where Nickname=\''+req.body.Nick+'\';',function(err,result,fields)
    {
        if (err) throw err;
        console.log(result);
        if(result[1].length.toString()=="0")
        {
            con.connect(function(err){con.query('use mydb;SET @var1=uuid();SELECT @var1;insert into user values(@var1,"'+a+'","'+b+'",'+stdate+',"client",0,"'+c+'");'
            ,function(err,result,fields){if (err) throw err;});
        });
    }
    });
});
});
router.post("/login",function(req,res)
{
    let check=0;
    console.log(req.body.Nick);
    console.log(req.body.Password);
    con.connect(function(err){con.query('use mydb;select Nickname,Password,User_ID from user where Nickname="'+req.body.Nick+'" AND Password="'+req.body.Password+'";',function(err,result,fields)
    {
        if(result[1].length.toString()=="1")
        {
            var d=req.body.User_ID;
            if(req.session)
            {
            req.session.Nick=req.body.Nick.toString();
            req.session.Password=req.body.Password.toString();
            }
            res.send("A");
            console.log(result[1][0].Nickname);
            console.log("Session Created");
        }
        else
        {
            res.send("D");
        }
    })})
});
router.get("/Dashboard",function(req,res)
{
if(!req.session.Nick)
{
    res.render("login");
    return true;
}
else{
    con.connect(function(){con.query('select * from book',function(err,data,field)
    {

    res.render("Dashboard",{Loader:"./../views/dashsett/main",datab:data,user:req.session.Nick,rates:0,book:0});
    })});
}
})
router.get("/book",function(req,res)
{
    res.render("Dashboard",{Loader:"./../views/dashsett/addbook",datab:"",user:req.session.Nick,rates:0,book:0});
}

)
router.get("/comm",function(req,res)
{
    con.connect(function(){con.query('select * from com WHERE Nick="'+req.session.Nick+'";',function(err,data,field)
    {
    var t=JSON.stringify(data);
    console.log("*******");
    console.log(data);
    res.render("Dashboard",{Loader:"./../views/dashsett/comments",datab:JSON.parse(t),user:req.session.Nick,rates:0,book:0});
    })});
}

)
router.get("/lib",function(req,res)
{
    con.connect(function(){con.query('select * from book WHERE Loader_Nick="'+req.session.Nick+'";',function(err,data,field)
    {
    res.render("Dashboard",{Loader:"./../views/libary",datab:data,user:req.session.Nick,rates:0,book:0});
    })});
}


)
router.get("/info",function(req,res)
{
res.render("Dashboard",{Loader:"./../views/dashsett/userinfo",datab:"",user:req.session.Nick,rates:0,book:0});
}
)
router.get("/singup",function(req,res)
{
    res.render("singup");
}
)
router.get("/new",function(req,res)
{
    res.render("new");
})
router.post('/info',awaupload.single('avatar'),
function(req,res)
{
    console.log(req.file.fieldname);
    var body=JSON.parse(JSON.stringify(req.body));
    console.log(body);
});
router.post('/addbook',upload.single('image'),function(req,res)
{
    var image='http://127.0.0.1:5000/public/data/uploads/' + req.file.filename;
    var body=JSON.parse(JSON.stringify(req.body));
    var query='use mydb;SET @var2=uuid();select @var2;insert into book values("'+req.body.Author+'",'+req.body.Page_number+',"'+image+'",@var2,"Turkish","'+req.session.Nick+'","'+req.body.Description+'","'+req.body.Bookname+'")';
    con.connect(function(err){con.query(query,function(err,result,fields){if (err) throw err;})});
    res.render("Dashboard",{Loader:"./../views/dashsett/addbook",datab:"",user:req.session.Nick,rates:0,book:0});
}
);
router.get("/exit",
function(req,res)
{
req.session.destroy();
con.connect(function(){con.query('select * from book;',function(err,data,field)
{
console.log(data);
res.render("index",{Loader:"./../views/dashsett/main",datab:data});    
})});
}
);
router.get("/bookpage",function(req,res)
{
console.log("Bookname:"+user.toString());
con.connect(function(){con.query("select * from com;select * from book WHERE NAME='"+req.session.book.toString()+"';",[1,2]
,function(error,result,field)
{
    console.log(result[1]);
    console.log("=========================");
    console.log(result[0]);
    var data=JSON.stringify(result[1]).slice(1,-1);
    data=JSON.parse(data); 
    res.render("./../views/dashsett/bookpage",{data:data,usr:req.session.Nick,com:JSON.parse(JSON.stringify(result[0]))});
})});
});
router.post("/bookpage",function(req,res)
{
req.session.book=req.body.Nickname;
con.connect(function(){con.query("select * from book WHERE NAME='"+req.body.Nickname+"';"
,function(error,result,field)
{
    console.log(result);
    res.render("./../views/dashsett/bookpage",{data:"",com:"",usr:""});
})});
});
router.post("/adcom",function(req,res)
{
    console.log(req.body.Nick);
    console.log(req.body.Comment);
    con.connect(function (err) {
        if(err)
        {throw err}
        else
    {
        con.query("use mydb;SET @var1=Curdate();SET @var2=uuid();select @var1;Insert into com VALUES('"+req.body.Nick+"','"+req.body.Comment+"',@var1,@var2,'"+req.session.Nick+"');",
        function(err,result,field)
        {
            if(err)
            {
                throw err;
            }
            console.log(result);
        });
    }})
    res.render("new");
}
);
module.exports=router;

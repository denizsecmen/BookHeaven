function send()
{
var docu=new FormData();
docu.append("Nick",document.getElementById("book").value);
docu.append("E-mail",document.getElementById("auth").value);
docu.append("avatar",document.getElementById("image").files[0]);
$.ajax({
    url:"/info",
    type:"POST",
    async:false,
    data:docu,
    processData: false,
    contentType: false,
    success:function()
    {
        alert("Sucessfully sended!");
    }

});
}
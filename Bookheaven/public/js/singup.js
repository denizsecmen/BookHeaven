function singu()
{
    if(document.getElementById("exampleInputPassword1").value!=document.getElementById("exampleInputPassword2").value)
    {
alert("Passwords don't match!");
    }
    if(document.getElementById("exampleInputPassword1").value==null)
    {
alert("Password can't be null!");
    }
    else
    {
        alert(document.getElementById("nick").value.toString());
        $.post("/singup",{Nick:document.getElementById("nick").value.toString(),Password:document.getElementById("exampleInputPassword1").value.toString(),email:document.getElementById("exampleInputEmail1").value});
    }
}
function passch()
{

}
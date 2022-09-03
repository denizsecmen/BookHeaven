let check;
function sender()
{
  $.ajax({
    url: "/login",
    type:"POST",
    data:{Nick:document.getElementById('nick').value.toString()
    ,Password:document.getElementById('exampleInputPassword1').value.toString()},
    async: false, 
    success: function (data) {
      if(data.toString()=="A")
  {
    setTimeout(function(){document.location.href ="/Dashboard"},10);
    alert("Accepted");
}
else{
    alert("Rejected");
}
}
  });
/*
$.post("/login",{Nick:document.getElementById('nick').value.toString()
,Password:document.getElementById('exampleInputPassword1').value.toString()}).done(function(data,status)
{
  if(data.toString()=="A")
  {
    window.location.href="/dashboard";
    alert("Accepted");
    check=data.toString();
}
else{
    alert("Rejected");
}
})*/
}
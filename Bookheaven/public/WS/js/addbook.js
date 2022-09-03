function send()
{
    if(isNaN(document.getElementById("Number").value))
    {
        alert("Not a number!");
    }
    else
    {
        var formdata=new FormData();
        alert(document.getElementById("image").files[0]);
        formdata.append("Bookname",document.getElementById("book").value);
        formdata.append("Author",document.getElementById("auth").value);
        formdata.append("Description",document.getElementById("txt").value);
        formdata.append("Page_number",document.getElementById("Number").value);
        formdata.append("rate",$('rank').value);
        formdata.append("image",document.getElementById("image").files[0]);
        $.ajax({
            url: '/addbook',
            data: formdata,
            processData: false,
            contentType: false,
            type: 'POST',
            async:false,
            success: function(data){
              alert(data);
            }
          });
    }
}
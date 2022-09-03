function datasend(tp)
{
    var id=tp.slice(0,-7).toString();
    $.ajax(
        {
            url:"/bookpage",
            type:"POST",
            async:false,
            data:{Nickname:id},
            success:function()
            {
                alert("Success");
                location.href="/bookpage";
            }
        }
    );
}
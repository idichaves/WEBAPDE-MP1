// $('#login-button').click((e)=>{
//    e.preventDefault();
    
//    console.log("Hello");
//    location.href = "usermaincopy";
// });

$('#searchbtn').click((e)=>{

    console.log("Working");
    location.href = "search";
})
$(document).ready(()=>{
    let urlParam =  (new URL(document.location)).searchParams
    let logout  = urlParam.get('logout')

    if(logout) {
        console.log("cookie jar")
        alert("Logged out!")
    }
    $("#search").submit((e)=>{
        e.preventDefault();
       
        var input = document.getElementById('searchBox');
        var filter = input.value.toUpperCase();
            
        /*Insert redirect*/
        displayPost();
        alert(input.value);
    });
    
    $('#searchbtn').click((e)=>{

         console.log("Working");
        location.href = "search";
    })

    function displayPost() {
        var divRowMeme = document.createElement("div");
        var divTitleRow = document.createElement("div");
        var divTagRow = document.createElement("div");
        var divImageRow = document.createElement("div");
        var divImageContainer = document.createElement("div");
    
        var paragraph = document.createElement("p");
        var title = document.createElement("strong");
        var user = document.createElement("span");
        var tag = document.createElement("a");
        var image = document.createElement("img");
        var bar = document.createElement("hr");
            
        $(image).attr('src', "images/spongebob.png");
        $(image).attr('alt', "");
        $(image).addClass("img");
        
        $(tag).addClass("btn meme-hashtag");
        $(tag).attr('id', "searchTag");
        $(tag).text("AnotherTag");
            
        $(user).addClass("username");
        $(user).text("@anotherPerson");
            
        $(title).addClass("meme-title");
        $(title).text("Meme#2");
            
        $(divRowMeme).addClass("row meme");
        $(divTitleRow).addClass("row");
        $(paragraph).addClass("meme-header");
        $(divTagRow).addClass("row hashtag");
        $(divImageRow).addClass("row");
        $(divImageContainer).addClass("col img-container");
        
        $(paragraph).append(title);
        $(paragraph).append(user);
        $(divTitleRow).append(paragraph);
            
        $(divTagRow).append(tag);
            
        $(divImageContainer).append(image);
        $(divImageRow).append(divImageContainer);
            
        $(divRowMeme).append(divTitleRow);
        $(divRowMeme).append(divTagRow);
        $(divRowMeme).append(divImageRow);
        
        $("#content").append(divRowMeme);
        $("#content").append(bar);
        console.log(tag.text);
    }
});

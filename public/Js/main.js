let array = [];

var textInput = $("#commentBox");

let likeCount;

let unlikeCount;

$("#submit").click(function() {

    

    const text = textInput.val().trim();
    if (text === "") {
        return console.log("no text")
    } else {
    

    array.push(text);

    $("#comment").empty();



    console.log(array);

    for (var i = 0; i < array.length; i++) {
        let userComment = $("<div class='userComment'></div>")
        var div = $("<div>");
        var like = $("<button>");
        var unlike = $("<button>");
        like.addClass("fas fa-thumbs-up Btn");
        like.attr("id", "like");
        like.text(" Like");
        unlike.addClass("far fa-thumbs-down Btn");
        unlike.attr("id", "unlike");
        unlike.text(" Unlike");
        

        $("#comment").append(userComment)
        div.text(array[i]);
        userComment.append(div);
        userComment.append(like);
        userComment.append("<span id='L'>");
        userComment.append(unlike);
        userComment.append("<span id='U'>");
        textInput.val("");

    }
}
   
    $(".fa-thumbs-up").click(function() {
               
        if ($(this).attr("id") === "like") {
            likeCount = 0;
        $(this).text(" Liked");
        $(this).attr("id", "liked"); 
        likeCount++;
        let c = $(this).parent();
        c = c.children()[2].innerHTML = likeCount
        console.log(c)
        console.log("like " + likeCount)

    } else if ($(this).attr("id") === "liked") {
        likeCount = 1;
        $(this).text(" Like");
        $(this).attr("id", "like");
        likeCount--;
        let a = $(this).parent();
        a = a.children()[2].innerHTML = ""
        console.log(a)
        console.log("like " + likeCount)
    }
       
    });

    $(".fa-thumbs-down").click(function() {
        if ($(this).attr("id") === "unlike") {
            unlikeCount = 0;
            $(this).text(" Unliked") 
            $(this).attr("id", "unliked") 
            unlikeCount++;
            let b = $(this).parent();
            b = b.children()[4].innerHTML = unlikeCount
            console.log(b)

            console.log("unlike " + unlikeCount)


        // console.log("unlike " + unlikeCount)
    } else if ($(this).attr("id") === "unliked") {
            unlikeCount = 1;
                $(this).text(" Unlike")
                $(this).attr("id", "unlike")
                unlikeCount--;
                let d = $(this).parent();
                d = d.children()[4].innerHTML = ""
                console.log(d)
                console.log("unlike " + unlikeCount)
    }

})
    
});
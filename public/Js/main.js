
// $(document).ready(function() {

//     var showImage;

// const images = ["https://i.chzbgr.com/full/9270181888/h52869344/", "https://i.chzbgr.com/full/9192060672/h9648CC01/", "https://i.chzbgr.com/full/9213666304/h41174019/"]

// let count = 0;
// function displayImage() {
// $(img).html("<src=" + images[count])
// }

// function nextImage() {
//     count++;

//     setTimeout(displayImage, 1000)

//     if (count === images.length) {
//         count = 0;
//     }
// }

// function startSlideshow() {
//     displayImage()
//     showImage = setInterval(nextImage, 3000);
//     console.log("TESTING: ", showImage)
// }

// // displayImage();
// startSlideshow();

// });


















// $(document).ready(function() {

//     const postContainer = $(".post-container");

//     const postCategorySelect = $("#category");

    // const textInput = $("#commentBox");
//     const pacForm = $("#pac");

//     $(pacForm).on("submit", handleFormSubmit);
//     const url = window.location.search;
//     let postId;
//     let userId;

//     updating = false;

//     function handleFormSubmit(event) {
//         console.log("clicked")

        
//         event.preventDefault()
//         if(!textInput.val().trim()) {
//             return;
//         }
//         const newPost = {body: textInput.val().trim()}

//         if (updating) {
//             newPost.id = postId;
//             updatePost(newPost);
//         }
//         else {
//             submitPost(newPost);
//         }
//     }

//    function submitPost(post) {
//        $.post("/api/posts", post, function() {
//            window.location.href = "/"
//        });
//    }

//    function updatePost(post) {
//        $.ajax({
//            method: "PUT",
//            url: "/api/posts",
//            data: post
//        })
//        .then(function() {
//            window.location.href - "/dashboard"
//        })
//    }
// });

// let array = [];


// let likeCount;

// let unlikeCount;

// $("#submit").click(function(event) {

//     event.preventDefault();

//     const text = textInput.val().trim();
//     if (text === "") {
//         return console.log("no text")
//     } else {
    

//     array.push(text);

//     $("#comment").empty();



//     console.log(array);

//     for (var i = 0; i < array.length; i++) {
//         let userComment = $("<div class='userComment'></div>")
//         var div = $("<div>");
//         var like = $("<button>");
//         var unlike = $("<button>");
//         like.addClass("fas fa-thumbs-up Btn");
//         like.attr("id", "like");
//         like.text(" Like");
//         unlike.addClass("far fa-thumbs-down Btn");
//         unlike.attr("id", "unlike");
//         unlike.text(" Unlike");
        

//         $("#comment").prepend(userComment)
//         div.text(array[i]);
//         userComment.prepend(div);
//         userComment.prepend(like);
//         userComment.prepend("<span id='L'>");
//         userComment.prepend(unlike);
//         userComment.prepend("<span id='U'>");
//         textInput.val("");

//     }
// }
   
//     $(".fa-thumbs-up").click(function() {
               
//         if ($(this).attr("id") === "like") {
//             likeCount = 0;
//         $(this).text(" Liked");
//         $(this).attr("id", "liked"); 
//         likeCount++;
//         let c = $(this).parent();
//         c = c.children()[2].innerHTML = likeCount
//         console.log(c)
//         console.log("like " + likeCount)

//     } else if ($(this).attr("id") === "liked") {
//         likeCount = 1;
//         $(this).text(" Like");
//         $(this).attr("id", "like");
//         likeCount--;
//         let a = $(this).parent();
//         a = a.children()[2].innerHTML = ""
//         console.log(a)
//         console.log("like " + likeCount)
//     }
       
//     });

//     $(".fa-thumbs-down").click(function() {
//         if ($(this).attr("id") === "unlike") {
//             unlikeCount = 0;
//             $(this).text(" Unliked") 
//             $(this).attr("id", "unliked") 
//             unlikeCount++;
//             let b = $(this).parent();
//             b = b.children()[4].innerHTML = unlikeCount
//             console.log(b)

//             console.log("unlike " + unlikeCount)


//         // console.log("unlike " + unlikeCount)
//     } else if ($(this).attr("id") === "unliked") {
//             unlikeCount = 1;
//                 $(this).text(" Unlike")
//                 $(this).attr("id", "unlike")
//                 unlikeCount--;
//                 let d = $(this).parent();
//                 d = d.children()[4].innerHTML = ""
//                 console.log(d)
//                 console.log("unlike " + unlikeCount)
//     }

// })
    
// }); 
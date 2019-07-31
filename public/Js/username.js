$(document).ready(function () {

const title = $("#title");
const textInput = $("#commentBox");
let url = window.location.search;
let userId;
const postId = url.split("=")[1]

$("#postForm").on("submit", handlePost)

        

      function postUsername() {
          $.get("/api/home", function(data) {

  
    title.html("Welcome, " + data.username )

                  console.log("THIS IS DATA: ", data);
                 })
        }

function handlePost(event) { 
        event.preventDefault();
if (!textInput.val().trim()) {
        return;
}


var newPost = {

        body: textInput.val().trim(),
        
        userId: postId
}

submitPost(newPost);


}
function submitPost(post) {

         
        $.post("/api/home/" + postId, post, function() {
                post = post.body

                $("#comment").html(post)
                console.log("submitPost", post)
        })
} 
});
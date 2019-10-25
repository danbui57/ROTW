$(document).ready(function () {

        const title = $("#title");
        const textInput = $("#commentBox");
        let url = window.location.search;
        let userId;
        const postId = url.split("=")[1];
        let posts;
        const postBox = $(".post-container");
        // const postCategorySelect = $("#category");

        $("#postForm").on("submit", handlePost)
        $(document).on("click", "button.delete", handlePostDelete)

        postUsername();

        if (url.indexOf("?user_id=") !== 1) {
                userId = url.split("=")[1];
                getPosts(userId);
                // console.log("userId: ", userId)
        }
        else {
                getPosts();
        }

        function getPosts(user) {
 
                userId = user || "";
                if (userId) {
                        userId = "/?user_id=" + userId;
                        console.log(userId)
                }

                $.get("/api/post" + userId, function (data) {
                        console.log("POSTING!: ", data)
                        posts = data.sort((a, b) => (a.id < b.id) ? 1:-1);
                        
                        if (!posts || !posts.length) {
                                displayEmpty(user)
                        }
                        else {
                                
                                console.log("POSTS: ", posts)
                                initializeRows();
                        }
                });
        }

        function deletePost(id) {
$.ajax({
        method: "DELETE",
        url: "/api/post/" + id
}).then(function() { 
        getPosts(id);
        console.log("DELETE METHOD: Successful");
}); 
        }

        function initializeRows() {
                
                let postsToAdd = [];

                for (var i = 0; i < posts.length; i++) {
                        postBox.empty()
                        
                        postsToAdd.push(createNewRow(posts[i]));
                }
                postBox.append(postsToAdd)
                

        }

        function createNewRow(post) {
                
                // console.log(post.user.username + " , " + $("#user").val())
                let formattedDate = new Date(post.createdAt);
                formattedDate = moment(formattedDate).format("MMM Do YYYY, h:mm:ss a");
                const newPostCard = $("<div>");
                newPostCard.addClass("card");
                const newPostCardHeading = $("<div>");
                newPostCardHeading.addClass("card-header");
                const deleteBtn = $("<button>");
                
                
                const voteBtn = $("<button>");
                voteBtn.text("VOTE")
                voteBtn.addClass("vote btn btn-info");
                const newPostTitle = $("<h2>");
                const newPostDate = $("<small>");
                const newPostCardBody = $("<div>");
                newPostCardBody.addClass("card-body");
                const newPostBody = $("<p>");
                // console.log("post.user= " + post.user)
                newPostTitle.attr("value", post.user.username)
                newPostTitle.text(post.user.username + " ");
                newPostBody.text(post.body);
                newPostDate.text(formattedDate);
                newPostTitle.append(newPostDate);
                newPostCardHeading.append(voteBtn);
                newPostCardHeading.append(newPostTitle);
                newPostCardBody.append(newPostBody);
                newPostCard.append(newPostCardHeading);
                newPostCard.append(newPostCardBody);
                newPostCard.data("post", post);
                const user = title.attr("value");
                if (user == post.user.username) {
                        deleteBtn.text("x");
                        deleteBtn.addClass("delete btn btn-danger");
                        newPostCardHeading.append(deleteBtn);                }
                // console.log(post.user.username + " , " + user)
                return newPostCard;
        }

        function postUsername() {
                $.get("/api/home", function (data) {


                        title.html("Welcome, " + data.username)
                        title.attr("value", data.username)
                        console.log("THIS IS DATA: ", data);
                })
        }

        function handlePost(event) {
                event.preventDefault();
                if (!textInput.val().trim()) {
                        return;
                }


                let newPost = {

                        body: textInput.val().trim(),

                        userId: postId
                }

                submitPost(newPost);


        }
        function submitPost(post) {


                $.post("/api/home/" + postId, post, function () {
                        post = post.body

                        $("#comment").html("<h1>" + post + "</h1>")
                        getPosts();
                        console.log("submitPost", post)
                })
        }

        function handlePostDelete() {
                let currentPost = $(this).parent().parent().data("post");
                
                deletePost(currentPost.id);
        }

        function displayEmpty(id) {
                const query = window.location.search;
                let partial = "";
                if (id) {
                        partial = " for User #" + id;
                }
                postBox.empty();
                const messageH2 = $("<h2>");
                messageH2.css({ "text-align": "center", "margin-top": "50px" });
                messageH2.html("No posts yet" + partial + ", navigate <a href='/cms" + query +
                        "'>here</a> in order to get started.");
                postBox.append(messageH2);
        }

});


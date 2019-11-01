$(document).ready(function () {

        const Title = $("#title");
        const TextInput = $("#commentBox");
        let url = window.location.search;
        let userId;
        const UserId = url.split("=")[1];
        let posts;
        const PostBox = $(".post-container");
        // let Vote = 1;
        let route;
        // const postCategorySelect = $("#category");

        $("#postForm").on("submit", handlePost)
        $(document).on("click", "button.delete", handlePostDelete)
        $(document).on("click", "button.vote", handlePostVote)

        postUsername();

        if (url.indexOf("?user_id=") !== 1) {
                // userId = UserId 
                getPosts(UserId);
                // console.log("userId: ", userId)
        }
        else {
                getPosts();
        }
        function getPosts(user) {
 
                // userId = user || "";
                // if (userId) {
                //         userId = "/?user_id=" + userId;
                console.log(UserId)
                // }

                $.get("/api/post/", function (data) {
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
        getPosts(UserId);
        console.log("DELETE METHOD: Successful");
}); 
}

        function initializeRows() {
                
                let postsToAdd = [];
                
                for (var i = 0; i < posts.length; i++) {
                        PostBox.empty()
                        
                        postsToAdd.push(createNewRow(posts[i]));
                }
                PostBox.append(postsToAdd)
                

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
                const user = Title.attr("value");
                if(user !== post.user.username) {
                $.get("/api/vote/" + post.id, function(data) {
                        console.log("VOTE " + data);
                        voteBtn.text("VOTE " + data)
                        voteBtn.addClass("vote btn btn-info");
                        newPostCardHeading.append(voteBtn);
                                            
                   })
                }
                
                const newPostTitle = $("<h2>");
                const newPostDate = $("<small>");
                const newPostCardBody = $("<div>");
                newPostCardBody.addClass("card-body");
                const newPostBody = $("<p>");
                console.log("post",post.id)
                newPostTitle.attr("value", post.user.username) 
                newPostTitle.text(post.user.username + " ");
                newPostBody.text(post.body);
                newPostDate.text(formattedDate);
                newPostTitle.append(newPostDate);
                newPostCardHeading.append(newPostTitle);
                newPostCardBody.append(newPostBody);
                newPostCard.append(newPostCardHeading);
                newPostCard.append(newPostCardBody);
                newPostCard.data("post", post);
                if (user == post.user.username) {
                        deleteBtn.text("x");
                        deleteBtn.addClass("delete btn btn-danger");
                        newPostCardHeading.append(deleteBtn);                
                }
                // console.log(post.user.username + " , " + user)
                return newPostCard;
        }

        function postUsername() {
                $.get("/api/home/", function (data) {

                        Title.html("Welcome, " + data.username)
                        Title.attr("value", data.username)
                        console.log("THIS IS DATA: ", data);
                })
        }

        function handlePostVote() {

                let currentPost = $(this).parent().parent().data("post");
                let currentVotes = $(this);
              
                console.log("current votes: ",currentVotes)
                
                let newVote = {

                        vote: 1,

                        postId: currentPost.id,

                        voterId: UserId
                }

                $.get("/api/post/" + UserId, function(data) {
                        console.log("DATA: ",currentPost.id, newVote.postId)
                        let voteRoute = data.find(function(datas) {
                                return datas.postId === newVote.postId
                        });
                        
                                console.log(voteRoute);

                        route = (voteRoute) ?  deleteVote(voteRoute.id) : postVote(newVote);
                })
                
             }

             function deleteVote(id) {
                $.ajax({
                        method: "DELETE",
                        url: "/api/vote/" + id
                }).then(function() {
                        getPosts(UserId)
                        console.log("DELETE METHOD: Successful");
                }); 

                
             }

             function postVote(vBody) {
                $.post("/api/post/" + vBody.postId, vBody, function() {
                 
                getPosts(UserId)
                                            
                   })
        } 
   

   

//    function handleVotes() {
//            $.get("api/vote/", function(data) {
//                 console.log(data)
                   
//            })
//    }

        function handlePost(event) {
                event.preventDefault();
                if (!TextInput.val().trim()) {
                        return;
                }
                let newPost = {
                        
                        body: TextInput.val().trim(),

                        userId: UserId
                }
                
                submitPost(newPost);
                TextInput.val("");
        }
        
        function submitPost(post) {
                $.post("/api/home/" + UserId, post, function () {
                        
                        // $("#comment").html("<h1>" + post + "</h1>")
                        getPosts(UserId);
                        console.log("submitPost", post.userId)
                        
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
                PostBox.empty();
                const messageH2 = $("<h2>");
                messageH2.css({ "text-align": "center", "margin-top": "50px" });
                messageH2.html("No posts yet" + partial + ", navigate <a href='/cms" + query +
                        "'>here</a> in order to get started.");
                PostBox.append(messageH2);
        }

});
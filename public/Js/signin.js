$(document).ready(function () {



// $("#userForm").on("submit", redirect);

// let url = window.location

                $.get("/api/signin", function (data) {

                        url.href = "dashboard/?user_id=" + data.id
                        title.html("Welcome, " + data.username)

                        console.log("THIS IS DATA: ", data)

                })
        
});
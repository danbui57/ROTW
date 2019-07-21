$(document).ready(function() {

        postUsername();
     
      function postUsername() {
          $.get("/api/dashboard", function(data) {
  $("#Title").html("Welcome, " + data.username )
                  console.log("THIS IS DATA: ", data)
                 })
        }



});


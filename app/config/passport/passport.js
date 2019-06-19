const bCrypt = require("bcrypt");

module.exports = function (passport, user) {
    const User = user;
    const LocalStrategy = require("passport-local").Strategy;

    passport.use("local-signup", new LocalStrategy(

        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true, //allows us to pass back the entire request to the callback
            session: false
        },
        function (req, email, password, done) {

            const generateHash = function (password) {

                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

           
            User.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {
                
                if (user) {
                    console.log("that email is already taken:", password)
                    return done(null, false, {

                        message: "That email is already taken"
                    });
                
                } else {
                    const userPassword = generateHash(password);
                    const data =

                    {
                        email: email,
                        password: userPassword,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        username: req.body.username
                    };
                  

                    User.create(data).then(function (newUser, created) {

                        if (!newUser) {
                                console.log("not a new user:", email)
                            return done(null, false);
                        }
                        if (newUser) {
                                console.log("created new user", newUser.email, newUser.username, newUser.password)
                                
                            return done(null, newUser)

                        }
                    });
                }
            });
        }
    ));

    //Serealize
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    //deserialize user
    passport.deserializeUser(function (id, done) {

        User.findByPk(id)
        
        .then(function (user) {

            if (user) {

                done(null, user.get());

            } else {

                done(user.errors, null);
            }

        });

    });

    passport.use("local-signin", new LocalStrategy(
        
        {
        //by default, local strategy uses username and password, we will override with email
    
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    
    
    function (req, email, password, done) {
        const User = user;
         
       
        const isValidPassword = function (userPassword, password) {
            
            return bCrypt.compareSync(password, userPassword);
            
            
        }
        User.findOne({
            where: {
                email: email           
            }

        }).then(function (user) {
            if (!user) {
                
                return done(null, false, console.log("email does not exist"));
            }
            if (!isValidPassword(user.password, password)) {
            
                return done(null, false, console.log("Incorrect password"))
            }
            const userinfo = user.get();
            return done(null, userinfo, console.log("USERINFO:", userinfo));

        }).catch(function (err) {
            console.log("ERROR:", err);
        
            return done(null, false, console.log("Something went wrong with your signin", user ));
        });

      }
    ));
    
}
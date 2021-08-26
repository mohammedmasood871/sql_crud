
    var LocalStrategy = require('passport-local').Strategy;

    var loginService = require('../routes/loginService')
    

module.exports = function (passport) {

    

        passport.use(new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            async (req, email, password, done) => {
                try {
                    await loginService.findUserByEmail(email).then(async (user) => {
                        if (!user) {
                            return done(null, false, req.flash("errors", `This user email "${email}" doesn't exist`));
                        }
                        if (user) {
                            let match = await loginService.comparePassword(password, user);
                            if (match === true) {
                                return done(null, user, null)
                            } else {
                                return done(null, false, req.flash("errors", match)
                                )
                            }
                        }
                    });
                } catch (err) {
                    console.log(err);
                    return done(null, false, { message: err });
                }
            }));
    
            passport.serializeUser(function(user, done) {
                done(null, user);
              });
              
              passport.deserializeUser(function(user, done) {
                done(null, user);
              });
              
};
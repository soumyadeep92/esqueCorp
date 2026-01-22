const passport = require("passport");
const passportJWT = require("passport-jwt");
const AuthService=require("../services/AuthService");
const bcrypt=require("bcrypt")

const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    function (email, password, cb) {
        return AuthService.findUserByEmail(email, password)
           .then(user => {
               const comparePass=bcrypt.compare(password,user.password)
               if (!user || !comparePass) {
                   return cb(null, false, {message: 'Incorrect email or password.'});
               }
               return cb(null, user, {message: 'Logged In Successfully'});
          })
          .catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : `${process.env.jwt_secret}`
    },
    function (jwtPayload, cb) {

        return AuthService.findOneUser(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));

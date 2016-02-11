var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var findOrCreate = require('mongoose-findorcreate');
var mongoose = require('mongoose');

module.exports = function(){
    
    var Usuario = mongoose.model('Usuario');
    
    passport.use(new GitHubStrategy({
        clientID: 'e4ab3121f5eb39d36ae5',
        clientSecret: '4ea18a8b34e960a41b7bec90af0b1d31b590f71f',
        callbackURL: 'http://localhost:3000/auth/github/callback'    
        },function(accessToken, refreshToken, profile, done){
            Usuario.findOrCreate(
                {"login": profile.username},
                {"nome": profile.username},
                function(erro, usuario){
                    if(erro){
                        console.log(erro);
                        return done(erro);
                    }
                    return done(null, usuario);
                }
            );
    }));  
    
    /*
        Chamado uma unica vez no login do usuario.
    */
    passport.serializeUser(function(usuario, done){
        done(null, usuario._id);
    });
    
    /*
        chama a cada requisicao, recebendo o objectId do usuario armazenado na sessao 
    */
    
    passport.deserializeUser(function(id, done){
        Usuario.findById(id).exec()
        .then(function(usuario){
           done(null, usuario);
        });
    });
    
};
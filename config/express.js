var express = require("express");
var load = require("express-load");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var passport = require("passport");
var helmet = require("helmet");

module.exports = function(){
  var app = express();
   
  // configuração de ambiente
  app.set("port", 3000);
  
  //middleware
  app.use(express.static("./public"));
  app.set("view engine", "ejs");
  app.set("views", "./app/views");
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(require("method-override")());
  
  //configurações para autenticação
  app.use(cookieParser());
  app.use(session(
      {
          secret: "homem avestruz",
          resave: true,
          saveUninitialized: true
      }
  ));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(helmet());
  app.use(helmet.xframe());
  app.use(helmet.xssFilter());
  app.use(helmet.nosniff());
  app.disable("x-powered-by");
  
  //Função global que é utilizada para verficar se o usuário está autenticado
  app.verificaAutenticacao = function verificaAutenticacao(req, res, next){
        if(req.isAuthenticated()){
            return next();
        } else {
            res.status("401").json("Não autorizado");
        }
  }
  
  //carregamento dos módulos
  load("models", {cwd: "app"})
    .then("controllers")
    .then('routes/auth.js')
    .then("routes")
    .into(app);
    
  app.get('*', function(req, res) {
     res.status(404).render('404');
  });    
  
  return app;  
};
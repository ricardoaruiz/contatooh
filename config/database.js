var mongoose = require("mongoose");

module.exports = function(uri){
    mongoose.connect(uri, { server : { poolSize : 2 }});
    mongoose.set("debug",true);
    
    mongoose.connection.on("connected", 
        function(){
            console.log("Mongoose! conectado em " + uri);
        }
    );
    
    mongoose.connection.on("disconnected", 
        function(){
            console.log("Mongoose! Desconectado de " + uri);
        }
    );
    
    mongoose.connection.on("error",
        function(erro){
            console.log("Mongoose! Erro na conexão: " + erro);
        }
    );
    
    process.on("SIGINT",
        function(){
            mongoose.connection.close(
                function(){
                    console.log("Mongoose! Desconectado pelo término da apliação");
                    process.exit(0);
                }
            );
        }
    );
}
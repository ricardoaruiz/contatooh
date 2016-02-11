module.exports = function(app){
  var controller = app.controllers.contato;
  
  app.route("/contatos")
    .get(app.verificaAutenticacao, controller.listaContatos)
    .post(app.verificaAutenticacao, controller.salvaContato);
    
  app.route("/contatos/:id")
    .get(app.verificaAutenticacao, controller.obtemContato)
    .delete(app.verificaAutenticacao, controller.removeContato);
};
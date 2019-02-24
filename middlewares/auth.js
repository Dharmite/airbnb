/* 
isLoggedIn vai servir de middleware --> função que vai ser passada no middleware da secret page. O express irá passar automaticamente o req, res e next para a as funções middleware. Todos os middlwares tem de ter estes parametros e podemos criar quantos middlewares quisermos
É uma sequência de varias funções intermédia, entreb o pedido e a resposta HTTP
*/

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    // next() em node js que dizer continua para o próxima etapa
    // que neste caso é a callback funcion da route do secret
    return next();
  }

  // res.redirect("/");
  res.send("You have to login to access this page");
};

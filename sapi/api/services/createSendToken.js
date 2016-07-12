/**
 * Created by dcorde on 29.06.2016.
 */
var jwt = require('jwt-simple');

module.exports = function(user, res) {
  var payload = {
    sub: user.id
  };
  var token = jwt.encode(payload, "shhh..");

  res.status(200).send({
    user: user.toJSON(),
    token: token
  });
};

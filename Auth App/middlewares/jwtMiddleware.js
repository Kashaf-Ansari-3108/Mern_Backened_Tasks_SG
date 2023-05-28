const jwt = require('jsonwebtoken');

const jwtAuthorization = {
  sign(payload){
    const token = jwt.sign(payload,process.env.secret_key);
    return token
  }
  
  
}
module.exports = jwtAuthorization;
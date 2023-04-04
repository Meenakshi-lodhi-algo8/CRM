const jwt = require('jsonwebtoken')

var jwt_refresh = 'e24417ffae2ab2160ba6710cb629a135ae9aa677559565f70bf767ccb36c27302459fcb871219ead99ed2e1c291e36d5e418c04350c3a14fbe2c7ebac11c0625'
var secret = '0242ac120002'
// JWT generation
const generateToken = (id) => {
    return jwt.sign({ id }, secret, {
      expiresIn: "1d",
    });
};
  
const generaterefreshToken = (id) => {
    return jwt.sign({ id }, jwt_refresh, {
        expiresIn: "1d",
    });
};
  
const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, jwt_refresh, (err, payload) => {
        if (err) return reject(err);
        const userId = payload.id;
        resolve(userId);
        });
    });
};


module.exports = { generateToken, generaterefreshToken, verifyRefreshToken }
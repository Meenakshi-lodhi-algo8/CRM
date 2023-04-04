const generator = require('generate-password');

function generateRandomPassword() {
    // var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    // var passwordLength = 10;
    // var password = "";
  
    // for (var i = 0; i < passwordLength; i++) {
    //   var randomNumber = Math.floor(Math.random() * chars.length);
    //   password += chars.substring(randomNumber, randomNumber + 1);
    // }
    var password = generator.generate({
      length : 10,
      numbers: true,
      symbols: true
    });
    //console.log(password);
    return password;
}

//generateRandomPassword()

module.exports = generateRandomPassword;
  
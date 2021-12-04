"use strict";
var userInput;
var userName;
userInput = 5;
userInput = 'Text';
userInput = true;
// userName = userInput;
if (typeof userInput === 'string') {
    userName = userInput;
}
function generateError(message, code) {
    throw { message: message, errorCode: code };
    // while (true) {}
}
generateError('An error occured!', 500);

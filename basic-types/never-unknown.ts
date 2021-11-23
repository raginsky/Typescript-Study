let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Text';
userInput = true;
// userName = userInput;

if(typeof userInput === 'string') {
    userName = userInput;
}

function generateError(message: string, code: number): never {
    throw {message: message, errorCode: code};
    // while (true) {}
}

generateError('An error occured!', 500);
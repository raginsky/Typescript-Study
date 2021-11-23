const button = document.querySelector('button')!;

function clickHandle(msg: string) {
    console.log('Click!' + msg);
}

if (button) {
    button.addEventListener('click', clickHandle.bind(null, 'Correct string'));
}
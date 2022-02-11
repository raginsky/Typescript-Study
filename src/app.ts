const form = document.querySelector('form')!;
// const addressInput = document.getElementById('address')! as HTMLInputElement;

const googleAPIKey = process.env.GOOGLE_API;
console.log(googleAPIKey)

function searchAddressHandler(event: Event) {
    event.preventDefault();
    // const enteredAddress = addressInput.value;

    /** Send to Google API */
}

form.addEventListener('submit', searchAddressHandler);
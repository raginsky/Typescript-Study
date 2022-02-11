import axios from "axios";

const googleAPIKey = process.env.GOOGLE_API;
const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

type GoogleGeocodingResponse = {
    results: { geometry: { location: { lat: number, lng: number } } }[];
    status: 'OK' | 'ZERO_RESULTS';
};

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = encodeURI(addressInput.value);

    /** Send to Google API */
    axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${enteredAddress}&key=${googleAPIKey}`)
        .then(response => {
            if (response.data.status !== 'OK') {
                throw new Error('Could not fetch location');
            }
            const coordinates = response.data.results[0].geometry.location;
            const map = new google.maps.Map(document.getElementById('map')!, {
                center: coordinates,
                zoom: 16
            })
            new google.maps.Marker({position: coordinates, map: map});
        }).catch(err => {
        alert(err.message);
        console.log(err);
    });
}

form.addEventListener('submit', searchAddressHandler);
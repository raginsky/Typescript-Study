let logged;

function sendAnalytics(data: string) {
    console.log(data); // requires data type assigment
    logged = true;
    console.log(logged); // will be boolean, no require type assigment
}

sendAnalytics('Data');
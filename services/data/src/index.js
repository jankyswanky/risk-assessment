import * as lib from "./lib";

function respond (statusCode, result) {
    return {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*"
        },
        statusCode,
        body: JSON.stringify(result)
    };
}

export function handler (event, context, callback) {

    const data = JSON.parse(event.body);

    lib
        .reflect(data)
        .then(result => respond(200, result))
        .catch(error => respond(500, error.toString()))
}

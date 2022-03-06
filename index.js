const http = require("http");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

//google consts
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = ['https://spreadsheets.google.com/feeds',
    'https://www.googleapis.com/auth/drive'];

const host = 'localhost';
const port = 8000;
const RANGE = 'Sheet1';

const base_url = "https://e494-2405-201-1006-a292-40c2-d278-7de9-8f6b.ngrok.io";

const google_auth_url = "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fspreadsheets&response_type=code&client_id=183283845671-bv8g9d6ejlt6f5d8fb073u48589edag0.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fe494-2405-201-1006-a292-40c2-d278-7de9-8f6b.ngrok.io";

let uuid;

var credentials_read = fs.readFileSync("credentials.json");
var credentials_json = JSON.parse(credentials_read);

const { client_secret, client_id, redirect_uris } = credentials_json.installed;
const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);


const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    var expression = '^\/webhook\/';
    var regex = new RegExp(expression);
    if (req.url == "/POST_Generate_URL") //post request from google sheets for URL generation
    {
        res.writeHead(200);
        //generate URL
        //pass the request body -> access token + shop name
        // console.log(req);
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            // console.log(JSON.parse(data).password);  
            // console.log(data);
            uuid = generateUUID(data);
            let url = base_url + "/webhook/" + uuid;



            res.end(url); // insert the shopify webhook url            
        })
        // console.log(data);
    }
    else if (req.url.match(regex)) {
        res.writeHead(200);
        let urlSplitArray = req.url.split('/');
        var uuid_rcvd = urlSplitArray.pop() || urlSplitArray.pop(); //handling potetntial trailing '/'

        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            // console.log(JSON.parse(data).password); 
            console.log(data);
            let searchString = searchInMap(uuid_rcvd); //search uuid

            let token = searchString.google_token;
            let cred_rcvd = searchString.credentials;

            let spreadsheet_id = cred_rcvd.split('$')[2];

            oAuth2Client.setCredentials(token);

            const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });

            saveDataAndSendResponse(JSON.parse(data), sheets, spreadsheet_id);

            res.end(data); // insert the url here             
        })




        //handle negative case of search string

        // let data = dataParser(req); //used to write

        // res.end(searchString); //return search
    }
    else if (req.url.split('?')[0] == '/') {
        // console.log(req);
        res.writeHead(200);
        let a = req.url.split('?')[1];
        let b = a.split('&')[0];
        let c = b.split('=')[1];
        let code_extracted = c;
        console.log(code_extracted);
        let token_string_user = tokenGenerator(oAuth2Client, code_extracted)
        res.end(token_string_user);
        res.end();

    }
    else {
        res.writeHead(404);
        console.log(req.url);
        res.end(JSON.stringify({ error: "Resource not found" }));
    }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {

    console.log(`Server is running on http://${host}:${port}`);
});

const generateUUID = function (data) {
    console.log(data);
    let shop_name = JSON.parse(data).shop_name;
    let access_token = JSON.parse(data).access_token;
    let spreadsheet_id = JSON.parse(data).spreadsheet_id;
    let google_token_rcvd = JSON.parse(data).token_r;
    let google_token_rcvd_parsed = JSON.parse(google_token_rcvd);

    const myString = shop_name + "$" + access_token + "$" + spreadsheet_id;

    const uuid = uuidv4();

    // Storing the JSON format data in myObject
    var old_json = fs.readFileSync("map.json");
    var myObject = JSON.parse(old_json);

    // Defining new data to be added
    let newData = {
        uuid: uuid,
        credentials: myString,
        google_token: google_token_rcvd_parsed
    };
    // console.log(newData);
    // Adding the new data to our object
    myObject.users.push(newData);

    // Writing to our JSON file
    var newData2 = JSON.stringify(myObject);
    fs.writeFile("map.json", newData2, (err) => {
        // Error checking
        if (err) throw err;
        // console.log("New data added");
    });

    return uuid;
}

// const dataParser = function (req) {
//     let data = '';
//     req.on('data', chunk => {
//         data += chunk;
//     })
//     req.on('end', () => {
//         console.log(JSON.parse(data).password);                 
//     })
//     console.log(data);
//     return data;
// }

const searchInMap = function (uuid_rcvd) {
    var old_json = fs.readFileSync("map.json");
    var myObject = JSON.parse(old_json);

    for (let i = 0; i < myObject.users.length; i++) {
        if (myObject.users[i].uuid == uuid_rcvd) {
            return { credentials: myObject.users[i].credentials, google_token: myObject.users[i].google_token };
        }
    }
    return "Not found";
}


function tokenGenerator(oAuth2Client, code) {
    const fs = require('fs');
    const { google } = require('googleapis');

    // If modifying these scopes, delete token.json.
    const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
    const TOKEN_PATH = 'token.json';


    oAuth2Client.getToken(code, (err, token) => {
        // if (err) return console.error('Error while trying to retrieve access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) console.error(err);
            console.log('Token stored to', TOKEN_PATH);
        });
    });
    var token_json = fs.readFileSync(TOKEN_PATH);
    // var string_token_json = JSON.stringify(old_json);

    return token_json;

}




function saveDataAndSendResponse(data, googleSheetsObj, spreadsheet_id) {

    let order_id = data.id;
    let admin_graphql_apiID = data.admin_graphql_api_id;
    let appID = data.app_id;
    let checkoutID = data.checkout_id;
    let createdAt = data.created_at;
    let currencyP = data.currency;
    let current_subtotalPrice = data.current_subtotal_price;

    let data_array = [[order_id, createdAt, currencyP, current_subtotalPrice, admin_graphql_apiID, appID, checkoutID]];

    let resource = {
        values: data_array,
    };
    googleSheetsObj.spreadsheets.values.append({
        spreadsheetId: spreadsheet_id,
        range: RANGE,
        valueInputOption: 'RAW',
        resource,
    }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            const responseText = `${result.data.updates.updatedCells} cells appended.`;
            console.log(responseText);
        }
    });

}

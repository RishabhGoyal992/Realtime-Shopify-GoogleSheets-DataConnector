# Realtime-Shopify-GoogleSheets-DataConnector
A microservice which acts as a Real-Time Data-Connector between Shopify Orders Data & Google Sheet.

## Working Demo


https://user-images.githubusercontent.com/35079024/156915810-d69cb5d9-f7db-45b4-98eb-26fdc3d29192.mp4



## Setting up:
1. Clone the repository
2. Run `npm install`
3. Go to the [documentation](https://developers.google.com/apps-script/api/quickstart/nodejs) and follow the steps to turn on the Google Sheets API. Save the resulting `credentials.json` file in your project root. (Note- In the credentials.json, please change the "web" key to "installed" key)
4. Tunnel it using ngrok application-> `ngrok http 8000`
5. Embed the ngrok URL in the `index.js` file.
6. Run  `node index.js` to get the microservice server started.

## Setting up Google Sheets:
1. Open the spreadsheet in which you desire to reflect Real-Time Data. 
2. Go to Extentions->App Script
3. Make 3 files in the app script-> Code.gs, Add-On.html, URL_Board_Display.html
4. Paste the respective codes from this repository in the above files.
5. Run the Script.
6. Click on Custom Menu->Show-Sidebar![image](https://user-images.githubusercontent.com/35079024/156897797-0157941d-611c-44da-9844-e6084cf9de5e.png)
7. An add-on will appear on the right hand side-> ![image](https://user-images.githubusercontent.com/35079024/156897868-92ad0b49-63f3-46c6-a26c-8b9881d79112.png)
8. Follow the steps in chronological-order to achive authorization + shopify user credentials registration
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -> First Click on "Click here to Authorize your Google Account" 
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -> Select your email id to authorize with this service. ![image](https://user-images.githubusercontent.com/35079024/156916371-87de38d1-b2ec-4f7a-990b-b9cc1cb33f90.png)
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -> You will be given an access_token. Select ALL and copy it. ![image](https://user-images.githubusercontent.com/35079024/156898115-3b21be18-38ad-409c-afcd-218b2269ecc1.png)
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-> Go back to google-sheets, enter your shop-name and paste the previously copied Token fully in the Token section. ![image](https://user-images.githubusercontent.com/35079024/156898140-475bcf09-ec9f-4add-b33c-4fa6af0b4e7c.png)
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -> Click on submit.

## Setting up Shopify:
1. You will be greeted with a URL. ![image](https://user-images.githubusercontent.com/35079024/156898153-77f0d3f7-251a-48f4-878f-331b09463bfa.png)
2. Copy it and paste it in the Webhook section of Shopify. With followin configurations-> Event- Order Creation, Format-> JSON, Webhook API Version-> 2022-01 (Latest) ![image](https://user-images.githubusercontent.com/35079024/156898193-fa7f984c-0cc6-4ccc-afd7-e4e9bca2e695.png)
3. Click on Save, and you are GOOG TO GO!

### Fire up some test-orders and you will see all your orders getting updated instantly on the Google Sheets, Realtime, Dynamically wihtout Refreshing the Browser.
![image](https://user-images.githubusercontent.com/35079024/156898281-2d1f923f-fb8f-4b7f-b185-25a0aff4e22c.png)

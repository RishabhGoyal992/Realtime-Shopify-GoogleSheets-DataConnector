# Realtime-Shopify-GoogleSheets-DataConnector
A microservice which acts as a Real-Time Data-Connector between Shopify Orders Data & Google Sheet.

## Setting up:
1. Clone the repository
2. Run `npm install`
3. Go to the documentation and follow the steps to turn on the Google Sheets API. Save the resulting `credentials.json` file in your project root.
4. Run  `node index.js` to get the microservice server started.
5. Tunnel it using ngrok application-> `ngrok http 8000`

## Setting up Google Sheets:
1. Open the spreadsheet in which you desire to reflect Real-Time Data. 
2. Go to Extentions->App Script
3. Make 3 files in the app script-> Code.gs, Add-On.html, URL_Board_Display.html
4. Paste the respective codes from this repository in the above files.
5. Run the Script.
6. Click on Custom Menu->Show-Sidebar![image](https://user-images.githubusercontent.com/35079024/156897797-0157941d-611c-44da-9844-e6084cf9de5e.png)
7. An add-on will appear on the right hand side-> ![image](https://user-images.githubusercontent.com/35079024/156897868-92ad0b49-63f3-46c6-a26c-8b9881d79112.png)
8. Follow the steps in chronological-order to achive authorization + shopify user credentials registration
  1. First Click on "Click here to Authorize your Google Account" ![image](https://user-images.githubusercontent.com/35079024/156897899-dd957a72-dc5a-42c4-a6f3-c2e2ff623230.png)
  2. Select your email id to authorize with this service. ![image](https://user-images.githubusercontent.com/35079024/156897919-f0eb23d0-e2de-4f67-a0de-3fee43330d08.png)
  3. You will be given an access_token. Select ALL and copy it. ![image](https://user-images.githubusercontent.com/35079024/156898115-3b21be18-38ad-409c-afcd-218b2269ecc1.png)
  4. Go back to google-sheets, enter your shop-name and paste the previously copied Token fully in the Token section. ![image](https://user-images.githubusercontent.com/35079024/156898140-475bcf09-ec9f-4add-b33c-4fa6af0b4e7c.png)
  5. Click on submit.

## Setting up Shopify:
1. You will be greeted with a URL. ![image](https://user-images.githubusercontent.com/35079024/156898153-77f0d3f7-251a-48f4-878f-331b09463bfa.png)
2. Copy it and paste it in the Webhook section of Shopify. With followin configurations-> Event- Order Creation, Format-> JSON, Webhook API Version-> 2022-01 (Latest) ![image](https://user-images.githubusercontent.com/35079024/156898193-fa7f984c-0cc6-4ccc-afd7-e4e9bca2e695.png)
3. Click on Save, and you are GOOG TO GO!

### Fire up some test-orders and you will see all your orders getting updated instantly on the Google Sheets, Realtime, Dynamically wihtout Refreshing the Browser.
![image](https://user-images.githubusercontent.com/35079024/156898281-2d1f923f-fb8f-4b7f-b185-25a0aff4e22c.png)

function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .createMenu('Custom Menu')
      .addItem('Show sidebar', 'showSidebar')
      .addToUi();
}

function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('Add-On')
      .setTitle('My custom sidebar');
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showSidebar(html);

}
function processForm(formObject) {
  var ui = SpreadsheetApp.getUi();

   var shop_name = formObject.shopname;
  //based on name ="firstname" in <input type="text" name="firstname">
  // Similarly
  var token = formObject.tokenname;

  var string_token = token;
 
  var url = "https://e494-2405-201-1006-a292-40c2-d278-7de9-8f6b.ngrok.io/POST_Generate_URL";

  var ssid = SpreadsheetApp.getActiveSpreadsheet().getId();
let json_to_be_sent = {
        "shop_name": shop_name,
        "access_token": "4155551212",
        "spreadsheet_id": ssid,
        "token_r" : string_token
    };

    let string_json_to_be_sent = JSON.stringify(json_to_be_sent);

var options = {
    "method": "post",
    "headers": {
        "Content-Type": "application/json"
    },
    "payload": string_json_to_be_sent
  
};
var response = UrlFetchApp.fetch(url, options);

  showDialog(response);
  console.log("code agya");
  // To access individual values, you would do the following
 
}

function showDialog(response) {
  var html = HtmlService.createHtmlOutputFromFile('URL_display')
      .setWidth(500)
      .setHeight(300);
      
html.append(response);
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showModalDialog(html, 'IMPORTANT');
}

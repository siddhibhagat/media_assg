const { default: axios } = require("axios");
var http = require("http"),
  fileSystem = require("fs"),
  path = require("path");

http
  .createServer(async function (request, response) {
    let file_path = request.url;
    
    // covid data
    if (file_path === "/covid-data") {
      const { data } = await axios.get(
        "https://covid.cdc.gov/covid-data-tracker/COVIDData/getAjaxData?id=US_MAP_DATA"
      );

      response.write(JSON.stringify(data));
      response.end();
      return;
    }

    // return index.html
    if (file_path === "/") {
      file_path = "index.html";
    }

    var filePath = path.resolve(__dirname, "../frontend/" + file_path);

    var readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(response);
  })
  .listen(3000);

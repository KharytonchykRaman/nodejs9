const fs = require("fs");
const path = require("path");
const mimeTypes = require("../utils/mimeTypes");

const control = (req, res) => {
  const filePath = path.join(__dirname, "..", "public", req.url);
  fs.access(filePath, fs.constants.R_OK, (err) => {
    if (err) {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("Request Error. Check the path");
    } else {
      const extname = path.extname(filePath);
      const contentType = mimeTypes[extname] || "applicatopn/octet-stream";
      res.writeHead(200, { "Content-Type": contentType });

      fs.createReadStream(filePath).pipe(res);
    }
  });
};

module.exports = control;

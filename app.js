/*
https://itstepby-my.sharepoint.com/:w:/r/personal/skorbilin_a_teacher_itstep_by/_layouts/15/Doc.aspx?sourcedoc=%7B56814C62-60B9-41B2-A3D7-A0EDF419B396%7D&file=Task%20(%D0%B2%D1%8B%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D1%8C%20%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D1%8F).docx&action=default&mobileredirect=true
*/

const http = require("http");
const handler = require("./routes/index");
const PORT = 5000;

http
  .createServer(handler)
  .listen(PORT, () => console.log(`http://localhost:${PORT}/`));

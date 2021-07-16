const express = require("express");

// Configure & Run the http server
const app = express();

app.use(express.static(__dirname, { dotfiles: "allow" }));

app.listen(process.env.PORT, () => {});

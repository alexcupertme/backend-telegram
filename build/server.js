"use strict";
const express = require("express");
const app = express();
app.use(express.static(__dirname, { dotfiles: "allow" }));
app.listen(80, () => {
    console.log("HTTP server running on port 80");
});

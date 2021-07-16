"use strict";
const express = require("express");
const app = express();
app.use(express.static(__dirname, { dotfiles: "allow" }));
app.listen(process.env.PORT, () => { });

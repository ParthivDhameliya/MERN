const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();

const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());

app.use(require("./router/auth"));

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
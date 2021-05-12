



const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const apiRoutes = require("./routes/apiroutes");
const htmlRoutes = require("./routes/htmlroutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);




app.listen(PORT,"0.0.0.0", () => console.log(`App listening on PORT ${PORT}`));
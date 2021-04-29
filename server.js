



const express = require('express');
const app = express();
const PORT = 3000;
const apiRoutes = require("./routes/apiroutes");
const htmlRoutes = require("./routes/htmlroutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);




app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Route to handle LTI launch
app.post("/lti", (req, res) => {
  console.log(
    "LTI launch request received headers",
    JSON.stringify(req.headers)
  );
  console.log("LTI launch request received", JSON.stringify(req.body));

  // Respond with a landing page or redirect as needed
  res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>LTI Launch Successful</title>
      </head>
      <body>
          <h1>Welcome, LTI User!</h1>
      </body>
      </html>
    `);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

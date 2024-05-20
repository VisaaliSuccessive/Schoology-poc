const consumerKey = "ddccb6242f7ca42530da36267e199b300664763ff";
const consumerSecret = "e14053f39efaed5c418b9a1b0b389873";

const OAuth = require("oauth-1.0a");
const request = require("request");
const crypto = require("crypto");

const oauth = OAuth({
  consumer: { key: consumerKey, secret: consumerSecret },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return crypto.createHmac("sha1", key).update(base_string).digest("base64");
  },
});

const requestData = {
  url: "https://api.schoology.com/v1/oauth/request_token",
  method: "GET",
};

const requestToken = oauth.authorize(requestData);
console.log("🚀 ~ requestToken:", requestToken);

request(
  {
    url: requestData.url,
    method: requestData.method,
    headers: oauth.toHeader(requestToken),
  },
  (error, response, body) => {
    if (error) {
      console.error("Error getting request token:", error);
    } else if (response.statusCode !== 200) {
      console.error(
        "Failed to get request token. Status:",
        response.statusCode
      );
      console.error("Response body:", body);
    } else {
      const tokenPairs = body.split("&");
      const tokens = {};
      tokenPairs.forEach((pair) => {
        const [key, value] = pair.split("=");
        tokens[key] = value;
      });
      const oauthToken = tokens["oauth_token"];
      const oauthTokenSecret = tokens["oauth_token_secret"];
      const tokenTTL = tokens["xoauth_token_ttl"];
      console.log("OAuth Token:", oauthToken);
      console.log("OAuth Token Secret:", oauthTokenSecret);
      console.log("Token TTL:", tokenTTL);
      console.log("Request token received successfully:", body);
    }
  }
);

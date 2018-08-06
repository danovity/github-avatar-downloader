var request = require("request");
var token = require("./secrets");

function getRepoContributors(repoOwner, repoName, cb) {
  console.log("triggered.");
  var options = {
    url:
      "https://api.github.com/repos/" +
      repoOwner +
      "/" +
      repoName +
      "/contributors",
    headers: {
      "User-Agent": "request"
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
//console.log("Welcome to the GitHub Avatar Downloader!");

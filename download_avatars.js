var request = require("request");
var token = require("./secrets");
var fs = require("fs");

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
      "User-Agent": "request",
      Authorization: "token" + token.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  //console.log("Result:", result);
  result.forEach((cur, i) => {
    console.log(cur.avatar_url);
    //downloadImageByURL(cur.avatar_url, `./avatars/img[${i}].jpg`);
    downloadImageByURL(cur.avatar_url, `./avatars/img${i}.jpg`);
  });
});
//console.log("Welcome to the GitHub Avatar Downloader!");

function downloadImageByURL(url, filePath) {
  // ...
  request
    .get(url) // Note 1
    .on("error", function(err) {
      // Note 2
      throw err;
    })
    .on("response", function(response) {
      // Note 3
      console.log("Response Status Code: ", response.statusCode);
    })
    .pipe(fs.createWriteStream(filePath)); // Note 4

  // Notes:
  // 1. `request.get` is equivalent to `request()`
  // 2. `request.on('error', callback)` handles any error
  // 3. `request.on('response, callback)` handles the response
  // 4. What is happening here?
}

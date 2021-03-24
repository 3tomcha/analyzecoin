/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const https = require('https');

const coin = 'Etherium';

// bearerTokenは引数で受け取るようにする
// TODO: GCPの方では環境変数を用いるようにする
const bearerToken = process.argv[2];

const options = {
  headers: {
    "Authorization":`Bearer ${bearerToken}`
  }
}

const now = Date.now();
// 5分前
const fiveMinutesAgo = new Date(now - 300000);
const startTime = fiveMinutesAgo.toISOString();

console.log(startTime);

const url = `https://api.twitter.com/2/tweets/search/recent?query=Etherium&max_results=100&start_time=${startTime}`;

var data = [];
exports.helloWorld = (event, context) => {


  let req = https.request(url, options, (res) => {
    res.on('data', (chunk) => {
        data.push(chunk);
    }).on('end', () => {
        var events = Buffer.concat(data);
        var r = JSON.parse(events);
        console.log(r.meta.result_count);
    });
  });
  req.end();

};

exports.helloWorld();
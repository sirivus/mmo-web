const request= require('request-promise');
const cheerio= require('cheerio');

request('https://app.meliopayments.com/meliome/pay/metaverse', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    const data = $('#data').text();
    const json = JSON.parse(data);
    const url = json.url;
    console.log(url);
  }
})


import * as Parser from 'rss-parser';
let parser = new Parser();
 
export async function readFeed(req, res, next, url = "https://www.reddit.com/.rss") {
    let feed = await parser.parseURL(url);
    console.log(feed.title);
   
    feed.items.forEach(item => {
      console.log(item.title + ':' + item.link)
    });
}
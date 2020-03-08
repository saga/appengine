import * as Parser from 'rss-parser';
import { RssFeed, RssFeedItem } from './rssfeed';
import { saveStore, loadStore } from './datastore';
let parser = new Parser();
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

//https://chinadigitaltimes.net/chinese/feed/
//https://www.reddit.com/.rss
export async function readFeed(req, res, next, useProxy=true, url = "https://chinadigitaltimes.net/chinese/feed/") {
    let feedSourceUrl = url;
    if (useProxy){
      feedSourceUrl = CORS_PROXY + url;
    }
    let feed = await parser.parseURL(feedSourceUrl);
    const ret = new RssFeed();
    ret.title = feed.title;
    ret.link = feed.link;
    ret.link = feed.feedUrl;
    ret.items = [];

    feed.items.forEach(f => {
      const item = new RssFeedItem();
      item.link = f.link;
      item.content = f.content;
      item.guid = f.guid;
      item.creator = f.creator;
      item.isoDate = f.isoDate;
      item.pubDate = f.pubDate;
      item.categories = f.categories;
      item.title = f.title;
      ret.items.push(item);
    });

    await saveStore("aaaa", ret);
    await loadStore("aaaa");
    res.json(ret);
}
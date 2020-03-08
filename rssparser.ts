import * as Parser from 'rss-parser';
import { RssFeed, RssFeedItem } from './rssfeed';
let parser = new Parser();
 
export async function readFeed(req, res, next, url = "https://www.reddit.com/.rss") {
    let feed = await parser.parseURL(url);
    const ret = new RssFeed();
    ret.title = feed.title;
    ret.link = feed.link;
    ret.link = feed.feedUrl;

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

    res.json(ret);
}
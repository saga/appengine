export class RssFeed {
    url: string;
    title: string;
    feedUrl: string;
    link: string;
    items: RssFeedItem[];
}

export class RssFeedItem {
    link?: string;
    guid?: string;
    title?: string;
    pubDate?: string;
    creator?: string;
    content?: string;
    isoDate?: string;
    categories?: string[];
    contentSnippet?: string;
}
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Parser = require("rss-parser");
let parser = new Parser();
function readFeed(req, res, next, url = "https://www.reddit.com/.rss") {
    return __awaiter(this, void 0, void 0, function* () {
        let feed = yield parser.parseURL(url);
        console.log(feed.title);
        feed.items.forEach(item => {
            console.log(item.title + ':' + item.link);
        });
    });
}
exports.readFeed = readFeed;

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
const express = require("express");
const datastore_1 = require("./datastore");
const rssparser_1 = require("./rssparser");
const PORT = Number(process.env.PORT) || 8080;
const app = express();
app.enable('trust proxy');
app.get("/", (req, res) => {
    res.send("🎉 Hello TypeScript! 🎉");
});
app.get("/feed", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield rssparser_1.readFeed(req, res, next);
}));
app.get("/job", (req, res) => {
    console.log("job done");
    res.send("done");
});
app.get('/store', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield datastore_1.handleDataStore(req, res, next);
}));
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

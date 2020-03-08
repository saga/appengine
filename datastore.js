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
const datastore_1 = require("@google-cloud/datastore");
const crypto = require("crypto");
const datastore = new datastore_1.Datastore();
const insertVisit = visit => {
    return datastore.save({
        key: datastore.key('visit'),
        data: visit,
    });
};
const getVisits = () => {
    const query = datastore
        .createQuery('visit')
        .order('timestamp', { descending: true })
        .limit(10);
    return datastore.runQuery(query);
};
function handleDataStore(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create a visit record to be stored in the database
        const visit = {
            timestamp: new Date(),
            // Store a hash of the visitor's ip address
            userIp: crypto
                .createHash('sha256')
                .update(req.ip)
                .digest('hex')
                .substr(0, 7),
        };
        try {
            yield insertVisit(visit);
            const [entities] = yield getVisits();
            const visits = entities.map(entity => `Time: ${entity.timestamp}, AddrHash: ${entity.userIp}`);
            res
                .status(200)
                .set('Content-Type', 'text/plain')
                .send(`Last 10 visits:\n${visits.join('\n')}`)
                .end();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.handleDataStore = handleDataStore;

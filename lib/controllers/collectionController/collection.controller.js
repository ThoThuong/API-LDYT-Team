"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionController = void 0;
const mongodb_1 = require("mongodb");
exports.CollectionController = {
    getMany: async (collection, data) => {
        var _a, _b, _c, _d;
        const limit = Number.parseInt((_b = (_a = data.query) === null || _a === void 0 ? void 0 : _a.limit) !== null && _b !== void 0 ? _b : 10);
        const skip = Number.parseInt((_d = (_c = data.query) === null || _c === void 0 ? void 0 : _c.skip) !== null && _d !== void 0 ? _d : 0);
        const filter = {};
        console.log('test', collection);
        Object.keys(data.query)
            .filter(k => ['limit', 'skip'].every(r => r !== k))
            .forEach(k => filter[k] = k === '_id' ? new mongodb_1.ObjectId(data.query[k]) : data.query[k]);
        return {
            list: await collection.find(filter, {
                limit: limit,
                skip: skip
            }).sort({ createdDate: -1 }).toArray(),
            totalCount: (await collection.find(filter).toArray()).length,
            idOwner: data.idOwner,
            id: data.id
        };
    },
    getOne: async (collection, data) => {
        const obj = await collection.findOne({ '_id': new mongodb_1.ObjectId(data.id) });
        return JSON.parse(JSON.stringify(obj));
    },
    post: async (collection, data) => {
        data.body.createdDate = new Date();
        data.body.updatedDate = new Date();
        await collection.insertOne(data.body);
        return collection.findOne({}, { sort: { _id: -1 } });
    },
    put: async (collection, data) => {
        data.body.updatedDate = new Date();
        await collection.findOneAndReplace({ '_id': new mongodb_1.ObjectId(data.id) }, data.body);
        return collection.findOne({ '_id': new mongodb_1.ObjectId(data.id) });
    },
    delete: async (collection, data) => {
        await collection.findOneAndDelete({ '_id': new mongodb_1.ObjectId(data.id) });
        return 'ok';
    },
    getManyOwner: async (collection, data) => {
        var _a, _b, _c, _d;
        const limit = Number.parseInt((_b = (_a = data.query) === null || _a === void 0 ? void 0 : _a.limit) !== null && _b !== void 0 ? _b : 10);
        const skip = Number.parseInt((_d = (_c = data.query) === null || _c === void 0 ? void 0 : _c.skip) !== null && _d !== void 0 ? _d : 0);
        const filter = {};
        const condition = { "idOwner": data.idOwner };
        Object.keys(data.query)
            .filter(k => ['limit', 'skip'].every(r => r !== k))
            .forEach(k => filter[k] = k === '_id' ? new mongodb_1.ObjectId(data.query[k]) : data.query[k]);
        return {
            list: await collection.find(condition, {
                limit: limit,
                skip: skip
            }).sort({ createdDate: -1 }).toArray(),
            totalCount: (await collection.find(condition).toArray()).length,
            idOwner: data.idOwner,
            id: data.id
        };
    },
    putUpdate: async (collection, data) => {
        data.body.updatedDate = new Date();
        await collection.updateOne({ '_id': new mongodb_1.ObjectId(data.id) }, {
            $set: data.body
        });
        return collection.findOne({ '_id': new mongodb_1.ObjectId(data.id) });
    },
    search: async (collection, data) => {
        var _a, _b, _c, _d;
        const limit = Number.parseInt((_b = (_a = data.query) === null || _a === void 0 ? void 0 : _a.limit) !== null && _b !== void 0 ? _b : 10);
        const skip = Number.parseInt((_d = (_c = data.query) === null || _c === void 0 ? void 0 : _c.skip) !== null && _d !== void 0 ? _d : 0);
        const filter = {};
        console.log('test', collection);
        Object.keys(data.query)
            .filter(k => ['limit', 'skip'].every(r => r !== k))
            .forEach(k => filter[k] = k === '_id' ? new mongodb_1.ObjectId(data.query[k]) : data.query[k]);
        return {
            list: await collection.find(filter, {
                limit: limit,
                skip: skip
            }).sort({ createdDate: -1 }).toArray(),
            totalCount: (await collection.find(filter).toArray()).length,
            idOwner: data.idOwner,
            id: data.id
        };
    }
};

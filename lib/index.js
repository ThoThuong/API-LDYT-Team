"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("./controllers");
const collection_controller_1 = require("./controllers/collectionController/collection.controller");
const index_1 = require("./services/index");
const shared_1 = require("./shared");
const port = (process.env.PORT || 3000);
const app = shared_1.RequireJson(shared_1.UseCors(express_1.default()));
app.get('/health', function (_, res) {
    res.send(index_1.ResponseService.ok('Hello World!!!'));
});
app.use(shared_1.ConfigParser.Parse);
app.post('/auth/login', shared_1.AuthHandler.HandleLoginRequest(controllers_1.AuthController.login));
app.post('/auth/register', shared_1.AuthHandler.HandleLoginRequest(controllers_1.AuthController.register));
// this is for generic /api
app.get('/api/roles', shared_1.AuthHandler.VerifyToken, shared_1.AuthHandler.VerifyRoles('administrator'), shared_1.AuthHandler.HandleRolesRequest(collection_controller_1.CollectionController.getMany));
app.get('/api/roles/:id', shared_1.AuthHandler.VerifyToken, shared_1.AuthHandler.VerifyRoles('administrator'), shared_1.AuthHandler.HandleRolesRequest(collection_controller_1.CollectionController.getOne));
app.post('/api/roles', shared_1.AuthHandler.VerifyToken, shared_1.AuthHandler.VerifyRoles('administrator'), shared_1.AuthHandler.HandleRolesRequest(collection_controller_1.CollectionController.post));
app.delete('/api/roles', shared_1.AuthHandler.VerifyToken, shared_1.AuthHandler.VerifyRoles('administrator'), shared_1.AuthHandler.HandleRolesRequest(collection_controller_1.CollectionController.delete));
app.put('/api/roles/:id', shared_1.AuthHandler.VerifyToken, shared_1.AuthHandler.VerifyRoles('administrator'), shared_1.AuthHandler.HandleRolesRequest(collection_controller_1.CollectionController.put));
// this is for generic /api
// app.get('/api/:collection', AuthHandler.VerifyToken, RequestHandler(CollectionController.getMany));
app.post('/api/:collection', shared_1.AuthHandler.VerifyToken, shared_1.RequestHandler(collection_controller_1.CollectionController.post));
app.delete('/api/:collection', shared_1.AuthHandler.VerifyToken, shared_1.RequestHandler(collection_controller_1.CollectionController.delete));
// app.get('/api/:collection/:id', AuthHandler.VerifyToken, RequestHandler(CollectionController.getOne));
app.delete('/api/:collection/:id', shared_1.AuthHandler.VerifyToken, shared_1.RequestHandler(collection_controller_1.CollectionController.delete));
// app.put('/api/:collection/:id', AuthHandler.VerifyToken, RequestHandler(CollectionController.put));
// add some router//
app.get('/api/:collection', shared_1.RequestHandler(collection_controller_1.CollectionController.getMany));
app.get('/api/:collection/:id', shared_1.RequestHandler(collection_controller_1.CollectionController.getOne));
app.get('/api/:collection/:idOwner', shared_1.RequestHandler(collection_controller_1.CollectionController.getManyOwner));
app.get('/optionViewApi/search/product/:keyWord', function (req, res, next) {
    res.send(index_1.ResponseService.ok('ok search'));
});
app.put('/api/:collection/:id', shared_1.AuthHandler.VerifyToken, shared_1.RequestHandler(collection_controller_1.CollectionController.putUpdate));
app.listen(port, function () {
    console.log(`App is listening on port ${port}!`);
});

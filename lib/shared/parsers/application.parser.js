"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseApplication = void 0;
const model_1 = require("../../model");
exports.ParseApplication = (req, res, next) => {
    var _a, _b;
    const headers = req.headers;
    const Attr_Application = (_b = (_a = headers['attr-application']) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '';
    if (['ANGULAR01', 'ANGULAR02'].includes(Attr_Application.toUpperCase())) {
        req.attr_name = Attr_Application;
        next();
    }
    else {
        res.send(new model_1.responseModel(200, {}, 'Application is required'));
    }
};

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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var Users = require('./../Models/user');
var labels_json_1 = __importDefault(require("./../utils/labels.json"));
var utils_1 = require("./../utils");
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var router = express.Router();
var cors = require('cors');
router.get('/', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Users.find()];
            case 1:
                users = _a.sent();
                return [4 /*yield*/, res.json(users)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                throw res.json(error_1.message);
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post('/register', cors(), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, error_2, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 5, , 7]);
                if (!req.body.username) return [3 /*break*/, 3];
                return [4 /*yield*/, Users.findOne({ username: req.body.username })];
            case 1:
                user = _d.sent();
                if (user && user.username)
                    throw new SyntaxError(labels_json_1.default.Error.UsuarioExistente); //hacer control de errores, para que no solo envie un mensaje sino un objeto con status y mensaje del error.
                _a = req.body;
                return [4 /*yield*/, bcrypt.hash(req.body.password, 12)];
            case 2:
                _a.password = _d.sent();
                Users.create(req.body, function (error, save) {
                    return __awaiter(this, void 0, void 0, function () {
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    if (error)
                                        throw error;
                                    _b = (_a = res).json;
                                    return [4 /*yield*/, utils_1.registerEnds(200, save)];
                                case 1:
                                    _b.apply(_a, [_c.sent()]); // saved!
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                return [3 /*break*/, 4];
            case 3: throw labels_json_1.default.Error.UsuarioInexistente;
            case 4: return [3 /*break*/, 7];
            case 5:
                error_2 = _d.sent();
                console.log('aqui error:', error_2);
                _c = (_b = res).json;
                return [4 /*yield*/, utils_1.registerEnds(error_2.code, error_2.message)];
            case 6:
                _c.apply(_b, [_d.sent()]);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
router.post('/authenticate', cors(), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, payload, token, _a, _b, error_3, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 11, , 13]);
                console.log("req:::", req.body);
                if (!(req.body.username && req.body.password)) return [3 /*break*/, 9];
                return [4 /*yield*/, Users.findOne({ username: req.body.username })];
            case 1:
                user = _e.sent();
                if (!(user && user.username)) return [3 /*break*/, 7];
                if (!bcrypt.compare(req.body.password, user.password)) return [3 /*break*/, 5];
                payload = {
                    check: true
                };
                token = jwt.sign(payload, process.env.KEYJWT, {
                    expiresIn: 1440
                });
                if (!token) return [3 /*break*/, 3];
                // res.json({
                //     mensaje: 'Autenticación correcta',
                //     token: token
                // });
                _b = (_a = res).json;
                return [4 /*yield*/, utils_1.registerEnds(200, { token: token })];
            case 2:
                // res.json({
                //     mensaje: 'Autenticación correcta',
                //     token: token
                // });
                _b.apply(_a, [_e.sent()]);
                return [3 /*break*/, 4];
            case 3: throw new Error(labels_json_1.default.Error.NotToken);
            case 4: return [3 /*break*/, 6];
            case 5: throw new Error(labels_json_1.default.Error.UsuarioPasswordDiferentes);
            case 6: return [3 /*break*/, 8];
            case 7: throw new Error(labels_json_1.default.Error.UsuarioInexistente);
            case 8: return [3 /*break*/, 10];
            case 9: throw new Error(labels_json_1.default.Error.UsuarioPasswordInexistente);
            case 10: return [3 /*break*/, 13];
            case 11:
                error_3 = _e.sent();
                console.log('aqui error:', error_3);
                _d = (_c = res).json;
                return [4 /*yield*/, utils_1.registerEnds(500, error_3)];
            case 12:
                _d.apply(_c, [_e.sent()]);
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); });
module.exports = router;

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
exports.__esModule = true;
var client_1 = require("@prisma/client");
var express_1 = __importDefault(require("express"));
var uuid_1 = require("uuid");
var prisma = new client_1.PrismaClient();
var router = express_1["default"].Router();
function getDistance(x1, y1, x2, y2) {
    var y = x2 - x1;
    var x = y2 - y1;
    return Math.sqrt(x * x + y * y) * 100000;
}
router.post("/validate/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, id, qr, distance, currentDate, currentDeviceQr, token, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                data = req.body;
                if (data.longitude === undefined ||
                    data.latitude === undefined ||
                    data.deviceId === undefined) {
                    res.json({
                        status: "error",
                        message: "QR inválido"
                    });
                    return [2 /*return*/, 0];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 10, , 11]);
                id = req.params.id;
                if (!Number(id)) return [3 /*break*/, 8];
                return [4 /*yield*/, prisma.qr.findUnique({
                        where: {
                            id: Number(id)
                        },
                        include: {
                            devices: true
                        }
                    })];
            case 2:
                qr = _b.sent();
                if (!qr) return [3 /*break*/, 6];
                distance = getDistance(qr.latitude, qr.longitude, data.latitude, data.longitude);
                console.log(qr.latitude);
                console.log(qr.longitude);
                console.log(data.latitude);
                console.log(data.longitude);
                console.log(distance);
                if (!(distance <= 100000000)) return [3 /*break*/, 5];
                currentDate = new Date();
                if (!(currentDate < qr.limitDate)) return [3 /*break*/, 5];
                currentDeviceQr = (_a = qr === null || qr === void 0 ? void 0 : qr.devices) === null || _a === void 0 ? void 0 : _a.find(function (device) { return device.deviceId === data.deviceId; });
                if (!!currentDeviceQr) return [3 /*break*/, 4];
                token = (0, uuid_1.v4)();
                console.log(Number(id));
                console.log(data.deviceId);
                console.log(token);
                return [4 /*yield*/, prisma.qr.update({
                        where: {
                            id: Number(id)
                        },
                        data: {
                            devices: {
                                create: [
                                    {
                                        deviceId: data.deviceId,
                                        token: token
                                    },
                                ]
                            }
                        }
                    })];
            case 3:
                _b.sent();
                console.log(token);
                console.log(data.deviceId);
                console.log("Validated QR");
                res.json({
                    status: "success",
                    message: "Validado",
                    data: token
                });
                return [2 /*return*/, 0];
            case 4:
                if (!currentDeviceQr.used) {
                    res.json({
                        status: "success",
                        message: "Validado",
                        data: currentDeviceQr.token
                    });
                    return [2 /*return*/, 0];
                }
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                res.json({
                    status: "error",
                    message: "Not found"
                });
                _b.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                res.json({
                    status: "error",
                    message: "Invalid id"
                });
                _b.label = 9;
            case 9:
                res.json({
                    status: "error",
                    message: "Invalid QR"
                });
                return [3 /*break*/, 11];
            case 10:
                error_1 = _b.sent();
                console.log(error_1);
                res.json({
                    status: "error",
                    message: error_1
                });
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); });
router.get("/token/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, prisma.deviceOnQr.findUnique({
                        where: {
                            token: id
                        }
                    })];
            case 1:
                token = _a.sent();
                if (token) {
                    if (token.used === false) {
                        res.json({
                            status: "success"
                        });
                    }
                    else if (token.used === true) {
                        res.json({
                            status: "used"
                        });
                    }
                    else {
                        res.json({
                            status: "error"
                        });
                    }
                }
                else {
                    res.json({
                        status: "error"
                    });
                }
                return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;
//# sourceMappingURL=validate.js.map
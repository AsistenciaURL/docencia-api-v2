"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var courses_1 = __importDefault(require("./routes/courses"));
var professors_1 = __importDefault(require("./routes/professors"));
var students_1 = __importDefault(require("./routes/students"));
var devices_1 = __importDefault(require("./routes/devices"));
var qrs_1 = __importDefault(require("./routes/qrs"));
var assistanceCategories_1 = __importDefault(require("./routes/assistanceCategories"));
var assistances_1 = __importDefault(require("./routes/assistances"));
var validate_1 = __importDefault(require("./routes/validate"));
var cors_1 = __importDefault(require("cors"));
require('dotenv').config();
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use((0, cors_1["default"])({
    origin: ["http://localhost:3000", "http://192.168.0.3:3000", "http://192.168.0.7:3000", "https://docencia-web-csjadaox0-tatobig.vercel.app/", "https://docencia-web-wip.vercel.app/"]
}));
app.use(courses_1["default"]);
app.use(professors_1["default"]);
app.use(students_1["default"]);
app.use(devices_1["default"]);
app.use(qrs_1["default"]);
app.use(assistanceCategories_1["default"]);
app.use(assistances_1["default"]);
app.use(validate_1["default"]);
app.use(function (req, res, next) {
    res.status(404);
    return res.json({
        success: false,
        data: null,
        message: "Esta ruta no existe: ".concat(req.path)
    });
});
// #6
app.listen(process.env.PORT, function () {
    return console.log("Servido escuchando en el la dirección: http://localhost:" + 8000);
});
exports["default"] = app;
//# sourceMappingURL=index.js.map
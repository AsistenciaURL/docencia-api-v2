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
var assistancecategories_1 = __importDefault(require("./routes/assistancecategories"));
var assistances_1 = __importDefault(require("./routes/assistances"));
var validate_1 = __importDefault(require("./routes/validate"));
var cors_1 = __importDefault(require("cors"));
require('dotenv').config();
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use((0, cors_1["default"])({
    origin: "*"
}));
app.use(courses_1["default"]);
app.use(professors_1["default"]);
app.use(students_1["default"]);
app.use(devices_1["default"]);
app.use(qrs_1["default"]);
app.use(assistancecategories_1["default"]);
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
app.listen(process.env.PORT, function () {
    return console.log("Servido escuchando en el la dirección: http://localhost:" + process.env.PORT);
});
exports["default"] = app;
//# sourceMappingURL=index.js.map
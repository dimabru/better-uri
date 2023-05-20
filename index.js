"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetterUri = void 0;
var BetterUri;
(function (BetterUri) {
    function validateDuplicates(app) {
        const server = app.getHttpServer();
        const router = server._events.request._router;
        const availableRoutes = router.stack
            .map((layer) => {
            var _a, _b;
            if (layer.route) {
                return {
                    path: (_a = layer.route) === null || _a === void 0 ? void 0 : _a.path,
                    method: (_b = layer.route) === null || _b === void 0 ? void 0 : _b.stack[0].method,
                };
            }
        })
            .filter((item) => item !== undefined);
        const uniqueRoutes = [];
        const duplicateRoutes = [];
        availableRoutes
            .map((ar) => `${ar.method} ${ar.path}`)
            .forEach((fullRoute) => {
            if (uniqueRoutes.includes(fullRoute)) {
                duplicateRoutes.push(fullRoute);
            }
            else {
                uniqueRoutes.push(fullRoute);
            }
        });
        return {
            isValid: duplicateRoutes.length > 0 ? false : true,
            duplicates: duplicateRoutes,
        };
    }
    BetterUri.validateDuplicates = validateDuplicates;
})(BetterUri = exports.BetterUri || (exports.BetterUri = {}));

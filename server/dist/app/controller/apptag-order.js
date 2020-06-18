"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const midway_1 = require("midway");
const portaltag_order_service_1 = require("../../lib/service/portaltag_order.service");
const Response_1 = require("../../common/Response");
let SugoProtalTagOrderController = class SugoProtalTagOrderController {
    async query(ctx) {
        const order = await this.sugoProtalTagOrderService.findAll();
        ctx.body = Response_1.Response.ok(order);
    }
    async create(ctx) {
        var _a;
        const body = ctx.q || ctx.request.body;
        body.createdBy = ((_a = body.user) === null || _a === void 0 ? void 0 : _a.id) || 'unknown';
        const res = await this.sugoProtalTagOrderService.create(body);
        ctx.body = Response_1.Response.ok(res);
    }
    async update(ctx) {
        var _a;
        const body = ctx.q || ctx.request.body;
        body.updatedBy = ((_a = body.user) === null || _a === void 0 ? void 0 : _a.id) || 'unknown';
        const res = await this.sugoProtalTagOrderService.update(body, {
            where: { id: ctx.params.id }
        });
        ctx.body = Response_1.Response.ok(res);
    }
    async destroy(ctx) {
        const res = await this.sugoProtalTagOrderService.destroyById(ctx.params.id);
        ctx.body = Response_1.Response.ok(res);
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", portaltag_order_service_1.SugoProtalTagOrderService)
], SugoProtalTagOrderController.prototype, "sugoProtalTagOrderService", void 0);
__decorate([
    midway_1.get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoProtalTagOrderController.prototype, "query", null);
__decorate([
    midway_1.post('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoProtalTagOrderController.prototype, "create", null);
__decorate([
    midway_1.put('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoProtalTagOrderController.prototype, "update", null);
__decorate([
    midway_1.del('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoProtalTagOrderController.prototype, "destroy", null);
SugoProtalTagOrderController = __decorate([
    midway_1.provide(),
    midway_1.controller('/app/sugo-portal-tag-order')
], SugoProtalTagOrderController);
exports.SugoProtalTagOrderController = SugoProtalTagOrderController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwdGFnLW9yZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb250cm9sbGVyL2FwcHRhZy1vcmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLG1DQUFrRjtBQUNsRix1RkFBcUY7QUFDckYsb0RBQThDO0FBSTlDLElBQWEsNEJBQTRCLEdBQXpDLE1BQWEsNEJBQTRCO0lBTXZDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBWTtRQUN0QixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUM1RCxHQUFHLENBQUMsSUFBSSxHQUFHLG1CQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQy9CLENBQUM7SUFHRCxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQVk7O1FBQ3ZCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUE7UUFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFBLElBQUksQ0FBQyxJQUFJLDBDQUFFLEVBQUUsS0FBSSxTQUFTLENBQUE7UUFDM0MsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzdELEdBQUcsQ0FBQyxJQUFJLEdBQUcsbUJBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDN0IsQ0FBQztJQUdELEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBWTs7UUFDdkIsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQUEsSUFBSSxDQUFDLElBQUksMENBQUUsRUFBRSxLQUFJLFNBQVMsQ0FBQTtRQUMzQyxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQ3JELElBQUksRUFDSjtZQUNFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtTQUM3QixDQUNGLENBQUE7UUFDRCxHQUFHLENBQUMsSUFBSSxHQUFHLG1CQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzdCLENBQUM7SUFHRCxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQVk7UUFDeEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMseUJBQXlCLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDM0UsR0FBRyxDQUFDLElBQUksR0FBRyxtQkFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUM3QixDQUFDO0NBQ0YsQ0FBQTtBQWxDQztJQURDLGVBQU0sRUFBRTs4QkFDa0IsbURBQXlCOytFQUFBO0FBR3BEO0lBREMsWUFBRyxDQUFDLEdBQUcsQ0FBQzs7Ozt5REFJUjtBQUdEO0lBREMsYUFBSSxDQUFDLEdBQUcsQ0FBQzs7OzswREFNVDtBQUdEO0lBREMsWUFBRyxDQUFDLE1BQU0sQ0FBQzs7OzswREFXWDtBQUdEO0lBREMsWUFBRyxDQUFDLE1BQU0sQ0FBQzs7OzsyREFJWDtBQXBDVSw0QkFBNEI7SUFGeEMsZ0JBQU8sRUFBRTtJQUNULG1CQUFVLENBQUMsNEJBQTRCLENBQUM7R0FDNUIsNEJBQTRCLENBcUN4QztBQXJDWSxvRUFBNEIifQ==
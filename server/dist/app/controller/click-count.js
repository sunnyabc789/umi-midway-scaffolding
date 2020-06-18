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
const sugo_extapp_clickcount_service_1 = require("../../lib/service/sugo_extapp_clickcount.service");
const Response_1 = require("../../common/Response");
const sequelize_1 = require("sequelize");
let SugoExtappClickcountController = class SugoExtappClickcountController {
    async query(ctx) {
        const { user = {} } = ctx.q;
        const { id: userId = '', appsPermissions = [] } = user;
        const where = {};
        if (userId)
            where.userId = userId;
        if (appsPermissions[0] !== 'all')
            where.extappId = {
                [sequelize_1.Op.in]: appsPermissions
            };
        const res = await this.sugoExtappClickcountService.findAll({
            where,
            limit: 5,
            order: [['count', 'DESC']],
            raw: true,
        });
        return ctx.body = Response_1.Response.ok(res);
    }
    async create(ctx) {
        var _a;
        const { user = {} } = ctx.q;
        const { id: userId } = user;
        const data = ctx.q;
        const where = {
            extappId: data.extappId,
            userId
        };
        const existed = await this.sugoExtappClickcountService.findOne({
            where
        });
        if (!((_a = existed) === null || _a === void 0 ? void 0 : _a.count)) {
            await this.sugoExtappClickcountService.create(Object.assign(Object.assign({}, where), { count: 1, createdBy: userId }));
        }
        else {
            const values = {
                count: existed.count + 1
            };
            await this.sugoExtappClickcountService.update(values, {
                where
            });
        }
        ctx.body = Response_1.Response.ok({});
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", sugo_extapp_clickcount_service_1.SugoExtappClickcountService)
], SugoExtappClickcountController.prototype, "sugoExtappClickcountService", void 0);
__decorate([
    midway_1.get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoExtappClickcountController.prototype, "query", null);
__decorate([
    midway_1.post('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoExtappClickcountController.prototype, "create", null);
SugoExtappClickcountController = __decorate([
    midway_1.provide(),
    midway_1.controller('/app/sugo-smart-recommend')
], SugoExtappClickcountController);
exports.SugoExtappClickcountController = SugoExtappClickcountController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2stY291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbnRyb2xsZXIvY2xpY2stY291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBd0U7QUFDeEUscUdBQThGO0FBQzlGLG9EQUE4QztBQUM5Qyx5Q0FBNEI7QUFJNUIsSUFBYSw4QkFBOEIsR0FBM0MsTUFBYSw4QkFBOEI7SUFNekMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFZO1FBQ3RCLE1BQU0sRUFBRSxJQUFJLEdBQUcsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUMzQixNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sR0FBRyxFQUFFLEVBQUUsZUFBZSxHQUFHLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQTtRQUV0RCxNQUFNLEtBQUssR0FBUSxFQUFFLENBQUE7UUFDckIsSUFBSSxNQUFNO1lBQUUsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7UUFFakMsSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSztZQUFFLEtBQUssQ0FBQyxRQUFRLEdBQUc7Z0JBQ2pELENBQUMsY0FBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLGVBQWU7YUFDekIsQ0FBQTtRQUVELE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixDQUFDLE9BQU8sQ0FBQztZQUN6RCxLQUFLO1lBQ0wsS0FBSyxFQUFFLENBQUM7WUFDUixLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMxQixHQUFHLEVBQUUsSUFBSTtTQUNWLENBQUMsQ0FBQTtRQUVGLE9BQU8sR0FBRyxDQUFDLElBQUksR0FBRyxtQkFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0lBR0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFZOztRQUN2QixNQUFNLEVBQUUsSUFBSSxHQUFHLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDM0IsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFFM0IsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUVsQixNQUFNLEtBQUssR0FBUTtZQUNqQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsTUFBTTtTQUNQLENBQUE7UUFDRCxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxPQUFPLENBQUM7WUFDN0QsS0FBSztTQUNOLENBQUMsQ0FBQTtRQUVGLElBQUksUUFBQyxPQUFPLDBDQUFFLEtBQUssQ0FBQSxFQUFFO1lBQ25CLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixDQUFDLE1BQU0saUNBQ3hDLEtBQUssS0FDUixLQUFLLEVBQUUsQ0FBQyxFQUNSLFNBQVMsRUFBRSxNQUFNLElBQ2pCLENBQUE7U0FDSDthQUFNO1lBQ0wsTUFBTSxNQUFNLEdBQUc7Z0JBQ2IsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQzthQUN6QixDQUFBO1lBQ0QsTUFBTSxJQUFJLENBQUMsMkJBQTJCLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDcEQsS0FBSzthQUNOLENBQUMsQ0FBQTtTQUVIO1FBRUQsR0FBRyxDQUFDLElBQUksR0FBRyxtQkFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUM1QixDQUFDO0NBQ0YsQ0FBQTtBQXpEQztJQURDLGVBQU0sRUFBRTs4QkFDb0IsNERBQTJCO21GQUFBO0FBR3hEO0lBREMsWUFBRyxDQUFDLEdBQUcsQ0FBQzs7OzsyREFvQlI7QUFHRDtJQURDLGFBQUksQ0FBQyxHQUFHLENBQUM7Ozs7NERBZ0NUO0FBM0RVLDhCQUE4QjtJQUYxQyxnQkFBTyxFQUFFO0lBQ1QsbUJBQVUsQ0FBQywyQkFBMkIsQ0FBQztHQUMzQiw4QkFBOEIsQ0E0RDFDO0FBNURZLHdFQUE4QiJ9
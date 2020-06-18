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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const midway_1 = require("midway");
const base_service_1 = require("./base.service");
const app_tag_relation_service_1 = require(".//app-tag-relation.service");
const portaltagapp_order_service_1 = require(".//portaltagapp_order.service");
const db_1 = require("../../lib/models/db");
const sugo_utils_1 = require("../../common/sugo-utils");
let SugoPortalExtAppService = class SugoPortalExtAppService extends base_service_1.BaseService {
    constructor(model) {
        super(model);
    }
    async addTag(params) {
        const { app = {}, tags = [], userId } = params;
        await db_1.DB.sequelize.transaction(async (transaction) => {
            await sugo_utils_1.forAwaitAll(tags, async (item) => {
                let existedRelate = await this.sugoProtalAppTagRelationService.existedRelate(app.id, item);
                if (existedRelate)
                    return;
                const record = {
                    extappId: app.id,
                    extappTagId: item,
                    createdBy: userId
                };
                await this.sugoProtalAppTagRelationService.create(record);
                await this.sugoProtalTagAppOrderService.addOrder(app.id, item, userId, transaction);
            });
        });
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", app_tag_relation_service_1.SugoProtalAppTagRelationService
    //标签-应用-排序
    )
], SugoPortalExtAppService.prototype, "sugoProtalAppTagRelationService", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", portaltagapp_order_service_1.SugoProtalTagAppOrderService)
], SugoPortalExtAppService.prototype, "sugoProtalTagAppOrderService", void 0);
SugoPortalExtAppService = __decorate([
    midway_1.provide(),
    __param(0, midway_1.inject('SugoPortalExtApp')),
    __metadata("design:paramtypes", [Object])
], SugoPortalExtAppService);
exports.SugoPortalExtAppService = SugoPortalExtAppService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2VydmljZS9hcHBsaWNhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQXdDO0FBQ3hDLGlEQUE0QztBQUU1QywwRUFBNkU7QUFDN0UsOEVBQTRFO0FBQzVFLDRDQUFzQztBQUN0Qyx3REFBcUQ7QUFHckQsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBd0IsU0FBUSwwQkFBOEI7SUFFekUsWUFDOEIsS0FBd0I7UUFFcEQsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2QsQ0FBQztJQVNELEtBQUssQ0FBQyxNQUFNLENBQUMsTUFJWjtRQUNDLE1BQU0sRUFBRSxHQUFHLEdBQUcsRUFBRSxFQUFFLElBQUksR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQzlDLE1BQU0sT0FBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFdBQWdCLEVBQUUsRUFBRTtZQUN4RCxNQUFNLHdCQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFZLEVBQUUsRUFBRTtnQkFDN0MsSUFBSSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsK0JBQStCLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUE7Z0JBQzFGLElBQUksYUFBYTtvQkFBRSxPQUFNO2dCQUV6QixNQUFNLE1BQU0sR0FBUTtvQkFDbEIsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFO29CQUNoQixXQUFXLEVBQUUsSUFBSTtvQkFDakIsU0FBUyxFQUFFLE1BQU07aUJBQ2xCLENBQUE7Z0JBQ0QsTUFBTSxJQUFJLENBQUMsK0JBQStCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUV6RCxNQUFNLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFBO1lBQ3JGLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQTVCQztJQURDLGVBQU0sRUFBRTs4QkFDd0IsMERBQStCO0lBRWhFLFVBQVU7O2dGQUZzRDtBQUloRTtJQURDLGVBQU0sRUFBRTs4QkFDcUIseURBQTRCOzZFQUFBO0FBYi9DLHVCQUF1QjtJQURuQyxnQkFBTyxFQUFFO0lBSUwsV0FBQSxlQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQTs7R0FIbEIsdUJBQXVCLENBcUNuQztBQXJDWSwwREFBdUIifQ==
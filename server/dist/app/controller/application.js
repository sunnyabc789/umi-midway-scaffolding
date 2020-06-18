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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const midway_1 = require("midway");
const application_service_1 = require("../../lib/service/application.service");
const portaltag_service_1 = require("../../lib/service/portaltag.service");
const app_tag_relation_service_1 = require("../../lib/service/app-tag-relation.service");
const portaltagapp_order_service_1 = require("../../lib/service/portaltagapp_order.service");
const sugo_extapp_clickcount_service_1 = require("../../lib/service/sugo_extapp_clickcount.service");
const Response_1 = require("../../common/Response");
const sequelize_1 = require("sequelize");
const db_1 = require("../../lib/models/db");
const sugo_utils_1 = require("../../common/sugo-utils");
const _ = require("lodash");
let SugoProtalExtappController = class SugoProtalExtappController {
    async query(ctx) {
        var _a;
        const { name } = ctx.q;
        const appId = (_a = ctx.params) === null || _a === void 0 ? void 0 : _a.id;
        let res;
        let options = {
            order: [['createdAt', 'DESC']]
        };
        if (appId) {
            options = {
                where: {
                    id: appId
                }
            };
        }
        if (name) {
            options = {
                where: {
                    [sequelize_1.Op.or]: [
                        {
                            name: {
                                [sequelize_1.Op.like]: `%${name}%`
                            }
                        },
                        {
                            description: {
                                [sequelize_1.Op.like]: `%${name}%`
                            }
                        }
                    ]
                }
            };
        }
        res = await this.sugoPortalExtAppService.findAll(options);
        ctx.body = Response_1.Response.ok(res);
    }
    async create(ctx) {
        const _a = ctx.q, { user, checkedTag = [] } = _a, data = __rest(_a, ["user", "checkedTag"]);
        const { id: userId } = user;
        const res = await db_1.DB.sequelize.transaction(async (transaction) => {
            let res = await this.sugoPortalExtAppService.create(Object.assign(Object.assign({}, data), { createdBy: userId }), { transaction });
            if (!_.isEmpty(checkedTag)) {
                await this.sugoPortalExtAppService.addTag({
                    app: res,
                    tags: checkedTag,
                    userId
                });
                return res;
            }
            const existedWhere = {
                id: 'unTyped'
            };
            const existedUnTyped = await this.sugoProtalTagService.findOne({
                where: existedWhere,
                transaction
            });
            if (!existedUnTyped) {
                const unTypedTagValues = {
                    id: 'unTyped',
                    name: '未分类',
                    createdBy: userId
                };
                await this.sugoProtalTagService.create(unTypedTagValues, { transaction });
            }
            const appTagRelationValues = {
                extappId: res.id,
                extappTagId: 'unTyped',
                createdBy: userId
            };
            await this.sugoProtalAppTagRelationService.create(appTagRelationValues, { transaction });
            const appTagOrderWhere = {
                extappTagId: 'unTyped'
            };
            const existedOrder = await this.sugoProtalTagAppOrderService.findOne({
                where: appTagOrderWhere,
                raw: true,
                transaction
            });
            if (!existedOrder) {
                const orderValues = {
                    extappTagId: 'unTyped',
                    appIdOrder: [res.id],
                    createdBy: userId
                };
                await this.sugoProtalTagAppOrderService.create(orderValues, { transaction });
            }
            else {
                existedOrder.appIdOrder.unshift(res.id);
                const orderValues = {
                    appIdOrder: existedOrder.appIdOrder,
                    updatedBy: userId
                };
                await this.sugoProtalTagAppOrderService.update(orderValues, {
                    where: {
                        extappTagId: 'unTyped'
                    },
                    transaction
                });
            }
            return res;
        });
        ctx.body = Response_1.Response.ok(res);
    }
    async update(ctx) {
        const res = await this.sugoPortalExtAppService.update(ctx.q, {
            where: { id: ctx.q.id }
        });
        ctx.body = Response_1.Response.ok(res);
    }
    async destroy(ctx) {
        const appId = ctx.params.id;
        const { user = {} } = ctx.q;
        const { id: userId } = user;
        const res = await db_1.DB.sequelize.transaction(async (transaction) => {
            const res = await this.sugoPortalExtAppService.destory({
                where: {
                    id: appId
                },
                transaction
            });
            const appTagRelationsWhere = {
                extappId: appId
            };
            const realtions = await this.sugoProtalAppTagRelationService.findAll({
                where: appTagRelationsWhere,
                raw: true,
                transaction
            });
            await this.sugoProtalAppTagRelationService.destory({
                where: {
                    extappId: appId
                },
                transaction
            });
            await sugo_utils_1.mapAwaitAll(realtions, async (i) => {
                const orderWhere = {
                    extappTagId: i.extappTagId
                };
                const order = await this.sugoProtalTagAppOrderService.findOne({
                    where: orderWhere,
                    raw: true,
                    transaction
                });
                const orderUpdateValue = {
                    appIdOrder: order.appIdOrder.filter((j) => j !== ctx.params.id),
                    updatedBy: userId
                };
                await this.sugoProtalTagAppOrderService.update(orderUpdateValue, {
                    where: orderWhere,
                    transaction
                });
            });
            await this.sugoExtappClickcountService.destory({
                where: {
                    extappId: appId
                },
                transaction
            });
            return res;
        });
        ctx.body = Response_1.Response.ok(res);
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", application_service_1.SugoPortalExtAppService)
], SugoProtalExtappController.prototype, "sugoPortalExtAppService", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", portaltag_service_1.SugoProtalTagService)
], SugoProtalExtappController.prototype, "sugoProtalTagService", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", app_tag_relation_service_1.SugoProtalAppTagRelationService
    //标签-应用-排序
    )
], SugoProtalExtappController.prototype, "sugoProtalAppTagRelationService", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", portaltagapp_order_service_1.SugoProtalTagAppOrderService)
], SugoProtalExtappController.prototype, "sugoProtalTagAppOrderService", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", sugo_extapp_clickcount_service_1.SugoExtappClickcountService)
], SugoProtalExtappController.prototype, "sugoExtappClickcountService", void 0);
__decorate([
    midway_1.get('/:id?'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoProtalExtappController.prototype, "query", null);
__decorate([
    midway_1.post('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoProtalExtappController.prototype, "create", null);
__decorate([
    midway_1.put('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoProtalExtappController.prototype, "update", null);
__decorate([
    midway_1.del('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoProtalExtappController.prototype, "destroy", null);
SugoProtalExtappController = __decorate([
    midway_1.provide(),
    midway_1.controller('/app/sugo-app')
], SugoProtalExtappController);
exports.SugoProtalExtappController = SugoProtalExtappController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbnRyb2xsZXIvYXBwbGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUFrRjtBQUNsRiwrRUFBK0U7QUFDL0UsMkVBQTBFO0FBQzFFLHlGQUE0RjtBQUM1Riw2RkFBMkY7QUFDM0YscUdBQThGO0FBQzlGLG9EQUE4QztBQUM5Qyx5Q0FBNEI7QUFDNUIsNENBQXNDO0FBQ3RDLHdEQUFzRDtBQUN0RCw0QkFBMkI7QUFJM0IsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7SUFtQnJDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBWTs7UUFDdEIsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFFdEIsTUFBTSxLQUFLLFNBQUcsR0FBRyxDQUFDLE1BQU0sMENBQUUsRUFBRSxDQUFBO1FBRTVCLElBQUksR0FBRyxDQUFBO1FBQ1AsSUFBSSxPQUFPLEdBQVE7WUFDakIsS0FBSyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDL0IsQ0FBQTtRQUNELElBQUksS0FBSyxFQUFFO1lBQ1QsT0FBTyxHQUFHO2dCQUNSLEtBQUssRUFBRTtvQkFDTCxFQUFFLEVBQUUsS0FBSztpQkFDVjthQUNGLENBQUE7U0FDRjtRQUVELElBQUksSUFBSSxFQUFFO1lBQ1IsT0FBTyxHQUFHO2dCQUNSLEtBQUssRUFBRTtvQkFDTCxDQUFDLGNBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTt3QkFDUDs0QkFDRSxJQUFJLEVBQUU7Z0NBQ0osQ0FBQyxjQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLEdBQUc7NkJBQ3ZCO3lCQUNGO3dCQUNEOzRCQUNFLFdBQVcsRUFBRTtnQ0FDWCxDQUFDLGNBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJ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
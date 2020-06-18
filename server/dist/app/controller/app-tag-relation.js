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
const app_tag_relation_service_1 = require("../../lib/service/app-tag-relation.service");
const portaltagapp_order_service_1 = require("../../lib/service/portaltagapp_order.service");
const Response_1 = require("../../common/Response");
const db_1 = require("../../lib/models/db");
const sugo_utils_1 = require("../../common/sugo-utils");
const _ = require("lodash");
let SugoProtalExtAppTagRelationController = class SugoProtalExtAppTagRelationController {
    async query(ctx) {
        const res = await this.sugoProtalAppTagRelationService.findAll();
        ctx.body = Response_1.Response.ok(res);
    }
    async create(ctx) {
        const { shouldAdd = [], shouldDel = [], shouldChange_tagAppOrderMap = {}, appId, user = {} } = ctx.q;
        const { id: userId } = user;
        let res = await db_1.DB.sequelize.transaction(async (transaction) => {
            await sugo_utils_1.mapAwaitAll(shouldAdd, async (item) => {
                const newItem = {
                    extappId: appId,
                    extappTagId: item
                };
                await this.sugoProtalAppTagRelationService.findOrCreate({
                    where: newItem,
                    defaults: Object.assign(Object.assign({}, newItem), { createdBy: userId }),
                    transaction
                });
            });
            await sugo_utils_1.mapAwaitAll(shouldDel, async (item) => {
                const delItem = {
                    extappId: appId,
                    extappTagId: item
                };
                await this.sugoProtalAppTagRelationService.destory({
                    where: delItem,
                    transaction
                });
            });
            for (let k in shouldChange_tagAppOrderMap) {
                const newOrder = {
                    extappTagId: k
                };
                const existed = await this.sugoProtalTagAppOrderService.findOne({
                    where: newOrder,
                    transaction
                });
                if (existed) {
                    await this.sugoProtalTagAppOrderService.update(Object.assign(Object.assign({}, newOrder), { appIdOrder: shouldChange_tagAppOrderMap[k], updatedBy: userId }), {
                        where: newOrder,
                        transaction
                    });
                }
                else {
                    await this.sugoProtalTagAppOrderService.create(Object.assign(Object.assign({}, newOrder), { appIdOrder: shouldChange_tagAppOrderMap[k], createdBy: userId }), { transaction });
                }
            }
            const hasTagWhere = {
                extappId: appId
            };
            const hasTag = await this.sugoProtalAppTagRelationService.findOne({
                where: hasTagWhere,
                transaction,
                raw: true
            });
            if (hasTag)
                return true;
            const unTypedTag = {
                extappId: appId,
                extappTagId: 'unTyped'
            };
            await this.sugoProtalAppTagRelationService.create(Object.assign(Object.assign({}, unTypedTag), { createdBy: userId }), { transaction });
            const unTypedTagAppOrderWhere = {
                extappTagId: 'unTyped'
            };
            const unTypedTagAppOrder = await this.sugoProtalTagAppOrderService.findOne({
                where: unTypedTagAppOrderWhere,
                transaction,
                raw: true
            });
            const nextUnTypedTagAppOrder = {
                appIdOrder: [appId]
            };
            if (unTypedTagAppOrder) {
                unTypedTagAppOrder.appIdOrder.push(appId);
                nextUnTypedTagAppOrder.appIdOrder = unTypedTagAppOrder.appIdOrder;
                await this.sugoProtalTagAppOrderService.update(Object.assign(Object.assign({}, nextUnTypedTagAppOrder), { updateBy: userId }), { where: { id: unTypedTagAppOrder.id }, transaction });
            }
            else {
                await this.sugoProtalTagAppOrderService.create(Object.assign(Object.assign({}, nextUnTypedTagAppOrder), { createdBy: userId }));
            }
            return true;
        });
        if (!res)
            return ctx.body = Response_1.Response.fail({ msg: '标签设置失败' });
        ctx.body = Response_1.Response.ok({ msg: 'success' });
    }
    async batchCreate(ctx) {
        const { data = [], user = {} } = ctx.q;
        const { id: userId } = user;
        const shouldRemoveUntypedArr = data.filter((i) => i.extappTagId === "unTyped");
        let res = await db_1.DB.sequelize.transaction(async (transaction) => {
            var _a;
            //打标签
            await sugo_utils_1.mapAwaitAll(data, async (item) => {
                let where = {
                    extappId: item.extappId,
                    extappTagId: item.extappTagId
                };
                const existed = await this.sugoProtalAppTagRelationService.findOne({
                    where,
                    transaction
                });
                if (existed)
                    return;
                await this.sugoProtalAppTagRelationService.create(Object.assign(Object.assign({}, item), { createdBy: userId }));
            });
            const appTagIdMap = {};
            data.map((i) => {
                if (!appTagIdMap[i.extappTagId])
                    appTagIdMap[i.extappTagId] = [];
                appTagIdMap[i.extappTagId].push(i.extappId);
            });
            //标签-应用排序 表 往里插入应用 批量打标签时 只增不删
            for (let k in appTagIdMap) {
                const newOrder = {
                    extappTagId: k
                };
                const existed = await this.sugoProtalTagAppOrderService.findOne({
                    where: newOrder,
                    raw: true,
                    transaction
                });
                if (existed) {
                    await this.sugoProtalTagAppOrderService.update(Object.assign(Object.assign({}, newOrder), { appIdOrder: _.union((((_a = existed) === null || _a === void 0 ? void 0 : _a.appIdOrder) || []), appTagIdMap[k]), updatedBy: userId }), {
                        where: newOrder,
                        transaction
                    });
                }
                else {
                    await this.sugoProtalTagAppOrderService.create(Object.assign(Object.assign({}, newOrder), { appIdOrder: appTagIdMap[k], createdBy: userId }), { transaction });
                }
            }
            await sugo_utils_1.mapAwaitAll(shouldRemoveUntypedArr, async (item) => {
                await this.sugoProtalAppTagRelationService.destory({
                    where: {
                        extappId: item.extappId,
                        extappTagId: 'unTyped'
                    },
                    transaction
                });
            });
            const unTypedAppTagOrderWhere = {
                extappTagId: 'unTyped'
            };
            let unTYpedAppTagOrder = await this.sugoProtalTagAppOrderService.findOne({
                where: unTypedAppTagOrderWhere,
                transaction,
                raw: true
            });
            const shouldRemoveUntypedAppIds = shouldRemoveUntypedArr.map((i) => i.extappId);
            if (!unTYpedAppTagOrder)
                return true;
            let nextOrder = unTYpedAppTagOrder.appIdOrder.filter((i) => !shouldRemoveUntypedAppIds.includes(i));
            const updateUnTYpedAppTagOrder = {
                appIdOrder: nextOrder,
                updateBy: userId
            };
            await this.sugoProtalTagAppOrderService.update(updateUnTYpedAppTagOrder, { where: unTypedAppTagOrderWhere, transaction });
            return true;
        });
        if (!res)
            return ctx.body = Response_1.Response.fail({});
        return ctx.body = Response_1.Response.ok({
            success: true
        });
    }
    async update(ctx) {
        const res = await this.sugoProtalAppTagRelationService.update(ctx.q, {
            where: { id: ctx.q.id }
        });
        ctx.body = Response_1.Response.ok(res);
    }
    async destroy(ctx) {
        const res = await this.sugoProtalAppTagRelationService.destroyById(ctx.params.id);
        ctx.body = Response_1.Response.ok(res);
    }
    async changeOrder(ctx) {
        const { extappTagId, appIdOrder, user = {} } = ctx.q;
        const { id: userId } = user;
        const updateWhere = {
            extappTagId
        };
        await this.sugoProtalTagAppOrderService.update(Object.assign(Object.assign({}, updateWhere), { appIdOrder: appIdOrder, updatedBy: userId }), {
            where: updateWhere
        });
        return ctx.body = Response_1.Response.ok({});
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", app_tag_relation_service_1.SugoProtalAppTagRelationService)
], SugoProtalExtAppTagRelationController.prototype, "sugoProtalAppTagRelationService", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", portaltagapp_order_service_1.SugoProtalTagAppOrderService)
], SugoProtalExtAppTagRelationController.prototype, "sugoProtalTagAppOrderService", void 0);
__decorate([
    midway_1.get('/:id?'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoProtalExtAppTagRelationController.prototype, "query", null);
__decorate([
    midway_1.post('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoProtalExtAppTagRelationController.prototype, "create", null);
__decorate([
    midway_1.post('/batch-add-tag'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoProtalExtAppTagRelationController.prototype, "batchCreate", null);
__decorate([
    midway_1.put('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoProtalExtAppTagRelationController.prototype, "update", null);
__decorate([
    midway_1.del('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoProtalExtAppTagRelationController.prototype, "destroy", null);
__decorate([
    midway_1.post('/change-order'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoProtalExtAppTagRelationController.prototype, "changeOrder", null);
SugoProtalExtAppTagRelationController = __decorate([
    midway_1.provide(),
    midway_1.controller('/app/sugo-app-tag-relation')
], SugoProtalExtAppTagRelationController);
exports.SugoProtalExtAppTagRelationController = SugoProtalExtAppTagRelationController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXRhZy1yZWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29udHJvbGxlci9hcHAtdGFnLXJlbGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsbUNBQWtGO0FBQ2xGLHlGQUE0RjtBQUM1Riw2RkFBMkY7QUFDM0Ysb0RBQThDO0FBQzlDLDRDQUFzQztBQUN0Qyx3REFBcUQ7QUFDckQsNEJBQTJCO0FBSTNCLElBQWEscUNBQXFDLEdBQWxELE1BQWEscUNBQXFDO0lBU2hELEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBWTtRQUN0QixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNoRSxHQUFHLENBQUMsSUFBSSxHQUFHLG1CQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzdCLENBQUM7SUFHRCxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQVk7UUFDdkIsTUFBTSxFQUFFLFNBQVMsR0FBRyxFQUFFLEVBQUUsU0FBUyxHQUFHLEVBQUUsRUFBRSwyQkFBMkIsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFHLElBQUksR0FBRyxFQUFFLEVBQUUsR0FDM0YsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUVQLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBRTNCLElBQUksR0FBRyxHQUFHLE1BQU0sT0FBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFdBQWdCLEVBQUUsRUFBRTtZQUNsRSxNQUFNLHdCQUFXLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxJQUFTLEVBQUUsRUFBRTtnQkFDOUMsTUFBTSxPQUFPLEdBQVE7b0JBQ25CLFFBQVEsRUFBRSxLQUFLO29CQUNmLFdBQVcsRUFBRSxJQUFJO2lCQUNsQixDQUFBO2dCQUNELE1BQU0sSUFBSSxDQUFDLCtC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
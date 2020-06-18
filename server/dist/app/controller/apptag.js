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
const portaltag_service_1 = require("../../lib/service/portaltag.service");
const portaltag_order_service_1 = require("../../lib/service/portaltag_order.service");
const portaltagapp_order_service_1 = require("../../lib/service/portaltagapp_order.service");
const app_tag_relation_service_1 = require("../../lib/service/app-tag-relation.service");
const application_service_1 = require("../../lib/service/application.service");
const db_1 = require("../../lib/models/db");
const sequelize_1 = require("sequelize");
const Response_1 = require("../../common/Response");
const _ = require("lodash");
const sugo_utils_1 = require("../../common/sugo-utils");
let SugoProtalTagController = class SugoProtalTagController {
    async getTagAsMenu(ctx) {
        const { user } = ctx.q;
        const { appsPermissions } = user;
        if (!appsPermissions[0]) {
            return ctx.body = Response_1.Response.fail({});
        }
        const queryAppWhere = {};
        if (appsPermissions[0] !== 'all') {
            queryAppWhere.id = {
                [sequelize_1.Op.in]: appsPermissions
            };
        }
        const auditApp = await this.sugoPortalExtAppService.findAll({
            where: queryAppWhere,
            attributes: ['id', 'name'],
            raw: true
        });
        const appIdSet = auditApp.map((i) => i.id);
        const queryAllRelatedTagWhere = {
            extappId: {
                [sequelize_1.Op.in]: appIdSet
            }
        };
        const queryAllRelatedTagOption = {
            where: queryAllRelatedTagWhere,
            attributes: [[sequelize_1.fn('DISTINCT', sequelize_1.col('extapp_tag_id')), 'extappTagId']],
            raw: true
        };
        const relatedTag = await this.sugoProtalAppTagRelationService.findAll(queryAllRelatedTagOption);
        const kidTagsId = relatedTag.map((i) => i.extappTagId);
        const tree = await this.sugoProtalTagService.findAllKidsParents(kidTagsId);
        const tagOrders = await this.sugoProtalTagOrderService.findAll({
            raw: true
        });
        const orderMap = sugo_utils_1.dictBy(tagOrders, o => o.appTagId, v => v.order);
        function recurSort(tree, parentId = '') {
            const orderDict = sugo_utils_1.dictBy(orderMap[parentId] || [], _.identity, (tId, idx) => idx);
            const childSortedTree = _.map(tree, n => (Object.assign(Object.assign({}, n), { children: recurSort(n.children, n.id) })));
            return _.orderBy(childSortedTree, tag => { var _a; return _a = orderDict[tag.id], (_a !== null && _a !== void 0 ? _a : 9999); });
        }
        const sortedTree = recurSort(tree);
        return ctx.body = Response_1.Response.ok(sortedTree);
    }
    async query(ctx) {
        const tagList = await this.sugoProtalTagService.findAll(); // 标签集合
        const order = await this.sugoProtalTagOrderService.findAll(); // 标签顺序集合
        const tagAppOrder = await this.sugoProtalTagAppOrderService.findAll(); // 标签-应用-排序集合
        ctx.body = Response_1.Response.ok({
            tagList,
            order,
            tagAppOrder
        });
    }
    async create(ctx) {
        const { tag, user = {} } = ctx.q;
        const { id: userId } = user;
        const { newTag, orderMap } = tag;
        await db_1.DB.sequelize.transaction(async (transaction) => {
            const newTagRes = await this.sugoProtalTagService.create(Object.assign(Object.assign({}, newTag), { createdBy: userId }), { transaction });
            if (newTag.parentId) {
                if (orderMap[newTag.parentId]) {
                    orderMap[newTag.parentId].push(newTagRes.id);
                }
                else {
                    orderMap[newTag.parentId] = [newTagRes.id];
                }
            }
            const order = {
                appTagId: newTag.parentId,
                order: orderMap[newTag.parentId] || [],
                createdBy: userId
            };
            const where = {
                appTagId: newTag.parentId
            };
            if (order.appTagId) {
                const existed = await this.sugoProtalTagOrderService.findOne({
                    where,
                    transaction
                });
                const updates = {
                    appTagId: newTag.parentId,
                    order: orderMap[newTag.parentId],
                    updatedBy: userId
                };
                if (!existed) {
                    await this.sugoProtalTagOrderService.create(order, { transaction });
                }
                else {
                    await this.sugoProtalTagOrderService.update(updates, { where, transaction });
                }
            }
        });
        ctx.body = Response_1.Response.ok({});
    }
    async update(ctx) {
        const tagId = ctx.params.id;
        const newValue = _.omit(ctx.q, 'id');
        const editRes = await this.sugoProtalTagService.update(newValue, {
            where: {
                id: tagId
            }
        });
        if (editRes[0] === 1) {
            return ctx.body = Response_1.Response.ok({});
        }
        ctx.body = Response_1.Response.fail({});
    }
    async destroy(ctx) {
        if (!ctx.params.id) {
            return ctx.body = Response_1.Response.fail({});
        }
        const delRes = await db_1.DB.sequelize.transaction(async (transaction) => {
            var _a;
            const where = {
                id: ctx.params.id
            };
            const waitForDel = await this.sugoProtalTagService.findOne({
                where,
                raw: true,
                transaction
            });
            const parentId = waitForDel.parentId;
            const tagOrderWhere = {
                appTagId: parentId
            };
            const tagOrder = await this.sugoProtalTagOrderService.findOne({
                where: tagOrderWhere,
                raw: true,
                transaction
            });
            if ((_a = tagOrder) === null || _a === void 0 ? void 0 : _a.order) {
                const allChildWhere = {
                    parentId: ctx.params.id
                };
                const allChild = await this.sugoProtalTagService.findAll({
                    where: allChildWhere,
                    raw: true
                });
                const nextTagOrder = tagOrder.order.filter((i) => i !== ctx.params.id);
                allChild.map((i) => nextTagOrder.push(i.id));
                const updateOrderValue = { order: nextTagOrder };
                await this.sugoProtalTagOrderService.update(updateOrderValue, {
                    where: tagOrderWhere,
                    transaction
                });
            }
            const updateSonWhere = {
                parentId: ctx.params.id
            };
            const updateSonParentId = {
                parentId
            };
            await this.sugoProtalTagService.update(updateSonParentId, {
                where: updateSonWhere,
                transaction
            });
            await this.sugoProtalTagAppOrderService.destory({
                where: {
                    extappTagId: ctx.params.id
                },
                transaction
            });
            await this.sugoProtalAppTagRelationService.destory({
                where: {
                    extappTagId: ctx.params.id
                },
                transaction
            });
            await this.sugoProtalTagService.destory({
                where: {
                    id: ctx.params.id
                },
                transaction
            });
            return true;
        });
        if (!delRes) {
            return ctx.body = Response_1.Response.fail({});
        }
        ctx.body = Response_1.Response.ok({});
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", portaltag_service_1.SugoProtalTagService
    // 标签-排序
    )
], SugoProtalTagController.prototype, "sugoProtalTagService", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", portaltag_order_service_1.SugoProtalTagOrderService
    // 标签-应用-排序
    )
], SugoProtalTagController.prototype, "sugoProtalTagOrderService", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", portaltagapp_order_service_1.SugoProtalTagAppOrderService
    // 应用-标签-关系
    )
], SugoProtalTagController.prototype, "sugoProtalTagAppOrderService", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", app_tag_relation_service_1.SugoProtalAppTagRelationService)
], SugoProtalTagController.prototype, "sugoProtalAppTagRelationService", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", application_service_1.SugoPortalExtAppService)
], SugoProtalTagController.prototype, "sugoPortalExtAppService", void 0);
__decorate([
    midway_1.get('/tag-as-menu'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoProtalTagController.prototype, "getTagAsMenu", null);
__decorate([
    midway_1.get('/:id?'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoProtalTagController.prototype, "query", null);
__decorate([
    midway_1.post('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoProtalTagController.prototype, "create", null);
__decorate([
    midway_1.put('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoProtalTagController.prototype, "update", null);
__decorate([
    midway_1.del('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoProtalTagController.prototype, "destroy", null);
SugoProtalTagController = __decorate([
    midway_1.provide(),
    midway_1.controller('/app/sugo-app-tag')
], SugoProtalTagController);
exports.SugoProtalTagController = SugoProtalTagController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwdGFnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb250cm9sbGVyL2FwcHRhZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLG1DQUFnRjtBQUNoRiwyRUFBd0U7QUFDeEUsdUZBQW1GO0FBQ25GLDZGQUF5RjtBQUN6Rix5RkFBMEY7QUFDMUYsK0VBQTZFO0FBQzdFLDRDQUFzQztBQUN0Qyx5Q0FBcUM7QUFDckMsb0RBQThDO0FBQzlDLDRCQUEyQjtBQUMzQix3REFBOEM7QUFJOUMsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7SUFxQmxDLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBWTtRQUM3QixNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUMzQixNQUFNLEVBQUUsZUFBZSxFQUFFLEdBQWtDLElBQUksQ0FBQTtRQUMvRCxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQUUsT0FBTyxHQUFHLENBQUMsSUFBSSxHQUFHLG1CQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1NBQUU7UUFFaEUsTUFBTSxhQUFhLEdBQVEsRUFBRSxDQUFBO1FBQzdCLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRTtZQUNoQyxhQUFhLENBQUMsRUFBRSxHQUFHO2dCQUNqQixDQUFDLGNBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxlQUFlO2FBQ3pCLENBQUE7U0FDRjtRQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQztZQUMxRCxLQUFLLEVBQUUsYUFBYTtZQUNwQixVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO1lBQzFCLEdBQUcsRUFBRSxJQUFJO1NBQ1YsQ0FBQyxDQUFBO1FBRUYsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcs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
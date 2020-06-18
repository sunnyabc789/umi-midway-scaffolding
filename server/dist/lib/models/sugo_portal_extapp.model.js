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
const sequelize_typescript_1 = require("sequelize-typescript");
const midway_1 = require("midway");
const shortid_1 = require("shortid");
exports.factory = () => SugoPortalExtApp;
midway_1.providerWrapper([
    {
        id: 'SugoPortalExtApp',
        provider: exports.factory,
    },
]);
/*
@Scopes(() => ({
  // a self-defined scope means "non-soft-deleted rows"
  avaliable: {
    where: { status: 1 },
  },
}))
*/
let SugoPortalExtApp = class SugoPortalExtApp extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(32),
        primaryKey: true,
        defaultValue: shortid_1.generate
    }),
    __metadata("design:type", String)
], SugoPortalExtApp.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(64),
        allowNull: false,
        comment: '中文名',
    }),
    __metadata("design:type", String)
], SugoPortalExtApp.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false,
        comment: '应用链接',
    }),
    __metadata("design:type", String)
], SugoPortalExtApp.prototype, "url", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.TEXT,
        comment: '应用信息',
    }),
    __metadata("design:type", String)
], SugoPortalExtApp.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Column({
        field: 'open_way',
        type: sequelize_typescript_1.DataType.STRING(64),
        comment: '打开方式',
    }),
    __metadata("design:type", String)
], SugoPortalExtApp.prototype, "openWay", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.TEXT,
        comment: '略缩图',
    }),
    __metadata("design:type", String)
], SugoPortalExtApp.prototype, "img", void 0);
__decorate([
    sequelize_typescript_1.Column({
        field: 'created_by',
        type: sequelize_typescript_1.DataType.STRING(32),
        allowNull: false,
        comment: '用户ID'
    }),
    __metadata("design:type", String)
], SugoPortalExtApp.prototype, "createdBy", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column({
        field: 'created_at',
        comment: '创建时间'
    }),
    __metadata("design:type", Date)
], SugoPortalExtApp.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.Column({
        field: 'updated_by',
        type: sequelize_typescript_1.DataType.STRING(32),
        comment: '用户ID',
        allowNull: true
    }),
    __metadata("design:type", String)
], SugoPortalExtApp.prototype, "updatedBy", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column({
        field: 'updated_at',
        comment: '更新时间'
    }),
    __metadata("design:type", Date)
], SugoPortalExtApp.prototype, "updatedAt", void 0);
SugoPortalExtApp = __decorate([
    sequelize_typescript_1.Table({
        // you can claim your tableName explicitly
        freezeTableName: true,
        tableName: 'sugo_portal_extapp'
    })
], SugoPortalExtApp);
exports.default = SugoPortalExtApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vnb19wb3J0YWxfZXh0YXBwLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9tb2RlbHMvc3Vnb19wb3J0YWxfZXh0YXBwLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQXlGO0FBQ3pGLG1DQUFzQztBQUN0QyxxQ0FBa0M7QUFFckIsUUFBQSxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUE7QUFFN0Msd0JBQWUsQ0FBQztJQUNkO1FBQ0UsRUFBRSxFQUFFLGtCQUFrQjtRQUN0QixRQUFRLEVBQUUsZUFBTztLQUNsQjtDQUNGLENBQUMsQ0FBQTtBQU1GOzs7Ozs7O0VBT0U7QUFNRixJQUFxQixnQkFBZ0IsR0FBckMsTUFBcUIsZ0JBQWlCLFNBQVEsNEJBQXVCO0NBaUZwRSxDQUFBO0FBMUVDO0lBTEMsNkJBQU0sQ0FBQztRQUNOLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDekIsVUFBVSxFQUFFLElBQUk7UUFDaEIsWUFBWSxFQUFFLGtCQUFRO0tBQ3ZCLENBQUM7OzRDQUNRO0FBT1Y7SUFMQyw2QkFBTSxDQUFDO1FBQ04sSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN6QixTQUFTLEVBQUUsS0FBSztRQUNoQixPQUFPLEVBQUUsS0FBSztLQUNmLENBQUM7OzhDQUNVO0FBT1o7SUFMQyw2QkFBTSxDQUFDO1FBQ04sSUFBSSxFQUFFLCtCQUFRLENBQUMsSUFBSTtRQUNuQixTQUFTLEVBQUUsS0FBSztRQUNoQixPQUFPLEVBQUUsTUFBTTtLQUNoQixDQUFDOzs2Q0FDUztBQU1YO0lBSkMsNkJBQU0sQ0FBQztRQUNOLElBQUksRUFBRSwrQkFBUSxDQUFDLElBQUk7UUFDbkIsT0FBTyxFQUFFLE1BQU07S0FDaEIsQ0FBQzs7cURBQ2lCO0FBT25CO0lBTEMsNkJBQU0sQ0FBQztRQUNOLEtBQUssRUFBRSxVQUFVO1FBQ2pCLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDekIsT0FBTyxFQUFFLE1BQU07S0FDaEIsQ0FBQzs7aURBQ2E7QUFhZjtJQUpDLDZCQUFNLENBQUM7UUFDTixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxJQUFJO1FBQ25CLE9BQU8sRUFBRSxLQUFLO0tBQ2YsQ0FBQzs7NkNBQ1M7QUFTWDtJQU5DLDZCQUFNLENBQUM7UUFDTixLQUFLLEVBQUUsWUFBWTtRQUNuQixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3pCLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLE9BQU8sRUFBRSxNQUFNO0tBQ2hCLENBQUM7O21EQUNlO0FBT2pCO0lBTEMsZ0NBQVM7SUFDVCw2QkFBTSxDQUFDO1FBQ04sS0FBSyxFQUFFLFlBQVk7UUFDbkIsT0FBTyxFQUFFLE1BQU07S0FDZixDQUFDOzhCQUNRLElBQUk7bURBQUE7QUFRZjtJQU5DLDZCQUFNLENBQUM7UUFDTixLQUFLLEVBQUUsWUFBWTtRQUNuQixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3pCLE9BQU8sRUFBRSxNQUFNO1FBQ2YsU0FBUyxFQUFFLElBQUk7S0FDaEIsQ0FBQzs7bURBQ2U7QUFPakI7SUFMQyxnQ0FBUztJQUNULDZCQUFNLENBQUM7UUFDTixLQUFLLEVBQUUsWUFBWTtRQUNuQixPQUFPLEVBQUUsTUFBTTtLQUNoQixDQUFDOzhCQUNTLElBQUk7bURBQUE7QUE5RUksZ0JBQWdCO0lBTHBDLDRCQUFLLENBQUM7UUFDTCwwQ0FBMEM7UUFDMUMsZUFBZSxFQUFFLElBQUk7UUFDckIsU0FBUyxFQUFFLG9CQUFvQjtLQUNoQyxDQUFDO0dBQ21CLGdCQUFnQixDQWlGcEM7a0JBakZvQixnQkFBZ0IifQ==
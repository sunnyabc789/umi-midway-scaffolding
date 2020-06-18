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
const sugo_protal_tag_model_1 = require("./sugo_protal_tag.model");
exports.factory = () => SugoProtalTagAppOrder;
midway_1.providerWrapper([
    {
        id: 'SugoProtalTagAppOrder',
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
let SugoProtalTagAppOrder = class SugoProtalTagAppOrder extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(32),
        primaryKey: true,
        defaultValue: shortid_1.generate
    }),
    __metadata("design:type", String)
], SugoProtalTagAppOrder.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => sugo_protal_tag_model_1.default),
    sequelize_typescript_1.Column({
        field: 'extapp_tag_id',
        type: sequelize_typescript_1.DataType.STRING(32),
        comment: '应用标签id',
    }),
    __metadata("design:type", String)
], SugoProtalTagAppOrder.prototype, "extappTagId", void 0);
__decorate([
    sequelize_typescript_1.Column({
        field: 'appid_order',
        type: sequelize_typescript_1.DataType.JSON,
        allowNull: false,
        defaultValue: [],
        comment: '应用id顺序',
    }),
    __metadata("design:type", Array)
], SugoProtalTagAppOrder.prototype, "appIdOrder", void 0);
__decorate([
    sequelize_typescript_1.Column({
        field: 'created_by',
        type: sequelize_typescript_1.DataType.STRING(32),
        allowNull: false,
        comment: '用户ID'
    }),
    __metadata("design:type", String)
], SugoProtalTagAppOrder.prototype, "createdBy", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column({
        field: 'created_at',
        comment: '创建时间'
    }),
    __metadata("design:type", Date)
], SugoProtalTagAppOrder.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.Column({
        field: 'updated_by',
        type: sequelize_typescript_1.DataType.STRING(32),
        comment: '用户ID',
        allowNull: true
    }),
    __metadata("design:type", String)
], SugoProtalTagAppOrder.prototype, "updatedBy", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column({
        field: 'updated_at',
        comment: '更新时间'
    }),
    __metadata("design:type", Date)
], SugoProtalTagAppOrder.prototype, "updatedAt", void 0);
SugoProtalTagAppOrder = __decorate([
    sequelize_typescript_1.Table({
        // you can claim your tableName explicitly
        freezeTableName: true,
        tableName: 'sugo_protal_tag_app_order'
    })
], SugoProtalTagAppOrder);
exports.default = SugoProtalTagAppOrder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vnb19wcm90YWxfdGFnX2FwcF9vcmRlci5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbW9kZWxzL3N1Z29fcHJvdGFsX3RhZ19hcHBfb3JkZXIubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrREFBcUc7QUFDckcsbUNBQXNDO0FBQ3RDLHFDQUFrQztBQUNsQyxtRUFBbUQ7QUFFdEMsUUFBQSxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMscUJBQXFCLENBQUE7QUFFbEQsd0JBQWUsQ0FBQztJQUNkO1FBQ0UsRUFBRSxFQUFFLHVCQUF1QjtRQUMzQixRQUFRLEVBQUUsZUFBTztLQUNsQjtDQUNGLENBQUMsQ0FBQTtBQU1GOzs7Ozs7O0VBT0U7QUFNRixJQUFxQixxQkFBcUIsR0FBMUMsTUFBcUIscUJBQXNCLFNBQVEsNEJBQTRCO0NBMkQ5RSxDQUFBO0FBcERDO0lBTEMsNkJBQU0sQ0FBQztRQUNOLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDekIsVUFBVSxFQUFFLElBQUk7UUFDaEIsWUFBWSxFQUFFLGtCQUFRO0tBQ3ZCLENBQUM7O2lEQUNRO0FBU1Y7SUFOQyxpQ0FBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLCtCQUFhLENBQUM7SUFDL0IsNkJBQU0sQ0FBQztRQUNOLEtBQUssRUFBRSxlQUFlO1FBQ3RCLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDekIsT0FBTyxFQUFFLFFBQVE7S0FDbEIsQ0FBQzs7MERBQ2lCO0FBU25CO0lBUEMsNkJBQU0sQ0FBQztRQUNOLEtBQUssRUFBRSxhQUFhO1FBQ3BCLElBQUksRUFBRSwrQkFBUSxDQUFDLElBQUk7UUFDbkIsU0FBUyxFQUFFLEtBQUs7UUFDaEIsWUFBWSxFQUFFLEVBQUU7UUFDaEIsT0FBTyxFQUFFLFFBQVE7S0FDbEIsQ0FBQzs7eURBQ2tCO0FBU3BCO0lBTkMsNkJBQU0sQ0FBQztRQUNOLEtBQUssRUFBRSxZQUFZO1FBQ25CLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDekIsU0FBUyxFQUFFLEtBQUs7UUFDaEIsT0FBTyxFQUFFLE1BQU07S0FDaEIsQ0FBQzs7d0RBQ2U7QUFPakI7SUFMQyxnQ0FBUztJQUNULDZCQUFNLENBQUM7UUFDTixLQUFLLEVBQUUsWUFBWTtRQUNuQixPQUFPLEVBQUUsTUFBTTtLQUNmLENBQUM7OEJBQ1EsSUFBSTt3REFBQTtBQVFmO0lBTkMsNkJBQU0sQ0FBQztRQUNOLEtBQUssRUFBRSxZQUFZO1FBQ25CLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDekIsT0FBTyxFQUFFLE1BQU07UUFDZixTQUFTLEVBQUUsSUFBSTtLQUNoQixDQUFDOzt3REFDZTtBQU9qQjtJQUxDLGdDQUFTO0lBQ1QsNkJBQU0sQ0FBQztRQUNOLEtBQUssRUFBRSxZQUFZO1FBQ25CLE9BQU8sRUFBRSxNQUFNO0tBQ2hCLENBQUM7OEJBQ1MsSUFBSTt3REFBQTtBQXhESSxxQkFBcUI7SUFMekMsNEJBQUssQ0FBQztRQUNMLDBDQUEwQztRQUMxQyxlQUFlLEVBQUUsSUFBSTtRQUNyQixTQUFTLEVBQUUsMkJBQTJCO0tBQ3ZDLENBQUM7R0FDbUIscUJBQXFCLENBMkR6QztrQkEzRG9CLHFCQUFxQiJ9
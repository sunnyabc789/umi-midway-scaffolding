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
const sugo_portal_extapp_model_1 = require("./sugo_portal_extapp.model");
exports.factory = () => SugoUserExtappRelation;
midway_1.providerWrapper([
    {
        id: 'SugoUserExtappRelation',
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
let SugoUserExtappRelation = class SugoUserExtappRelation extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(32),
        primaryKey: true,
        defaultValue: shortid_1.generate
    }),
    __metadata("design:type", String)
], SugoUserExtappRelation.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        field: 'user_id',
        type: sequelize_typescript_1.DataType.STRING(32),
        comment: '用户id',
    }),
    __metadata("design:type", String)
], SugoUserExtappRelation.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => sugo_portal_extapp_model_1.default),
    sequelize_typescript_1.Column({
        field: 'extapp_id',
        type: sequelize_typescript_1.DataType.STRING(32),
        comment: '应用id',
    }),
    __metadata("design:type", String)
], SugoUserExtappRelation.prototype, "extappId", void 0);
__decorate([
    sequelize_typescript_1.Column({
        field: 'created_by',
        type: sequelize_typescript_1.DataType.STRING(32),
        allowNull: false,
        comment: '用户ID'
    }),
    __metadata("design:type", String)
], SugoUserExtappRelation.prototype, "createdBy", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column({
        field: 'created_at',
        comment: '创建时间'
    }),
    __metadata("design:type", Date)
], SugoUserExtappRelation.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.Column({
        field: 'updated_by',
        type: sequelize_typescript_1.DataType.STRING(32),
        comment: '用户ID',
        allowNull: true
    }),
    __metadata("design:type", String)
], SugoUserExtappRelation.prototype, "updatedBy", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column({
        field: 'updated_at',
        comment: '更新时间'
    }),
    __metadata("design:type", Date)
], SugoUserExtappRelation.prototype, "updatedAt", void 0);
SugoUserExtappRelation = __decorate([
    sequelize_typescript_1.Table({
        // you can claim your tableName explicitly
        freezeTableName: true,
        tableName: 'sugo_user_extapp_relation'
    })
], SugoUserExtappRelation);
exports.default = SugoUserExtappRelation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vnb191c2VyX2V4dGFwcF9yZWxhdGlvbi5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbW9kZWxzL3N1Z29fdXNlcl9leHRhcHBfcmVsYXRpb24ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrREFBcUc7QUFDckcsbUNBQXNDO0FBQ3RDLHFDQUFrQztBQUNsQyx5RUFBeUQ7QUFFNUMsUUFBQSxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsc0JBQXNCLENBQUE7QUFFbkQsd0JBQWUsQ0FBQztJQUNkO1FBQ0UsRUFBRSxFQUFFLHdCQUF3QjtRQUM1QixRQUFRLEVBQUUsZUFBTztLQUNsQjtDQUNGLENBQUMsQ0FBQTtBQU1GOzs7Ozs7O0VBT0U7QUFNRixJQUFxQixzQkFBc0IsR0FBM0MsTUFBcUIsc0JBQXVCLFNBQVEsNEJBQTZCO0NBd0RoRixDQUFBO0FBakRDO0lBTEMsNkJBQU0sQ0FBQztRQUNOLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDekIsVUFBVSxFQUFFLElBQUk7UUFDaEIsWUFBWSxFQUFFLGtCQUFRO0tBQ3ZCLENBQUM7O2tEQUNRO0FBT1Y7SUFMQyw2QkFBTSxDQUFDO1FBQ04sS0FBSyxFQUFFLFNBQVM7UUFDaEIsSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN6QixPQUFPLEVBQUUsTUFBTTtLQUNoQixDQUFDOztzREFDWTtBQVFkO0lBTkMsaUNBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxrQ0FBZ0IsQ0FBQztJQUNsQyw2QkFBTSxDQUFDO1FBQ04sS0FBSyxFQUFFLFdBQVc7UUFDbEIsSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN6QixPQUFPLEVBQUUsTUFBTTtLQUNoQixDQUFDOzt3REFDYztBQVNoQjtJQU5DLDZCQUFNLENBQUM7UUFDTixLQUFLLEVBQUUsWUFBWTtRQUNuQixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3pCLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLE9BQU8sRUFBRSxNQUFNO0tBQ2hCLENBQUM7O3lEQUNlO0FBT2pCO0lBTEMsZ0NBQVM7SUFDVCw2QkFBTSxDQUFDO1FBQ04sS0FBSyxFQUFFLFlBQVk7UUFDbkIsT0FBTyxFQUFFLE1BQU07S0FDZixDQUFDOzhCQUNRLElBQUk7eURBQUE7QUFRZjtJQU5DLDZCQUFNLENBQUM7UUFDTixLQUFLLEVBQUUsWUFBWTtRQUNuQixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3pCLE9BQU8sRUFBRSxNQUFNO1FBQ2YsU0FBUyxFQUFFLElBQUk7S0FDaEIsQ0FBQzs7eURBQ2U7QUFPakI7SUFMQyxnQ0FBUztJQUNULDZCQUFNLENBQUM7UUFDTixLQUFLLEVBQUUsWUFBWTtRQUNuQixPQUFPLEVBQUUsTUFBTTtLQUNoQixDQUFDOzhCQUNTLElBQUk7eURBQUE7QUFyREksc0JBQXNCO0lBTDFDLDRCQUFLLENBQUM7UUFDTCwwQ0FBMEM7UUFDMUMsZUFBZSxFQUFFLElBQUk7UUFDckIsU0FBUyxFQUFFLDJCQUEyQjtLQUN2QyxDQUFDO0dBQ21CLHNCQUFzQixDQXdEMUM7a0JBeERvQixzQkFBc0IifQ==
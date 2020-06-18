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
exports.factory = () => SugoExtappClickcount;
midway_1.providerWrapper([
    {
        id: 'SugoExtappClickcount',
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
let SugoExtappClickcount = class SugoExtappClickcount extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(32),
        primaryKey: true,
        defaultValue: shortid_1.generate
    }),
    __metadata("design:type", String)
], SugoExtappClickcount.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        field: 'user_id',
        type: sequelize_typescript_1.DataType.STRING(32),
        comment: '用户id',
    }),
    __metadata("design:type", String)
], SugoExtappClickcount.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => sugo_portal_extapp_model_1.default),
    sequelize_typescript_1.Column({
        field: 'extapp_id',
        type: sequelize_typescript_1.DataType.STRING(32),
        comment: '应用id',
    }),
    __metadata("design:type", String)
], SugoExtappClickcount.prototype, "extappId", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.INTEGER
    }),
    __metadata("design:type", String)
], SugoExtappClickcount.prototype, "count", void 0);
__decorate([
    sequelize_typescript_1.Column({
        field: 'created_by',
        type: sequelize_typescript_1.DataType.STRING(32),
        allowNull: false,
        comment: '用户ID'
    }),
    __metadata("design:type", String)
], SugoExtappClickcount.prototype, "createdBy", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column({
        field: 'created_at',
        comment: '创建时间'
    }),
    __metadata("design:type", Date)
], SugoExtappClickcount.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.Column({
        field: 'updated_by',
        type: sequelize_typescript_1.DataType.STRING(32),
        comment: '用户ID',
        allowNull: true
    }),
    __metadata("design:type", String)
], SugoExtappClickcount.prototype, "updatedBy", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column({
        field: 'updated_at',
        comment: '更新时间'
    }),
    __metadata("design:type", Date)
], SugoExtappClickcount.prototype, "updatedAt", void 0);
SugoExtappClickcount = __decorate([
    sequelize_typescript_1.Table({
        // you can claim your tableName explicitly
        freezeTableName: true,
        tableName: 'sugo_extapp_clickcount'
    })
], SugoExtappClickcount);
exports.default = SugoExtappClickcount;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vnb19leHRhcHBfY2xpY2tjb3VudC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbW9kZWxzL3N1Z29fZXh0YXBwX2NsaWNrY291bnQubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrREFBcUc7QUFDckcsbUNBQXNDO0FBQ3RDLHFDQUFrQztBQUNsQyx5RUFBeUQ7QUFFNUMsUUFBQSxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUE7QUFFakQsd0JBQWUsQ0FBQztJQUNkO1FBQ0UsRUFBRSxFQUFFLHNCQUFzQjtRQUMxQixRQUFRLEVBQUUsZUFBTztLQUNsQjtDQUNGLENBQUMsQ0FBQTtBQU1GOzs7Ozs7O0VBT0U7QUFNRixJQUFxQixvQkFBb0IsR0FBekMsTUFBcUIsb0JBQXFCLFNBQVEsNEJBQTJCO0NBOEQ1RSxDQUFBO0FBdkRDO0lBTEMsNkJBQU0sQ0FBQztRQUNOLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDekIsVUFBVSxFQUFFLElBQUk7UUFDaEIsWUFBWSxFQUFFLGtCQUFRO0tBQ3ZCLENBQUM7O2dEQUNRO0FBT1Y7SUFMQyw2QkFBTSxDQUFDO1FBQ04sS0FBSyxFQUFFLFNBQVM7UUFDaEIsSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN6QixPQUFPLEVBQUUsTUFBTTtLQUNoQixDQUFDOztvREFDWTtBQVFkO0lBTkMsaUNBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxrQ0FBZ0IsQ0FBQztJQUNsQyw2QkFBTSxDQUFDO1FBQ04sS0FBSyxFQUFFLFdBQVc7UUFDbEIsSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN6QixPQUFPLEVBQUUsTUFBTTtLQUNoQixDQUFDOztzREFDYztBQUtoQjtJQUhDLDZCQUFNLENBQUM7UUFDTixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxPQUFPO0tBQ3ZCLENBQUM7O21EQUNXO0FBVWI7SUFOQyw2QkFBTSxDQUFDO1FBQ04sS0FBSyxFQUFFLFlBQVk7UUFDbkIsSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN6QixTQUFTLEVBQUUsS0FBSztRQUNoQixPQUFPLEVBQUUsTUFBTTtLQUNoQixDQUFDOzt1REFDZTtBQU9qQjtJQUxDLGdDQUFTO0lBQ1QsNkJBQU0sQ0FBQztRQUNOLEtBQUssRUFBRSxZQUFZO1FBQ25CLE9BQU8sRUFBRSxNQUFNO0tBQ2YsQ0FBQzs4QkFDUSxJQUFJO3VEQUFBO0FBUWY7SUFOQyw2QkFBTSxDQUFDO1FBQ04sS0FBSyxFQUFFLFlBQVk7UUFDbkIsSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN6QixPQUFPLEVBQUUsTUFBTTtRQUNmLFNBQVMsRUFBRSxJQUFJO0tBQ2hCLENBQUM7O3VEQUNlO0FBT2pCO0lBTEMsZ0NBQVM7SUFDVCw2QkFBTSxDQUFDO1FBQ04sS0FBSyxFQUFFLFlBQVk7UUFDbkIsT0FBTyxFQUFFLE1BQU07S0FDaEIsQ0FBQzs4QkFDUyxJQUFJO3VEQUFBO0FBM0RJLG9CQUFvQjtJQUx4Qyw0QkFBSyxDQUFDO1FBQ0wsMENBQTBDO1FBQzFDLGVBQWUsRUFBRSxJQUFJO1FBQ3JCLFNBQVMsRUFBRSx3QkFBd0I7S0FDcEMsQ0FBQztHQUNtQixvQkFBb0IsQ0E4RHhDO2tCQTlEb0Isb0JBQW9CIn0=
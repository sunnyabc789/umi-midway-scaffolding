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
exports.factory = () => SugoProtalTagOrder;
midway_1.providerWrapper([
    {
        id: 'SugoProtalTagOrder',
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
let SugoProtalTagOrder = class SugoProtalTagOrder extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(32),
        primaryKey: true,
        defaultValue: shortid_1.generate
    }),
    __metadata("design:type", String)
], SugoProtalTagOrder.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        field: 'app_tag_id',
        type: sequelize_typescript_1.DataType.STRING(32)
    }),
    __metadata("design:type", String)
], SugoProtalTagOrder.prototype, "appTagId", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.JSON,
        allowNull: false,
        comment: '子标签顺序',
    }),
    __metadata("design:type", Array)
], SugoProtalTagOrder.prototype, "order", void 0);
__decorate([
    sequelize_typescript_1.Column({
        field: 'created_by',
        type: sequelize_typescript_1.DataType.STRING(32),
        allowNull: false,
        comment: '用户ID'
    }),
    __metadata("design:type", String)
], SugoProtalTagOrder.prototype, "createdBy", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column({
        field: 'created_at',
        comment: '创建时间'
    }),
    __metadata("design:type", Date)
], SugoProtalTagOrder.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.Column({
        field: 'updated_by',
        type: sequelize_typescript_1.DataType.STRING(32),
        comment: '用户ID',
        allowNull: true
    }),
    __metadata("design:type", String)
], SugoProtalTagOrder.prototype, "updatedBy", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column({
        field: 'updated_at',
        comment: '更新时间'
    }),
    __metadata("design:type", Date)
], SugoProtalTagOrder.prototype, "updatedAt", void 0);
SugoProtalTagOrder = __decorate([
    sequelize_typescript_1.Table({
        // you can claim your tableName explicitly
        freezeTableName: true,
        tableName: 'sugo_protal_tag_order'
    })
], SugoProtalTagOrder);
exports.default = SugoProtalTagOrder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vnb19wcm90YWxfdGFnX29yZGVyLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9tb2RlbHMvc3Vnb19wcm90YWxfdGFnX29yZGVyLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQXlGO0FBQ3pGLG1DQUFzQztBQUN0QyxxQ0FBa0M7QUFFckIsUUFBQSxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQUE7QUFFL0Msd0JBQWUsQ0FBQztJQUNkO1FBQ0UsRUFBRSxFQUFFLG9CQUFvQjtRQUN4QixRQUFRLEVBQUUsZUFBTztLQUNsQjtDQUNGLENBQUMsQ0FBQTtBQU1GOzs7Ozs7O0VBT0U7QUFNRixJQUFxQixrQkFBa0IsR0FBdkMsTUFBcUIsa0JBQW1CLFNBQVEsNEJBQXlCO0NBd0R4RSxDQUFBO0FBakRDO0lBTEMsNkJBQU0sQ0FBQztRQUNOLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDekIsVUFBVSxFQUFFLElBQUk7UUFDaEIsWUFBWSxFQUFFLGtCQUFRO0tBQ3ZCLENBQUM7OzhDQUNRO0FBT1Y7SUFKQyw2QkFBTSxDQUFDO1FBQ04sS0FBSyxFQUFFLFlBQVk7UUFDbkIsSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztLQUMxQixDQUFDOztvREFDYztBQU9oQjtJQUxDLDZCQUFNLENBQUM7UUFDTixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxJQUFJO1FBQ25CLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLE9BQU8sRUFBRSxPQUFPO0tBQ2pCLENBQUM7O2lEQUNhO0FBVWY7SUFOQyw2QkFBTSxDQUFDO1FBQ04sS0FBSyxFQUFFLFlBQVk7UUFDbkIsSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN6QixTQUFTLEVBQUUsS0FBSztRQUNoQixPQUFPLEVBQUUsTUFBTTtLQUNoQixDQUFDOztxREFDZTtBQU9qQjtJQUxDLGdDQUFTO0lBQ1QsNkJBQU0sQ0FBQztRQUNOLEtBQUssRUFBRSxZQUFZO1FBQ25CLE9BQU8sRUFBRSxNQUFNO0tBQ2YsQ0FBQzs4QkFDUSxJQUFJO3FEQUFBO0FBUWY7SUFOQyw2QkFBTSxDQUFDO1FBQ04sS0FBSyxFQUFFLFlBQVk7UUFDbkIsSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN6QixPQUFPLEVBQUUsTUFBTTtRQUNmLFNBQVMsRUFBRSxJQUFJO0tBQ2hCLENBQUM7O3FEQUNlO0FBT2pCO0lBTEMsZ0NBQVM7SUFDVCw2QkFBTSxDQUFDO1FBQ04sS0FBSyxFQUFFLFlBQVk7UUFDbkIsT0FBTyxFQUFFLE1BQU07S0FDaEIsQ0FBQzs4QkFDUyxJQUFJO3FEQUFBO0FBckRJLGtCQUFrQjtJQUx0Qyw0QkFBSyxDQUFDO1FBQ0wsMENBQTBDO1FBQzFDLGVBQWUsRUFBRSxJQUFJO1FBQ3JCLFNBQVMsRUFBRSx1QkFBdUI7S0FDbkMsQ0FBQztHQUNtQixrQkFBa0IsQ0F3RHRDO2tCQXhEb0Isa0JBQWtCIn0=
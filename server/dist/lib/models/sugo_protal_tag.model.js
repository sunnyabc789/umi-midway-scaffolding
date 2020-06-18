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
exports.factory = () => SugoProtalTag;
midway_1.providerWrapper([
    {
        id: 'SugoProtalTag',
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
let SugoProtalTag = class SugoProtalTag extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(32),
        primaryKey: true,
        defaultValue: shortid_1.generate
    }),
    __metadata("design:type", String)
], SugoProtalTag.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        field: 'parent_id',
        type: sequelize_typescript_1.DataType.STRING(32)
    }),
    __metadata("design:type", String)
], SugoProtalTag.prototype, "parentId", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(64),
        allowNull: false,
        comment: '标签名称',
    }),
    __metadata("design:type", String)
], SugoProtalTag.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column({
        field: 'created_by',
        type: sequelize_typescript_1.DataType.STRING(32),
        allowNull: false,
        comment: '用户ID'
    }),
    __metadata("design:type", String)
], SugoProtalTag.prototype, "createdBy", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column({
        field: 'created_at',
        comment: '创建时间'
    }),
    __metadata("design:type", Date)
], SugoProtalTag.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.Column({
        field: 'updated_by',
        type: sequelize_typescript_1.DataType.STRING(32),
        comment: '用户ID',
        allowNull: true
    }),
    __metadata("design:type", String)
], SugoProtalTag.prototype, "updatedBy", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column({
        field: 'updated_at',
        comment: '更新时间'
    }),
    __metadata("design:type", Date)
], SugoProtalTag.prototype, "updatedAt", void 0);
SugoProtalTag = __decorate([
    sequelize_typescript_1.Table({
        // you can claim your tableName explicitly
        freezeTableName: true,
        tableName: 'sugo_protal_tag'
    })
], SugoProtalTag);
exports.default = SugoProtalTag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vnb19wcm90YWxfdGFnLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9tb2RlbHMvc3Vnb19wcm90YWxfdGFnLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQXlGO0FBQ3pGLG1DQUFzQztBQUN0QyxxQ0FBa0M7QUFFckIsUUFBQSxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFBO0FBRTFDLHdCQUFlLENBQUM7SUFDZDtRQUNFLEVBQUUsRUFBRSxlQUFlO1FBQ25CLFFBQVEsRUFBRSxlQUFPO0tBQ2xCO0NBQ0YsQ0FBQyxDQUFBO0FBTUY7Ozs7Ozs7RUFPRTtBQU1GLElBQXFCLGFBQWEsR0FBbEMsTUFBcUIsYUFBYyxTQUFRLDRCQUFvQjtDQXdEOUQsQ0FBQTtBQWpEQztJQUxDLDZCQUFNLENBQUM7UUFDTixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3pCLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLFlBQVksRUFBRSxrQkFBUTtLQUN2QixDQUFDOzt5Q0FDUTtBQU9WO0lBSkMsNkJBQU0sQ0FBQztRQUNOLEtBQUssRUFBRSxXQUFXO1FBQ2xCLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7S0FDMUIsQ0FBQzs7K0NBQ2M7QUFPaEI7SUFMQyw2QkFBTSxDQUFDO1FBQ04sSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN6QixTQUFTLEVBQUUsS0FBSztRQUNoQixPQUFPLEVBQUUsTUFBTTtLQUNoQixDQUFDOzsyQ0FDVTtBQVVaO0lBTkMsNkJBQU0sQ0FBQztRQUNOLEtBQUssRUFBRSxZQUFZO1FBQ25CLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDekIsU0FBUyxFQUFFLEtBQUs7UUFDaEIsT0FBTyxFQUFFLE1BQU07S0FDaEIsQ0FBQzs7Z0RBQ2U7QUFPakI7SUFMQyxnQ0FBUztJQUNULDZCQUFNLENBQUM7UUFDTixLQUFLLEVBQUUsWUFBWTtRQUNuQixPQUFPLEVBQUUsTUFBTTtLQUNmLENBQUM7OEJBQ1EsSUFBSTtnREFBQTtBQVFmO0lBTkMsNkJBQU0sQ0FBQztRQUNOLEtBQUssRUFBRSxZQUFZO1FBQ25CLElBQUksRUFBRSwrQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDekIsT0FBTyxFQUFFLE1BQU07UUFDZixTQUFTLEVBQUUsSUFBSTtLQUNoQixDQUFDOztnREFDZTtBQU9qQjtJQUxDLGdDQUFTO0lBQ1QsNkJBQU0sQ0FBQztRQUNOLEtBQUssRUFBRSxZQUFZO1FBQ25CLE9BQU8sRUFBRSxNQUFNO0tBQ2hCLENBQUM7OEJBQ1MsSUFBSTtnREFBQTtBQXJESSxhQUFhO0lBTGpDLDRCQUFLLENBQUM7UUFDTCwwQ0FBMEM7UUFDMUMsZUFBZSxFQUFFLElBQUk7UUFDckIsU0FBUyxFQUFFLGlCQUFpQjtLQUM3QixDQUFDO0dBQ21CLGFBQWEsQ0F3RGpDO2tCQXhEb0IsYUFBYSJ9
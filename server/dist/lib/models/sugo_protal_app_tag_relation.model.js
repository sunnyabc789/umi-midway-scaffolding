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
const sugo_protal_tag_model_1 = require("./sugo_protal_tag.model");
exports.factory = () => SugoProtalAppTagRelation;
midway_1.providerWrapper([
    {
        id: 'SugoProtalAppTagRelation',
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
let SugoProtalAppTagRelation = class SugoProtalAppTagRelation extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(32),
        primaryKey: true,
        defaultValue: shortid_1.generate
    }),
    __metadata("design:type", String)
], SugoProtalAppTagRelation.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => sugo_portal_extapp_model_1.default),
    sequelize_typescript_1.Column({
        field: 'extapp_id',
        type: sequelize_typescript_1.DataType.STRING(32),
        comment: '应用id',
    }),
    __metadata("design:type", String)
], SugoProtalAppTagRelation.prototype, "extappId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => sugo_protal_tag_model_1.default),
    sequelize_typescript_1.Column({
        field: 'extapp_tag_id',
        type: sequelize_typescript_1.DataType.STRING(32),
        comment: '应用标签id',
    }),
    __metadata("design:type", String)
], SugoProtalAppTagRelation.prototype, "extappTagId", void 0);
__decorate([
    sequelize_typescript_1.Column({
        field: 'created_by',
        type: sequelize_typescript_1.DataType.STRING(32),
        allowNull: false,
        comment: '用户ID'
    }),
    __metadata("design:type", String)
], SugoProtalAppTagRelation.prototype, "createdBy", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column({
        field: 'created_at',
        comment: '创建时间'
    }),
    __metadata("design:type", Date)
], SugoProtalAppTagRelation.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.Column({
        field: 'updated_by',
        type: sequelize_typescript_1.DataType.STRING(32),
        comment: '用户ID',
        allowNull: true
    }),
    __metadata("design:type", String)
], SugoProtalAppTagRelation.prototype, "updatedBy", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column({
        field: 'updated_at',
        comment: '更新时间'
    }),
    __metadata("design:type", Date)
], SugoProtalAppTagRelation.prototype, "updatedAt", void 0);
SugoProtalAppTagRelation = __decorate([
    sequelize_typescript_1.Table({
        // you can claim your tableName explicitly
        freezeTableName: true,
        tableName: 'sugo_protal_app_tag_relation'
    })
], SugoProtalAppTagRelation);
exports.default = SugoProtalAppTagRelation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vnb19wcm90YWxfYXBwX3RhZ19yZWxhdGlvbi5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbW9kZWxzL3N1Z29fcHJvdGFsX2FwcF90YWdfcmVsYXRpb24ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrREFBcUc7QUFDckcsbUNBQXNDO0FBQ3RDLHFDQUFrQztBQUNsQyx5RUFBeUQ7QUFDekQsbUVBQW1EO0FBRXRDLFFBQUEsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLHdCQUF3QixDQUFBO0FBRXJELHdCQUFlLENBQUM7SUFDZDtRQUNFLEVBQUUsRUFBRSwwQkFBMEI7UUFDOUIsUUFBUSxFQUFFLGVBQU87S0FDbEI7Q0FDRixDQUFDLENBQUE7QUFNRjs7Ozs7OztFQU9FO0FBTUYsSUFBcUIsd0JBQXdCLEdBQTdDLE1BQXFCLHdCQUF5QixTQUFRLDRCQUErQjtDQTJEcEYsQ0FBQTtBQXBEQztJQUxDLDZCQUFNLENBQUM7UUFDTixJQUFJLEVBQUUsK0JBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3pCLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLFlBQVksRUFBRSxrQkFBUTtLQUN2QixDQUFDOztvREFDUTtBQVNWO0lBTkMsaUNBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxrQ0FBZ0IsQ0FBQztJQUNsQyw2QkFBTSxDQUFDO1FBQ04sS0FBSyxFQUFFLFdBQVc7UUFDbEIsSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN6QixPQUFPLEVBQUUsTUFBTTtLQUNoQixDQUFDOzswREFDYztBQVFoQjtJQU5DLGlDQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsK0JBQWEsQ0FBQztJQUMvQiw2QkFBTSxDQUFDO1FBQ04sS0FBSyxFQUFFLGVBQWU7UUFDdEIsSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN6QixPQUFPLEVBQUUsUUFBUTtLQUNsQixDQUFDOzs2REFDaUI7QUFVbkI7SUFOQyw2QkFBTSxDQUFDO1FBQ04sS0FBSyxFQUFFLFlBQVk7UUFDbkIsSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN6QixTQUFTLEVBQUUsS0FBSztRQUNoQixPQUFPLEVBQUUsTUFBTTtLQUNoQixDQUFDOzsyREFDZTtBQU9qQjtJQUxDLGdDQUFTO0lBQ1QsNkJBQU0sQ0FBQztRQUNOLEtBQUssRUFBRSxZQUFZO1FBQ25CLE9BQU8sRUFBRSxNQUFNO0tBQ2YsQ0FBQzs4QkFDUSxJQUFJOzJEQUFBO0FBUWY7SUFOQyw2QkFBTSxDQUFDO1FBQ04sS0FBSyxFQUFFLFlBQVk7UUFDbkIsSUFBSSxFQUFFLCtCQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN6QixPQUFPLEVBQUUsTUFBTTtRQUNmLFNBQVMsRUFBRSxJQUFJO0tBQ2hCLENBQUM7OzJEQUNlO0FBT2pCO0lBTEMsZ0NBQVM7SUFDVCw2QkFBTSxDQUFDO1FBQ04sS0FBSyxFQUFFLFlBQVk7UUFDbkIsT0FBTyxFQUFFLE1BQU07S0FDaEIsQ0FBQzs4QkFDUyxJQUFJOzJEQUFBO0FBeERJLHdCQUF3QjtJQUw1Qyw0QkFBSyxDQUFDO1FBQ0wsMENBQTBDO1FBQzFDLGVBQWUsRUFBRSxJQUFJO1FBQ3JCLFNBQVMsRUFBRSw4QkFBOEI7S0FDMUMsQ0FBQztHQUNtQix3QkFBd0IsQ0EyRDVDO2tCQTNEb0Isd0JBQXdCIn0=
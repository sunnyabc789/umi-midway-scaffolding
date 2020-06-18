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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const midway_1 = require("midway");
const base_service_1 = require("./base.service");
let SugoProtalAppTagRelationService = class SugoProtalAppTagRelationService extends base_service_1.BaseService {
    constructor(model) {
        super(model);
    }
    async existedRelate(extappId, extappTagId) {
        const where = {
            extappId,
            extappTagId
        };
        let result = await this.findOne({
            where
        });
        return Boolean(result);
    }
};
SugoProtalAppTagRelationService = __decorate([
    midway_1.provide(),
    __param(0, midway_1.inject('SugoProtalAppTagRelation')),
    __metadata("design:paramtypes", [Object])
], SugoProtalAppTagRelationService);
exports.SugoProtalAppTagRelationService = SugoProtalAppTagRelationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXRhZy1yZWxhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9zZXJ2aWNlL2FwcC10YWctcmVsYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUF3QztBQUN4QyxpREFBNEM7QUFJNUMsSUFBYSwrQkFBK0IsR0FBNUMsTUFBYSwrQkFBZ0MsU0FBUSwwQkFBc0M7SUFFekYsWUFDc0MsS0FBZ0M7UUFFcEUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2QsQ0FBQztJQUVELEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBZ0IsRUFBRSxXQUFtQjtRQUV2RCxNQUFNLEtBQUssR0FBUTtZQUNqQixRQUFRO1lBQ1IsV0FBVztTQUNaLENBQUE7UUFDRCxJQUFJLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDOUIsS0FBSztTQUNOLENBQUMsQ0FBQTtRQUNGLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3hCLENBQUM7Q0FFRixDQUFBO0FBcEJZLCtCQUErQjtJQUQzQyxnQkFBTyxFQUFFO0lBSUwsV0FBQSxlQUFNLENBQUMsMEJBQTBCLENBQUMsQ0FBQTs7R0FIMUIsK0JBQStCLENBb0IzQztBQXBCWSwwRUFBK0IifQ==
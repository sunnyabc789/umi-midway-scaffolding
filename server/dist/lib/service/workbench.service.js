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
let SugoExtappUserRelationService = class SugoExtappUserRelationService extends base_service_1.BaseService {
    constructor(model) {
        super(model);
    }
};
SugoExtappUserRelationService = __decorate([
    midway_1.provide(),
    __param(0, midway_1.inject('SugoUserExtappRelation')),
    __metadata("design:paramtypes", [Object])
], SugoExtappUserRelationService);
exports.SugoExtappUserRelationService = SugoExtappUserRelationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2JlbmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3NlcnZpY2Uvd29ya2JlbmNoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBd0M7QUFDeEMsaURBQTRDO0FBSTVDLElBQWEsNkJBQTZCLEdBQTFDLE1BQWEsNkJBQThCLFNBQVEsMEJBQW9DO0lBRXJGLFlBQ29DLEtBQThCO1FBRWhFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNkLENBQUM7Q0FFRixDQUFBO0FBUlksNkJBQTZCO0lBRHpDLGdCQUFPLEVBQUU7SUFJTCxXQUFBLGVBQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBOztHQUh4Qiw2QkFBNkIsQ0FRekM7QUFSWSxzRUFBNkIifQ==
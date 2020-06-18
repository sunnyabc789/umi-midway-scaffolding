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
let SugoProtalTagOrderService = class SugoProtalTagOrderService extends base_service_1.BaseService {
    constructor(model) {
        super(model);
    }
};
SugoProtalTagOrderService = __decorate([
    midway_1.provide(),
    __param(0, midway_1.inject('SugoProtalTagOrder')),
    __metadata("design:paramtypes", [Object])
], SugoProtalTagOrderService);
exports.SugoProtalTagOrderService = SugoProtalTagOrderService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGFsdGFnX29yZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3NlcnZpY2UvcG9ydGFsdGFnX29yZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBd0M7QUFDeEMsaURBQTRDO0FBSTVDLElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQTBCLFNBQVEsMEJBQWdDO0lBRTdFLFlBQ2dDLEtBQTBCO1FBRXhELEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNkLENBQUM7Q0FFRixDQUFBO0FBUlkseUJBQXlCO0lBRHJDLGdCQUFPLEVBQUU7SUFJTCxXQUFBLGVBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBOztHQUhwQix5QkFBeUIsQ0FRckM7QUFSWSw4REFBeUIifQ==
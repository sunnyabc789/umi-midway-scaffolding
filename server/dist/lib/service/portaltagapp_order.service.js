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
let SugoProtalTagAppOrderService = class SugoProtalTagAppOrderService extends base_service_1.BaseService {
    constructor(model) {
        super(model);
    }
    async addOrder(appId, tagId, userId, transaction) {
        var _a;
        const where = {
            extappTagId: tagId
        };
        const existed = await this.findOne({
            where,
            raw: true
        });
        let record = {
            extappTagId: tagId,
            appIdOrder: [appId],
            createdBy: userId
        };
        const options = {
            logging: console.log
        };
        if (transaction)
            options.transaction = transaction;
        if (!existed) {
            await this.create(record, options);
        }
        else {
            let appIdOrder = ((_a = existed) === null || _a === void 0 ? void 0 : _a.appIdOrder) || [];
            record = {
                appIdOrder: appIdOrder.concat(appId)
            };
            await this.update(record, Object.assign({ where }, options));
        }
    }
};
SugoProtalTagAppOrderService = __decorate([
    midway_1.provide(),
    __param(0, midway_1.inject('SugoProtalTagAppOrder')),
    __metadata("design:paramtypes", [Object])
], SugoProtalTagAppOrderService);
exports.SugoProtalTagAppOrderService = SugoProtalTagAppOrderService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGFsdGFnYXBwX29yZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3NlcnZpY2UvcG9ydGFsdGFnYXBwX29yZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBd0M7QUFDeEMsaURBQTRDO0FBSTVDLElBQWEsNEJBQTRCLEdBQXpDLE1BQWEsNEJBQTZCLFNBQVEsMEJBQW1DO0lBRW5GLFlBQ21DLEtBQTZCO1FBRTlELEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNkLENBQUM7SUFFRCxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQWEsRUFBRSxLQUFhLEVBQUUsTUFBYyxFQUFFLFdBQWlCOztRQUM1RSxNQUFNLEtBQUssR0FBUTtZQUNqQixXQUFXLEVBQUUsS0FBSztTQUNuQixDQUFBO1FBRUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2pDLEtBQUs7WUFDTCxHQUFHLEVBQUUsSUFBSTtTQUNWLENBQUMsQ0FBQTtRQUVGLElBQUksTUFBTSxHQUFRO1lBQ2hCLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNuQixTQUFTLEVBQUUsTUFBTTtTQUNsQixDQUFBO1FBRUQsTUFBTSxPQUFPLEdBQVE7WUFDbkIsT0FBTyxFQUFDLE9BQU8sQ0FBQyxHQUFHO1NBQ3BCLENBQUE7UUFDRCxJQUFJLFdBQVc7WUFBRSxPQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQTtRQUVsRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQTtTQUNuQzthQUFNO1lBQ0wsSUFBSSxVQUFVLEdBQWtCLE9BQUEsT0FBTywwQ0FBRSxVQUFVLEtBQUksRUFBRSxDQUFBO1lBQ3pELE1BQU0sR0FBRztnQkFDUCxVQUFVLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7YUFDckMsQ0FBQTtZQUNELE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLGtCQUN0QixLQUFLLElBQ0YsT0FBTyxFQUNWLENBQUE7U0FDSDtJQUNILENBQUM7Q0FFRixDQUFBO0FBM0NZLDRCQUE0QjtJQUR4QyxnQkFBTyxFQUFFO0lBSUwsV0FBQSxlQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQTs7R0FIdkIsNEJBQTRCLENBMkN4QztBQTNDWSxvRUFBNEIifQ==
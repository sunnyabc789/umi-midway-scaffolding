"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const midway_1 = require("midway");
const constants_1 = require("../../common/constants");
const postgres_query_helper_1 = require("../helper/postgres-query-helper");
let ExternalDbQueryService = class ExternalDbQueryService {
    showTables(dsType, args) {
        // TODO support mysql
        // if (ds.type === OfflineCalcDataSourceTypeEnum.Oracle) {
        //   ctx.body = await oracleRawShowTables(args)
        //   return
        // }
        // if (ds.type === OfflineCalcDataSourceTypeEnum.SQLServer) {
        //   ctx.body = await sqlserverRawShowTables(args)
        //   return
        // }
        // if (ds.type === OfflineCalcDataSourceTypeEnum.Db2) {
        //   ctx.body = await db2RawShowTables(args)
        //   return
        // }
        if (dsType === constants_1.OfflineCalcDataSourceTypeEnum.PostgreSQL) {
            return postgres_query_helper_1.rawShowTables(args);
        }
        // if (ds.type === OfflineCalcDataSourceTypeEnum.Hive) {
        //   ctx.body = await hiveRawShowTables(args)
        //   return
        // }
        throw new Error('Unknown ds type');
    }
    async describeTable(dsType, args) {
        // if (ds.type === OfflineCalcDataSourceTypeEnum.Oracle) {
        //   ctx.body = await oracleRawDescTable(args)
        //   return
        // }
        // if (ds.type === OfflineCalcDataSourceTypeEnum.SQLServer) {
        //   ctx.body = await sqlserverRawDescTable(args)
        //   return
        // }
        // if (ds.type === OfflineCalcDataSourceTypeEnum.Db2) {
        //   ctx.body = await db2RawDescTable(args)
        //   return
        // }
        if (dsType === constants_1.OfflineCalcDataSourceTypeEnum.PostgreSQL) {
            return postgres_query_helper_1.rawDescTable(args);
        }
        // if (ds.type === OfflineCalcDataSourceTypeEnum.Hive) {
        //   ctx.body = await hiveRawDescTable(args)
        //   return
        // }
        throw new Error('Unknown ds type');
    }
};
ExternalDbQueryService = __decorate([
    midway_1.provide()
], ExternalDbQueryService);
exports.ExternalDbQueryService = ExternalDbQueryService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZXJuYWwtZGItcXVlcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2VydmljZS9leHRlcm5hbC1kYi1xdWVyeS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsbUNBQWdDO0FBRWhDLHNEQUFvRTtBQUNwRSwyRUFBZ0g7QUFHaEgsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFFakMsVUFBVSxDQUFDLE1BQWMsRUFBRSxJQUFlO1FBRXhDLHFCQUFxQjtRQUNyQiwwREFBMEQ7UUFDMUQsK0NBQStDO1FBQy9DLFdBQVc7UUFDWCxJQUFJO1FBQ0osNkRBQTZEO1FBQzdELGtEQUFrRDtRQUNsRCxXQUFXO1FBQ1gsSUFBSTtRQUNKLHVEQUF1RDtRQUN2RCw0Q0FBNEM7UUFDNUMsV0FBVztRQUNYLElBQUk7UUFDSixJQUFJLE1BQU0sS0FBSyx5Q0FBNkIsQ0FBQyxVQUFVLEVBQUU7WUFDdkQsT0FBTyxxQ0FBZSxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQzdCO1FBQ0Qsd0RBQXdEO1FBQ3hELDZDQUE2QztRQUM3QyxXQUFXO1FBQ1gsSUFBSTtRQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0lBRUQsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFjLEVBQUUsSUFBK0I7UUFDakUsMERBQTBEO1FBQzFELDhDQUE4QztRQUM5QyxXQUFXO1FBQ1gsSUFBSTtRQUNKLDZEQUE2RDtRQUM3RCxpREFBaUQ7UUFDakQsV0FBVztRQUNYLElBQUk7UUFDSix1REFBdUQ7UUFDdkQsMkNBQTJDO1FBQzNDLFdBQVc7UUFDWCxJQUFJO1FBQ0osSUFBSSxNQUFNLEtBQUsseUNBQTZCLENBQUMsVUFBVSxFQUFFO1lBQ3ZELE9BQU8sb0NBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUM1QjtRQUNELHdEQUF3RDtRQUN4RCw0Q0FBNEM7UUFDNUMsV0FBVztRQUNYLElBQUk7UUFDSixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUE7SUFDcEMsQ0FBQztDQUNGLENBQUE7QUFqRFksc0JBQXNCO0lBRGxDLGdCQUFPLEVBQUU7R0FDRyxzQkFBc0IsQ0FpRGxDO0FBakRZLHdEQUFzQiJ9
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
const db_1 = require("../../lib/models/db");
const sugo_utils_1 = require("../../common/sugo-utils");
let SugoProtalTagService = class SugoProtalTagService extends base_service_1.BaseService {
    constructor(model) {
        super(model);
    }
    async findAllKidsParents(kids) {
        const checkFunctionSql = `
    DROP FUNCTION IF EXISTS getParentList;
    `;
        const createFunctionSql = `
    CREATE DEFINER=root@localhost FUNCTION getParentList(rootId varchar(1000)) RETURNS VARCHAR(1000) CHARSET utf8 DETERMINISTIC
    BEGIN
    DECLARE sParentList varchar(1000);
    DECLARE sParentTemp varchar(1000);
    SET sParentTemp =cast(rootId as CHAR);
    WHILE sParentTemp is not null DO
    IF (sParentList is not null) THEN
    SET sParentList = concat(sParentTemp,',',sParentList);
    ELSE
    SET sParentList = concat(sParentTemp);
    END IF;
    SELECT group_concat(parent_id) INTO sParentTemp FROM sugo_protal_tag where FIND_IN_SET(id,sParentTemp)>0;
    END WHILE;
    RETURN sParentList;
    END;
    `;
        const deleteSql = `
    DROP FUNCTION IF EXISTS getParentList;
    `;
        await db_1.DB.sequelize.query(checkFunctionSql);
        await db_1.DB.sequelize.query(createFunctionSql);
        let allNodes = [];
        await sugo_utils_1.forAwaitAll(kids, async (kid, idx) => {
            const querySql = `
      select * From sugo_protal_tag where FIND_IN_SET(id, getParentList('${kid}')) and sugo_protal_tag.id <> 'unTyped'
      `;
            let chain = await db_1.DB.sequelize.query(querySql, { raw: true });
            chain = chain[0];
            allNodes = allNodes.concat(chain);
        });
        await db_1.DB.sequelize.query(deleteSql);
        return this.genTree(allNodes);
    }
    genTree(list) {
        let temp = {};
        let tree = [];
        for (let i in list) {
            temp[list[i].id] = list[i];
        }
        for (let i in temp) {
            if (temp[i].parent_id) {
                if (!temp[temp[i].parent_id].children) {
                    temp[temp[i].parent_id].children = [];
                }
                temp[temp[i].parent_id].children.push(temp[i]);
            }
            else {
                tree.push(temp[i]);
            }
        }
        return tree;
    }
};
SugoProtalTagService = __decorate([
    midway_1.provide(),
    __param(0, midway_1.inject('SugoProtalTag')),
    __metadata("design:paramtypes", [Object])
], SugoProtalTagService);
exports.SugoProtalTagService = SugoProtalTagService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGFsdGFnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3NlcnZpY2UvcG9ydGFsdGFnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBd0M7QUFDeEMsaURBQTRDO0FBRTVDLDRDQUFzQztBQUN0Qyx3REFBcUQ7QUFHckQsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSwwQkFBMkI7SUFFbkUsWUFDMkIsS0FBcUI7UUFFOUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2QsQ0FBQztJQUVELEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxJQUFtQjtRQUMxQyxNQUFNLGdCQUFnQixHQUFHOztLQUV4QixDQUFBO1FBQ0QsTUFBTSxpQkFBaUIsR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztLQWdCekIsQ0FBQTtRQUVELE1BQU0sU0FBUyxHQUFHOztLQUVqQixDQUFBO1FBRUQsTUFBTSxPQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQzFDLE1BQU0sT0FBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtRQUUzQyxJQUFJLFFBQVEsR0FBUSxFQUFFLENBQUE7UUFDdEIsTUFBTSx3QkFBVyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsR0FBVyxFQUFFLEdBQVEsRUFBRSxFQUFFO1lBQ3JELE1BQU0sUUFBUSxHQUFHOzJFQUNvRCxHQUFHO09BQ3ZFLENBQUE7WUFDRCxJQUFJLEtBQUssR0FBRyxNQUFNLE9BQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQzdELEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDaEIsUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbkMsQ0FBQyxDQUFDLENBQUE7UUFDRixNQUFNLE9BQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRW5DLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMvQixDQUFDO0lBRUQsT0FBTyxDQUFDLElBQVM7UUFDZixJQUFJLElBQUksR0FBUSxFQUFFLENBQUM7UUFDbkIsSUFBSSxJQUFJLEdBQVEsRUFBRSxDQUFDO1FBQ25CLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDbEIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFO2dCQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztpQkFDdkM7Z0JBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEI7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGLENBQUE7QUFyRVksb0JBQW9CO0lBRGhDLGdCQUFPLEVBQUU7SUFJTCxXQUFBLGVBQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQTs7R0FIZixvQkFBb0IsQ0FxRWhDO0FBckVZLG9EQUFvQiJ9
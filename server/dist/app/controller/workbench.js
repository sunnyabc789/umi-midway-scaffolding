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
const midway_1 = require("midway");
const workbench_service_1 = require("../../lib/service/workbench.service");
const Response_1 = require("../../common/Response");
let SugoProtalExtappUserRelationsController = class SugoProtalExtappUserRelationsController {
    async query(ctx) {
        const res = await this.sugoExtappUserRelationService.findAll();
        ctx.body = Response_1.Response.ok(res);
    }
    async create(ctx) {
        const { user, extappId } = ctx.q;
        const { id: userId } = user;
        const data = {
            userId,
            extappId,
            createdBy: userId
        };
        const res = await this.sugoExtappUserRelationService.create(data);
        ctx.body = Response_1.Response.ok(res);
    }
    async update(ctx) {
        const res = await this.sugoExtappUserRelationService.update(ctx.q, {
            where: { id: ctx.q.id }
        });
        ctx.body = Response_1.Response.ok(res);
    }
    async destroy(ctx) {
        const res = await this.sugoExtappUserRelationService.destroyById(ctx.params.id);
        ctx.body = Response_1.Response.ok(res);
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", workbench_service_1.SugoExtappUserRelationService)
], SugoProtalExtappUserRelationsController.prototype, "sugoExtappUserRelationService", void 0);
__decorate([
    midway_1.get('/:id?'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoProtalExtappUserRelationsController.prototype, "query", null);
__decorate([
    midway_1.post('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoProtalExtappUserRelationsController.prototype, "create", null);
__decorate([
    midway_1.put('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoProtalExtappUserRelationsController.prototype, "update", null);
__decorate([
    midway_1.del('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SugoProtalExtappUserRelationsController.prototype, "destroy", null);
SugoProtalExtappUserRelationsController = __decorate([
    midway_1.provide(),
    midway_1.controller('/app/sugo-workbench')
], SugoProtalExtappUserRelationsController);
exports.SugoProtalExtappUserRelationsController = SugoProtalExtappUserRelationsController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2JlbmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb250cm9sbGVyL3dvcmtiZW5jaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLG1DQUFrRjtBQUNsRiwyRUFBbUY7QUFDbkYsb0RBQThDO0FBSTlDLElBQWEsdUNBQXVDLEdBQXBELE1BQWEsdUNBQXVDO0lBTWxELEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBWTtRQUN0QixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUM5RCxHQUFHLENBQUMsSUFBSSxHQUFHLG1CQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzdCLENBQUM7SUFHRCxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQVk7UUFDckIsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ2hDLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBRTNCLE1BQU0sSUFBSSxHQUFRO1lBQ2hCLE1BQU07WUFDTixRQUFRO1lBQ1IsU0FBUyxFQUFFLE1BQU07U0FDbEIsQ0FBQTtRQUVELE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLDZCQUE2QixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNqRSxHQUFHLENBQUMsSUFBSSxHQUFHLG1CQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQy9CLENBQUM7SUFHRCxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQVk7UUFDdkIsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsNkJBQTZCLENBQUMsTUFBTSxDQUN2RCxHQUFHLENBQUMsQ0FBQyxFQUNMO1lBQ0UsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1NBQ3hCLENBQ0osQ0FBQTtRQUNELEdBQUcsQ0FBQyxJQUFJLEdBQUcsbUJBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDN0IsQ0FBQztJQUdELEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBWTtRQUN4QixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUMvRSxHQUFHLENBQUMsSUFBSSxHQUFHLG1CQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzdCLENBQUM7Q0FDRixDQUFBO0FBdkNDO0lBREMsZUFBTSxFQUFFOzhCQUNzQixpREFBNkI7OEZBQUE7QUFHNUQ7SUFEQyxZQUFHLENBQUMsT0FBTyxDQUFDOzs7O29FQUlaO0FBR0Q7SUFEQyxhQUFJLENBQUMsR0FBRyxDQUFDOzs7O3FFQWFUO0FBR0Q7SUFEQyxZQUFHLENBQUMsTUFBTSxDQUFDOzs7O3FFQVNYO0FBR0Q7SUFEQyxZQUFHLENBQUMsTUFBTSxDQUFDOzs7O3NFQUlYO0FBekNVLHVDQUF1QztJQUZuRCxnQkFBTyxFQUFFO0lBQ1QsbUJBQVUsQ0FBQyxxQkFBcUIsQ0FBQztHQUNyQix1Q0FBdUMsQ0EwQ25EO0FBMUNZLDBGQUF1QyJ9
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
const path = require("path");
const send = require("koa-send");
let HomeController = class HomeController {
    async index() {
        await send(this.ctx, 'index.html', { root: path.resolve(__dirname, '../public') });
    }
    async test() {
        this.ctx.body = {
            success: true,
            message: 'ok',
            data: {}
        };
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], HomeController.prototype, "ctx", void 0);
__decorate([
    midway_1.get('/*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "index", null);
__decorate([
    midway_1.get('/test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "test", null);
HomeController = __decorate([
    midway_1.provide(),
    midway_1.priority(-1),
    midway_1.controller('/')
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29udHJvbGxlci9ob21lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsbUNBQTBFO0FBQzFFLDZCQUE0QjtBQUM1QixpQ0FBaUM7QUFLakMsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQU16QixLQUFLLENBQUMsS0FBSztRQUNULE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFVLEVBQUUsWUFBWSxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxFQUFDLENBQUMsQ0FBQTtJQUN6RixDQUFDO0lBR0QsS0FBSyxDQUFDLElBQUk7UUFDUixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBSTtZQUNmLE9BQU8sRUFBRSxJQUFJO1lBQ2IsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsRUFBRTtTQUNULENBQUE7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQWZDO0lBREMsZUFBTSxFQUFFOzsyQ0FDRztBQUdaO0lBREMsWUFBRyxDQUFDLElBQUksQ0FBQzs7OzsyQ0FHVDtBQUdEO0lBREMsWUFBRyxDQUFDLE9BQU8sQ0FBQzs7OzswQ0FPWjtBQWpCVSxjQUFjO0lBSDFCLGdCQUFPLEVBQUU7SUFDVCxpQkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1osbUJBQVUsQ0FBQyxHQUFHLENBQUM7R0FDSCxjQUFjLENBa0IxQjtBQWxCWSx3Q0FBYyJ9
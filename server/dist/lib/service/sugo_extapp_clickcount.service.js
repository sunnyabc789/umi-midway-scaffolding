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
let SugoExtappClickcountService = class SugoExtappClickcountService extends base_service_1.BaseService {
    constructor(model) {
        super(model);
    }
};
SugoExtappClickcountService = __decorate([
    midway_1.provide(),
    __param(0, midway_1.inject('SugoExtappClickcount')),
    __metadata("design:paramtypes", [Object])
], SugoExtappClickcountService);
exports.SugoExtappClickcountService = SugoExtappClickcountService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vnb19leHRhcHBfY2xpY2tjb3VudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9zZXJ2aWNlL3N1Z29fZXh0YXBwX2NsaWNrY291bnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUF3QztBQUN4QyxpREFBNEM7QUFJNUMsSUFBYSwyQkFBMkIsR0FBeEMsTUFBYSwyQkFBNEIsU0FBUSwwQkFBa0M7SUFFakYsWUFDa0MsS0FBNEI7UUFFNUQsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2QsQ0FBQztDQUVGLENBQUE7QUFSWSwyQkFBMkI7SUFEdkMsZ0JBQU8sRUFBRTtJQUlMLFdBQUEsZUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUE7O0dBSHRCLDJCQUEyQixDQVF2QztBQVJZLGtFQUEyQiJ9
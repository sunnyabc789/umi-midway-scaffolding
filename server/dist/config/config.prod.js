"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.default = (appInfo) => {
    const config = {};
    // 自定义日志目录
    config.logger = {
        dir: path.join(appInfo.appDir, 'logs')
    };
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnByb2QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2NvbmZpZy5wcm9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTRCO0FBRTVCLGtCQUFlLENBQUMsT0FBWSxFQUFFLEVBQUU7SUFDOUIsTUFBTSxNQUFNLEdBQVEsRUFBRSxDQUFBO0lBRXRCLFVBQVU7SUFDVixNQUFNLENBQUMsTUFBTSxHQUFHO1FBQ2IsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7S0FDeEMsQ0FBQTtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=
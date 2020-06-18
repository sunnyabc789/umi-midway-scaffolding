"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isProd = process.env.NODE_ENV === 'production';
exports.default = {
    static: true,
    nunjucks: {
        enable: false,
        package: 'egg-view-nunjucks',
    },
    assets: {
        enable: isProd,
        package: 'egg-view-assets',
    },
    cors: {
        enable: true,
        package: 'egg-cors',
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy9wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZLENBQUE7QUFFcEQsa0JBQWU7SUFDYixNQUFNLEVBQUUsSUFBSTtJQUVaLFFBQVEsRUFBRTtRQUNSLE1BQU0sRUFBRSxLQUFLO1FBQ2IsT0FBTyxFQUFFLG1CQUFtQjtLQUM3QjtJQUVELE1BQU0sRUFBRTtRQUNOLE1BQU0sRUFBRSxNQUFNO1FBQ2QsT0FBTyxFQUFFLGlCQUFpQjtLQUMzQjtJQUVELElBQUksRUFBRTtRQUNKLE1BQU0sRUFBRSxJQUFJO1FBQ1osT0FBTyxFQUFFLFVBQVU7S0FDcEI7Q0FNVyxDQUFBIn0=
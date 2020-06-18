"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DB_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const midway_1 = require("midway");
// providing DB.sequelize in case of hyper features
// of sequelize like "sequelize.transaction"
let DB = DB_1 = class DB {
    static async initDB(config) {
        const isProd = process.env.NODE_ENV === 'production';
        let logging = !!config.verbose || isProd;
        if (config.verbose === false) {
            logging = false;
        }
        DB_1.sequelize = new sequelize_typescript_1.Sequelize(Object.assign(Object.assign({}, config), { 
            // tslint:disable-next-line:no-console
            logging: logging ? console.log : false, modelMatch: (filename, member) => {
                if (filename !== 'db') {
                    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
                }
                return false;
            } }));
        // add models here before using them
        DB_1.sequelize.addModels([
            __dirname + `/**/*.model${isProd ? '.js' : '.ts'}`
        ]);
        try {
            await DB_1.sequelize.authenticate();
            await DB_1.sequelize.sync({
                alter: false
            });
        }
        catch (error) {
            error.message = `DB connection error: ${error.message}`;
            throw error;
        }
    }
};
DB = DB_1 = __decorate([
    midway_1.scope(midway_1.ScopeEnum.Singleton),
    midway_1.provide('DB')
], DB);
exports.DB = DB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL21vZGVscy9kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwrREFBZ0Q7QUFDaEQsbUNBQWtEO0FBRWxELG1EQUFtRDtBQUNuRCw0Q0FBNEM7QUFHNUMsSUFBYSxFQUFFLFVBQWYsTUFBYSxFQUFFO0lBSU4sTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBVztRQUNwQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZLENBQUE7UUFDcEQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFBO1FBQ3hDLElBQUksTUFBTSxDQUFDLE9BQU8sS0FBSyxLQUFLLEVBQUU7WUFDNUIsT0FBTyxHQUFHLEtBQUssQ0FBQTtTQUNoQjtRQUNELElBQUUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxnQ0FBUyxpQ0FDdkIsTUFBTTtZQUNULHNDQUFzQztZQUN0QyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQ3RDLFVBQVUsRUFBRSxDQUFDLFFBQWdCLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQ3ZDLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtvQkFDckIsT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFBO2lCQUNsRjtnQkFDRCxPQUFPLEtBQUssQ0FBQTtZQUNkLENBQUMsSUFDRCxDQUFBO1FBRUYsb0NBQW9DO1FBQ3BDLElBQUUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1lBQ3JCLFNBQVMsR0FBRyxjQUFjLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUU7U0FDbkQsQ0FBQyxDQUFBO1FBRUYsSUFBSTtZQUNGLE1BQU0sSUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtZQUNqQyxNQUFNLElBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO2dCQUN0QixLQUFLLEVBQUUsS0FBSzthQUNiLENBQUMsQ0FBQTtTQUNIO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxLQUFLLENBQUMsT0FBTyxHQUFHLHdCQUF3QixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUE7WUFDdkQsTUFBTSxLQUFLLENBQUE7U0FDWjtJQUNILENBQUM7Q0FDRixDQUFBO0FBckNZLEVBQUU7SUFGZCxjQUFLLENBQUMsa0JBQVMsQ0FBQyxTQUFTLENBQUM7SUFDMUIsZ0JBQU8sQ0FBQyxJQUFJLENBQUM7R0FDRCxFQUFFLENBcUNkO0FBckNZLGdCQUFFIn0=
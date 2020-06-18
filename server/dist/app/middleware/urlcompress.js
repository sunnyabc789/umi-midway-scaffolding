"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sugo_utils_1 = require("../../common/sugo-utils");
const isProd = process.env.NODE_ENV === 'production';
const emptyObj = Object.freeze({});
module.exports = () => {
    return async function urlcompress(ctx, next) {
        ctx.q = emptyObj;
        if (ctx.query && ctx.query.q) {
            ctx.q = sugo_utils_1.tryJsonParse(sugo_utils_1.decompressUrlQuery(ctx.query.q));
        }
        else if (ctx.request.body && ctx.request.body.q) {
            ctx.q = sugo_utils_1.tryJsonParse(sugo_utils_1.decompressUrlQuery(ctx.request.body.q));
        }
        if (!isProd) {
            console.log(`ctx.q ==> ${JSON.stringify(ctx.q, null, 2)}`);
        }
        await next();
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsY29tcHJlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL21pZGRsZXdhcmUvdXJsY29tcHJlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx3REFBd0U7QUFFeEUsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssWUFBWSxDQUFBO0FBRXBELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7QUFFbEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUU7SUFDcEIsT0FBTyxLQUFLLFVBQVUsV0FBVyxDQUFDLEdBQVksRUFBRSxJQUF3QjtRQUV0RSxHQUFHLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQTtRQUVoQixJQUFJLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDNUIsR0FBRyxDQUFDLENBQUMsR0FBRyx5QkFBWSxDQUFDLCtCQUFrQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUN0RDthQUFNLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQ2pELEdBQUcsQ0FBQyxDQUFDLEdBQUcseUJBQVksQ0FBQywrQkFBa0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQzdEO1FBRUQsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUVYLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtTQUMzRDtRQUVELE1BQU0sSUFBSSxFQUFFLENBQUE7SUFDZCxDQUFDLENBQUE7QUFDSCxDQUFDLENBQUEifQ==
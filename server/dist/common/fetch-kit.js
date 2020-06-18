"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// the final fetch
// 仅仅使用post/get减少代码
// 所有的请求数据都被放在q=data....并压缩
// 在服务器端会被统一解压缩和传递给ctx.q
// options默认为空
// options.headers 默认是json header，但是你可以通过 options.headers 来覆盖默认的json header
// options.credentials 默认包含cookie，也是可以通过 options.credentials 来覆盖默认的credentials
// options.handleResponse 默认是转换为json, 如果不需要可以自己指定处理方法
// options.handleErr 默认是antd弹窗提示错误信息, 可以自己指定处理方法, 注意抛出的是整个response
require("isomorphic-fetch");
const sugo_utils_1 = require("./sugo-utils");
const _ = require('lodash');
function returnResult(ctx, result, code, status) {
    if (status) {
        ctx.status = status;
    }
    return ctx.body = {
        result,
        code
    };
}
exports.returnResult = returnResult;
function returnError(ctx, msg, status = 400) {
    ctx.status = status;
    return ctx.body = {
        error: msg
    };
}
exports.returnError = returnError;
const toQueryParams = function (obj, prefix) {
    const str = [];
    for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
            const k = prefix ? prefix + `[${p}]` : p;
            const v = obj[p];
            str.push(typeof v === 'object' ?
                toQueryParams(v, k) :
                encodeURIComponent(k) + '=' + encodeURIComponent(v));
        }
    }
    return str.join('&');
};
exports.jsonHeader = {
    'Content-Type': 'application/json'
};
function parseResponse(response) {
    const res = response;
    const contentType = res.headers.get('content-type') || '';
    const isJsonResult = contentType.toLowerCase().indexOf('application/json') !== -1;
    if (isJsonResult) {
        try {
            return res.json();
        }
        catch (e) {
            return res.text();
        }
    }
    else {
        return res.text();
    }
}
function handleErr(res) {
    try {
        // 一定要try 因为如果是请求超时错误 是没有res.text()的
        return res.text()
            .then((text) => {
            const ret = sugo_utils_1.tryJsonParse(text);
            text = ret.error || ret.message || JSON.stringify(text);
            // err(`fetch => ${res.url} => 错误信息:${text}`)
            const error = new Error(`请求错误：${res.status}:${text}`);
            error.response = res;
            throw error;
        });
    }
    catch (e) {
        // err(res, `${res.url} fetch err => 请求超时错误: ${res}`)
        const error = new Error(`请求超时错误：${res.url} ${res}`);
        error.response = res;
        throw error;
    }
}
class FetchKit {
    static get(url, data, options) {
        const queryStr = toQueryParams(data);
        return FetchKit.connect(queryStr ? `${url}?${queryStr}` : url, 'get', null, options);
    }
    static post(url, data, options) {
        return FetchKit.connect(url, 'post', data, options);
    }
    static delete(url, data, options) {
        return FetchKit.connect(url, 'delete', data, options);
    }
    static put(url, data, options) {
        return FetchKit.connect(url, 'put', data, options);
    }
    static connect(url, method, data, options) {
        const body = Object.assign({ method, body: data ? (typeof (data) === 'object' ? JSON.stringify(data) : data) : undefined, credentials: 'omit', headers: exports.jsonHeader, timeout: 15000 }, options);
        return fetch(url, body).then(res => {
            if (res.status > 304) {
                // err('ERROR request =>', url, JSON.stringify(body.body, null, 2))
                throw res;
            }
            return res;
        })
            .then(options.handleResponse || parseResponse, options.handleErr || handleErr);
    }
}
exports.default = FetchKit;
exports.withFetchErrHandler = (func) => {
    return async (ctx, next) => {
        try {
            await func(ctx, next);
        }
        catch (e) {
            const status = _.get(e, 'response.status');
            if (status) {
                returnError(ctx, e.message, status);
            }
            else {
                throw e;
            }
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2gta2l0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1vbi9mZXRjaC1raXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxrQkFBa0I7QUFDbEIsbUJBQW1CO0FBQ25CLDJCQUEyQjtBQUMzQix3QkFBd0I7QUFDeEIsY0FBYztBQUNkLDJFQUEyRTtBQUMzRSw4RUFBOEU7QUFDOUUscURBQXFEO0FBQ3JELGtFQUFrRTtBQUNsRSw0QkFBeUI7QUFDekIsNkNBQXlDO0FBQ3pDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUUzQixTQUFnQixZQUFZLENBQUMsR0FBUSxFQUFFLE1BQVcsRUFBRSxJQUFhLEVBQUcsTUFBWTtJQUM5RSxJQUFJLE1BQU0sRUFBRTtRQUNWLEdBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0tBQ3BCO0lBQ0QsT0FBTyxHQUFHLENBQUMsSUFBSSxHQUFHO1FBQ2hCLE1BQU07UUFDTixJQUFJO0tBQ0wsQ0FBQTtBQUNILENBQUM7QUFSRCxvQ0FRQztBQUVELFNBQWdCLFdBQVcsQ0FBQyxHQUFRLEVBQUUsR0FBUSxFQUFFLE1BQU0sR0FBRyxHQUFHO0lBQzFELEdBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0lBQ25CLE9BQU8sR0FBRyxDQUFDLElBQUksR0FBRztRQUNoQixLQUFLLEVBQUUsR0FBRztLQUNYLENBQUE7QUFDSCxDQUFDO0FBTEQsa0NBS0M7QUFHRCxNQUFNLGFBQWEsR0FBRyxVQUFVLEdBQVEsRUFBRSxNQUFlO0lBQ3ZELE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUNkLEtBQUssTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFO1FBQ25CLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN6QixNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxD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
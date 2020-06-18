"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LZString = require("lz-string");
const _ = require("lodash");
/** get querystring 参数压缩加密 */
exports.compressUrlQuery = (str, logTag) => {
    if (_.isObject(str)) {
        str = JSON.stringify(str);
    }
    /*  if (logTag) {
        debug(str, 'before compress', logTag)
      } else {
        debug(str, 'before compress')
      }*/
    return LZString.compressToEncodedURIComponent(str);
};
/** get querystring 参数解密 */
exports.decompressUrlQuery = (str) => LZString.decompressFromEncodedURIComponent(str);
/** 转换json对象异常处理 */
function tryJsonParse(data, defaultVal = data) {
    if (_.isObject(data)) {
        return data;
    }
    try {
        return JSON.parse(data);
    }
    catch (e) {
        return defaultVal;
    }
}
exports.tryJsonParse = tryJsonParse;
const compFunc = (val1, val2) => {
    if (_.isFunction(val1) && _.isFunction(val2)) {
        return val1.toString() === val2.toString();
    }
};
/**
 * 用法和 isEqual 一样。不过对于函数值，会对比函数的 toString 结果
 */
exports.isEqualWithFunc = (a, b) => {
    return _.isEqualWith(a, b, compFunc);
};
/**
 * 类似 _.update。不过没有副作用
 * @param objOrArr
 * @param path
 * @param updater 传入的这个函数不能直接修改原对象，应该返回一个新的对象
 * @returns {*}
 */
function immutateUpdate(objOrArr, path, updater) {
    if (_.isArray(path) && !path.length) {
        return updater(objOrArr);
    }
    if (_.isString(path) || _.isNumber(path)) {
        const pathArr = _.toPath(path);
        return immutateUpdate(objOrArr, pathArr, updater);
    }
    const [headKey, ...restKeys] = path;
    const prevVal = objOrArr && objOrArr[headKey];
    const newVal = immutateUpdate(prevVal, restKeys, updater);
    // 如果值没有变，则直接返回
    if (prevVal === newVal) {
        return objOrArr;
    }
    if (_.isArray(objOrArr) || (!objOrArr && isFinite(headKey))) {
        const newArr = _.clone(objOrArr || []);
        newArr[headKey] = newVal;
        return newArr;
    }
    //  {...objOrArr, [headKey]: newVal} can not clone type
    const newObj = _.clone(objOrArr) || {};
    newObj[headKey] = newVal;
    return newObj;
}
exports.immutateUpdate = immutateUpdate;
/**
 * 对一个对象进行批量修改，返回一个新对象
 * @example immutateUpdates(obj, 'a.b', () => 1, 'c.d', v => v + 1)
 * @param objOrArr
 * @param pathAndUpdaters
 */
function immutateUpdates(objOrArr, ...pathAndUpdaters) {
    if (_.isEmpty(pathAndUpdaters)) {
        return objOrArr;
    }
    const [path, updater, ...rest] = pathAndUpdaters;
    return immutateUpdates(immutateUpdate(objOrArr, path, updater), ...rest);
}
exports.immutateUpdates = immutateUpdates;
/**
 * 结合了 map 和 Promise.all 的便捷 map
 * @param arr
 * @param mapper
 */
function mapAwaitAll(arr, mapper) {
    return _.isEmpty(arr) ? Promise.resolve([]) : Promise.all(arr.map(mapper));
}
exports.mapAwaitAll = mapAwaitAll;
/**
 * 结合了 for 和 await 的工具函数
 * @param arr
 * @param mapper
 */
async function forAwaitAll(arr, mapper) {
    let res = [];
    let i = 0;
    for (let v of arr) {
        let r = await mapper(v, i++, arr);
        res.push(r);
    }
    return res;
}
exports.forAwaitAll = forAwaitAll;
/**
 * 提取出路径中的文件名
 * @example
 * extractFileNameFromPath('/f/abcd.jpg') -> "abcd.jpg"
 * @param path
 */
function extractFileNameFromPath(path) {
    const index = path.lastIndexOf('/');
    return path.substr(index + 1);
}
exports.extractFileNameFromPath = extractFileNameFromPath;
/**
 * 对比根据路径取得的目标值，不同返回 true
 * @param a
 * @param b
 * @param path
 * @returns {boolean}
 */
function isDiffByPath(a, b, path) {
    return !_.isEqual(_.get(a, path), _.get(b, path));
}
exports.isDiffByPath = isDiffByPath;
/**
 * 深度clone对象
 * @param value
 */
function clone(value) {
    return JSON.parse(JSON.stringify(value));
}
exports.clone = clone;
/**
 * 条件生成className
 * @param o
 */
function className(o) {
    const names = [];
    for (const name in o) {
        if (o[name]) {
            names.push(name);
        }
    }
    return names.join(' ');
}
exports.className = className;
/**
 * 类似 _.keyBy。不过能够多传一个参数，以便修改 key 对应的 val
 * @param arr
 * @param keySelector
 * @param valSelector
 */
function dictBy(arr, keySelector, valSelector = _.identity) {
    return arr.reduce((prev, curr, pos) => {
        prev[keySelector(curr, pos)] = valSelector(curr, pos);
        return prev;
    }, {});
}
exports.dictBy = dictBy;
function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) {
        return null;
    }
    if (!results[2]) {
        return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
exports.getParameterByName = getParameterByName;
/**
 * 等待一段时间，例子 await delayPromised(1000)
 * @param wait 等待的毫秒数
 */
function delayPromised(wait) {
    return new Promise((resolve) => _.delay(resolve, wait));
}
exports.delayPromised = delayPromised;
/**
 * 将对象转换成 url 的 query 参数
 * 参考了：http://stackoverflow.com/questions/1714786/querystring-encoding-of-a-javascript-object/1714899#1714899
 * @example toQueryParams({a: 1, b: 2}) -> a=1&b=2
 * @param obj
 * @param prefix
 * @returns {string}
 */
exports.toQueryParams = function (obj, prefix) {
    const str = [];
    for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
            const k = prefix ? prefix + '[]' : p;
            const v = obj[p];
            str.push(typeof v === 'object' ?
                exports.toQueryParams(v, k) :
                encodeURIComponent(k) + '=' + encodeURIComponent(v));
        }
    }
    return str.join('&');
};
function isBotUserAgent(uaStr) {
    return /aolbuild|baidu|bingbot|bingpreview|msnbot|duckduckgo|adsbot-google|googlebot|mediapartners-google|teoma|slurp|yandex/i.test(uaStr);
}
exports.isBotUserAgent = isBotUserAgent;
/**
 * 在数组中插入元素
 * @example
 * interpose('a', [1, 2, 3]) => [1, "a", 2, "a", 3]
 * @param sep
 * @param arr
 */
function interpose(sep, arr) {
    const zipped = _.zip(arr, arr.map(_.isFunction(sep) ? sep : () => sep));
    const butlast = _.flatten(zipped);
    return _.take(butlast, butlast.length - 1);
}
exports.interpose = interpose;
exports.isEqualWithReactObj = _.partialRight(_.isEqualWith, function (val1, val2) {
    if (_.isObject(val1) && _.isObject(val2) && '_owner' in val1 && '_owner' in val2) {
        return exports.isEqualWithReactObj(_.omit(val1, '_owner'), _.omit(val2, '_owner'), undefined);
    }
    if (_.isFunction(val1) && _.isFunction(val2)) {
        return val1.toString() === val2.toString();
    }
});
/**
 * 递归查找，返回目标对象
 * @param arr  数组
 * @param getChild 如何取得 children 数组
 * @param predicate 判断函数
 * @returns {*}
 */
exports.recurFindDeep = (arr, getChild, predicate) => {
    const thisLayerCh = _.find(arr, ch => predicate(ch) || exports.recurFindDeep(getChild(ch), getChild, predicate));
    return thisLayerCh && (predicate(thisLayerCh) ? thisLayerCh : exports.recurFindDeep(getChild(thisLayerCh), getChild, predicate));
};
function recurFlatten(tree, childKey = 'children') {
    if (_.isEmpty(tree)) {
        return [];
    }
    return _.flatMap(tree, n => n && [n, ...recurFlatten(n[childKey])] || []);
}
exports.recurFlatten = recurFlatten;
function isDiffBySomePath(a, b, ...paths) {
    if (paths.length === 1 && _.isArray(paths[0])) {
        paths = paths[0];
    }
    return _.some(paths, path => isDiffByPath(a, b, path));
}
exports.isDiffBySomePath = isDiffBySomePath;
/**
 * 无副作用的 insert
 * @example
 * let a = ['a', 'b', 'c']
 * insert(a, 1, 'z') -> ['a', 'z', 'b', 'c']
 * a 保持不变
 * @param array
 * @param index
 * @param element
 */
function insert(array, index, element) {
    return _.take(array, index).concat([element]).concat(_.drop(array, index));
}
exports.insert = insert;
/**
 * 无副作用的 move
 * @example
 * let arr = ['a', 'b', 'c']
 * move(arr, 0, 2) -> ['b', 'c', 'a']
 * arr 保持不变
 * @param arr
 * @param from
 * @param to
 * @returns {*}
 */
function move(arr, from, to) {
    const elFrom = arr[from];
    if (from < to) {
        const removed = arr.filter((e, i) => i !== from);
        return insert(removed, to, elFrom);
    }
    else if (to < from) {
        const removed = arr.filter((e, i) => i !== from);
        return insert(removed, to, elFrom);
    }
    else {
        return arr;
    }
}
exports.move = move;
/**
 * 无副作用的 swap
 * @example
 * let arr = ['a', 'b', 'c']
 * move(arr, 0, 2) -> ['c', 'b', 'a']
 * arr 保持不变
 * @param arr
 * @param from
 * @param to
 * @returns {*}
 */
function swap(arr, from, to) {
    const res = _.clone(arr);
    res[from] = arr[to];
    res[to] = arr[from];
    return res;
}
exports.swap = swap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vnby11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vc3Vnby11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFxQztBQUNyQyw0QkFBMkI7QUFFM0IsNkJBQTZCO0FBQ2hCLFFBQUEsZ0JBQWdCLEdBQUcsQ0FBQyxHQUFvQixFQUFFLE1BQWUsRUFBRSxFQUFFO0lBQ3hFLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNuQixHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtLQUMxQjtJQUNEOzs7O1NBSUs7SUFDTCxPQUFPLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQyxHQUFhLENBQUMsQ0FBQTtBQUM5RCxDQUFDLENBQUE7QUFFRCwyQkFBMkI7QUFDZCxRQUFBLGtCQUFrQixHQUFHLENBQUMsR0FBVyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsaUNBQWlDLENBQUMsR0FBRyxDQUFDLENBQUE7QUFFbEcsbUJBQW1CO0FBQ25CLFNBQWdCLFlBQVksQ0FBQyxJQUE0QixFQUFFLFVBQVUsR0FBRyxJQUFJO0lBQzFFLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNwQixPQUFPLElBQUksQ0FBQTtLQUNaO0lBQ0QsSUFBSTtRQUNGLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFjLENBQUMsQ0FBQTtLQUNsQztJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxVQUFVLENBQUE7S0FDbEI7QUFDSCxDQUFDO0FBVEQsb0NBU0M7QUFFRCxNQUFNLFFBQVEsR0FBRyxDQUFDLElBQVMsRUFBRSxJQUFTLEVBQUUsRUFBRTtJQUN4QyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUM1QyxPQUFPLElBQUksQ0FB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
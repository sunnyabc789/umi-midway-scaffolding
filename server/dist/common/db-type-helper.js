"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function guessDruidTypeByDbDataType(dbType) {
    const dbTypeLowerCase = (dbType || '').toLowerCase();
    if (/text|clob|graphic|blob|binary|image|json|xml|raw|file/.test(dbTypeLowerCase)) {
        return 'Text';
    }
    if (/char|uid|rowid|enum|set/.test(dbTypeLowerCase)) {
        return 'String';
    }
    // 暂时不支持，先清洗成 string
    if (/bigdecimal|bigserial|bigint/.test(dbTypeLowerCase)) {
        return 'BigDecimal';
    }
    if (/double|real|num|decimal|dec|money/.test(dbTypeLowerCase)) {
        return 'Double';
    }
    if (/long/.test(dbTypeLowerCase)) {
        return 'Long';
    }
    if (/^int|int$|bit|bool|byte|serial/.test(dbTypeLowerCase)) {
        return 'Int';
    }
    if (/float/.test(dbTypeLowerCase)) {
        return 'Float';
    }
    if (/date|time/.test(dbTypeLowerCase)) {
        return 'Date';
    }
    return 'String';
}
exports.guessDruidTypeByDbDataType = guessDruidTypeByDbDataType;
exports.SimpleType = {
    Long: 'NUMBER',
    Float: 'NUMBER',
    String: 'STRING',
    Date: 'TIME',
    Int: 'NUMBER',
    Text: 'STRING',
    Double: 'NUMBER',
    BigDecimal: 'NUMBER',
};
function guessDruidStrTypeByDbDataType(dbType) {
    const druidType = guessDruidTypeByDbDataType(dbType);
    return (druidType || 'STRING').toUpperCase();
}
exports.guessDruidStrTypeByDbDataType = guessDruidStrTypeByDbDataType;
function guessSimpleTypeByDbDataType(dbType) {
    const druidType = guessDruidTypeByDbDataType(dbType);
    return exports.SimpleType[druidType] || 'STRING';
}
exports.guessSimpleTypeByDbDataType = guessSimpleTypeByDbDataType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGItdHlwZS1oZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL2RiLXR5cGUtaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsU0FBZ0IsMEJBQTBCLENBQUMsTUFBYztJQUN2RCxNQUFNLGVBQWUsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUNwRCxJQUFJLHVEQUF1RCxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUNqRixPQUFPLE1BQU0sQ0FBQTtLQUNkO0lBQ0QsSUFBSSx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUU7UUFDbkQsT0FBTyxRQUFRLENBQUE7S0FDaEI7SUFDRCxvQkFBb0I7SUFDcEIsSUFBSSw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUU7UUFDdkQsT0FBTyxZQUFZLENBQUE7S0FDcEI7SUFDRCxJQUFJLG1DQUFtQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUM3RCxPQUFPLFFBQVEsQ0FBQTtLQUNoQjtJQUNELElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUNoQyxPQUFPLE1BQU0sQ0FBQTtLQUNkO0lBQ0QsSUFBSSxnQ0FBZ0MsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUU7UUFDMUQsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUNELElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUNqQyxPQUFPLE9BQU8sQ0FBQTtLQUNmO0lBQ0QsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1FBQ3JDLE9BQU8sTUFBTSxDQUFBO0tBQ2Q7SUFDRCxPQUFPLFFBQVEsQ0FBQTtBQUNqQixDQUFDO0FBNUJELGdFQTRCQztBQUVZLFFBQUEsVUFBVSxHQUFHO0lBQ3hCLElBQUksRUFBRSxRQUFRO0lBQ2QsS0FBSyxFQUFFLFFBQVE7SUFDZixNQUFNLEVBQUUsUUFBUTtJQUNoQixJQUFJLEVBQUUsTUFBTTtJQUNaLEdBQUcsRUFBRSxRQUFRO0lBQ2IsSUFBSSxFQUFFLFFBQVE7SUFDZCxNQUFNLEVBQUUsUUFBUTtJQUNoQixVQUFVLEVBQUUsUUFBUTtDQUNyQixDQUFBO0FBRUQsU0FBZ0IsNkJBQTZCLENBQUMsTUFBYztJQUMxRCxNQUFNLFNBQVMsR0FBRywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNwRCxPQUFPLENBQUMsU0FBUyxJQUFJLFFBQVEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO0FBQzlDLENBQUM7QUFIRCxzRUFHQztBQUVELFNBQWdCLDJCQUEyQixDQUFDLE1BQWM7SUFDeEQsTUFBTSxTQUFTLEdBQUcsMEJBQTBCLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDcEQsT0FBTyxrQkFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFFBQVEsQ0FBQTtBQUMxQyxDQUFDO0FBSEQsa0VBR0MifQ==
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 我们的采集系统暂不支持 Tindex 和 db2
// 请同步修改 OfflineCalc/model-publisher.jsx OfflineCalcDataSourceTypeConvertDict
exports.OfflineCalcDataSourceTypeEnum = {
    // Tindex: 0,
    MySQL: 1,
    Oracle: 2,
    Db2: 3,
    SQLServer: 4,
    PostgreSQL: 5,
    Hive: 6
};
exports.OfflineCalcDataSourceDefaultSchema = {
    Oracle: 'SYSTEM',
    Db2: '',
    SQLServer: 'dbo',
    PostgreSQL: 'public'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1vbi9jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyQkFBMkI7QUFDM0IsNkVBQTZFO0FBQ2hFLFFBQUEsNkJBQTZCLEdBQUc7SUFDM0MsYUFBYTtJQUNiLEtBQUssRUFBRSxDQUFDO0lBQ1IsTUFBTSxFQUFFLENBQUM7SUFDVCxHQUFHLEVBQUUsQ0FBQztJQUNOLFNBQVMsRUFBRSxDQUFDO0lBQ1osVUFBVSxFQUFFLENBQUM7SUFDYixJQUFJLEVBQUUsQ0FBQztDQUNSLENBQUE7QUFFWSxRQUFBLGtDQUFrQyxHQUFHO0lBQ2hELE1BQU0sRUFBRSxRQUFRO0lBQ2hCLEdBQUcsRUFBRSxFQUFFO0lBQ1AsU0FBUyxFQUFFLEtBQUs7SUFDaEIsVUFBVSxFQUFFLFFBQVE7Q0FDckIsQ0FBQSJ9
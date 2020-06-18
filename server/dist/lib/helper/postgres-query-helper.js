"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const _ = require("lodash");
const constants_1 = require("../../common/constants");
const db_type_helper_1 = require("../../common/db-type-helper");
async function rawShowTables(args) {
    const { hostAndPort, database, schema, user, password } = args;
    const tables = await rawSQLQueryForSQLServer(`SELECT * FROM pg_catalog.pg_tables where schemaname = :schema`, { schema: schema || constants_1.OfflineCalcDataSourceDefaultSchema.PostgreSQL }, hostAndPort, database, user, password);
    return _.map(tables, (t) => t.tablename);
}
exports.rawShowTables = rawShowTables;
async function rawDescTable(args) {
    const { tableName, hostAndPort, database, schema, user, password } = args;
    const sql = `
  select * from INFORMATION_SCHEMA.COLUMNS
  where table_name = :tableName and table_schema = :schema
  order by ordinal_position`;
    const fields = await rawSQLQueryForSQLServer(sql, { tableName, schema: schema || constants_1.OfflineCalcDataSourceDefaultSchema.PostgreSQL }, hostAndPort, database, user, password);
    return fields.map(f => {
        const { column_name, data_type } = f;
        return {
            Field: column_name,
            Type: db_type_helper_1.guessDruidStrTypeByDbDataType(data_type),
            RawType: data_type
        };
    });
}
exports.rawDescTable = rawDescTable;
async function rawSQLQueryForSQLServer(sql, binds, hostAndPort, database, user, password) {
    const [host, port] = hostAndPort.split(':');
    const sequelize = new sequelize_typescript_1.Sequelize({
        database,
        username: user,
        password,
        host,
        port: (+port || 5432),
        dialect: 'postgres',
        logging: console.log
    });
    const res = await sequelize.query(sql, { replacements: binds, type: sequelize.QueryTypes.SELECT });
    return res;
}
exports.rawSQLQueryForSQLServer = rawSQLQueryForSQLServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGdyZXMtcXVlcnktaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9oZWxwZXIvcG9zdGdyZXMtcXVlcnktaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0RBQWdEO0FBQ2hELDRCQUEyQjtBQUMzQixzREFBeUU7QUFDekUsZ0VBQXlFO0FBR2xFLEtBQUssVUFBVSxhQUFhLENBQUMsSUFBZTtJQUNqRCxNQUFNLEVBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBQyxHQUFHLElBQUksQ0FBQTtJQUM1RCxNQUFNLE1BQU0sR0FBRyxNQUFNLHVCQUF1QixDQUFDLCtEQUErRCxFQUMxRyxFQUFDLE1BQU0sRUFBRSxNQUFNLElBQUksOENBQWtDLENBQUMsVUFBVSxFQUFDLEVBQ2pFLFdBQVcsRUFDWCxRQUFRLEVBQ1IsSUFBSSxFQUNKLFFBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0FBQy9DLENBQUM7QUFWRCxzQ0FVQztBQUVNLEtBQUssVUFBVSxZQUFZLENBQUMsSUFBZTtJQUNoRCxNQUFNLEVBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUMsR0FBRyxJQUFJLENBQUE7SUFDdkUsTUFBTSxHQUFHLEdBQUc7Ozs0QkFHYyxDQUFBO0lBQzFCLE1BQU0sTUFBTSxHQUFHLE1BQU0sdUJBQXVCLENBQUMsR0FBRyxFQUFFLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLElBQUksOENBQWtDLENBQUMsVUFBVSxFQUFDLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDdEssT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3BCLE1BQU0sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2xDLE9BQU87WUFDTCxLQUFLLEVBQUUsV0FBVztZQUNsQixJQUFJLEVBQUUsOENBQTZCLENBQUMsU0FBUyxDQUFDO1lBQzlDLE9BQU8sRUFBRSxTQUFTO1NBQ25CLENBQUE7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFmRCxvQ0FlQztBQUVNLEtBQUssVUFBVSx1QkFBdUIsQ0FBQyxHQUFXLEVBQUUsS0FBYSxFQUFFLFdBQW1CLEVBQUUsUUFBZ0IsRUFBRSxJQUFZLEVBQUUsUUFBZ0I7SUFDN0ksTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzNDLE1BQU0sU0FBUyxHQUFHLElBQUksZ0NBQVMsQ0FBQztRQUM5QixRQUFRO1FBQ1IsUUFBUSxFQUFFLElBQUk7UUFDZCxRQUFRO1FBQ1IsSUFBSTtRQUNKLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztRQUNyQixPQUFPLEVBQUUsVUFBVTtRQUNuQixPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUc7S0FDckIsQ0FBQyxDQUFBO0lBRUYsTUFBTSxHQUFHLEdBQUcsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtJQUNsRyxPQUFPLEdBQUcsQ0FBQTtBQUNaLENBQUM7QUFkRCwwREFjQyJ9
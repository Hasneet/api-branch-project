import MySQLClient from "../clients/MySQLClient";

class QuerieMessagesRepository {
    async saveQuerieMessage(queryId, msg) {
        try {
            const connection = MySQLClient.getReadPool();
            const query = `
            INSERT INTO QueryMessages (Query_Id, Msg) VALUES (?,?);
            `;
            const [responseObj] = await connection.query(query, [queryId, msg]);
            return responseObj;
        }
        catch (err) {
            throw err;
        }
    }

    async listQuerieMessagesByQueryId(queryId) {
        try {
            const connection = MySQLClient.getReadPool();
            const query = `
            SELECT * FROM QueryMessages WHERE Query_Id = ? ORDER BY Created_At;
            `;
            const [responseArr] = await connection.query(query, [queryId]);
            return responseArr;
        }
        catch (err) {
            throw err;
        }
    }
    
    async saveQuerieResponse(assigneeId, queryId, queryMsg) {
        try {
            const connection = MySQLClient.getReadPool();
            const query = `
            INSERT INTO QueryMessages (Assignee_Id, Query_Id, Msg, Msg_Type) VALUES (?,?,?,?);
            `;
            const [responseObj] = await connection.query(query, [assigneeId, queryId, queryMsg, 'RESPONSE']);
            return responseObj;
        }
        catch (err) {
            throw err;
        }
    }
}
export default QuerieMessagesRepository;
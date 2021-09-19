import MySQLClient from "../clients/MySQLClient";
class QueriesRepository {
    async findQueriesByUser(userId) {
        try {
            const connection = MySQLClient.getReadPool();
            const query = `
            SELECT * FROM Queries WHERE User_Id = ? ORDER BY Created_At DESC;
            `;
            const [responseArr] = await connection.query(query, [userId]);
            return responseArr;
        }
        catch (err) {
            throw err;
        }
    }

    async findQueriesByQueryId(queryId) {
        try {
            const connection = MySQLClient.getReadPool();
            const query = `
            SELECT * FROM Queries WHERE Id = ?;
            `;
            const [responseArr] = await connection.query(query, [queryId]);
            return responseArr;
        }
        catch (err) {
            throw err;
        }
    }

    async saveQuerie(userId, querieSubject) {
        try {
            const connection = MySQLClient.getWritePool();
            const query = `
            INSERT INTO Queries (User_Id, Querie_Subject) VALUES (?,?);
            `;
            const [responseObj] = await connection.query(query, [userId, querieSubject]);
            return responseObj;
        }
        catch (err) {
            throw err;
        }
    }

    async findUnassignedQueries() {
        const connection = MySQLClient.getReadPool();
        const query = `
        SELECT * FROM Queries WHERE Assignee IS NULL;
        `;
        const [responseArr] = await connection.query(query);
        return responseArr;
    }

    async updateQuery(attributeArr, valueArr, queryId) {
        try {
            const connection = MySQLClient.getWritePool();
            const query = `
            UPDATE Queries SET ${attributeArr.join(',')} WHERE Id = ?;
            `;
            const [responseObj] = await connection.query(query, [...valueArr, queryId]);
            return responseObj;
        }
        catch (err) {
            throw err;
        }
    }

    async findQueriesByAssignee(assigneeId) {
        try {
            const connection = MySQLClient.getWritePool();
            const query = `
            SELECT * FROM Queries WHERE Assignee = ?;
            `;
            const [responseArr] = await connection.query(query, [assigneeId]);
            return responseArr;
        }
        catch (err) {
            throw err;
        }    
    }
}
export default QueriesRepository;
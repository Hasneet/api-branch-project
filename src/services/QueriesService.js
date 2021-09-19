import QueriesRepository from '../dao/QueriesRepository';
import QuerieMessageService from './QuerieMessageService';
class QueriesService {
    constructor() {
        this.queriesRepository = new QueriesRepository();
    }

    async findQueriesByUser(userId) {
        try {
            let responseArr = await this.queriesRepository.findQueriesByUser(userId);
            return responseArr;
        }
        catch (err) {
            throw err;
        }
    }

    async findQueriesByQueryId(queryId) {
        try {
            let responseArr = await this.queriesRepository.findQueriesByQueryId(queryId);
            return responseArr;
        }
        catch (err) {
            throw err;
        }
    }

    async saveQuerie(userId, querieSubject, queryMsg) {
        try {
            let responseObj = await this.queriesRepository.saveQuerie(userId, querieSubject);
            const queryMessageService = new QuerieMessageService();
            await queryMessageService.saveQuerieMessage(userId, responseObj.insertId, queryMsg);
            return { success: true, data: responseObj, message: 'Query saved successfully' };
        }
        catch (err) {
            throw err;
        }
    }

    async findUnassignedQueries() {
        try {
            let [responseArr] = await this.queriesRepository.findUnassignedQueries();
            return { success: true, data: responseArr, message: 'Queries fetched successfully' };
        }
        catch (err) {
            throw err;
        }
    }

    async updateAsigneeInQuery(assigneeId, queryId) {
        try {
            let queryArr = await this.findQueriesByQueryId(queryId);
            if (!queryArr.length) return { success: false, data: {}, message: 'Query does not exist' };
            const attributeArr = ['Assignee = ?'];
            const valueArr = [assigneeId];
            const response = await this.queriesRepository.updateQuery(attributeArr, valueArr, queryId);
            return { success: true, data: response, message: 'Assignee updated successfully' };
        }
        catch (err) {
            throw err;
        }
    }

    async updateQuery(attributeArr, valueArr, queryId) {
        try {
            const response = await this.queriesRepository.updateQuery(attributeArr, valueArr, queryId);
            return { success: true, data: response, message: 'Record updated successfully.' };
        }
        catch (err) {
            throw err;
        }
    }

    async findQueriesByAssignee(assigneeId) {
        try {
            const responseArr = await this.queriesRepository.findQueriesByAssignee(assigneeId);
            return { success: true, data: responseArr, message: 'Records fetched successuflly.' };
        }
        catch (err) {
            throw err;
        }
    }
}

export default QueriesService;
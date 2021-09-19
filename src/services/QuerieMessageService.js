import QuerieMessagesRepository from "../dao/QuerieMessagesRepository";
import QueriesService from "./QueriesService";
class QuerieMessageService {
    constructor() {
        this.queryMessagesRepository = new QuerieMessagesRepository();
        this.queriesService =  new QueriesService();
    }

    async saveQuerieMessage(userId, queryId, queryMsg) {
        try {
            let queryArr = await this.queriesService.findQueriesByQueryId(queryId);
            if (!queryArr.length) return { success: false, data: {}, message: 'Query does not exist' };
            if (queryArr[0].User_Id !== userId) return { success: false, data: {}, message: 'You are not authorised to post on this query' };
            let responseObj = await this.queryMessagesRepository.saveQuerieMessage(queryId, queryMsg);
            return { success: true, data: responseObj, message: 'Query message saved successfully' };
        }
        catch (err) {
            throw err;
        }
    }

    async listQuerieMessagesByUserIdAndQueryId(userId, queryId) {
        try {
            let queryArr = await this.queriesService.findQueriesByQueryId(queryId);
            if (!queryArr.length) return { success: false, data: [], message: 'Query does not exist' };
            if (queryArr[0].User_Id !== userId) return { success: false, data: [], message: 'You are not authorised to see this query' };
            let responseArr = await this.queryMessagesRepository.listQuerieMessagesByQueryId(queryId);
            return { success: true, data: responseArr, message: 'Query records fetched successfully' };
        }
        catch (err) {
            throw err;
        }
    }

    async saveQuerieResponse(assigneeId, queryId, queryMsg) {
        try {
            let queryArr = await this.queriesService.findQueriesByQueryId(queryId);
            if (!queryArr.length) return { success: false, data: {}, message: 'Query does not exist' };
            if (queryArr[0].Assignee !== assigneeId) return { success: false, data: {}, message: 'You are not authorised to post on this query' };
            const reponseObj = await this.queryMessagesRepository.saveQuerieResponse(assigneeId, queryId, queryMsg);
            return { success: true, data: reponseObj, message: 'Response saved successfully' };
        }
        catch (err) {
            throw err;
        }
    }
}

export default QuerieMessageService;
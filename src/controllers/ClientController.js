import ResponseHandler from "../utils/ResponseHandler";
import QueriesService from '../services/QueriesService';
import QuerieMessageService from "../services/QuerieMessageService";

class ClientController {
    constructor(app) {
        this.app = app;
        this.app.get('/queries', this.listQueries);
        this.app.post('/queries', this.saveQuerie);
        this.app.get('/queries/query-messages', this.listQueryMessages);
        this.app.post('/queries/save-query-message', this.saveQueryMessage);
    }

    async listQueries(req, res) {
        try {
            let { userId } = req.query;
            const queriesService = new QueriesService();
            const responseArr = await queriesService.findQueriesByUser(userId);
            return new ResponseHandler().sendResponse(res, 200, responseArr, 'Records fetched successfully.');
        }
        catch (err) {
            console.log(err);
            return new ResponseHandler().sendResponse(res);
        }
    }

    async saveQuerie(req, res) {
        try {
            let { userId, querieSubject, queryMsg } = req.body;
            let errorsArr = [];
            if (!userId) errorsArr.push('userId is required');
            if (!querieSubject) errorsArr.push('querieSubject is required');
            if (querieSubject && querieSubject.trim().length === 0) errorsArr.push(`querieSubject can not be empty`);
            if (!queryMsg) errorsArr.push('queryMsg is required');
            if (queryMsg && queryMsg.trim().length === 0) errorsArr.push(`queryMsg can not be empty`);
            if (errorsArr.length) return new ResponseHandler().sendResponse(res, 400, {}, errorsArr.join(', '));
            userId = parseInt(userId);
            const queriesService = new QueriesService();
            const responseObj = await queriesService.saveQuerie(userId, querieSubject, queryMsg);
            return new ResponseHandler().sendResponse(res, 201, { qurieId: responseObj.data.insertId }, responseObj.message);
        }
        catch (err) {
            console.log(err);
            return new ResponseHandler().sendResponse(res);
        }
    }

    async listQueryMessages(req, res) {
        try {
            let { userId, queryId } = req.query;
            let errorsArr = [];
            if (!userId) errorsArr.push('userId is required');
            if (!queryId) errorsArr.push('queryId is required');
            if (errorsArr.length) return new ResponseHandler().sendResponse(res, 400, {}, errorsArr.join(', '));
            userId = parseInt(userId);
            queryId = parseInt(queryId);
            const queryMessageService = new QuerieMessageService();
            const response = await queryMessageService.listQuerieMessagesByUserIdAndQueryId(userId, queryId);
            if (!response.success) return new ResponseHandler().sendResponse(res, 400, {}, response.message);
            return new ResponseHandler().sendResponse(res, 200, response.data, response.message);
        }
        catch (err) {
            console.log(err);
            return new ResponseHandler().sendResponse(res);
        }
    }

    async saveQueryMessage(req, res) {
        try {
            let {userId, queryId, queryMsg } = req.body;
            let errorsArr = [];
            if (!userId) errorsArr.push('userId is required');
            if (!queryId) errorsArr.push('queryId is required');
            if (!queryMsg) errorsArr.push('queryMsg is required');
            if (queryMsg && queryMsg.trim().length === 0) errorsArr.push('queryMsg can not be empty');
            if (errorsArr.length) return new ResponseHandler().sendResponse(res, 400, {}, errorsArr.join(', '));
            userId = parseInt(userId);
            queryId = parseInt(queryId);
            const queryMessageService = new QuerieMessageService();
            const response = await queryMessageService.saveQuerieMessage(userId, queryId, queryMsg);
            if (!response.success) return new ResponseHandler().sendResponse(res, 400, {}, response.message);
            return new ResponseHandler().sendResponse(res, 200, response.data, response.message);
        }
        catch (err) {
            console.log(err);
            return new ResponseHandler().sendResponse(res);
        }
    }
}

export default ClientController;
import ResponseHandler from "../utils/ResponseHandler";
import QueriesService from "../services/QueriesService";
import QuerieMessageService from "../services/QuerieMessageService";

class AgentController {
    constructor(app) {
        this.app = app;
        this.app.get('/agents/unassigned-queries', this.listUnassignedQueries);
        this.app.post('/agents/assign-query', this.assignQuery);
        this.app.get('/agents/assigned-query-list', this.assignedQueryList);
        this.app.post('/agents/save-response', this.assigneeResponse);
    }

    async listUnassignedQueries(req, res) {
        try {
            const queryService = new QueriesService();
            const response = await queryService.findUnassignedQueries();
            if (!response.success) new ResponseHandler().sendResponse(res, 400, {}, response.message);
            return  new ResponseHandler().sendResponse(res, 200, response.data, response.message);
        }
        catch (err) {
            console.log(err);
            return new ResponseHandler().sendResponse(res);
        }
    }

    async assignQuery(req, res) {
        try {
            let { assigneeId, queryId } = req.body;
            let errorsArr = [];
            if (!assigneeId) errorsArr.push('assigneeId is requried');
            if (!queryId) errorsArr.push('queryId is requried');
            if (errorsArr.length) return new ResponseHandler().sendResponse(res, 400, {}, errorsArr.join(', '));
            const queryService = new QueriesService();
            const response = await queryService.updateAsigneeInQuery(assigneeId, queryId);
            if (!response.success) return new ResponseHandler().sendResponse(res, 400, {}, response.message);
            return new ResponseHandler().sendResponse(res, 200, {}, response.message);
        }
        catch (err) {
            console.log(err);
            return new ResponseHandler().sendResponse(res);
        }
    }

    async assignedQueryList(req, res) {
        try {
            let { assigneeId } = req.query;
            let errorsArr = [];
            if (!assigneeId) errorsArr.push('assigneeId is required');
            if (errorsArr.length) return new ResponseHandler().sendResponse(res, 400, {}, errorsArr.join(', '));
            const queryService = new QueriesService();
            const response = await queryService.findQueriesByAssignee(assigneeId);
            if (!response.success) return new ResponseHandler().sendResponse(res, 400, {}, response.message);
            return new ResponseHandler().sendResponse(res, 200, response.data, response.message);
        }
        catch (err) {
            console.log(err);
            return new ResponseHandler().sendResponse(res);
        }
    }

    async assigneeResponse(req, res) {
        try {
            let {assigneeId, queryId, assigneeMsg } = req.body;
            let errorsArr = [];
            if (!assigneeId) errorsArr.push('assigneeId is required');
            if (!queryId) errorsArr.push('queryId is required');
            if (!assigneeMsg) errorsArr.push('assigneeMsg is required');
            if (assigneeMsg && assigneeMsg.trim().length === 0) errorsArr.push('assigneeMsg can not be empty');
            if (errorsArr.length) return new ResponseHandler().sendResponse(res, 400, {}, errorsArr.join(', '));
            const queryMessageService = new QuerieMessageService();
            const response = await queryMessageService.saveQuerieResponse(assigneeId, queryId, assigneeMsg);
            if (!response.success) return new ResponseHandler().sendResponse(res, 400, {}, response.message);
            return new ResponseHandler().sendResponse(res, 200, {}, response.message);
        }
        catch (err) {
            console.log(err);
            return new ResponseHandler().sendResponse(res);
        }
    }
}

export default AgentController;
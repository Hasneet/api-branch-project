class ResponseHandler {

    sendResponse(res, statusCode = 500, data = {}, message = 'Something went wrong.') {
        const json = {
            data,
            message
        }
        return res.status(statusCode).send(json);
    }
}

export default ResponseHandler;
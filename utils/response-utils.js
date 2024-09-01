const sendSuccessResponse = async (message, data, res) => {
    return res.status(200).json({ success: true, message, data, error:null });
};
const sendBadRequestResponse = async (message, data, error, res) => {
    return res.status(400).json({ success: false, message, data, error });
};

const sendServerErrorResponse = async (message, data, error, res) => {
    return res.status(500).json({ success: false, message, data, error });
};

const sendDuplicateKeyErrorResponse = async (message, data, error, res) => {
    return res.status(409).json({ success: false, message, data, error });
};

const sendErrorResponse = async (message, data, error, statusCode, res) => {
    console.log("sending error response with status code: " + statusCode);
    return res.status(statusCode).json({ success: false, message, data, error });
};

module.exports = {
    sendSuccessResponse,
    sendBadRequestResponse,
    sendServerErrorResponse,
    sendDuplicateKeyErrorResponse,
    sendErrorResponse
};

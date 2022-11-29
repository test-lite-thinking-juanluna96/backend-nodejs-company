import sendResponse from './../common/helpers/sendResponse'
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const handler = async (event, context) => {
  return sendResponse(200, JSON.stringify({ message: 'OK' }))
}

module.exports.handler = handler

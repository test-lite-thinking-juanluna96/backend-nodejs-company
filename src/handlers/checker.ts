// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'OK'
    })
  }
}

module.exports.handler = handler

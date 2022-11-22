// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getCode = (error) => {
  const { code, message } = error

  if (code) {
    return [code, message]
  }

  return [500, 'Internal Server Error']
}

export default {
  getCode
}

import AssertionError from '@/utils/assertion-error'

function assertTokenIsDefined(
  token: string | undefined
): asserts token is string {
  if (token === undefined) {
    throw new AssertionError('Token is undefined')
  }
}

const apiToken = (function () {
  let _token: string | null = process.env.EHD_API_KEY || null

  return {
    set(token: string) {
      assertTokenIsDefined(token)
      _token = token
    },
    get() {
      return _token
    }
  }
})()

export default apiToken

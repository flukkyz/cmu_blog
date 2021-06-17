export default {
  redirect: {
    login: `${process.env.BASE_URL}/login`,
    callback: `${process.env.BASE_URL}${process.env.OAUTH_RETURN_URI}`,
    logout: `${process.env.BASE_URL}/`
  },
  strategies: {
    cmu: {
      scheme: 'refresh',
      token: {
        property: 'access_token',
        maxAge: 3600
      },
      refreshToken: {
        property: 'refresh_token',
        data: 'refresh_token',
        maxAge: 60 * 60 * 10
      },
      user: 'user',
      endpoints: {
        refresh: { url: `${process.env.BASE_URL}/oauth2/token`, method: 'post' },
        user: { url: `${process.env.BASE_URL}/oauth2/me`, method: 'get' },
        logout: false
      }
    }
  }
}

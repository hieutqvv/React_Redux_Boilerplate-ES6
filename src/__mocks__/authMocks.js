import MockAdapter from 'axios-mock-adapter';

export default {
  mockAuthorization: (axiosInstance, url) => {
    const mock = new MockAdapter(axiosInstance);
    const auth_url = url + '/authentications'
    const get_me = url + '/me'
    mock.onPost(auth_url).reply(function (config) {
      console.log('xxxx')
      return [200, {
        access_token: 'access_token',
        refreshToken: 'refreshToken',
        expiresIn: 3000
      }]
    });

    mock.onGet(get_me).reply(function () {
      console.log('xxxx2')
      return [200, {
        me: 'Ta Quang Hieu'
      }]
    })
  }
}
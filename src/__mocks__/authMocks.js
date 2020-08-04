import MockAdapter from 'axios-mock-adapter';

export default {
  mockAuthorization: (axiosInstance, url) => {
    const mock = new MockAdapter(axiosInstance);
    const auth_url = url + '/authentications'
    const get_me = url + '/me'
    const get_todo = url + '/todos'
    mock.onPost(auth_url).reply(function (config) {
      return [200, {
        access_token: 'access_token',
        refreshToken: 'refreshToken',
        expiresIn: 3000
      }]
    });

    mock.onGet(get_me).reply(function () {
      return [200, {
        me: 'Ta Quang Hieu'
      }]
    });

    mock.onGet(get_todo).reply(function () {
      let data = [
        {
          title: 'Hieu'
        },
        {
          title: 'lalalala'
        },
        {
          title: 'balalal'
        }
      ];
      return [200, {
        "count": 100,
        "total": 1,
        "_embedded": {
          "todos": data
        },
      }]
    });
  }
}

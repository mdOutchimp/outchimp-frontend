import Vue from 'vue'
import Echo from 'laravel-echo';

const echo = {};

echo.install = function (Vue) {
  Vue.prototype.$pusher = require('pusher-js');
  Vue.prototype.$echo = new Echo({
    authEndpoint: 'http://bdlancers.com/api/broadcasting/auth',
    auth: {
      headers: {
        Authorization: 'Bearer XXXXXXXXXXXX',
      }
    },
    key: 'ec1c3355efc40466e121',
    forceTLS: false,
    enabledTransports: ['ws'],
    cluster: 'ap2'
  });
};

Vue.use(echo);

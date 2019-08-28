import Route from '@ember/routing/route';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {

  session: service(),

  api: service(),

  model() {
    const api = this.get('api');
    return api.request('https://api.github.com/user/repos', {
      type: 'GET',
      crossDomain: true,
      dataType: 'json',
      data: {
        access_token: this.get('session.data.authenticated.authToken')
      }
    })
  }
});

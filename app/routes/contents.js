import Route from '@ember/routing/route';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {

  session: service(),

  api: service(),

  model(params) {
    const { repoName } = params;
    const url = `https://api.github.com/repos/${repoName}/contents/`;
    const api = this.get('api');
    return api.request(url, {
      type: 'GET',
      crossDomain: true,
      dataType: 'json',
      data: {
        access_token: this.get('session.data.authenticated.authToken')
      }
    })
  }
});

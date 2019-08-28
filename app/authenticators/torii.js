import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
import config from '../config/environment';
import { inject as service } from '@ember/service';

export default ToriiAuthenticator.extend({
  torii: service(),
  ajax: service(),

  authenticate() {
    const ajax = this.get('ajax');
    const tokenExchangeUri = config.torii.providers['github-oauth2'].tokenExchangeUri;

    return this._super(...arguments).then((data) => {
      return ajax.request(tokenExchangeUri, {
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
          authorizationCode: data.authorizationCode
        })
      }).then( (response) => {
        return {
          authToken: JSON.parse(response).access_token,
          provider: data.provider
        };
      });
    });
  }
});

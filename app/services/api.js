import AjaxService from 'ember-ajax/services/ajax';
import {inject as service} from '@ember/service';
import { computed }  from '@ember/object';

export default AjaxService.extend({

  session: service(),

  authorizer: 'authorizer:github',

  headers: computed('session.isAuthenticated', {
    get() {
      const authorizer = this.get('authorizer');
      let headers = {};
      this.get('session').authorize(authorizer, (headerName, headerValue) => {
        headers[headerName] = headerValue;
      });
      return headers;
    }
  }),
});

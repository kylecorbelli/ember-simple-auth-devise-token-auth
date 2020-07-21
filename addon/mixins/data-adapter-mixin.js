import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { computed } from "@ember/object"
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default Mixin.create(DataAdapterMixin, {
  session: service(),

  // Ember-simple-auth version < 3
  authorize(xhr) {
    const headers = this.get("headers");
    Object.entries(headers).map(
      header => xhr.setRequestHeader(...header)
    )
  },

  // Ember-simple-auth version >= 3
  headers: computed("session.data.authenticated.token", function () {
    const { accessToken, client, expiry, tokenType, uid } = this.get(
      "session.data.authenticated",
    );

    return {
      "access-token": accessToken,
      "client": client,
      "expiry": expiry,
      "token-type": tokenType,
      "uid": uid,
    };
  }),
});

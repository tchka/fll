import api from '../api/index'

export default {
  install: (app, options) => {
    /* declare global component */
    app.component("apiPlugin", api);
  },
};


const path = require('path')
var { config } = { config: {} };

config = {
  loading: {
    preAngularBootstrap: {
      loader: {
        name: 'lds-heart',
        color: '#c75a59'
      },
      background: '#9395ab',
    },
    afterAngularBootstrap: {
      loader: {
        name: 'lds-default',
        color: '#c85958'
      },
      background: '#868686',
    },
  },
  entites: {
    FiredevFile: {
      dontLoadAssets: false,
    }
  },
  title: 'Codete NgRx Quick Start',
  pwa: {
    name: 'Codete NgRx Quick Start',
    short_name: 'codete-ngrx-start',
  }



}
module.exports = exports = { config };

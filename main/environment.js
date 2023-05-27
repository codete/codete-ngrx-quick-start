
const path = require('path')
var { config } = { config: {} };

config = {
  plugins: {
    'ngx-progressbar': {
      spinnerPosition: 'left'
    }
  },
  loading: {
    preAngularBootstrap: {
      loader: 'layout/src/assets/logo2.svg',
      // loader: {
      //   name: 'lds-heart',
      //   color: '#c75a59'
      // },
      background: '#9395ab',
    },
    afterAngularBootstrap: {
      loader: {
        name: 'lds-default',
        color: '#c85958'
      },
      background: '#9395abb5',
    },
  },
  title: 'Codete NgRx Quick Start',
  pwa: {
    name: 'Codete NgRx Quick Start',
    short_name: 'codete-ngrx-start',
  }
}
module.exports = exports = { config };

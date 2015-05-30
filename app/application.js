var form = require('form');
var navbar = require('navbar');
var sharings = require('sharings');
var alerts = require('alerts');

var application = {
  controller: function() {
    var ctrl = this;

    ctrl.navbar = new navbar.controller({currentUser: window.currentUser});
    ctrl.sharings = new sharings.controller({currentUser: window.currentUser});
    ctrl.alerts = new alerts.controller();

    ctrl.form   = new form.controller({
      sharings: ctrl.sharings.sharings,
      currentUser: window.currentUser,
      alerts: ctrl.alerts
    });
  },

  view: function(ctrl) {
    return m("div", [
      navbar.view(ctrl.navbar),

      m(".container", [
        m(".row", [
          m(".col-md-12", [
            alerts.view(ctrl.alerts)
          ])
        ]),

        m(".row", [
          m(".col-md-12", [
            form.view(ctrl.form)
          ])
        ]),

        m(".row", [
          m(".col-md-12", [
            sharings.view(ctrl.sharings)
          ])
        ]),

      ])
    ]);
  }
};

var roleArn = 'arn:aws:iam::734188402028:role/iam_role_test';

function amazonAuth(response) {
  if (response.error) {
    console.log('error: ', response.error);
    return;
  }

  AWS.config.credentials = new AWS.WebIdentityCredentials({
    RoleArn: roleArn,
    ProviderId: 'www.amazon.com',
    WebIdentityToken: response.access_token
  });

  amazon.Login.retrieveProfile(response.access_token, function(data) {
    window.currentUser = data.profile;
    application.init();
  });
}

window.onAmazonLoginReady = function() {
  amazon.Login.setClientId('amzn1.application-oa2-client.67bc71d345094f86b490e92aad32b9c7');
  var options = { scope : 'profile' };
  amazon.Login.authorize(options, amazonAuth);
};

(function(d) {
  var a = d.createElement('script'); a.type = 'text/javascript';
  a.async = true; a.id = 'amazon-login-sdk';
  a.src = 'https://api-cdn.amazon.com/sdk/login1.js';
  d.getElementById('amazon-root').appendChild(a);
})(document);

application.init = function() {
  m.mount(document.getElementById('app'), application);
};

module.exports = application;

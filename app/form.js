var Sharing = require('sharing');

function loadingSpinner() {
  return m(".loading-spinner", "Loading");
}

var form = {
  controller: function(data) {
    var ctrl = this;
    var sharings = data.sharings;

    ctrl.alerts = data.alerts;
    ctrl.url = m.prop('');
    ctrl.comment = m.prop('');
    ctrl.loading = m.prop(false);
    ctrl.currentUser = m.prop(data.currentUser);

    ctrl.submit = function(e) {
      e.preventDefault();

      if (ctrl.loading()) return true;

      ctrl.loading(true);
      ctrl.alerts.clear();

      Sharing.Create({
        user: ctrl.currentUser(),
        url: ctrl.url(),
        comment: ctrl.comment()
      }, function(err, data) {
        if (err) return console.log("err: ", err);

        ctrl.url('');
        ctrl.comment('');

        var sharing = JSON.parse(data.Payload);

        if (sharing.errorMessage) {
          console.log('error:', sharing.errorMessage);
          ctrl.alerts.error("Oops, couldn't create that sharing!");
        } else {
          console.log(sharing);
          sharings().unshift(sharing);
        }

        ctrl.loading(false);
        m.redraw();
      });
    };
  },

  view: function(ctrl) {
    return m(".panel.panel-default", {class: ctrl.loading() ? 'loading' : ''}, [
      m(".panel-body", [
        m("form", {onsubmit: ctrl.submit}, [
          m(".form-group", [
            m("input[type=url].form-control[placeholder='URL']", {onchange: m.withAttr("value", ctrl.url), value: ctrl.url()}),
          ]),
          m(".form-group", [
            m("input[type=text].form-control[placeholder='Optional comment']", {onchange: m.withAttr("value", ctrl.comment), value: ctrl.comment()}),
          ]),
          m("input[type=submit].btn.btn-primary", {class: ctrl.loading() ? 'disabled' : '', value: ctrl.loading() ? "Sharing..." : "Share"})
        ])
      ])
    ]);
  }
};

module.exports = form;

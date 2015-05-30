function alertDiv(hclass, msg) {
  return m(".alert.alert-" + hclass, [
    m("button.close[aria-label='Close'][data-dismiss='alert'][type='button']", [m("span[aria-hidden='true']", "×")]),
    msg
  ]);
}

var alerts = {
  controller: function() {
    var ctrl = this;

    ctrl.error = m.prop('');

    ctrl.clear = function() {
      ctrl.error('');
    };
  },

  view: function(ctrl) {
    return ctrl.error() ? alertDiv('danger', ctrl.error()) : "";
  }
};

module.exports = alerts;

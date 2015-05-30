function alertDiv(hclass, msg) {
  return m(".alert.alert-" + hclass, [
    m("button.close[aria-label='Close'][data-dismiss='alert'][type='button']", [m("span[aria-hidden='true']", "×")]),
    msg
  ]);
}

var alerts = {
  controller: function() {
    this.error = m.prop('');
  },

  view: function(ctrl) {
    return ctrl.error() ? alertDiv('danger', ctrl.error()) : "";
  }
};

module.exports = alerts;

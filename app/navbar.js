var navbar = {
  controller: function(data) {
    this.currentUser = m.prop(data.currentUser);
  },

  view: function(ctrl) {
    return m("nav.navbar.navbar-inverse.navbar-fixed-top[role='navigation']", [
      m(".container-fluid", [
        m(".navbar-header", [
          m("button.navbar-toggle[data-target='#bs-example-navbar-collapse-1'][data-toggle='collapse'][type='button']", [
            m("span.sr-only", "Toggle navigation"),
            m("span.icon-bar"),
            m("span.icon-bar"),
            m("span.icon-bar")
          ]),
          m("a.navbar-brand[href='/']", [m("span.glyphicon.glyphicon-heart", {style: {"position": " relative", " top": " 3px"}})," Sharings"])
        ]),
        m(".collapse.navbar-collapse[id='bs-example-navbar-collapse-1']", [
          m("ul.nav.navbar-nav.navbar-right", [
            m("li.dropdown", [
              m("a.dropdown-toggle[data-toggle='dropdown'][href='#']", [ctrl.currentUser().Name, " ", m("b.caret")]),
              m("ul.dropdown-menu", [
                m("li", [m("a[href='/logout']", "Sign Out")])
              ])
            ])
          ])
        ])
      ]),
    ]);
  }
};

module.exports = navbar;

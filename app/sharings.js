var sharings = {
  controller: function(data) {
    var ctrl = this;
    ctrl.sharings = m.prop([]);
    ctrl.currentUser = m.prop(data.currentUser);

    var bucket = new AWS.S3({params: {Bucket: 's3sharings'}});

    bucket.getObject({Key: 'data/'+ ctrl.currentUser().CustomerId +'/recent.json'}, function(err, data){
      ctrl.sharings(JSON.parse(data.Body));
      m.redraw();
    });
  },

  view: function(ctrl) {
    return ctrl.sharings().map(function(sharing){
      return [m(".sharing.panel.panel-default", [
        m(".panel-body", [
          m(".media", [
            m("a.pull-left", {href: sharing.url, target: "_blank"}, [
              m("img.media-object", {src: sharing.image_src || "/images/thumbnail-default.jpg"})
            ]),
            m(".media-body", [
              m(".media-heading", [
                m("h4", [
                  m("a", {href: sharing.url, target: "_blank"}, sharing.title)
                ])
              ]),
              m("img.favicon[alt='favicon'][src='http://www.google.com/s2/favicons?domain=" + sharing.domain + "']"),
              sharing.domain
            ])
          ])
        ])
      ])];
    });
  }
};

module.exports = sharings;

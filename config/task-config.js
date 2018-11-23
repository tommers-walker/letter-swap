require("@babel/polyfill");

module.exports = {
  html        : true,
  images      : true,
  fonts       : true,
  static      : true,
  svgSprite   : true,
  ghPages     : true,
  stylesheets : true,

  javascripts: {
    entry: {
      // files paths are relative to
      // javascripts.dest in path-config.json
      app: ["@babel/polyfill", "./app.js"]
    },
    babel: {
      presets: [
        ["es2015", {
          "targets": {
            "ie": "10"
          }
        }],
      ]
    }
  },

  browserSync: {
    server: {
      // should match `dest` in
      // path-config.json
      baseDir: 'public'
    },
    notify: false
  },

  production: {
    rev: true
  }
}

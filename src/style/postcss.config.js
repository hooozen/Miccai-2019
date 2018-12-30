module.exports = {
  plugins: [
    require("cssnano")(),
    require("autoprefixer")({
      browsers: [
        ">0%",
        "last 4 versions",
        "Firefox ESR",
        "not ie < 8"
      ]
    })
  ]
};

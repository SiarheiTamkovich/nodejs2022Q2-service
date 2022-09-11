module.exports = {
  filter(data) {return !!data.req},
  output: {
    path: "error.log", // name of file
    isJson: false, // JSON formatting will be disabled
    options: {
      path: "logs/error/", // path to write files to
      size: "10K", // max file size: ;
      rotate: 5, // keep 5 rotated logs
      compress: "gzip",
    }
  }
}
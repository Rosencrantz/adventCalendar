var fs = require("fs"),
    path = require("path"),
    p404 = '<!doctype html><html lang=en><meta charset=utf-8><title>Not Found</title><style>body{background:#22252a;color:#fff;font:300 100.01% "Helvetica Neue",Helvetica,"Arial Unicode MS",Arial,sans-serif;}h1{font-weight:300;text-align:center;padding:5em;color:#ccf;}</style><body><h1>404<br>Page not found',
    p500 = '<!doctype html><html lang=en><meta charset=utf-8><title>Internal Error</title><style>body{background:#22252a;color:#fff;font:300 100.01% "Helvetica Neue",Helvetica,"Arial Unicode MS",Arial,sans-serif;}h1{font-weight:300;text-align:center;padding:5em;color:#fcc;}</style><body><h1>500<br>Internal Error<p>',
    url = require("url");

require("http").createServer(function (req, res) {
    var name = url.parse(req.url).pathname;
    name == "/" && (name = "/index.html");
    var fullPath = path.join(process.cwd(), process.argv[2] || "", name),
        content;
    var ext = name.substring(name.lastIndexOf(".") + 1);
    fs.stat(fullPath, function (err, stats) {
        if (!err && stats.isFile()) {
            fs.readFile(fullPath, encoding[ext] || "binary", function (err, data) {
                if (err) {
                    res.writeHead(500, {"Content-Type": "text/html"});
                    res.end(p500 + err);
                }
                res.writeHead(200, {"Content-Type": types[ext] || "text/plain"});
                if(!req.method.match(/head/i)){ res.write(data, encoding[ext] || 'binary'); }
                res.end();
            });
        } else {
            res.writeHead(404, {"Content-Type": "text/html"});
            res.end(p404);
        }
    });
}).listen(parseInt(process.env.PORT || 8080, 10));

var types = {
      ai    : "application/postscript",
      atom  : "application/atom+xml",
      au    : "audio/basic",
      avi   : "video/x-msvideo",
      bmp   : "image/bmp",
      css   : "text/css",
      csv   : "text/csv",
      diff  : "text/x-diff",
      dmg   : "application/octet-stream",
      dtd   : "application/xml-dtd",
      eml   : "message/rfc822",
      eps   : "application/postscript",
      gif   : "image/gif",
      gz    : "application/x-gzip",
      htm   : "text/html",
      html  : "text/html",
      ico   : "image/vnd.microsoft.icon",
      ics   : "text/calendar",
      jpeg  : "image/jpeg",
      jpg   : "image/jpeg",
      js    : "application/javascript",
      json  : "application/json",
      log   : "text/plain",
      m3u   : "audio/x-mpegurl",
      m4v   : "video/mp4",
      manifest: "text/cache-manifest",
      mid   : "audio/midi",
      midi  : "audio/midi",
      mime  : "message/rfc822",
      mov   : "video/quicktime",
      mp3   : "audio/mpeg",
      mp4   : "video/mp4",
      mp4v  : "video/mp4",
      mpeg  : "video/mpeg",
      mpg   : "video/mpeg",
      ogg   : "application/ogg",
      pdf   : "application/pdf",
      pkg   : "application/octet-stream",
      png   : "image/png",
      ps    : "application/postscript",
      psd   : "image/vnd.adobe.photoshop",
      rar   : "application/x-rar-compressed",
      rdf   : "application/rdf+xml",
      rss   : "application/rss+xml",
      rtf   : "application/rtf",
      svg   : "image/svg+xml",
      svgz  : "image/svg+xml",
      tar   : "application/x-tar",
      text  : "text/plain",
      tif   : "image/tiff",
      tiff  : "image/tiff",
      ttf   : "application/x-font-ttf",
      txt   : "text/plain",
      xhtml : "application/xhtml+xml",
      zip   : "application/zip"
  };
var encoding = {
    ai    : "binary",
    atom  : "utf8",
    au    : "binary",
    avi   : "binary",
    bmp   : "binary",
    css   : "utf8",
    gif   : "binary",
    gz    : "binary",
    htm   : "utf8",
    html  : "utf8",
    ico   : "binary",
    ics   : "binary",
    jpeg  : "binary",
    jpg   : "binary",
    js    : "utf8",
    json  : "utf8",
    manifest: "utf8",
    mov   : "binary",
    mp3   : "binary",
    mp4   : "binary",
    mp4v  : "binary",
    mpeg  : "binary",
    mpg   : "binary",
    ogg   : "binary",
    pdf   : "binary",
    pkg   : "binary",
    png   : "binary",
    rss   : "utf8",
    rtf   : "utf8",
    svg   : "utf8",
    svgz  : "binary",
    tar   : "binary",
    text  : "utf8",
    tif   : "binary",
    tiff  : "binary",
    ttf   : "binary",
    txt   : "utf8",
    xhtml : "utf8",
    zip   : "binary"
};

- EDIT OFFLINE.HTML

- EDIT MANIFEST.JSON

- GENERATE NEW FAVICONS https://www.favicon-generator.org/ 

- EDIT UPUP.MIN.JS FILE AND CHANGE "service-worker-url" WITH YOUR URL

- IN CLOUDFLARE CREATE 2 NEW WORKERS AND ROUTES

FOR UPUP.JS

WORKER:
```javascript
const DOMAIN = 'www.domain.tld';
const PROXYPATH = 'upup'; // path to be proxied
const ORIGIN = 'PATH_TO_UPUP_JS_FILE_ON_FTP'; // where to fetch content from

addEventListener('fetch', event => {
  var url = new URL(event.request.url);
  if (url.pathname.startsWith('/' + PROXYPATH + '/') || url.pathname === '/' + PROXYPATH) {
    handleRequest(event, url);
  } else {
    event.respondWith(fetch(event.request));
  }
})

async function handleRequest(event, url) {
  // Change URL from public URL to use the origin URL
  var originUrl = url.toString().replace(
      'https://' + DOMAIN + '/' + PROXYPATH, 
      'https://' + ORIGIN
    );
    event.passThroughOnException();
    event.respondWith(fetch(originUrl));
}
```

ROUTE:
https://www.domain.tld/upup


------------------------------------------------


FOR UPUPSW.JS

WORKER:
```javascript
const DOMAIN = 'www.domain.tld';
const PROXYPATH = 'upupsw'; // path to be proxied
const ORIGIN = 'PATH_TO_UPUPSW_JS_FILE_ON_FTP'; // where to fetch content from

addEventListener('fetch', event => {
  var url = new URL(event.request.url);
  if (url.pathname.startsWith('/' + PROXYPATH + '/') || url.pathname === '/' + PROXYPATH) {
    handleRequest(event, url);
  } else {
    event.respondWith(fetch(event.request));
  }
})

async function handleRequest(event, url) {
  // Change URL from public URL to use the origin URL
  var originUrl = url.toString().replace(
      'https://' + DOMAIN + '/' + PROXYPATH, 
      'https://' + ORIGIN
    );
    event.passThroughOnException();
    event.respondWith(fetch(originUrl));
}
```

ROUTE:
https://www.domain.tld/upupsw




- INSERT THIS INTO YOUR WEBSITE HEAD
```html
<script src="https://www.domain.tld/upup"></script>
<script>
    UpUp.start({
        'content-url': '#PATH_TO_OFFLINE_HTML#',
        'assets': ['#PATH_TO _LOGO#', '#PATH_TO _FAVICON#']
    });
</script>
```


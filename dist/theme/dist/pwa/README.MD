Tento návod není určený pro začátečníky, měli byste mít alespoň základní zkušenost s Cloudflare a znát pojmy jako nameserver, CDN, PWA, CF worker. 

Tohle je stručný návod jak na svém shoptet e-shopu zprovoznit PWA.
Budete potřebovat Cloudflare účet který je propojený s vaším eshopem.

Stáhněte si složku na tomto odkazu

- Upravte OFFLINE.HTML

- Upravte MANIFEST.JSON

- Použijte generátor faviconů https://www.favicon-generator.org/ pro vygenerování faviconů pro váš eshop

- Uvnitř UPUP.MIN.JS upravte "service-worker-url" na vaší url k service workeru ("www.domain.tld/upupsw")

- Nahrajte soubory na ftp e-shopu (např. do složky /pwa)

- V Cloudflare vytvořte 2 workery

Pro UPUP.JS vytvořte

WORKER:
```javascript
const DOMAIN = 'www.domain.tld'; // URL vašeho eshopu
const PROXYPATH = 'upup'; // neměnit
const ORIGIN = 'PATH_TO_UPUP_JS_FILE_ON_FTP'; // Reálná cesta k vašemu upup.min.js na ftp

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

Jako url přiřadit

ROUTE:
https://www.domain.tld/upup


------------------------------------------------


Pro UPUPSW.JS vytvořt

WORKER:
```javascript
const DOMAIN = 'www.domain.tld'; // URL vašeho eshopu
const PROXYPATH = 'upupsw'; // neměnit
const ORIGIN = 'PATH_TO_UPUPSW_JS_FILE_ON_FTP'; // Reálná cesta k vašemu upupsw.min.js na ftp

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
Jako url přiřadit

ROUTE:
https://www.domain.tld/upupsw




- Do hlavičky v eshopu vložte (nahraďte za své url)

```html
<script src="https://www.domain.tld/upup"></script>
<script>
    UpUp.start({
        'content-url': '#PATH_TO_OFFLINE_HTML#',
        'assets': ['#PATH_TO _LOGO#', '#PATH_TO _FAVICON#']
    });
</script>
```
# theroyalhighjinx.com

Static one-page site for The Royal High Jinx, served by GitHub Pages (custom domain via `CNAME`, proxied by Cloudflare).

```
index.html     the whole page
css/site.css   styles
js/site.js     nav, lazy YouTube players, Songkick loader, scroll reveal
img/           web-sized images (logo, hero, members, testimonials, press thumbs)
press/         full-resolution promo photos linked from the Press section
404.html       redirects short links (e.g. /shed, /xmas) to ticketing; everything else to the mailing list
```

No build step: edit the files and push to `main`. Bump the `?v=` query on the CSS/JS links in `index.html` when you change them so browsers pick up the new version.

Preview locally:

```
python3 -m http.server 8000
```

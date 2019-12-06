#!/bin/bash

cd demo && yarn \
&& npm run build \
&& rm -rf /tmp/dist && mv -f dist /tmp/dist \
&& cd .. \
&& git checkout gh-pages \
&& rm -rf css fonts img js \
&& mv -f  /tmp/dist/* ./ \
&& git add . && git commit -m "update demo page" && git push origin gh-pages

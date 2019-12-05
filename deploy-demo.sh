#!/bin/bash

cd demo \
&& npm run build \
&& mv dist /tmp/ \
&& cd .. \
&& git checkout gh-pages \
&& rm -rf ./* \
&& mv  /tmp/dist/* ./ \
&& git add . && git commit -m "update demo page" && git push origin gh-pages

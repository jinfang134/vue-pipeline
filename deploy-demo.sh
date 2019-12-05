#!/bin/bash

cd demo \
&& npm run build \
&& mv dist /tmp/ \
&& cd .. \
&& git checkout gh-pages \
&& rm -rf ./* \
&& mv -R /tmp/dist/* ./

#!/bin/sh

rm -f xtTest.zip

zip -r xtTest.zip *.js node_modules/

aws lambda update-function-code \
  --region us-east-1 \
  --function-name xtTest \
  --zip-file fileb://xtTest.zip \

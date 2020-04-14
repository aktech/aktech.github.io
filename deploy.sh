#!/usr/bin/env bash

logging () {
  TIMESTAMP=`date "+%Y-%m-%d %H:%M:%S"`
  echo "[DEPLOY:: $TIMESTAMP]:: $1"
}

# Copy timeline and tags generator from tags_timeline_gen
logging "Deploying blog"
logging "Copying tags/ and timeline/ folder from tags_timeline_gen/"
cp -r tags_timeline_gen/* blog/
logging "Doing a jekyll serve"
bundle exec jekyll serve &

maximum_wait=10
wait=0

# Wait until jekyll serve creates the _site directory.
while [ ! -d "_site" ] && [ "$wait" -lt "$maximum_wait" ]; do
  logging "_site/ folder not present, sleeping for one second"
  sleep 1
  wait=$((wait+1))
done

if [ "$wait" -lt "$maximum_wait" ]; then
  logging "Copying generated tags/ and timeline/ from _site/"
  cp -r _site/timeline blog/
  cp -r _site/tags blog/
  ps aux | grep jekyll
  logging "Jekyll serve is running in the background. To kill: $ kill -9 'PROCESS_ID'"
  logging "Done, ready to push to github."
else
  logging "Maximum wait time exceeded, couldn't find _site folder to get generated tags and timeline"
fi


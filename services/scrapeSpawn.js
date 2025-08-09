import {spawnSync} from 'node:child_process';


export function callScraper(handle) {
  const res = spawnSync('python3', ['services/scrape.py', handle], {encoding:'utf-8'});

  if (res.status !== 0) {
    console.error('PYTHON SCRAPE FAILED: ', res.stderr);
    throw new Error(res.stderr);
  }

  tweets = JSON.parse(res.stdout);
  return tweets.slice(0, 25);
}

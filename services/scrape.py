import asyncio
import sys
import json

from twikit.guest import GuestClient


async def scrape(handle):
  client = GuestClient()
  await client.activate()

  user = await client.get_user_by_screen_name(handle)
  user_tweets = await client.get_user_tweets(user.id, count=1)
  tweet_list = list(map(lambda tweet: tweet.text, user_tweets))

  return tweet_list


if __name__ == "__main__":
  if len(sys.argv) > 1:
    handle = sys.argv[1]
  else:
    exit(1)

  res = asyncio.run(scrape(handle))
  print(json.dumps(res))
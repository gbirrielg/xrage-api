import asyncio
import sys
import json

from twikit.guest import GuestClient


async def scrape(handle):
  client = GuestClient()

  try:
    await client.activate()
    user = await client.get_user_by_screen_name(handle)
    user_tweets = await client.get_user_tweets(user.id, count=5)
    tweet_list = list(map(lambda tweet: tweet.text, user_tweets))
  except Exception as e:
    print(f"{e}", file=sys.stderr)
    sys.exit(1)

  return tweet_list


if __name__ == "__main__":
  if len(sys.argv) == 2:
    handle = sys.argv[1]
  else:
    print("Error: expected 1 arg - handle", file=sys.stderr)
    sys.exit(1)

  res = asyncio.run(scrape(handle))
  print(json.dumps(res))
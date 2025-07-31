import asyncio
from twikit import Client
from dotenv import load_dotenv
import os
import sys

load_dotenv(dotenv_path=".env")
USERNAME = os.getenv("X_AUTH1")
EMAIL = os.getenv("X_AUTH2")
PASSWORD = os.getenv("X_PASSWORD")

if not USERNAME or not EMAIL or not PASSWORD:
  print('Env vars not loaded')
  sys.exit()


client = Client('en-US')

async def main():
  await client.login(
    auth_info_1=USERNAME,
    auth_info_2=EMAIL,
    password=PASSWORD,
    cookies_file='cookies.json'
  )

  await client.create_tweet(
    text="Goodbye"
  )

  await client.logout()

# asyncio.run(main())


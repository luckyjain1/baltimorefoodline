# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure

os.environ["TWILIO_ACCOUNT_SID"] = "ACbe80cfb13d4bd3b4520c11aa411f9725"
os.environ["TWILIO_AUTH_TOKEN"] = "738084802d6e019629c0cb2aded345e4"

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    body="Hi! This is me testing out using Twilio",
    from_="+18885689942",
    to="+17816404241",
)

print(message.body)
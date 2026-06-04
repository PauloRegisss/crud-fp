from dotenv import load_dotenv
load_dotenv()
import os
import anthropic

client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

message = client.messages.create(
    model="claude-opus-4-6",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "me sugira um treino para hipertrofia"}
    ]
)

print(message.content[0].text)
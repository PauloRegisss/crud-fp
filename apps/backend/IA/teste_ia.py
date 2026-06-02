from google import genai

client = genai.Client(api_key="AQ.Ab8RN6KoLllEYahx75uRWnrOf0hBnVoD8tXxmNlnuohGxDj2Hw")

response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents="me sugira um treino para hipertrofia"
)
print(response.text)
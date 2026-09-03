# Security & Secret Management

- **Never hardcode or commit secrets**: API keys, credentials, tokens, and sensitive secrets must never be placed into code, documents, or version control.
- **Environment variables only**: Always access secrets through `process.env` on serverless endpoints or secure server environments.
- **Safeguard `.gitignore`**: Ensure `.env`, `.env.*`, and local environment files remain strictly ignored, keeping only sanitized templates like `.env.example`.

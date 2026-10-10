# NihongoKaiwa - AI Japanese Conversation Assistant

An AI-powered assistant that helps Japanese language learners practice
through scenario-based conversations.

## Features
- Scenario-based Japanese conversation practice
- AI-generated, context-aware responses
- Adjustable speech speed
- Onboarding and settings panel for personalised learning

## Tech Stack
- **Frontend:** React, Vite
- **Backend:** Python, FastAPI
- **AI:** Groq API

## Project Structure
- `nihonvoice/` - React frontend
- `nihonvoice-backend/` - FastAPI backend

## Run Locally

### Backend
```bash
cd nihonvoice-backend
pip install fastapi uvicorn groq python-dotenv
uvicorn main:app --reload
```
Create a `.env` file in `nihonvoice-backend/` with:

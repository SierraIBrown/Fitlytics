# Fitlytics

Track training. Visualize progress.

A personal workout tracking and progress visualization application planned for an Independent Study project.
The frontend is built with Next.js + TypeScript and the backend is a Node.js TypeScript API.
The UI design mockups are attached to the repository

## Goals
- Capture workouts and training sessions
- Show progress charts and timeline views
- Presets and quick-add for workouts
- User accounts and history
- Export / backup basic data

## Features (planned)
- Create, edit, and delete workouts
- Daily/weekly/monthly progress charts
- Workout presets and quick-add
- Account signup / login and session persistence
- Web-friendly responsive UI

## Tech Stack
- Frontend: Next.js (React) + TypeScript
- Backend: Node.js + TypeScript
- DB: H2

## Backend
The Fitlytics backend provides a REST API for managing workout data.
It is built with Node.js, Express, and TypeScript, and currently uses and in-memory data store for development.

The API supports full CRUD operations for workouts and includes validation and automated tests.

### Running the Backend
Navigate to the backend directory:
```bash
cd backend
pnpm install
pnpm dev
```
The API will be available at http://localhost:3001

### Running tests
Run tests with:
```bash
pnpm test
```

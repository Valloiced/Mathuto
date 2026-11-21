# Mathuto 📱➗

A mobile math-learning app built with **React Native (Expo)** and **Firebase**. Students learn from structured lessons, watch curated video lessons, take quizzes, and play math mini-games that post to a shared leaderboard.

Mathuto is one part of a three-part system:

| Part | Stack | Repo |
|---|---|---|
| **Mobile app** (this repo) | React Native, Expo Router, Firebase Auth | here |
| **Serverless API** | Node.js functions on Vercel, Firebase Admin, scheduled leaderboard resets | private |
| **Admin dashboard** | Next.js CMS for modules, lessons and quizzes | private |

> Built for a client. Features were revised against the client's test cases (see the commit history).

---

## ✨ Features

- **Learning materials:** topics → subtopics → paginated lessons, with "recently viewed" tracking
- **Quizzes:** multiple-choice quiz mode per topic. Scores are submitted to the backend
- **Video lessons:** YouTube-based lessons, with a caching hook and an offline modal so the app still works on bad connections
- **Mini-games**
  - **Arithmetic Blitz:** a timed arithmetic challenge with a reducer-driven game state, progress bar and score submission
  - **Math Scramble:** unscramble math terms pulled from the lesson materials, with topic selection, shuffle animations and an offline mode
- **Leaderboard and profile:** user stats, profile and password updates
- **Auth:** Firebase email/password and Google Sign-In, password reset, persisted sessions (AsyncStorage)

## 🛠️ Tech stack

| Layer | Tools |
|---|---|
| App | React Native, Expo, Expo Router (file-based routing), React Navigation drawer |
| UI | RNEUI, Lottie animations, Reanimated, linear gradients, toast messages |
| Data and auth | Firebase Auth, Firestore, AsyncStorage, NetInfo |
| Backend | Node.js serverless functions on Vercel with Firebase Admin (separate repo) |
| Code quality | ESLint + Prettier |

## 📂 Project structure

```
app/            # Expo Router screens
  (auth)/       #   login, register, password reset
  (tabs)/       #   home, materials, videos, leaderboard
components/     # feature components (games/, quiz/, materials/, videos/, ...)
hooks/          # custom hooks (incl. the caching hook)
config/         # Firebase initialisation
utils/, constants/
```

## 🚀 Running locally

```bash
git clone https://github.com/Valloiced/Mathuto.git
cd Mathuto
npm install
```

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
EXPO_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
EXPO_PUBLIC_SERVER=http://<your-backend-host>:<port>
```

Then start Expo:

```bash
npx expo start
```

Scan the QR code with Expo Go, or press `a` for an Android emulator.

## 🧠 What I learned

- Structuring a mid-sized React Native codebase (~13k lines) with file-based routing and feature folders
- Building offline-tolerant UX: caching API responses and checking connectivity before network calls
- Designing game loops and animations in React Native without a game engine
- Working from a client's acceptance tests and iterating on feedback

---

Made by [Vince Sualog](https://github.com/Valloiced)

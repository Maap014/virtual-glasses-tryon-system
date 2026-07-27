# Virtual Glasses Try-On System

An AI-powered web application that enables users to browse eyewear products and virtually try them on in real time using a webcam. The system combines a **Next.js** frontend, **Flask** backend, **SQLite** database, and **MediaPipe Face Landmarker** to accurately overlay selected glasses onto the user's face.

---

## Features

- AI-powered virtual glasses try-on using MediaPipe Face Landmarker
- Real-time webcam integration using `react-webcam`
- Dynamic eyewear catalogue powered by a Flask REST API
- Category filtering for:
  - Eyeglasses
  - Sunglasses
  - Blue Light
  - Fashion
  - Sports
- Responsive product grid
- Dynamic loading of selected glasses during virtual try-on
- Canvas-based glasses overlay with facial landmark tracking
- SQLite database for storing eyewear products
- Responsive user interface built with Next.js and Tailwind CSS

---

## Technologies

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Webcam

### Backend

- Flask
- SQLite
- Flask-CORS
- Python Dotenv

### Computer Vision

- MediaPipe Face Landmarker
- HTML5 Canvas

---

## Project Structure

```text
virtual-glasses-try-on/
│
├── src/
│   ├── app/                  # Next.js pages and layouts
│   ├── components/           # UI components and virtual try-on
│   ├── services/             # API helper functions
│   ├── types/                # TypeScript interfaces
│   └── utils/                # Utility functions
│
├── public/
│   ├── eyewears/
│   │   ├── display/          # Product catalogue images
│   │   └── tryon/            # Front-facing try-on images
│   │
│   └── models/
│       └── face_landmarker.task
│
├── backend/
│   ├── database/
│   │   ├── glasses_seed.json
│   │   └── seed_db.py
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.py
│   └── requirements.txt
│
└── README.md
```

---

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js 20 or later
- npm
- Python 3.11 or later
- pip

---

# Installation

## 1. Clone the repository

```bash
git clone <repository-url>
cd virtual-glasses-try-on
```

---

## 2. Install frontend dependencies

From the project root:

```bash
npm install
```

---

## 3. Install backend dependencies

```bash
cd backend
python -m pip install -r requirements.txt
```

---

## 4. Configure the frontend

Create a file named:

```text
.env.local
```

inside the project root and add:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:5000/vto
```

This tells the frontend where to find the Flask backend during development.

---

## 5. Configure the backend (Optional)

The backend supports loading environment variables using `python-dotenv`.

Create a `.env` file inside the **backend** folder if you want to override default settings.

Example:

```env
FLASK_ENV=development
```

If you do not need any custom configuration, this file can be omitted.

---

---

# Running the Project

## Start the backend

From the **backend** directory:

```bash
python app.py
```

The Flask server runs on:

```text
http://127.0.0.1:5000
```

---

## Start the frontend

From the project root:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:3000
```

---

## How the Application Works

```text
User
   │
   ▼
Browse eyewear catalogue
   │
   ▼
Select a pair of glasses
   │
   ▼
Product loaded from Flask API
   │
   ▼
Virtual Try-On modal opens
   │
   ▼
Webcam starts
   │
   ▼
MediaPipe detects facial landmarks
   │
   ▼
Canvas overlays selected glasses
   │
   ▼
User can virtually try on different frames
```

---

## Virtual Try-On

The virtual try-on system uses **MediaPipe Face Landmarker** to detect facial landmarks from the webcam feed.

The detected eye landmarks are used to calculate:

- Glasses position
- Glasses scale
- Head rotation

The selected glasses image is then rendered in real time on an HTML5 Canvas, creating a live virtual try-on experience.

---

## Notes

- Catalogue images are stored in:

```text
public/eyewears/display/
```

- Try-on images are stored in:

```text
public/eyewears/tryon/
```

- The SQLite database is automatically seeded when the application is run for the first time.

- Webcam access requires browser permission.

---

## Troubleshooting

### Products do not load

- Ensure the Flask backend is running.
- Check that `NEXT_PUBLIC_API_URL` points to the correct backend URL.

---

### Webcam does not open

- Allow camera access in your browser.
- Refresh the page after granting permission.

---

### MediaPipe model not found

Ensure the following file exists:

```text
public/models/face_landmarker.task
```

---

### Database changes are not visible

If you modify the seed data after the database has already been created, you may need to reseed the database by deleting the existing SQLite database or clearing the `glasses` table before restarting the backend.

---

## Future Improvements

- Improved overlay smoothing
- Better head pose estimation
- Face shape detection
- Glasses recommendation system
- Screenshot capture
- Support for 3D eyewear models
- User accounts and favourites

---

## Screenshots

```text
Home Page

Product Catalogue

Virtual Try-On
```

---

## License

This project was developed as part of an MSc dissertation and is intended for educational and demonstration purposes.

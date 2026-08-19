# Virtual Glasses Try-On System

An AI-powered web application that enables users to browse eyewear products and virtually try them on in real time using a webcam.

The system combines a **Next.js and React frontend**, **Flask backend**, **SQLite database**, and **MediaPipe Face Landmarker** to detect facial landmarks and position selected glasses on the user's face in real time.

---

## Features

- Real-time virtual glasses try-on using MediaPipe Face Landmarker
- Live webcam integration using React Webcam
- Automatic positioning, scaling and rotation of virtual glasses
- Dynamic eyewear catalogue powered by a Flask REST API
- Category filtering for:
  - Eyeglasses
  - Sunglasses
  - Blue Light
  - Fashion
  - Sports
- Separate catalogue and virtual try-on images for each product
- Canvas-based real-time glasses overlay
- SQLite database for storing eyewear product information
- Responsive user interface built with Next.js and Tailwind CSS
- Camera permission and error handling

---

## Technologies Used

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Webcam

### Backend

- Python
- Flask
- Flask-CORS
- SQLite
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

Before running the project, ensure the following software is installed:

| Software | Required Version | Installation                                         |
| -------- | ---------------- | ---------------------------------------------------- |
| Node.js  | 20 or later      | [Download Node.js](https://nodejs.org/en/download)   |
| Python   | 3.11 or later    | [Download Python](https://www.python.org/downloads/) |
| Git      | Latest version   | [Download Git](https://git-scm.com/downloads)        |

> **Note:** npm is installed automatically with Node.js, while pip is normally included with Python.

You can verify the installations in your terminal by running:

```bash
node --version
npm --version
python --version
git --version
```

On macOS, Python may need to be checked using:

```bash
python3 --version
```

---

# Installation

## 1. Clone the Repository

Open a terminal and clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project directory:

```bash
cd virtual-glasses-try-on
```

---

## 2. Install Frontend Dependencies

From the project root, run:

```bash
npm install
```

This installs the packages required by the Next.js frontend.

---

## 3. Install Backend Dependencies

Navigate to the backend directory:

```bash
cd backend
```

Install the Python dependencies:

```bash
python -m pip install -r requirements.txt
```

> **macOS:** If the `python` command is unavailable, use:

```bash
python3 -m pip install -r requirements.txt
```

Return to the project root:

```bash
cd ..
```

---

## 4. Configure the Frontend

Create a file named:

```text
.env.local
```

inside the **project root**.

Add:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:5000/vto
```

This tells the frontend where to find the Flask backend during local development.

The project is now ready to run.

---

# Running the Project

The frontend and backend must run at the same time. Open **two terminal windows**.

## Terminal 1 — Start the Backend

Navigate to the backend directory:

```bash
cd backend
```

Start the Flask server:

```bash
python app.py
```

> **macOS:** If the `python` command is unavailable, use:

```bash
python3 app.py
```

---

## Terminal 2 — Start the Frontend

From the project root, run:

```bash
npm run dev
```

Open the following address in your browser:

http://localhost:3000

---

# Using the Application

Once the frontend and backend are running:

1. Browse the available eyewear products.
2. Use the category filters to browse different types of glasses.
3. Click **Try Virtually** on a selected product.
4. Allow camera access when requested by the browser.
5. Face the webcam with your face clearly visible.
6. The selected glasses will be positioned over your face.
7. Moving closer to or further from the camera causes the glasses to automatically change in size.
8. Tilting the head causes the glasses to rotate according to the detected facial landmarks.
9. Close the virtual try-on modal to return to the product catalogue.

> For best results, use the application in a well-lit environment with the face clearly visible to the webcam.

---

# How the Application Works

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

# Virtual Try-On

The virtual try-on functionality uses **MediaPipe Face Landmarker** to detect facial landmarks from the user's webcam feed.

The detected eye landmarks are used to calculate:

- Glasses position
- Glasses scale
- Glasses rotation

The application uses these calculations to continuously update the selected glasses overlay as the user's face moves.

The MediaPipe model asset is stored locally within the project at:

```text
public/models/face_landmarker.task
```

---

# Eyewear Assets

Each eyewear product uses two separate images.

### Display Images

Stored in:

```text
public/eyewears/display/
```

These images are used within the product catalogue.

### Virtual Try-On Images

Stored in:

```text
public/eyewears/tryon/
```

These are transparent, front-facing images designed specifically for positioning over the user's face during the virtual try-on process.

---

# Database

The application uses **SQLite** to store the eyewear catalogue.

Each product record contains information including:

- Product name
- Category
- Description
- Price
- Display image path
- Virtual try-on image path

The product seed data is stored in:

```text
backend/database/glasses_seed.json
```

When the backend is started, the database is initialised and seeded automatically if required. Therefore, no separate database setup is required before running the application.

---

# Webcam and Privacy

The application requires webcam access for the virtual try-on feature.

Camera access is requested when the user opens the virtual try-on feature. If permission is denied, the application displays an error message and the user must enable camera access through the browser settings before trying again.

Webcam images and detected facial landmarks are not stored in the SQLite database. Facial landmark processing for the virtual try-on feature is performed within the browser.

---

# Troubleshooting

## Products Do Not Load

Check that:

- The Flask backend is running.
- The `.env.local` file exists in the project root.
- The file contains:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:5000/vto
```

If `.env.local` has been created or changed while the frontend is running, restart the Next.js development server:

```bash
npm run dev
```

---

## `ModuleNotFoundError: No module named 'flask'`

This means the required Python packages have not been installed in the current Python environment.

Navigate to the backend directory and run:

```bash
python -m pip install -r requirements.txt
```

> **macOS:** If required, use:

```bash
python3 -m pip install -r requirements.txt
```

Then restart the backend.

---

## Webcam Does Not Open

Check that:

- The device has a working webcam.
- Camera access has been allowed in the browser.
- Camera access is enabled for the browser in the operating system settings.
- Another application is not preventing access to the webcam.

After changing camera permissions, refresh the page and reopen the virtual try-on feature.

---

## MediaPipe Model Does Not Load

Ensure the following file exists:

```text
public/models/face_landmarker.task
```

The virtual try-on feature cannot perform facial landmark detection if the model file is missing.

---

## `npm` Is Not Recognised

Check that Node.js has been installed correctly.

Run:

```bash
node --version
npm --version
```

If these commands are not recognised, install or reinstall Node.js using the official download link provided in the [Prerequisites](#prerequisites) section.

After installation, close and reopen the terminal before trying again.

---

## `python` Is Not Recognised

### Windows

Try:

```bash
py --version
```

If the Python launcher is available, dependencies can be installed using:

```bash
py -m pip install -r requirements.txt
```

and the backend can be started using:

```bash
py app.py
```

### macOS

Try:

```bash
python3 --version
```

Then use:

```bash
python3 app.py
```

---

## Database Changes Are Not Visible

The application uses seeded product data.

If `glasses_seed.json` is modified after the database has already been populated, the existing records may still contain the previous product information.

The database may therefore need to be cleared or reseeded before updated product information becomes visible.

---

# Current Limitations

The current prototype:

- Uses a two-dimensional glasses overlay rather than 3D eyewear models.
- Does not perform full 3D head-pose estimation.
- May experience reduced facial tracking accuracy under poor lighting.
- May experience some overlay misalignment during larger head movements.
- Depends partly on the processing capabilities of the user's device and browser.
- Is designed to detect one face at a time.

---

# Future Improvements

Possible future improvements include:

- Improved overlay smoothing
- Full head-pose estimation
- Face-shape detection
- Eyewear recommendations based on facial features
- Support for 3D eyewear models
- Wider cross-browser and cross-device optimisation

---

# License

This project was developed as part of an MSc dissertation and is intended for educational and demonstration purposes.

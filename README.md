# Virtual Glasses Try-On System

An AI-powered web application that enables users to browse eyewear products and virtually try them on in real time using a webcam.

The system combines a **Next.js and React frontend**, **Flask backend**, **SQLite database**, and **MediaPipe Face Landmarker** to detect facial landmarks and position selected glasses on the user's face in real time.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Using the Application](#using-the-application)
- [How the Application Works](#how-the-application-works)
- [Virtual Try-On](#virtual-try-on)
- [Eyewear Assets](#eyewear-assets)
- [Database](#database)
- [Webcam and Privacy](#webcam-and-privacy)
- [Project Aim, Objectives and Research Alignment](#project-aim-objectives-and-research-alignment)
- [Testing and Evaluation](#testing-and-evaluation)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)
- [License](#license)

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

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment.

**Windows:**

```bash
source venv\Scripts\activate
```

**macOS/Linux:**

```bash
source venv/bin/activate
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

Each product uses two images:

- `public/eyewears/display/` — catalogue product images.
- `public/eyewears/tryon/` — transparent front-facing images used for the virtual try-on overlay.

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

# Project Aim, Objectives and Research Alignment

### Aim

To build a virtual glasses try-on system that allows users to see how different glasses look on their face in real time using their webcam, in order to improve the online shopping experience.

### Project Objectives

1. To understand how virtual try-on systems work by reviewing existing solutions and techniques.
2. To use MediaPipe to detect facial features such as the eyes and nose in real time.
3. To develop a system that uses a webcam to display glasses on a user's face accurately.
4. To create a simple web interface where users can select and try different glasses virtually.
5. To test how well the system works in terms of accuracy, speed and ease of use.
6. To explore a simple way of suggesting suitable glasses based on the user's facial features _(optional extension)_.

### How the Artefact Addresses the Objectives

| Objective                                                      | Artefact Implementation                                                                                                                                             |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Understand existing virtual try-on solutions and techniques | Existing VTO approaches, facial landmark detection techniques and related systems were reviewed during the research and design stages of the project.               |
| 2. Use MediaPipe for real-time facial feature detection        | The artefact integrates MediaPipe Face Landmarker to detect facial landmarks from the user's live webcam feed.                                                      |
| 3. Display glasses accurately on the user's face               | Detected eye landmarks are used to calculate the position, scale and rotation of the selected glasses before rendering them over the webcam feed using HTML Canvas. |
| 4. Create a simple web interface                               | The Next.js frontend allows users to browse eyewear, filter products, select frames and launch the virtual try-on feature.                                          |
| 5. Test accuracy, speed and ease of use                        | The system was evaluated through functional testing, different viewing and lighting conditions, repeated VTO initialisation timing tests and usability feedback.    |
| 6. Explore glasses recommendations                             | This was identified as an optional extension and was not implemented within the final core artefact.                                                                |

### Research Questions

**RQ1:** To what extent can an AI-based virtual glasses try-on system improve user experience in online eyewear shopping?

The artefact addresses this by combining an eyewear catalogue with a real-time virtual try-on feature, allowing users to preview selected glasses on their own face before making a product decision. Functional testing and usability feedback were used to evaluate the resulting experience.

**RQ2:** How accurately can MediaPipe facial landmark detection support real-time virtual glasses alignment in a web-based environment?

The artefact uses MediaPipe facial landmarks to determine the position of the user's eyes and uses these landmarks to calculate the centre position, scale and rotation of the glasses overlay. Testing under different distances, head positions and viewing conditions was used to evaluate the resulting alignment.

**RQ3:** What are the main challenges affecting alignment accuracy and real-time performance in a 2D virtual glasses try-on system?

The evaluation identified challenges including reduced alignment during larger head rotations, poorer performance under difficult lighting conditions and differences in VTO initialisation time across devices. These findings demonstrate both the strengths and limitations of the implemented 2D approach.

# Testing and Evaluation

The artefact was evaluated using a combination of automated backend testing, manual functional testing, virtual try-on testing and cross-device performance testing. The purpose of the evaluation was to verify that the main application features operated correctly and to assess the behaviour of the virtual try-on feature under different conditions.

## Automated Backend Testing

Automated backend tests were created using Python `unittest` and the Flask test client. These tests verify the main behaviour of the eyewear catalogue API and the integrity of product image paths.

The tests can be run from the backend directory using:

```bash
python test.py
```

The following areas are tested:

| Test                         | Expected Result                                                                                                                         |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Retrieve all glasses         | The API should return HTTP status `200`, indicate a successful request and return a non-empty list of eyewear products.                 |
| Filter glasses by category   | When a category is supplied, all returned products should belong to the requested category.                                             |
| Validate product image paths | Each product should contain a valid display image path and a virtual try-on image path pointing to the appropriate eyewear directories. |

The automated tests provide repeatable verification of the Flask API and catalogue data used by the frontend.

---

## Manual Functional Testing

Manual testing was also carried out to verify the main user-facing features of the application.

| Test ID | Test Scenario                     | Expected Result                                                                     | Actual Result                                                             | Status |
| ------- | --------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------ |
| FT01    | Open the eyewear catalogue        | All eyewear products and associated images should load correctly.                   | All products and associated images loaded and displayed correctly.        | Pass   |
| FT02    | Select an eyewear category        | Only products belonging to the selected category should be displayed.               | The correct products were displayed for each selected category.           | Pass   |
| FT03    | Select Try Virtually              | The VTO modal should open with the selected eyewear product.                        | The modal opened and displayed the correct selected product.              | Pass   |
| FT04    | Allow camera permission           | The live webcam feed should be displayed.                                           | The webcam feed was displayed after permission was granted.               | Pass   |
| FT05    | Deny camera permission            | Webcam access should be prevented and an appropriate error message should be shown. | Camera access was prevented and an error message was displayed.           | Pass   |
| FT06    | Close the VTO modal               | Webcam access and facial landmark processing should stop.                           | Webcam access and MediaPipe processing stopped when the modal was closed. | Pass   |
| FT07    | Reopen the VTO modal              | Webcam access and facial landmark detection should restart.                         | Webcam access and facial landmark detection restarted correctly.          | Pass   |
| FT08    | Select different eyewear products | The corresponding virtual try-on image should be displayed.                         | Each tested product displayed the correct virtual try-on image.           | Pass   |

---

## Virtual Try-On Evaluation

The virtual try-on feature was tested under different viewing conditions to assess positioning, scaling, rotation and the reliability of facial landmark detection.

| Test Condition                              | Observed Result                                                                                                                | Evaluation |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| Face positioned directly towards the camera | The glasses remained positioned across the eye region and aligned correctly with the face.                                     | Good       |
| User moved closer to the camera             | The glasses increased in size while maintaining their position on the face.                                                    | Good       |
| User moved further from the camera          | The glasses decreased in size while remaining positioned across the eye region.                                                | Good       |
| Head tilted sideways                        | The glasses rotated according to the angle of the detected eye landmarks.                                                      | Good       |
| Face turned away from the frontal position  | The glasses continued to follow the detected eyes, but the overlay became partially misaligned as the viewing angle increased. | Limited    |
| Good lighting                               | Facial landmarks were detected consistently and the glasses overlay remained visible.                                          | Good       |
| Poor lighting                               | Facial detection became less reliable and the glasses were sometimes not displayed.                                            | Limited    |

The results show that the 2D virtual try-on approach performs most reliably when the user's face is mainly frontal and clearly visible under suitable lighting. Larger head rotations and poor lighting reduce the reliability of the current implementation.

---

## Browser and Device Testing

The artefact was tested across three laptops using Google Chrome and Microsoft Edge.

| Device           | Browser        | Result                                                   |
| ---------------- | -------------- | -------------------------------------------------------- |
| HP EliteBook     | Google Chrome  | Main application and VTO features operated successfully. |
| Dell XPS 13      | Microsoft Edge | Main application and VTO features operated successfully. |
| HP Pavilion x360 | Microsoft Edge | Main application and VTO features operated successfully. |

The same general virtual try-on behaviour was observed across the three tested devices. However, performance may vary depending on device hardware, browser behaviour and available processing resources.

---

## VTO Initialisation Performance

The time required for the virtual try-on feature to become operational was measured across the three tested laptops.

Three conditions were evaluated:

- **T1** — Initialisation after camera permission was granted.
- **T2** — Subsequent initialisation when camera permission had already been granted.
- **T3** — Initialisation after refreshing the page.

Each condition was repeated ten times on each device and the mean initialisation time was calculated.

| Device / Browser                  | T1 Mean(s) | T2 Mean (s) | T3 Mean (s) |
| --------------------------------- | ---------: | ----------: | ----------: |
| HP EliteBook / Google Chrome      |       1.98 |        1.94 |        2.14 |
| Dell XPS 13 / Microsoft Edge      |       1.48 |        1.36 |        1.44 |
| HP Pavilion x360 / Microsoft Edge |       1.37 |        1.39 |        1.56 |

Across the tested devices and conditions, mean VTO initialisation times ranged from approximately **1.36 seconds to 2.14 seconds**.

These results indicate that the virtual try-on feature became operational within a relatively short period during testing. The results are limited to the tested hardware and browsers and should not be interpreted as a performance benchmark for all devices.

---

## Evaluation Summary

The evaluation demonstrated that the core functionality of the artefact operates as intended.

The Flask backend successfully provides eyewear catalogue data to the frontend, category filtering allows users to browse specific types of eyewear, and the virtual try-on feature successfully combines webcam input, MediaPipe facial landmark detection and Canvas rendering to position selected glasses on the user's face.

The virtual glasses responded successfully to changes in face distance and sideways head tilt. The system also operated across the three tested laptops and two browsers.

The main limitations were observed under poor lighting and at larger head rotations. These conditions reduced facial landmark reliability or caused visible misalignment of the 2D glasses overlay.

The evaluation therefore demonstrates that the artefact provides a functional real-time virtual glasses try-on experience while also identifying areas that would require further development for a more robust commercial implementation.

---

## Known Limitations

The current prototype has the following known limitations:

- The virtual glasses are represented using a two-dimensional overlay rather than full 3D overlay.
- The system does not currently perform full 3D head-pose estimation.
- Alignment becomes less accurate when the user's head is turned further away from the frontal position.
- Facial landmark detection becomes less reliable under poor lighting.
- Performance depends partly on the processing capabilities of the user's device and browser.
- The application currently supports one detected face at a time.
- Testing has been limited to the devices and browsers listed above.
- The current evaluation of glasses alignment is primarily visual rather than based on a numerical positioning-error measurement.

---

# Troubleshooting

### Products Do Not Load

Ensure that the Flask backend is running and that `.env.local` exists in the project root with:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:5000/vto
```

If `.env.local` has been created or changed while the frontend is running, restart the Next.js development server:

```bash
npm run dev
```

### Webcam Does Not Open

Ensure that:

- The device has a working webcam.
- Camera access has been allowed in the browser.
- Camera access is enabled for the browser in the operating system settings.
- No other application is preventing access to the webcam.

After changing camera permissions, refresh the page and reopen the virtual try-on feature.

### MediaPipe Model Does Not Load

Ensure that the following model file exists:

```text
public/models/face_landmarker.task
```

The virtual try-on feature cannot perform facial landmark detection if this file is missing.

### Database Changes Are Not Visible

The application uses seeded product data. If `glasses_seed.json` is modified after the database has already been populated, the existing database may still contain the previous records.

The database may therefore need to be cleared or reseeded before the updated product information becomes visible.

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

# Face Emotion Recognition App

![Face Emotion Recognition](https://img.shields.io/badge/AI-Face%20Emotion%20Recognition-blue)
![React](https://img.shields.io/badge/React-v19.0.0-61DAFB)
![face-api.js](https://img.shields.io/badge/face--api.js-v0.22.2-orange)

A modern web application that detects and displays real-time facial emotions using your webcam. The app features dynamic emoji backgrounds that change based on your detected emotions.

## ✨ Features

- **Real-time emotion detection** using webcam input
- **Dynamic emoji backgrounds** that change based on detected emotions
- **Modern UI design** with glassmorphism effect and gradient animations
- **Responsive layout** that works on desktop and mobile devices
- **Seven emotion states** detected: happy, sad, angry, disgusted, surprised, fearful, and neutral

## 🛠️ Technologies Used

- **React** - Front-end framework
- **face-api.js** - JavaScript face recognition API
- **Vite** - Build tool and development server
- **CSS3** - Styling with modern CSS features
- **WebRTC** - Web Real-Time Communication for camera access

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/009ajeet/face-emotion-detection.git
   cd face-emotion-detection
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `public/models` directory and download the required face-api.js models:
   ```bash
   mkdir -p public/models
   ```

4. Download the following face-api.js models from the models folder to your public/models directory:
   - tiny_face_detector_model
   - face_landmark_68_model
   - face_recognition_model
   - face_expression_model

5. Start the development server:
   ```bash
   npm run dev
   ```

## 📝 How It Works

The application uses face-api.js to detect faces in the webcam feed and analyze facial expressions in real-time. The detected emotions include:

- 😄 Happy
- 😢 Sad
- 😠 Angry
- 🤢 Disgusted
- 😲 Surprised
- 😨 Fearful
- 😐 Neutral

Based on the dominant emotion detected, the app displays corresponding emojis floating in the background, creating an interactive and engaging experience.

## 🎨 UI Features

- Glassmorphic card design with subtle hover effects
- Dynamic floating emoji backgrounds based on detected emotion
- Animated gradients and smooth transitions
- Subtle particle effects and background animations

## 👨‍💻 Usage

1. Allow the app to access your webcam when prompted
2. Position your face within the camera view
3. Express different emotions to see the background change with floating emojis
4. The current detected emotion is displayed at the bottom

## 🔮 Future Improvements

- Add ability to record and save emotion analysis sessions
- Implement emotion tracking over time with data visualization
- Add multi-face detection and tracking
- Integrate with more AI services for advanced emotion analysis
- Add customizable themes and UI options

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [face-api.js](https://github.com/justadudewhohacks/face-api.js) for the facial recognition functionality
- [React](https://react.dev/) for the UI framework
- [Vite](https://vitejs.dev/) for the excellent build tool
# Overview

Texter is a chat app for mobile devices, developed using React Native. The app will provide users with a chat interface and options to share images and their location.
[Watch demo video](https://youtu.be/v2cBHqAgDdA)
<img width="454" height="434" src="https://github.com/MichiyoYo/texter/blob/main/demo/texter-screenshot.jpg" alt="A screenshot of the app's screens">

## Tech Stack

- React Native
- Expo
- Firebase Firestore
- Gifted Chat

## Features

- The user can pick a nickname
- The user can pick a background from the swatch
- The user will access a common chat room where the people can exchange text, images and their location
- If the device is offline, the user would be able to read the latest messages saved on the device, but they won't be able to send new messages
- When the device is back online, you will see the messages that were sent while offline

## Installation

### 0. Prerequisites

- Node.js ([installation steps](https://nodejs.org/en/download/))
- Expo `npm install expo-cli --global`

### 1. Install dependencies

- With your terminal, navigate to the root folder of the project
- In your terminal, run `npm install`

### 2. Run the app

- To launch the app run `expo start`
- Expo will start and a browser window will open, that gives you different options to execute the app on a device or emulator

### 3. Set up a device

- Download the Expo app on the device you want to use to run the app
- With your device, scan QR code (Android) or send a link via email (iOS) to connect to expo
- The app will start on your device and you'll be able to test it

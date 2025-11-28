# Project Name

- Toodler

## Description

Toodler is a lightweight Kanban-style project management application built with React Native and Expo.
It was developed as part of an assignment where the goal was to implement a fully functional task-organizing tool using in-memory storage rather than an external database.

The app loads initial data from a pre-populated data.json file and allows users to manage Boards, Lists, and Tasks following the principles of clean architecture and React Native best practices. Users can create, view, update, and delete boards, lists, and tasks — as well as move tasks between lists — all within a simple, mobile-friendly interface.

This project was created for the Umbrella agency, who required a mobile Kanban solution but lacked in-house app development capabilities.
All functionality, structure, and models follow the guidelines provided in the assignment specification.

## Table of Contents

- Installation
- Features
- Technologies Used
- Platform Support
- Project Structure
- Setup Instructions
- Running the App
- Testing
- Screenshots
- Known Issues
- Future Improvements

### Navigate to project directory

`cd Toodler`

### Install dependencies

`npm install`

### Running the App

`npm run`

## Technologies Used

- React Native
- Expo
- React Navigation
- Custom State Management / Data Utility

## Platform Support

- iOS
- Android

### Primary Development Platform

- Primary Platform: iOS / Android
- Test Devices: iPhone 14, iPhone 16e, iPhone SE, "Samsung s22", "Pixel 5"
- OS Version: iOS 16.1, Windows 11, "add more"

### Platform-Specific Features

iOS:

- Modal animations
- Shadow rendering using shadowColor, shadowOpacity, shadowOffset, and shadowRadius (iOS-only shadow props)
- Native “swipe back” gesture in navigation

Android:

- Shadow rendering via elevation property
- Hardware back button support (automatically handled by Expo Router)

## Setup Instructions

- Clone the repository: `git clone https://github.com/Wowa-penguin/T-488-MAPP_Assignment_I.git`

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- Expo Go app (for local development)

### Environment Setup

1. Install React Native dependencies
2. Configure development environment
3. Set up emulators/simulators

## Known Issues

- ?

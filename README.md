# Web 3-Tier File System 📁🌐

This project implements a 3-tier web application architecture to manage file storage and retrieval using a front-end, middleware, and persistent backend.

## 🧱 Architecture Overview

1. **Presentation Layer** – HTML/CSS/JavaScript interface
2. **Application Layer** – Flask/Python-based API server
3. **Data Layer** – File system with optional DB or S3 integration

## 🔧 Features
- Upload, view, and download files via browser
- Organized storage structure on backend
- Clean separation of concerns between tiers
- Modular codebase for easy extension

## ⚙️ Tech Stack
- Frontend: HTML, Bootstrap
- Backend: Python Flask
- Storage: Filesystem (extensible to S3/DB)
- Server: Gunicorn or Nginx-ready

## 🚀 Run Locally
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py


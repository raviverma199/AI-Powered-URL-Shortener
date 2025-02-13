# 🚀 AI-Powered URL Shortener

An **AI-powered URL shortener** that creates **SEO-friendly smart short links** instead of random strings. It predicts **click engagement**, suggests the **best sharing time**, and detects **spam or malicious URLs** for a safer experience.

## 📌 Features

✅ **AI-Generated Smart URLs** – Meaningful, keyword-based short links instead of random strings.  
✅ **Click Prediction & Analytics** – AI predicts engagement trends and best sharing times.  
✅ **Spam & Malware Detection** – AI scans links to prevent phishing and spam.  
✅ **Expiring & One-Time Links** – Generate links that expire after a set time or usage.  
✅ **Fast & Scalable** – Uses Redis caching for instant redirection.  

## 🛠 Tech Stack

- **Backend:** [NestJS](https://nestjs.com/) (Node.js framework)  
- **Database:** PostgreSQL / MongoDB  
- **AI Integration:** OpenAI GPT / FastText / spaCy (for keyword extraction & spam detection)  
- **Caching & Optimization:** Redis  
- **Authentication:** JWT / OAuth  
- **Containerization:** Docker  

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/AI-Powered-URL-Shortener.git
cd AI-Powered-URL-Shortener
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file and configure the following variables:
```env
PORT=3000
DATABASE_URL=your_database_url
REDIS_URL=your_redis_url
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Run the Project
```bash
npm run start:dev
```

## 📌 API Endpoints

### 🔗 Shorten a URL
```http
POST /shorten
```
**Body:**
```json
{
  "originalUrl": "https://example.com/learn-nestjs"
}
```
**Response:**
```json
{
  "shortUrl": "https://short.ly/learn-nestjs"
}
```

### 📊 Get URL Analytics
```http
GET /stats/:shortId
```
**Response:**
```json
{
  "clicks": 120,
  "bestTimeToShare": "7 PM",
  "platformSuggestions": ["Twitter", "LinkedIn"]
}
```

## 🚀 Future Enhancements
- **AI-powered personalized URL suggestions** based on user behavior.
- **Multi-user support** with authentication.
- **QR code generation** for each short link.
- **Custom alias support** for premium users.

## 🤝 Contributing
Feel free to submit issues and pull requests! 🚀

## 📜 License
MIT License. See `LICENSE` for details.

---

🔥 Built with ❤️ using NestJS and AI.

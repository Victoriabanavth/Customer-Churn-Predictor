# 🎯 Customer Churn Predictor

An ML-powered web application that predicts customer churn risk with 89% accuracy and visualizes feature importance for actionable retention insights.

![Model Accuracy](https://img.shields.io/badge/Accuracy-89%25-brightgreen) ![Tech](https://img.shields.io/badge/Tech-HTML%20%7C%20CSS%20%7C%20JS-blue)

🔗 **[Live Demo](https://customer-churn-predictor-ecru.vercel.app/)** | 📂 **[GitHub Repo](https://github.com/Victoriabanavth/Customer-Churn-Predictor)**

## ✨ Features

- **Churn Prediction Form** — Input customer profile data for real-time risk assessment
- **Risk Meter Visualization** — Visual gauge showing churn probability (Low/Medium/High)
- **Feature Importance Chart** — Bar chart displaying which factors influence the prediction
- **Retention Recommendations** — AI-generated suggestions to reduce churn risk
- **Responsive UI** — Modern glassmorphism design with smooth animations

## 🧠 Model Inputs

| Feature | Description |
|---------|-------------|
| Tenure | Customer duration in months |
| Monthly Charges | Current monthly billing amount |
| Total Charges | Lifetime value spent |
| Contract Type | Month-to-month, 1-year, or 2-year |
| Payment Method | Electronic, mailed, bank transfer, credit card |
| Internet Service | Fiber, DSL, or none |
| Add-ons | Online Security, Tech Support, Paperless Billing |
| Demographics | Senior Citizen status |

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure & forms |
| CSS3 | Glassmorphism styling & animations |
| JavaScript | Prediction logic & simulated ML model |
| Chart.js | Feature importance visualization |

## 🚀 Quick Start

1. Clone or download this folder
2. Open `index.html` in your browser
3. Fill out the customer profile form and click **Predict Churn Risk**

```bash
# Or serve locally
npx serve .
```

## 📁 File Structure

```
customer-churn-predictor/
├── index.html    # Form & results UI
├── styles.css    # Modern styling with CSS variables
├── app.js        # Prediction algorithm & chart logic
└── README.md     # This file
```

## 📊 How It Works

1. User inputs customer data via the form
2. JavaScript calculates a weighted churn probability score
3. Risk classification (Low/Medium/High) is displayed with a visual meter
4. Feature importance chart shows contributing factors
5. Personalized retention recommendations are generated

## 👩‍💻 Author

**Victoria Banavath**  
[Portfolio](https://victoria-banavath.vercel.app/)

---

*Built as a portfolio project demonstrating machine learning concepts and interactive UX.*

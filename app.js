/**
 * Customer Churn Predictor
 * ML-powered prediction with feature importance visualization
 */

let featureChart;

// Simulated ML model weights (based on typical churn factors)
const featureWeights = {
    contract: { month: 0.4, one_year: 0.1, two_year: -0.2 },
    tenure: -0.015, // Longer tenure = lower churn
    monthlyCharges: 0.008, // Higher charges = higher churn
    internetService: { fiber: 0.2, dsl: 0.05, no: -0.1 },
    paymentMethod: { electronic: 0.25, mailed: 0.1, bank: -0.05, credit: -0.1 },
    onlineSecurity: -0.15,
    techSupport: -0.12,
    paperlessBilling: 0.1,
    seniorCitizen: 0.08
};

// Calculate churn probability
const predictChurn = (features) => {
    let score = 0.3; // Base probability

    // Contract type (major factor)
    score += featureWeights.contract[features.contract] || 0;

    // Tenure (months)
    score += features.tenure * featureWeights.tenure;

    // Monthly charges
    const chargesFactor = (features.monthlyCharges - 50) * featureWeights.monthlyCharges;
    score += chargesFactor;

    // Internet service
    score += featureWeights.internetService[features.internetService] || 0;

    // Payment method
    score += featureWeights.paymentMethod[features.paymentMethod] || 0;

    // Boolean features
    if (features.onlineSecurity) score += featureWeights.onlineSecurity;
    if (features.techSupport) score += featureWeights.techSupport;
    if (features.paperlessBilling) score += featureWeights.paperlessBilling;
    if (features.seniorCitizen) score += featureWeights.seniorCitizen;

    // Clamp between 0 and 1
    return Math.max(0.02, Math.min(0.98, score));
};

// Get feature importance for this prediction
const getFeatureImportance = (features) => {
    const importance = [];

    // Contract
    const contractImpact = Math.abs(featureWeights.contract[features.contract] || 0);
    importance.push({ name: 'Contract Type', value: contractImpact * 100, color: '#8b5cf6' });

    // Tenure
    const tenureImpact = Math.abs(features.tenure * featureWeights.tenure) * 0.8;
    importance.push({ name: 'Tenure', value: tenureImpact * 100, color: '#00ff88' });

    // Monthly Charges
    const chargesImpact = Math.abs((features.monthlyCharges - 50) * featureWeights.monthlyCharges);
    importance.push({ name: 'Monthly Charges', value: chargesImpact * 100, color: '#00d4ff' });

    // Payment Method
    const paymentImpact = Math.abs(featureWeights.paymentMethod[features.paymentMethod] || 0);
    importance.push({ name: 'Payment Method', value: paymentImpact * 100, color: '#ff9f43' });

    // Internet Service
    const internetImpact = Math.abs(featureWeights.internetService[features.internetService] || 0);
    importance.push({ name: 'Internet Service', value: internetImpact * 100, color: '#ff4757' });

    // Sort by importance
    return importance.sort((a, b) => b.value - a.value);
};

// Get recommendations based on risk factors
const getRecommendations = (features, probability) => {
    const recommendations = [];

    if (features.contract === 'month') {
        recommendations.push('Offer incentives to upgrade to annual contract (reduces churn by ~30%)');
    }

    if (features.paymentMethod === 'electronic') {
        recommendations.push('Encourage switch to auto-pay via bank transfer for better retention');
    }

    if (!features.onlineSecurity && features.internetService !== 'no') {
        recommendations.push('Offer free trial of Online Security service');
    }

    if (!features.techSupport) {
        recommendations.push('Provide complimentary Tech Support for 3 months');
    }

    if (features.monthlyCharges > 70) {
        recommendations.push('Consider loyalty discount to maintain price-value perception');
    }

    if (features.tenure < 12) {
        recommendations.push('Implement early-stage engagement program (onboarding check-ins)');
    }

    if (probability > 0.6) {
        recommendations.push('⚠️ HIGH PRIORITY: Assign dedicated retention specialist');
    }

    return recommendations.slice(0, 4); // Return top 4 recommendations
};

// Update the feature importance chart
const updateFeatureChart = (importance) => {
    const ctx = document.getElementById('featureChart').getContext('2d');

    if (featureChart) {
        featureChart.destroy();
    }

    featureChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: importance.map(f => f.name),
            datasets: [{
                data: importance.map(f => f.value),
                backgroundColor: importance.map(f => f.color),
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#6b6b7b' },
                    max: 50
                },
                y: {
                    grid: { display: false },
                    ticks: { color: '#a0a0b0' }
                }
            }
        }
    });
};

// Animate the risk meter
const animateRiskMeter = (probability) => {
    const percent = probability * 100;
    const meterFill = document.getElementById('meterFill');
    const meterNeedle = document.getElementById('meterNeedle');
    const riskPercent = document.querySelector('.risk-percent');
    const riskBadge = document.querySelector('.risk-badge');

    // Animate fill
    meterFill.style.transform = `scaleX(${1 - probability})`;

    // Animate needle
    meterNeedle.style.left = `calc(${percent}% - 2px)`;

    // Animate percentage counter
    let current = 0;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        current = Math.round(percent * easeOut);

        riskPercent.textContent = current + '%';

        // Update gradient based on risk
        if (progress >= 1) {
            if (probability < 0.3) {
                riskPercent.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
            } else if (probability < 0.6) {
                riskPercent.style.background = 'linear-gradient(135deg, #ff9f43, #ffcc00)';
            } else {
                riskPercent.style.background = 'linear-gradient(135deg, #ff4757, #ff6b6b)';
            }
            riskPercent.style.webkitBackgroundClip = 'text';
            riskPercent.style.webkitTextFillColor = 'transparent';
        }

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };

    requestAnimationFrame(animate);

    // Update badge
    riskBadge.className = 'risk-badge';
    if (probability < 0.3) {
        riskBadge.classList.add('low');
        riskBadge.textContent = 'Low Risk';
    } else if (probability < 0.6) {
        riskBadge.classList.add('medium');
        riskBadge.textContent = 'Medium Risk';
    } else {
        riskBadge.classList.add('high');
        riskBadge.textContent = 'High Risk';
    }
};

// Handle form submission
document.getElementById('predictionForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect features
    const features = {
        tenure: parseInt(document.getElementById('tenure').value),
        monthlyCharges: parseFloat(document.getElementById('monthlyCharges').value),
        totalCharges: parseFloat(document.getElementById('totalCharges').value),
        contract: document.getElementById('contract').value,
        paymentMethod: document.getElementById('paymentMethod').value,
        internetService: document.getElementById('internetService').value,
        onlineSecurity: document.getElementById('onlineSecurity').checked,
        techSupport: document.getElementById('techSupport').checked,
        paperlessBilling: document.getElementById('paperlessBilling').checked,
        seniorCitizen: document.getElementById('seniorCitizen').checked
    };

    // Predict
    const probability = predictChurn(features);

    // Update UI
    animateRiskMeter(probability);

    const importance = getFeatureImportance(features);
    updateFeatureChart(importance);

    const recommendations = getRecommendations(features, probability);
    const recList = document.getElementById('recommendationsList');
    recList.innerHTML = recommendations.map(r => `<li>${r}</li>`).join('');

    // Scroll to results on mobile
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
});

// Initialize with default values
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial prediction
    document.getElementById('predictionForm').dispatchEvent(new Event('submit'));
});

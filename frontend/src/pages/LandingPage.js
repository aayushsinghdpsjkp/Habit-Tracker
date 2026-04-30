import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: '🔥',
      title: 'Build Streaks',
      description: 'Track your daily progress and build powerful streaks that motivate you to keep going.',
      image: '📊'
    },
    {
      icon: '📅',
      title: 'Visual Calendar',
      description: 'See your progress at a glance with our beautiful calendar view showing all your habits.',
      image: '🗓️'
    },
    {
      icon: '📈',
      title: 'Smart Analytics',
      description: 'Get insights into your habits with detailed statistics and progress tracking.',
      image: '📊'
    },
    {
      icon: '🏆',
      title: 'Achievement System',
      description: 'Compete with yourself and others on the leaderboard to stay motivated.',
      image: '🥇'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fitness Enthusiast',
      text: 'This app helped me build a consistent workout routine. 90 days streak and counting!',
      avatar: '👩‍💼'
    },
    {
      name: 'Mike Chen',
      role: 'Developer',
      text: 'Perfect for tracking coding practice. The visual progress keeps me motivated daily.',
      avatar: '👨‍💻'
    },
    {
      name: 'Emma Davis',
      role: 'Student',
      text: 'Love the clean interface! Makes habit tracking actually enjoyable.',
      avatar: '👩‍🎓'
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Build Better Habits,
              <span className="gradient-text"> Transform Your Life</span>
            </h1>
            <p className="hero-description">
              Track your daily habits, build powerful streaks, and achieve your goals with our 
              beautiful and intuitive habit tracker. Start your journey to a better you today.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="cta-button primary">
                Start Free Today
              </Link>
              <Link to="/login" className="cta-button secondary">
                Sign In
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Active Users</span>
              </div>
              <div className="stat">
                <span className="stat-number">1M+</span>
                <span className="stat-label">Habits Tracked</span>
              </div>
              <div className="stat">
                <span className="stat-number">95%</span>
                <span className="stat-label">Success Rate</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="mockup-header">
                  <div className="mockup-title">🔥 Your Habits</div>
                </div>
                <div className="mockup-habits">
                  <div className="mockup-habit">
                    <span>💪 Workout</span>
                    <span className="streak">7 days</span>
                  </div>
                  <div className="mockup-habit">
                    <span>📚 Reading</span>
                    <span className="streak">12 days</span>
                  </div>
                  <div className="mockup-habit">
                    <span>🧘 Meditation</span>
                    <span className="streak">5 days</span>
                  </div>
                </div>
                <div className="mockup-calendar">
                  <div className="calendar-grid">
                    {[...Array(21)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`calendar-day ${i < 15 ? 'completed' : ''}`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Everything You Need to Succeed</h2>
          <p className="section-subtitle">
            Powerful features designed to help you build lasting habits
          </p>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`feature-card ${activeFeature === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-image">{feature.image}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Create Your Habits</h3>
                <p>Add the habits you want to build. Whether it's exercise, reading, or meditation.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Track Daily Progress</h3>
                <p>Mark your habits as complete each day. Watch your streaks grow!</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Analyze & Improve</h3>
                <p>Review your progress with detailed analytics and keep improving.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  <p>"{testimonial.text}"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.avatar}</div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Life?</h2>
            <p>Join thousands of users who have already built amazing habits with our tracker.</p>
            <div className="cta-buttons">
              <Link to="/register" className="cta-button primary large">
                Get Started Free
              </Link>
              <Link to="/login" className="cta-button secondary large">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>🔥 Habit Tracker</h3>
              <p>Build better habits, transform your life.</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#testimonials">Testimonials</a>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <a href="#help">Help Center</a>
                <a href="#contact">Contact</a>
                <a href="#privacy">Privacy</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Habit Tracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
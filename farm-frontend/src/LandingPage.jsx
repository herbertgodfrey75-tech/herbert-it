import "./App.css";

function LandingPage({ goLogin, goRegister }) {

  return (

    <div className="landing-page">

      {/* HERO */}

      <section className="hero-section">

        <div className="hero-content">

          <span className="hero-badge">
            🌱 Student Farm
          </span>

          <h1>

            Manage Students
            <br />
            Smarter & Faster

          </h1>

          <p>

            A modern student management platform
            built with React, FastAPI and MongoDB.

          </p>

          <div className="hero-buttons">

            <button
              className="counter"
              onClick={goRegister}
            >
              🚀 Get Started
            </button>

            <button
              className="counter secondary-btn"
              onClick={goLogin}
            >
              🔑 Login
            </button>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="features-section">

        <h2>Why Choose Student Farm?</h2>

        <div className="features-grid">

          <div className="feature-card">

            <div className="feature-icon">
              🎓
            </div>

            <h3>Student Management</h3>

            <p>

              Add, edit and organize
              student records with ease.

            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              🔒
            </div>

            <h3>Secure Login</h3>

            <p>

              Authentication and role-based
              access for every user.

            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              ⚡
            </div>

            <h3>Fast Dashboard</h3>

            <p>

              Everything you need in
              one modern dashboard.

            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              ☁️
            </div>

            <h3>Cloud Ready</h3>

            <p>

              Access your data anywhere
              with secure cloud deployment.

            </p>

          </div>

        </div>

      </section>

    </div>

  );

}

export default LandingPage;
import { useNavigate } from "react-router-dom";

import logoPng from "../assets/images/logo.png";

import "../styles/pages/landing-page.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="landing__bg" aria-hidden="true" />

      <header className="landing__top">
        <div className="landing__brand">
          <img className="landing__logo" src={logoPng} alt="ProManage" />
          <div>
            <div className="landing__brand-name">ProManage</div>
            <div className="landing__brand-tag">Projects. Tasks. Momentum.</div>
          </div>
        </div>

        <div className="landing__top-actions">
          <button
            className="btn btn--ghost"
            onClick={() => navigate("/login")}
          >
            Login Here
          </button>
          <button className="btn btn--primary" onClick={() => navigate("/register")}
          >
            Register
          </button>

        </div>
      </header>

      <section className="hero">
        <div className="hero__content">
          <div className="hero__pill">Fast setup • Clean workflow • Clear progress</div>
          <h1 className="hero__title">
            Manage every project like a pro —
            <span className="hero__title-accent"> without the chaos</span>.
          </h1>
          <p className="hero__subtitle">
            ProManage brings your projects and tasks together in one place. Plan,
            track, and ship with confidence.
          </p>

          <div className="hero__cta">
            <button
              className="btn btn--primary"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>
            <button
              className="btn btn--secondary"
              onClick={() => navigate("/login")}
            >
              View Tasks
            </button>
          </div>


          <div className="hero__mini">
            <div className="mini">
              <div className="mini__icon" aria-hidden="true">
                ⚡
              </div>
              <div>
                <div className="mini__title">Quick to adopt</div>
                <div className="mini__desc">Straightforward Kanban + project cards.</div>
              </div>
            </div>
            <div className="mini">
              <div className="mini__icon" aria-hidden="true">
                📊
              </div>
              <div>
                <div className="mini__title">Progress you can feel</div>
                <div className="mini__desc">See momentum at a glance.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="mock">
            <div className="mock__top">
              <div className="mock__dots">
                <span />
                <span />
                <span />
              </div>
              <div className="mock__label">Live Overview</div>
            </div>

            <div className="mock__grid">
              <div className="mock__card mock__card--stat">
                <div className="mock__stat-value">12</div>
                <div className="mock__stat-label">Projects</div>
              </div>
              <div className="mock__card mock__card--stat">
                <div className="mock__stat-value">48</div>
                <div className="mock__stat-label">Tasks</div>
              </div>
              <div className="mock__card mock__card--progress">
                <div className="mock__progress-title">Team Delivery</div>
                <div className="mock__bar">
                  <span style={{ width: "72%" }} />
                </div>
                <div className="mock__progress-meta">On track • 72%</div>
              </div>
            </div>

            <div className="mock__kanban">
              <div className="kan__col">
                <div className="kan__head">To Do</div>
                <div className="kan__task">Brief review</div>
                <div className="kan__task">UI polish</div>
              </div>
              <div className="kan__col">
                <div className="kan__head">In Progress</div>
                <div className="kan__task">Implement routes</div>
                <div className="kan__task">Fix validations</div>
              </div>
              <div className="kan__col">
                <div className="kan__head">Done</div>
                <div className="kan__task">Project cards</div>
                <div className="kan__task">Task modal</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-label="Features">
        <div className="section__head">
          <h2 className="section__title">Everything you need to ship</h2>
          <p className="section__subtitle">
            A landing page should feel inviting. The product itself should feel
            effortless.
          </p>
        </div>

        <div className="features">
          <article className="feature">
            <div className="feature__icon" aria-hidden="true">
              🗂️
            </div>
            <h3 className="feature__title">Project overview</h3>
            <p className="feature__desc">
              Organize projects with clean cards and progress so you always know
              what’s active.
            </p>
          </article>

          <article className="feature">
            <div className="feature__icon" aria-hidden="true">
              ✅
            </div>
            <h3 className="feature__title">Task board flow</h3>
            <p className="feature__desc">
              Track work in a Kanban-style layout. Move tasks forward without
              losing context.
            </p>
          </article>

          <article className="feature">
            <div className="feature__icon" aria-hidden="true">
              🔎
            </div>
            <h3 className="feature__title">Search & focus</h3>
            <p className="feature__desc">
              Keep your attention on the work that matters with fast navigation
              across projects.
            </p>
          </article>
        </div>
      </section>

      <section className="section section--muted" aria-label="How it works">
        <div className="section__head">
          <h2 className="section__title">How it works</h2>
          <p className="section__subtitle">A simple workflow that stays out of the way.</p>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step__num">1</div>
            <div>
              <h3 className="step__title">Create or open a project</h3>
              <p className="step__desc">Start with the project cards and existing progress.</p>
            </div>
          </div>
          <div className="step">
            <div className="step__num">2</div>
            <div>
              <h3 className="step__title">Manage tasks in Kanban</h3>
              <p className="step__desc">Capture tasks, move them across stages, and track delivery.</p>
            </div>
          </div>
          <div className="step">
            <div className="step__num">3</div>
            <div>
              <h3 className="step__title">Stay aligned</h3>
              <p className="step__desc">Use the dashboard stats to see momentum at a glance.</p>
            </div>
          </div>
        </div>

        <div className="stats">
          <div className="stat">
            <div className="stat__value">12</div>
            <div className="stat__label">Projects</div>
          </div>
          <div className="stat">
            <div className="stat__value">48</div>
            <div className="stat__label">Tasks</div>
          </div>
          <div className="stat">
            <div className="stat__value">6</div>
            <div className="stat__label">Teams</div>
          </div>
          <div className="stat">
            <div className="stat__value">72%</div>
            <div className="stat__label">Delivery</div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__inner">
          <div>
            <div className="footer__brand">ProManage</div>
            <div className="footer__copy">Built for clarity, speed, and progress.</div>
          </div>

          <div className="footer__links">
            <button className="link" onClick={() => navigate("/projects")}>
              Projects
            </button>
            <button className="link" onClick={() => navigate("/tasks")}>
              Tasks
            </button>
            <button className="link" onClick={() => navigate("/")}>
              Home
            </button>
          </div>
        </div>

        <div className="footer__bottom">© {new Date().getFullYear()} ProManage</div>
      </footer>
    </div>
  );
}

export default LandingPage;


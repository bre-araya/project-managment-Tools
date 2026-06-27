import { useNavigate } from "react-router-dom";

import logoPng from "../assets/images/logo.png";
import dashboardIllustration from "../assets/images/landing-dashboard.svg";

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
            <div className="landing__brand-tag">Projects • Tasks • Team clarity</div>
          </div>
        </div>

        <div className="landing__top-actions">
          <button className="btn btn--ghost" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="btn btn--primary" onClick={() => navigate("/register")}>
            Start free
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="hero__content">
          <div className="hero__pill">Enterprise-ready • Visual planning • Smart execution</div>
          <h1 className="hero__title">
            Run projects with confidence —
            <span className="hero__title-accent"> from kickoff to delivery.</span>
          </h1>
          <p className="hero__subtitle">
            ProManage gives teams a calm, modern workspace to organize projects,
            track tasks, assign ownership, and keep progress visible at every stage.
          </p>

          <div className="hero__cta">
            <button className="btn btn--primary" onClick={() => navigate("/register")}>
              Create your workspace
            </button>
            <button className="btn btn--secondary" onClick={() => navigate("/login")}>
              Explore the dashboard
            </button>
          </div>

          <div className="hero__mini">
            <div className="mini">
              <div className="mini__icon" aria-hidden="true">
                ⚡
              </div>
              <div>
                <div className="mini__title">Instant visibility</div>
                <div className="mini__desc">A clear overview of every project, task, and milestone.</div>
              </div>
            </div>
            <div className="mini">
              <div className="mini__icon" aria-hidden="true">
                📈
              </div>
              <div>
                <div className="mini__title">Live delivery tracking</div>
                <div className="mini__desc">Monitor progress and keep delivery on schedule.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="mock">
            <img src={dashboardIllustration} alt="Project management dashboard preview" className="mock__image" />
          </div>
        </div>
      </section>

      <section className="section" aria-label="Features">
        <div className="section__head">
          <h2 className="section__title">Everything your team needs to deliver</h2>
          <p className="section__subtitle">
            A refined workspace for planning, collaboration, and execution — built to feel as sharp as your work.
          </p>
        </div>

        <div className="features">
          <article className="feature">
            <div className="feature__icon" aria-hidden="true">
              🗂️
            </div>
            <h3 className="feature__title">Structured project hubs</h3>
            <p className="feature__desc">
              Organize work into focused project spaces with clear goals, ownership, and momentum.
            </p>
          </article>

          <article className="feature">
            <div className="feature__icon" aria-hidden="true">
              ✅
            </div>
            <h3 className="feature__title">Task flow that stays simple</h3>
            <p className="feature__desc">
              Move work through stages with an intuitive task board that keeps everyone aligned.
            </p>
          </article>

          <article className="feature">
            <div className="feature__icon" aria-hidden="true">
              🤝
            </div>
            <h3 className="feature__title">Built for collaboration</h3>
            <p className="feature__desc">
              Assign work, manage responsibilities, and keep communication tied to progress.
            </p>
          </article>
        </div>
      </section>

      <section className="section section--muted" aria-label="How it works">
        <div className="section__head">
          <h2 className="section__title">A workflow that feels effortless</h2>
          <p className="section__subtitle">From planning to delivery, every step is clear and organized.</p>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step__num">1</div>
            <div>
              <h3 className="step__title">Create a project</h3>
              <p className="step__desc">Start with a strong foundation and define the work that matters most.</p>
            </div>
          </div>
          <div className="step">
            <div className="step__num">2</div>
            <div>
              <h3 className="step__title">Assign and manage tasks</h3>
              <p className="step__desc">Break work into actionable items and keep delivery moving forward.</p>
            </div>
          </div>
          <div className="step">
            <div className="step__num">3</div>
            <div>
              <h3 className="step__title">Track progress in real time</h3>
              <p className="step__desc">Use the dashboard to stay aligned with milestones and outcomes.</p>
            </div>
          </div>
        </div>

        <div className="stats">
          <div className="stat">
            <div className="stat__value">24/7</div>
            <div className="stat__label">Team visibility</div>
          </div>
          <div className="stat">
            <div className="stat__value">100%</div>
            <div className="stat__label">Workflow clarity</div>
          </div>
          <div className="stat">
            <div className="stat__value">4</div>
            <div className="stat__label">Kanban stages</div>
          </div>
          <div className="stat">
            <div className="stat__value">1</div>
            <div className="stat__label">Command center</div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__inner">
          <div>
            <div className="footer__brand">ProManage</div>
            <div className="footer__copy">Built for clarity, speed, and confident delivery.</div>
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


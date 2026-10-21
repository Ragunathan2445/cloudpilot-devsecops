import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Server,
  Container,
  ShieldCheck,
  GitBranch,
  Activity,
  Cloud,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Menu,
  X,
  ArrowUpRight,
  Layers3,
  Zap,
} from "lucide-react";
import "./index.css";

const menuItems = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "Infrastructure", icon: Cloud },
  { name: "Deployments", icon: GitBranch },
  { name: "Containers", icon: Container },
  { name: "Security", icon: ShieldCheck },
  { name: "CI/CD Pipeline", icon: Activity },
];

function App() {
  const [activePage, setActivePage] = useState("Overview");
  const [dashboard, setDashboard] = useState(null);
  const [apiStatus, setApiStatus] = useState("Checking");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      try {
        const response = await fetch(
          "/api/dashboard"
        );

        if (!response.ok) {
          throw new Error("Backend request failed");
        }

        const data = await response.json();

        if (!cancelled) {
          setDashboard(data);
          setApiStatus("Connected");
        }
      } catch {
        if (!cancelled) {
          setApiStatus("Offline");
        }
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  const pageDescriptions = {
    Overview: "Monitor your cloud infrastructure and delivery workflow.",
    Infrastructure: "Review your infrastructure provisioning setup.",
    Deployments: "Track your application deployment workflow.",
    Containers: "Explore your Docker and Kubernetes workflow.",
    Security: "Review your DevSecOps security workflow.",
    "CI/CD Pipeline": "Explore your continuous integration and delivery process.",
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">
            <Cloud size={23} />
          </div>
          <div>
            <h2>CloudPilot</h2>
            <span>DEVSECOPS PLATFORM</span>
          </div>
          <button
            className="mobile-close"
            onClick={() => setMobileMenu(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        <nav className="navigation">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`nav-item ${
                  activePage === item.name ? "nav-active" : ""
                }`}
                onClick={() => {
                  setActivePage(item.name);
                  setMobileMenu(false);
                }}
              >
                <Icon size={19} />
                <span>{item.name}</span>
                {item.name === "Security" && (
                  <span className="nav-dot" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="environment-card">
            <div className="environment-heading">
              <span className="status-dot" />
              Development
            </div>
            <p>AWS · ap-south-1</p>
            <span className="environment-tag">MUMBAI REGION</span>
          </div>

          <div className="profile">
            <div className="avatar">CP</div>
            <div className="profile-info">
              <strong>CloudPilot Admin</strong>
              <span>Project Workspace</span>
            </div>
            <Layers3 size={18} className="profile-layers" />
          </div>
        </div>
      </aside>

      {mobileMenu && (
        <button
          className="sidebar-backdrop"
          onClick={() => setMobileMenu(false)}
          aria-label="Close navigation"
        />
      )}

      <main className="main-content">
        <header className="topbar">
          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenu(true)}
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>

          <div className="breadcrumbs">
            <span>Workspace</span>
            <span className="breadcrumb-separator">/</span>
            <strong>{activePage}</strong>
          </div>

          <div className="topbar-right">
            <span className="live-indicator">
              <span className="status-dot" />
              DEVELOPMENT
            </span>
            <div className="top-avatar">CP</div>
          </div>
        </header>

        <div className="page-container">
          <section className="welcome-row">
            <div>
              <div className="eyebrow">
                <Zap size={14} />
                CLOUD OPERATIONS CENTER
              </div>

              <h1>
                {activePage === "Overview"
                  ? "Cloud overview"
                  : activePage}
              </h1>

              <p className="page-description">
                {pageDescriptions[activePage]}
              </p>
            </div>

            <button
              className="refresh-button"
              onClick={() => window.location.reload()}
            >
              <RefreshCw size={16} />
              Refresh dashboard
            </button>
          </section>

          <section className="hero-card">
            <div className="hero-content">
              <span className="hero-label">
                <span className="hero-pulse" />
                YOUR DEVSECOPS WORKSPACE
              </span>

              <h2>Build securely. Deploy confidently.</h2>

              <p>
                One workspace for your infrastructure, application
                delivery, containers, and security workflow.
              </p>

              <div className="hero-tags">
                <span>Terraform</span>
                <span>Docker</span>
                <span>Kubernetes</span>
                <span>GitHub Actions</span>
              </div>
            </div>

            <div className="hero-art">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="hero-cloud">
                <Cloud size={65} strokeWidth={1.2} />
              </div>
              <div className="hero-platform">
                <ShieldCheck size={29} />
                <span>SECURE CLOUD</span>
              </div>
              <div className="floating-chip chip-top">
                <CheckCircle2 size={15} />
                Infrastructure
              </div>
              <div className="floating-chip chip-bottom">
                <Activity size={15} />
                Delivery pipeline
              </div>
            </div>
          </section>

          <section className="section-heading">
            <div>
              <h2>Platform status</h2>
              <p>Your current development environment</p>
            </div>

            <span className="demo-badge">DEVELOPMENT VIEW</span>
          </section>

          <section className="metrics-grid">
            <article className="metric-card">
              <div className="metric-top">
                <span className="metric-icon purple">
                  <Cloud size={21} />
                </span>
                <span className="metric-label">CLOUD PROVIDER</span>
              </div>
              <h3>AWS</h3>
              <p className="metric-foot">
                <span className="status-dot" />
                Mumbai region
              </p>
            </article>

            <article className="metric-card">
              <div className="metric-top">
                <span className="metric-icon blue">
                  <Server size={21} />
                </span>
                <span className="metric-label">BACKEND API</span>
              </div>
              <h3 className="status-value">
                {apiStatus === "Connected"
                  ? "Connected"
                  : apiStatus === "Offline"
                    ? "Offline"
                    : "Checking..."}
              </h3>
              <p className="metric-foot">
                {apiStatus === "Connected" ? (
                  <>
                    <CheckCircle2 size={14} />
                    API responding
                  </>
                ) : apiStatus === "Offline" ? (
                  <>
                    <AlertCircle size={14} />
                    Start backend server
                  </>
                ) : (
                  "Checking local API"
                )}
              </p>
            </article>

            <article className="metric-card">
              <div className="metric-top">
                <span className="metric-icon green">
                  <ShieldCheck size={21} />
                </span>
                <span className="metric-label">SECURITY WORKFLOW</span>
              </div>
              <h3>In progress</h3>
              <p className="metric-foot">
                Security scanning not yet integrated
              </p>
            </article>

            <article className="metric-card">
              <div className="metric-top">
                <span className="metric-icon orange">
                  <GitBranch size={21} />
                </span>
                <span className="metric-label">CI/CD PIPELINE</span>
              </div>
              <h3>Not configured</h3>
              <p className="metric-foot">
                GitHub Actions integration pending
              </p>
            </article>
          </section>

          <section className="content-grid">
            <article className="panel architecture-panel">
              <div className="panel-heading">
                <div>
                  <h2>Infrastructure architecture</h2>
                  <p>Your planned deployment stack</p>
                </div>
                <span className="panel-icon">
                  <Layers3 size={19} />
                </span>
              </div>

              <div className="architecture-flow">
                <div className="architecture-node">
                  <div className="architecture-icon github-icon">
                    <GitBranch size={22} />
                  </div>
                  <div>
                    <strong>GitHub</strong>
                    <span>Source code</span>
                  </div>
                  <span className="node-status planned">Planned</span>
                </div>

                <div className="flow-line" />

                <div className="architecture-node">
                  <div className="architecture-icon terraform-icon">
                    <Layers3 size={22} />
                  </div>
                  <div>
                    <strong>Terraform</strong>
                    <span>Infrastructure as code</span>
                  </div>
                  <span className="node-status configured">Configured</span>
                </div>

                <div className="flow-line" />

                <div className="architecture-node">
                  <div className="architecture-icon docker-icon">
                    <Container size={22} />
                  </div>
                  <div>
                    <strong>Docker & Kubernetes</strong>
                    <span>Container delivery</span>
                  </div>
                  <span className="node-status planned">Planned</span>
                </div>

                <div className="flow-line" />

                <div className="architecture-node">
                  <div className="architecture-icon aws-icon">
                    <Cloud size={22} />
                  </div>
                  <div>
                    <strong>AWS Cloud</strong>
                    <span>Cloud infrastructure</span>
                  </div>
                  <span className="node-status configured">VPC created</span>
                </div>
              </div>

              <div className="panel-footer">
                <span>Architecture implementation progress</span>
                <span className="footer-highlight">Foundation stage</span>
              </div>
            </article>

            <article className="panel api-panel">
              <div className="panel-heading">
                <div>
                  <h2>Backend connection</h2>
                  <p>Live response from your local API</p>
                </div>
                <span className="panel-icon">
                  <Activity size={19} />
                </span>
              </div>

              <div
                className={`connection-banner ${
                  apiStatus === "Connected" ? "connection-good" : ""
                }`}
              >
                {apiStatus === "Connected" ? (
                  <CheckCircle2 size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                <div>
                  <strong>
                    {apiStatus === "Connected"
                      ? "Backend is reachable"
                      : apiStatus === "Offline"
                        ? "Backend unavailable"
                        : "Connecting to backend"}
                  </strong>
                  <span>localhost:5000/api/dashboard</span>
                </div>
              </div>

              <div className="api-details">
                <div>
                  <span>API status</span>
                  <strong>{apiStatus}</strong>
                </div>
                <div>
                  <span>Project</span>
                  <strong>{dashboard?.project || "Waiting for API"}</strong>
                </div>
                <div>
                  <span>Environment</span>
                  <strong>
                    {dashboard?.environment || "Development"}
                  </strong>
                </div>
                <div>
                  <span>Security mode</span>
                  <strong>{dashboard?.security?.mode || "Demo"}</strong>
                </div>
              </div>

              <div className="api-note">
                <span className="status-dot" />
                API data is fetched from your Express backend.
              </div>
            </article>
          </section>

          <section className="panel technology-panel">
            <div className="panel-heading">
              <div>
                <h2>Technology stack</h2>
                <p>Tools used in this DevSecOps project</p>
              </div>
              <ArrowUpRight size={19} className="subtle-arrow" />
            </div>

            <div className="technology-grid">
              {[
                {
                  name: "Terraform",
                  category: "Infrastructure as code",
                  symbol: "Tf",
                  style: "tech-purple",
                },
                {
                  name: "Docker",
                  category: "Containerization",
                  symbol: "D",
                  style: "tech-blue",
                },
                {
                  name: "Kubernetes",
                  category: "Container orchestration",
                  symbol: "K8",
                  style: "tech-indigo",
                },
                {
                  name: "GitHub Actions",
                  category: "CI/CD automation",
                  symbol: "GA",
                  style: "tech-gray",
                },
                {
                  name: "AWS",
                  category: "Cloud platform",
                  symbol: "AWS",
                  style: "tech-orange",
                },
                {
                  name: "Security",
                  category: "DevSecOps practices",
                  symbol: "S",
                  style: "tech-green",
                },
              ].map((tech) => (
                <div className="technology-item" key={tech.name}>
                  <div className={`technology-symbol ${tech.style}`}>
                    {tech.symbol}
                  </div>
                  <div>
                    <strong>{tech.name}</strong>
                    <span>{tech.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <footer className="footer">
            <span>CloudPilot · AWS DevSecOps Platform</span>
            <span>Development environment · Not production monitoring</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
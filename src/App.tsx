import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  BadgeCheck,
  Blocks,
  BrainCircuit,
  BriefcaseBusiness,
  Github,
  Layers3,
  Mail,
  Network,
  Rocket,
  Sparkles,
  Trophy,
} from 'lucide-react';
import {
  education,
  experience,
  links,
  openSource,
  productHunt,
  profile,
  projects,
  proofItems,
  skills,
} from './data/portfolio';

const navItems = [
  { label: 'Proof', href: '#proof' },
  { label: 'Work', href: '#work' },
  { label: 'Lab', href: '#agent-lab' },
  { label: 'Open Source', href: '#open-source' },
  { label: 'Stack', href: '#stack' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

const linkByLabel = Object.fromEntries(links.map((link) => [link.label, link.url]));

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const cardRise = {
  hidden: { opacity: 1, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function App() {
  const prefersReducedMotion = useReducedMotion();
  const [activeNode, setActiveNode] = useState('AI agents');

  useEffect(() => {
    const legacySection = window.location.pathname.split('/').filter(Boolean)[0] ?? '';
    if (['resume', 'portfolio', 'contact'].includes(legacySection)) {
      const id = legacySection === 'portfolio' ? 'work' : legacySection;
      window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    }
  }, []);

  const skillGroups = useMemo(
    () => [
      { label: 'Frontend systems', items: skills.frontend },
      { label: 'Backend platforms', items: skills.backend },
      { label: 'Data layer', items: skills.databases },
      { label: 'Delivery', items: skills.devops },
      { label: 'AI automation', items: skills.aiAutomation },
      { label: 'Domains', items: skills.domains },
    ],
    [],
  );

  const agentNodes = [
    { label: 'AI agents', icon: BrainCircuit, x: '18%', y: '18%' },
    { label: 'Product systems', icon: Layers3, x: '66%', y: '12%' },
    { label: 'Automation', icon: Sparkles, x: '66%', y: '58%' },
    { label: 'Architecture', icon: Network, x: '28%', y: '68%' },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[var(--color-canvas)] text-zinc-100">
      <div className="noise-layer" />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-black/55 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a className="flex items-center gap-3" href="#top" aria-label="Serge Yudin home">
            <span className="grid size-9 place-items-center border border-white/14 bg-white/8 text-sm font-semibold">
              SY
            </span>
            <span className="hidden text-sm font-medium text-zinc-300 lg:block">
              Senior Full-Stack Engineer
            </span>
          </a>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <a className="nav-link" href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="icon-link" href={linkByLabel.GitHub} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={18} />
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative min-h-screen px-4 pt-28 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div
              initial={prefersReducedMotion ? false : 'hidden'}
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="relative z-10"
            >
              <div className="mb-7 flex flex-wrap items-center gap-3">
                <span className="status-chip">
                  <span className="status-dot" />
                  Available for selected remote work
                </span>
                <span className="status-chip muted">React / NestJS / AI agents</span>
              </div>
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-normal text-white sm:text-6xl lg:text-7xl">
                Serge Yudin builds product systems that ship.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
                {profile.tagline} I connect senior architecture, fast product execution, and practical
                automation for teams that need real software in production.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a className="primary-action" href="#contact">
                  Start a project <ArrowUpRight size={18} />
                </a>
                <a className="secondary-action" href={linkByLabel.ProductHunt} target="_blank" rel="noreferrer">
                  Product Hunt <ArrowUpRight size={18} />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              className="hero-console"
            >
              <div className="console-header">
                <span>operator.profile</span>
                <span>2026</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-[0.85fr_1.15fr]">
                <div className="portrait-frame">
                  <img src="/images/profile-2026-likeness.png" alt="Serge Yudin" />
                </div>
                <div className="space-y-3">
                  <Metric label="Experience" value={profile.experienceYears} />
                  <Metric label="Upwork" value="Top Rated Plus" />
                  <Metric label="Product Hunt" value={productHunt.badge} />
                  <Metric label="Open source" value="NestJS + Tailwind" />
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {['Architecture', 'Delivery', 'Automation'].map((item) => (
                  <div className="micro-card" key={item}>
                    <BadgeCheck size={16} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <Section id="proof" eyebrow="Proof Ledger" title="Credibility that can be checked, not guessed.">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {proofItems.map((item, index) => (
              <motion.article
                className="proof-card"
                initial={prefersReducedMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={cardRise}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                key={item.metric}
              >
                <Trophy size={18} />
                <h3>{item.metric}</h3>
                <p>{item.details}</p>
              </motion.article>
            ))}
          </div>
        </Section>

        <Section id="work" eyebrow="Selected Work" title="Case-led engineering across products, agents, and interfaces.">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {projects.map((project, index) => (
              <motion.article
                className="project-card"
                initial={prefersReducedMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={cardRise}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                key={project.name}
              >
                <span>{project.category}</span>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                {'status' in project && project.status ? <strong>{project.status}</strong> : null}
                <ProjectLinks project={project} />
              </motion.article>
            ))}
          </div>
        </Section>

        <Section id="agent-lab" eyebrow="Agent Lab" title="One interactive map for how the work connects.">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="lab-copy">
              <Blocks size={24} />
              <h3>{activeNode}</h3>
              <p>
                The signature layer links local AI tools, orchestration, product delivery, and
                architecture. It is designed as a useful map, not a decorative tech demo.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {skills.seniorSignals.map((item) => (
                  <span className="skill-pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="agent-map" aria-label="Interactive engineering map">
              <div className="map-core">
                <Rocket size={28} />
                <span>Ship</span>
              </div>
              {agentNodes.map((node) => {
                const Icon = node.icon;
                return (
                  <button
                    className="agent-node"
                    style={{ left: node.x, top: node.y }}
                    onMouseEnter={() => setActiveNode(node.label)}
                    onFocus={() => setActiveNode(node.label)}
                    type="button"
                    key={node.label}
                  >
                    <Icon size={18} />
                    <span>{node.label}</span>
                  </button>
                );
              })}
              <span className="orbit orbit-one" />
              <span className="orbit orbit-two" />
              <span className="sprite sprite-a" />
              <span className="sprite sprite-b" />
              <span className="sprite sprite-c" />
            </div>
          </div>
        </Section>

        <Section id="open-source" eyebrow="Open Source + Product Hunt" title="Signals from the places builders actually look.">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {openSource.map((item) => (
              <article className="ledger-card" key={`${item.repository}-${item.pullRequest}`}>
                <Github size={22} />
                <h3>{item.repository}</h3>
                <p>{item.commitMessage}</p>
                <span>
                  {item.pullRequest} - {item.commitDate}
                </span>
                <a href={item.pullRequestUrl} target="_blank" rel="noreferrer">
                  View PR <ArrowUpRight size={16} />
                </a>
              </article>
            ))}
            <article className="ledger-card accent-card">
              <Rocket size={22} />
              <h3>Product Hunt</h3>
              <p>{productHunt.about}</p>
              <div className="launch-list">
                {productHunt.launches.map((launch) => (
                  <a href={launch.url} target="_blank" rel="noreferrer" key={launch.name}>
                    {launch.name}: {launch.status} <ArrowUpRight size={16} />
                  </a>
                ))}
              </div>
              <a href={productHunt.profile} target="_blank" rel="noreferrer">
                @{productHunt.profile.split('@')[1]} <ArrowUpRight size={16} />
              </a>
            </article>
          </div>
        </Section>

        <Section id="stack" eyebrow="Stack" title="A broad toolkit, organized around outcomes.">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map((group) => (
              <article className="stack-card" key={group.label}>
                <h3>{group.label}</h3>
                <div>
                  {group.items.map((item) => (
                    <span className="skill-pill" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="resume" eyebrow="Resume" title="From early web systems to senior advisory work.">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="timeline">
              {experience.map((job) => (
                <article className="timeline-item" key={`${job.period}-${job.title}`}>
                  <span>{job.period}</span>
                  <h3>{job.title}</h3>
                  <p>{job.details}</p>
                </article>
              ))}
            </div>
            <div className="timeline education">
              {education.map((item) => (
                <article className="timeline-item" key={`${item.period}-${item.degree}`}>
                  <span>{item.period}</span>
                  <h3>{item.degree}</h3>
                  <p>{item.institution}</p>
                </article>
              ))}
            </div>
          </div>
        </Section>

        <Section id="contact" eyebrow="Contact" title="Bring the architecture problem, product ambiguity, or shipping deadline.">
          <div className="contact-panel">
            <div>
              <BriefcaseBusiness size={28} />
              <h3>Remote contract work with Europe and US teams.</h3>
              <p>
                I am strongest where product needs meet engineering systems: React frontends,
                Node/NestJS APIs, automation, performance, and delivery planning.
              </p>
            </div>
            <div className="contact-actions">
              <a className="primary-action" href={`mailto:${profile.email}`}>
                <Mail size={18} />
                Email Serge
              </a>
              <a className="secondary-action" href={linkByLabel.LinkedIn} target="_blank" rel="noreferrer">
                LinkedIn <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ProjectLinks({ project }: { project: (typeof projects)[number] }) {
  const links = [
    'liveUrl' in project && project.liveUrl
      ? { label: 'Open product', url: project.liveUrl }
      : null,
    'productHuntUrl' in project && project.productHuntUrl
      ? { label: 'Product Hunt', url: project.productHuntUrl }
      : null,
    'repoUrl' in project && project.repoUrl ? { label: 'Repository', url: project.repoUrl } : null,
  ].filter(Boolean) as Array<{ label: string; url: string }>;

  if (!links.length) {
    return null;
  }

  return (
    <div className="project-links">
      {links.map((link) => (
        <a href={link.url} target="_blank" rel="noreferrer" key={link.label}>
          {link.label} <ArrowUpRight size={15} />
        </a>
      ))}
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="section-shell" id={id}>
      <div className="section-heading">
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default App;

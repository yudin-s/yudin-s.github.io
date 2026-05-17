import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
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
  X,
} from 'lucide-react';
import {
  commercialProjects,
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
  { label: 'Profile', href: '#proof' },
  { label: 'Experience', href: '#resume' },
  { label: 'Work', href: '#work' },
  { label: 'Open Source', href: '#open-source' },
  { label: 'Capabilities', href: '#stack' },
  { label: 'Tools', href: '#agent-lab' },
  { label: 'Contact', href: '#contact' },
];

const linkByLabel = Object.fromEntries(links.map((link) => [link.label, link.url]));
type CommercialProject = (typeof commercialProjects)[number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const cardRise = {
  hidden: { opacity: 1, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const initialAgentNodes = [
  { label: 'Engineering', icon: BrainCircuit, x: 18, y: 18, draggable: true },
  { label: 'Researching', icon: Sparkles, x: 66, y: 12, draggable: true },
  { label: 'System Design', icon: Network, x: 66, y: 58, draggable: true },
  { label: 'Development', icon: Layers3, x: 28, y: 68, draggable: true },
];

const initialSprites = [
  { id: 'a', x: 0.45, y: 0.18, vx: 0.42, vy: 0.32 },
  { id: 'b', x: 0.74, y: 0.45, vx: -0.36, vy: 0.46 },
  { id: 'c', x: 0.28, y: 0.55, vx: 0.38, vy: -0.4 },
];

function App() {
  const prefersReducedMotion = useReducedMotion();
  const [activeNode, setActiveNode] = useState('Engineering');
  const [selectedCase, setSelectedCase] = useState<CommercialProject | null>(null);
  const [activeSection, setActiveSection] = useState('');
  const [agentNodes, setAgentNodes] = useState(initialAgentNodes);
  const [draggingNode, setDraggingNode] = useState('');
  const mapRef = useRef<HTMLDivElement | null>(null);
  const caseGalleryRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef({ id: '', offsetX: 0, offsetY: 0 });
  const obstaclePositions = useRef(new Map<string, { cx: number; cy: number }>());
  const spriteState = useRef(
    initialSprites.map((sprite) => ({
      ...sprite,
      px: 0,
      py: 0,
      ready: false,
    })),
  );

  useEffect(() => {
    const legacySection = window.location.pathname.split('/').filter(Boolean)[0] ?? '';
    if (['resume', 'portfolio', 'contact'].includes(legacySection)) {
      const id = legacySection === 'portfolio' ? 'work' : legacySection;
      window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    }
  }, []);

  useEffect(() => {
    if (!selectedCase) {
      document.body.style.overflow = '';
      return undefined;
    }

    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedCase(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCase]);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1));
    let frame = 0;
    const requestFrame =
      window.requestAnimationFrame ??
      ((callback: FrameRequestCallback) => window.setTimeout(() => callback(performance.now()), 16));
    const cancelFrame = window.cancelAnimationFrame ?? window.clearTimeout;

    const updateActiveSection = () => {
      const activationLine = Math.min(window.innerHeight * 0.35, 320);
      let current = '';
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= activationLine) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    const handleScroll = () => {
      cancelFrame(frame);
      frame = requestFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      cancelFrame(frame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const skillGroups = useMemo(
    () => [
      { label: 'Core capabilities', items: skills.capabilities },
      { label: 'Backend & Frontend', items: [...skills.backend.slice(0, 4), ...skills.frontend.slice(0, 6)] },
      { label: 'Data & infrastructure', items: [...skills.databases.slice(0, 5), ...skills.devops.slice(0, 5)] },
      { label: 'Product domains', items: skills.domains },
    ],
    [],
  );

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const map = mapRef.current;
    if (!map) return undefined;

    let animationFrame = 0;
    const spriteSize = 12;
    const restitution = 0.86;
    const requestFrame =
      window.requestAnimationFrame ??
      ((callback: FrameRequestCallback) => window.setTimeout(() => callback(performance.now()), 16));
    const cancelFrame = window.cancelAnimationFrame ?? window.clearTimeout;

    const tick = () => {
      const rect = map.getBoundingClientRect();
      const obstacles = [...map.querySelectorAll<HTMLElement>('[data-collider]')].map((node) => {
        const nodeRect = node.getBoundingClientRect();
        const id = node.dataset.collider ?? node.textContent ?? 'collider';
        const cx = nodeRect.left - rect.left + nodeRect.width / 2;
        const cy = nodeRect.top - rect.top + nodeRect.height / 2;
        const previous = obstaclePositions.current.get(id);

        obstaclePositions.current.set(id, { cx, cy });

        return {
          left: nodeRect.left - rect.left,
          right: nodeRect.right - rect.left,
          top: nodeRect.top - rect.top,
          bottom: nodeRect.bottom - rect.top,
          vx: previous ? cx - previous.cx : 0,
          vy: previous ? cy - previous.cy : 0,
        };
      });

      spriteState.current.forEach((sprite) => {
        if (!sprite.ready) {
          sprite.px = rect.width * sprite.x;
          sprite.py = rect.height * sprite.y;
          sprite.ready = true;
        }

        sprite.px += sprite.vx;
        sprite.py += sprite.vy;

        for (const obstacle of obstacles) {
          const spriteRight = sprite.px + spriteSize;
          const spriteBottom = sprite.py + spriteSize;
          const intersects =
            spriteRight > obstacle.left &&
            sprite.px < obstacle.right &&
            spriteBottom > obstacle.top &&
            sprite.py < obstacle.bottom;

          if (!intersects) continue;

          const overlapLeft = spriteRight - obstacle.left;
          const overlapRight = obstacle.right - sprite.px;
          const overlapTop = spriteBottom - obstacle.top;
          const overlapBottom = obstacle.bottom - sprite.py;
          const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

          if (minOverlap === overlapLeft) {
            sprite.px -= overlapLeft;
            sprite.vx = obstacle.vx - Math.max(Math.abs(sprite.vx - obstacle.vx), 0.55) * restitution;
            sprite.vy += obstacle.vy * 0.32;
          } else if (minOverlap === overlapRight) {
            sprite.px += overlapRight;
            sprite.vx = obstacle.vx + Math.max(Math.abs(sprite.vx - obstacle.vx), 0.55) * restitution;
            sprite.vy += obstacle.vy * 0.32;
          } else if (minOverlap === overlapTop) {
            sprite.py -= overlapTop;
            sprite.vy = obstacle.vy - Math.max(Math.abs(sprite.vy - obstacle.vy), 0.55) * restitution;
            sprite.vx += obstacle.vx * 0.32;
          } else {
            sprite.py += overlapBottom;
            sprite.vy = obstacle.vy + Math.max(Math.abs(sprite.vy - obstacle.vy), 0.55) * restitution;
            sprite.vx += obstacle.vx * 0.32;
          }
        }

        if (sprite.px <= 0 || sprite.px >= rect.width - spriteSize) {
          sprite.px = Math.min(Math.max(sprite.px, 0), rect.width - spriteSize);
          sprite.vx *= -restitution;
        }

        if (sprite.py <= 0 || sprite.py >= rect.height - spriteSize) {
          sprite.py = Math.min(Math.max(sprite.py, 0), rect.height - spriteSize);
          sprite.vy *= -restitution;
        }

        const element = map.querySelector<HTMLElement>(`.sprite-${sprite.id}`);
        element?.style.setProperty('--sx', `${sprite.px}px`);
        element?.style.setProperty('--sy', `${sprite.py}px`);
      });

      animationFrame = requestFrame(tick);
    };

    animationFrame = requestFrame(tick);
    return () => cancelFrame(animationFrame);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!draggingNode) return undefined;

    const handlePointerMove = (event: PointerEvent) => {
      const map = mapRef.current;
      const { id, offsetX, offsetY } = dragState.current;
      if (!id || !map) return;

      const rect = map.getBoundingClientRect();
      const nextX = ((event.clientX - rect.left - offsetX) / rect.width) * 100;
      const nextY = ((event.clientY - rect.top - offsetY) / rect.height) * 100;

      setAgentNodes((nodes) =>
        nodes.map((node) =>
          node.label === id
            ? {
                ...node,
                x: Math.min(Math.max(nextX, 14), 86),
                y: Math.min(Math.max(nextY, 10), 90),
              }
            : node,
        ),
      );
    };

    const handlePointerUp = () => {
      dragState.current = { id: '', offsetX: 0, offsetY: 0 };
      setDraggingNode('');
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [draggingNode]);

  const handleNodePointerDown = (event: ReactPointerEvent<HTMLButtonElement>, label: string) => {
    const node = agentNodes.find((item) => item.label === label);
    const map = mapRef.current;
    if (!node?.draggable || !map) return;

    const rect = map.getBoundingClientRect();
    dragState.current = {
      id: label,
      offsetX: event.clientX - (rect.left + (node.x / 100) * rect.width),
      offsetY: event.clientY - (rect.top + (node.y / 100) * rect.height),
    };
    setDraggingNode(label);
    setActiveNode(label);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleNodePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const map = mapRef.current;
    const { id, offsetX, offsetY } = dragState.current;
    if (!id || !map) return;

    const rect = map.getBoundingClientRect();
    const nextX = ((event.clientX - rect.left - offsetX) / rect.width) * 100;
    const nextY = ((event.clientY - rect.top - offsetY) / rect.height) * 100;

    setAgentNodes((nodes) =>
      nodes.map((node) =>
        node.label === id
          ? {
              ...node,
              x: Math.min(Math.max(nextX, 14), 86),
              y: Math.min(Math.max(nextY, 10), 90),
            }
          : node,
      ),
    );
  };

  const handleNodePointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (dragState.current.id) {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        // Pointer capture can already be gone when the browser finishes a drag gesture.
      }
    }
    dragState.current = { id: '', offsetX: 0, offsetY: 0 };
    setDraggingNode('');
  };

  const scrollCaseGallery = (direction: number) => {
    const gallery = caseGalleryRef.current;
    const card = gallery?.querySelector<HTMLElement>('.case-card');
    if (!gallery || !card) return;

    const cardWidth = card.getBoundingClientRect().width;
    const gap = Number.parseFloat(window.getComputedStyle(gallery).columnGap || '0');
    gallery.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

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
              {profile.role}
            </span>
          </a>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                className={`nav-link ${activeSection === item.href.slice(1) ? 'active' : ''}`}
                href={item.href}
                aria-current={activeSection === item.href.slice(1) ? 'true' : undefined}
                key={item.href}
              >
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
                  Flexible remote work
                </span>
                <span className="status-chip muted">Backend & Frontend</span>
              </div>
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-normal text-white sm:text-6xl lg:text-7xl">
                Senior Backend & Frontend Engineer with 16+ years in web development.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
                {profile.tagline} I work across architecture, backend systems, frontend interfaces,
                performance, and delivery planning.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400">
                {profile.specialization} {profile.availability}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a className="primary-action" href="#contact">
                  Contact me <ArrowUpRight size={18} />
                </a>
                <a className="secondary-action" href={linkByLabel.LinkedIn} target="_blank" rel="noreferrer">
                  LinkedIn <ArrowUpRight size={18} />
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
                <span>profile.card</span>
                <span>2026</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-[0.85fr_1.15fr]">
                <div className="portrait-frame">
                  <img src="/images/profile-2026-likeness.png" alt="Serge Yudin" />
                </div>
                <div className="space-y-3">
                  <Metric label="Experience" value={profile.experienceYears} />
                  <Metric label="Upwork" value="Top Rated Plus" />
                  <Metric label="Open source" value="Contributor" />
                  <Metric label="Focus" value="Backend & Frontend" />
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {['Architecture', 'Delivery', 'Review'].map((item) => (
                  <div className="micro-card" key={item}>
                    <BadgeCheck size={16} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <Section id="proof" eyebrow="Profile" title="Senior engineering background in production web products.">
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

        <Section id="resume" eyebrow="Experience" title="Recent senior roles and long-term engineering background.">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="timeline">
              {experience.map((job) => (
                <article className="timeline-item" key={`${job.period}-${job.title}`}>
                  <span>{job.period}</span>
                  <small>{job.engagement}</small>
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

        <Section id="work" eyebrow="Commercial Work" title="Commercial portfolio restored from client projects.">
          <div className="case-slider-controls" aria-label="Commercial work slider controls">
            <button type="button" onClick={() => scrollCaseGallery(-1)} aria-label="Previous commercial work">
              <ArrowLeft size={17} />
            </button>
            <button type="button" onClick={() => scrollCaseGallery(1)} aria-label="Next commercial work">
              <ArrowRight size={17} />
            </button>
          </div>
          <div className="case-gallery" ref={caseGalleryRef}>
            {commercialProjects.map((project, index) => (
              <motion.article
                className="case-card"
                initial={prefersReducedMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={cardRise}
                transition={{ duration: 0.45, delay: index * 0.025 }}
                key={project.name}
              >
                <button
                  className="case-shot"
                  onClick={() => setSelectedCase(project)}
                  type="button"
                  aria-label={`Open ${project.name} preview`}
                >
                  <img
                    src={project.image}
                    alt={`${project.name} screenshot`}
                    loading={index < 6 ? 'eager' : 'lazy'}
                  />
                </button>
                <div className="case-card-body">
                  <span>{project.category}</span>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="case-tags">
                    {project.tags.map((tag) => (
                      <em key={tag}>{tag}</em>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="subsection-heading">
            <span>Recent products and tools</span>
            <h3>Current side projects kept separate from commercial CV evidence.</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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

        <Section id="open-source" eyebrow="Open Source" title="Selected accepted PRs in NestJS and Tailwind CSS.">
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
              <h3>Maker Profile</h3>
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

        <Section id="stack" eyebrow="Capabilities" title="Backend, frontend, delivery, and product experience.">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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

        <Section id="agent-lab" eyebrow="Tools" title="Local tooling and engineering experiments.">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="lab-copy">
              <Blocks size={24} />
              <h3>{activeNode}</h3>
              <p>
                Recent side projects explore local agents, voice workflows, PR analysis, and
                delivery tooling. This is additional engineering context, not the main CV headline.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {skills.seniorSignals.map((item) => (
                  <span className="skill-pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="agent-map" aria-label="Interactive engineering map" ref={mapRef}>
              <div className="map-core" data-collider="Build">
                <Rocket size={28} />
                <span>Build</span>
              </div>
              {agentNodes.map((node) => {
                const Icon = node.icon;
                return (
                  <button
                    className={`agent-node ${node.draggable ? 'is-draggable' : ''} ${
                      draggingNode === node.label ? 'is-dragging' : ''
                    }`}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    onMouseEnter={() => setActiveNode(node.label)}
                    onFocus={() => setActiveNode(node.label)}
                    onPointerDown={(event) => handleNodePointerDown(event, node.label)}
                    onPointerMove={handleNodePointerMove}
                    onPointerUp={handleNodePointerUp}
                    onPointerCancel={handleNodePointerUp}
                    data-collider={node.label}
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

        <Section id="contact" eyebrow="Contact" title="Available for senior backend and frontend work.">
          <div className="contact-panel">
            <div>
              <BriefcaseBusiness size={28} />
              <h3>Remote contract work with Europe and US teams.</h3>
              <p>
                I am strongest on production web products: backend systems, frontend interfaces,
                architecture reviews, performance, and delivery planning.
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
      {selectedCase ? (
        <PortfolioModal project={selectedCase} onClose={() => setSelectedCase(null)} />
      ) : null}
    </div>
  );
}

function PortfolioModal({ project, onClose }: { project: CommercialProject; onClose: () => void }) {
  return (
    <div className="portfolio-modal" role="dialog" aria-modal="true" aria-labelledby="portfolio-modal-title">
      <button className="modal-backdrop" type="button" onClick={onClose} aria-label="Close preview" />
      <motion.div
        className="modal-panel"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        <div className="modal-topbar">
          <span>portfolio.preview</span>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Close preview">
            <X size={18} />
          </button>
        </div>
        <div className="modal-content">
          <div className="modal-image-wrap">
            <img src={project.image} alt={`${project.name} screenshot`} />
          </div>
          <div className="modal-copy">
            <span>{project.category}</span>
            <h3 id="portfolio-modal-title">{project.name}</h3>
            <p>{project.description}</p>
            <div className="case-tags">
              {project.tags.map((tag) => (
                <em key={tag}>{tag}</em>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
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

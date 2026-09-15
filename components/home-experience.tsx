"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Menu,
  Plus,
  X,
} from "lucide-react";
import { projects as allProjects, type Project } from "@/data/projects";

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

function ProjectMedia({ project, secondary = false }: { project: Project; secondary?: boolean }) {
  const media = secondary ? project.secondaryMedia : undefined;
  const image = secondary ? undefined : project.mediaImage;
  const label = media?.label ?? project.mediaLabel;
  const caption = media?.caption ?? project.mediaCaption;
  const ratio = media?.ratio ?? "16:10";
  const isPortrait = ratio === "9:16";

  return (
    <div
      className={["project-media", secondary ? "project-media--secondary" : "", isPortrait ? "project-media--portrait" : "", image ? "project-media--image" : ""].filter(Boolean).join(" ")}
      style={{ "--accent-a": project.palette[0], "--accent-b": project.palette[1] } as React.CSSProperties}
      aria-label={label}
    >
      {image ? (
        <img className="project-media-art" src={assetPath(image.src)} alt={image.alt} />
      ) : (
        <>
          <div className="media-grid" />
          <div className="media-orbit media-orbit--one" />
          <div className="media-orbit media-orbit--two" />
          <div className="media-topline">
            <span>{project.number}</span>
            <span>{ratio}</span>
          </div>
          <div className="media-center">
            <span className="media-kicker">MEDIA PLACEHOLDER</span>
            <strong>{label}</strong>
            <span>{caption}</span>
          </div>
          <div className="media-bottomline">
            <span>IMAGE PREPARING</span>
            <span className="media-dot" />
          </div>
        </>
      )}
    </div>
  );
}

function Sidebar({
  activeId,
  onNavigate,
}: {
  activeId: string;
  onNavigate: () => void;
}) {
  return (
    <aside className="sidebar" aria-label="Навигация по проектам">
      <div className="sidebar-top">
        <a className="brand-lockup" href="#intro" onClick={onNavigate}>
          <span className="brand-name">толк+юсайт</span>
          <span className="brand-product">Наши идеи</span>
          <span className="brand-label">Product Lab</span>
        </a>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-system">
          <a className={activeId === "intro" ? "is-active" : ""} href="#intro" onClick={onNavigate}>
            <span>Введение</span>
            <ChevronRight size={14} aria-hidden="true" />
          </a>
          <a className={activeId === "index" ? "is-active" : ""} href="#index" onClick={onNavigate}>
            <span>Все проекты</span>
            <span className="nav-count">17</span>
          </a>
        </div>
        <div className="nav-group nav-group--ordered">
          <span className="nav-group-label">ПО ПОРЯДКУ</span>
          {allProjects.map((project) => (
            <a
              className={activeId === project.id ? "is-active" : ""}
              href={"#" + project.id}
              key={project.id}
              onClick={onNavigate}
            >
              <span className="nav-project-number">{project.number}</span>
              <span>{project.title}</span>
            </a>
          ))}
        </div>      </nav>

      <div className="sidebar-bottom">
        <span className="status-mark" />
        <span>идеи в работе</span>
      </div>
    </aside>
  );
}

function MobileNavigation({
  open,
  activeId,
  onClose,
}: {
  open: boolean;
  activeId: string;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="mobile-sheet" role="dialog" aria-modal="true" aria-label="Список проектов">
      <div className="mobile-sheet-head">
        <span>Все идеи</span>
        <button type="button" onClick={onClose} aria-label="Закрыть меню">
          <X size={22} />
        </button>
      </div>
      <div className="mobile-sheet-list">
        {allProjects.map((project) => (
          <a
            className={activeId === project.id ? "is-active" : ""}
            href={`#${project.id}`}
            key={project.id}
            onClick={onClose}
          >
            <span>{project.number}</span>
            <strong>{project.title}</strong>
            <ChevronRight size={18} aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
}

function LayoutMedia({ project }: { project: Project }) {
  if (project.layout === "system" && project.secondaryMedia) {
    return (
      <div className="media-pair">
        <ProjectMedia project={project} />
        <ProjectMedia project={project} secondary />
      </div>
    );
  }
  return <ProjectMedia project={project} />;
}

function ProjectSection({ project }: { project: Project }) {
  const sectionClass = `project-section project-section--${project.theme} project-section--${project.layout}`;
  return (
    <section
      className={sectionClass}
      id={project.id}
      data-project-id={project.id}
      aria-labelledby={`${project.id}-title`}
    >
      <div className="project-shell">
        <div className="project-heading">
          <div className="project-meta">
            <span>{project.number} / 17</span>
            <span>{project.category}</span>
            {project.stage === "working-version" ? <span className="stage-pill">рабочая версия</span> : null}
          </div>
          <h2 id={`${project.id}-title`}>{project.title}</h2>
          <p className="project-oneliner">{project.oneLiner}</p>
          {project.statusNote ? (
            <div className="project-status">
              {project.statusNote.map((status) => (
                <span key={status}>
                  <Check size={14} aria-hidden="true" />
                  {status}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="project-visual">
          <LayoutMedia project={project} />
        </div>

        <div className="project-copy">
          <div className="project-description">
            {project.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="project-highlights">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          {project.links?.length ? (
            <nav className="project-links" aria-label={project.title}>
              <span className="project-links-label">Материалы</span>
              <div className="project-links-list">
                {project.links.map((link) => (
                  <a href={link.url} key={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </nav>
          ) : null}
          <p className="project-fact">{project.smallFact}</p>
        </div>
      </div>
    </section>
  );
}

const projectsById = new Map(allProjects.map((project) => [project.id, project]));

export function HomeExperience({ projects }: { projects: Project[] }) {
  const [activeId, setActiveId] = useState("intro");
  const [menuOpen, setMenuOpen] = useState(false);
  const projectCount = projects.length;
  const sections = useMemo(() => ["intro", "manifesto", "index", ...projects.map((project) => project.id), "closing"], [projects]);

  useEffect(() => {
    const observed = Array.from(document.querySelectorAll<HTMLElement>("[data-project-id], [data-page-section]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = visible.target.getAttribute("data-project-id") ?? visible.target.id;
          setActiveId(id);
        }
      },
      { rootMargin: "-28% 0px -58%", threshold: [0.1, 0.3, 0.65] },
    );
    observed.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.dataset.menuOpen = menuOpen ? "true" : "false";
    return () => {
      delete document.body.dataset.menuOpen;
    };
  }, [menuOpen]);

  return (
    <div className="site-shell">
      <Sidebar activeId={activeId} onNavigate={() => setActiveId("intro")} />
      <header className="mobile-topbar">
        <a href="#intro" className="mobile-brand">
          <span>толк+юсайт</span>
          <span>Наши идеи</span>
        </a>
        <button type="button" onClick={() => setMenuOpen(true)} aria-label="Открыть список проектов">
          <span>Проекты</span>
          <Menu size={18} aria-hidden="true" />
        </button>
      </header>
      <MobileNavigation open={menuOpen} activeId={activeId} onClose={() => setMenuOpen(false)} />

      <main className="main-content">
        <section className="hero section-light" id="intro" data-page-section aria-labelledby="hero-title">
          <div className="hero-content">
            <span className="eyebrow">толк+юсайт / PRODUCT LAB</span>
            <h1 id="hero-title">Наши идеи<span>.</span></h1>
            <p className="hero-lead">
              Продукты, сервисы и системы, которые мы придумываем, исследуем и превращаем в прототипы, пилоты и работающие решения.
            </p>
            <div className="hero-foot">
              <span>{projectCount} проектов</span>
              <a href="#index" className="text-link">
                Смотреть проекты <ArrowDownRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="hero-media" aria-label="толк+юсайт / наши идеи / product lab visual">
            <div className="hero-media-image">
              <img
                className="hero-media-image-art"
                src={assetPath("/images/hero-product-lab.png")}
                alt="Абстрактная композиция о том, как идея превращается в продукт"
              />
              <div className="hero-media-shade" aria-hidden="true" />
              <div className="hero-media-copy">
                <span>толк+юсайт</span>
                <strong>Идеи становятся реальностью.</strong>
                <span>PRODUCT LAB VISUAL / 16:10</span>
              </div>
            </div>
          </div>
          <span className="scroll-helper">Листайте ниже <ArrowDownRight size={15} /></span>
        </section>

        <section className="manifesto section-dark" id="manifesto" data-page-section aria-labelledby="manifesto-title">
          <div className="manifesto-inner">
            <span className="eyebrow">02 / MANIFESTO</span>
            <h2 id="manifesto-title">
              <span>Не каждая идея</span>
              <span>должна сразу</span>
              <span className="muted-line">становиться компанией.</span>
            </h2>
            <div className="manifesto-visual">
              <img
                src={assetPath("/images/manifesto-system.png")}
                alt="Абстрактная схема, в которой идея собирается в ясную систему"
              />
              <div className="manifesto-visual-meta" aria-hidden="true">
                <span>IDEA → SYSTEM</span>
                <span>толк+юсайт / 02</span>
              </div>
            </div>
            <div className="manifesto-bottom">
              <p>
                Мы исследуем тему, собираем логику продукта, проектируем пользовательский путь, делаем прототипы и проверяем, есть ли у идеи право жить дальше.
              </p>
              <span>люди / технологии / смысл</span>
            </div>
          </div>
        </section>

        <section className="portfolio-index section-light" id="index" data-page-section aria-labelledby="index-title">
          <div className="index-intro">
            <span className="eyebrow">03 / PRODUCT INDEX</span>
            <h2 id="index-title">От человеческих сервисов до сложных B2B-систем.</h2>
          </div>
          <div className="index-count">
            <strong>{projectCount}</strong>
            <span>продуктовых<br />концепций</span>
          </div>
          <div className="index-footer">
            <p>
              Внутри — идеи, исследования, прототипы и развиваемые продукты. Они находятся на разной стадии проработки, поэтому сайт не пытается представить их одинаково.
            </p>
            <div className="index-tags">
              <span>Idea</span><span>Research</span><span>Prototype</span><span>MVP</span><span>Development</span>
            </div>
          </div>
        </section>

        <div className="project-list">
          {projects.map((project) => <ProjectSection key={project.id} project={project} />)}
        </div>

        <section className="closing section-light" id="closing" data-page-section aria-labelledby="closing-title">
          <div className="closing-copy">
            <span className="eyebrow">толк+юсайт / PRODUCT LAB</span>
            <h2 id="closing-title">Идей всегда больше, чем места на сайте.</h2>
            <p>
              Этот список не финальный. Некоторые продукты меняются по мере исследования, некоторые объединяются с другими направлениями, а некоторые остаются полезным экспериментом.
            </p>
            <a href="#intro" className="button-link">
              Наверх <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="closing-mark" aria-hidden="true">
            <Plus size={80} strokeWidth={1} />
            <span>сделано с толком</span>
          </div>
        </section>

        <footer className="footer section-dark">
          <div>
            <strong>толк+юсайт</strong>
            <span>Наши идеи / Product Lab</span>
          </div>
          <span>{new Date().getFullYear()}</span>
        </footer>
      </main>
    </div>
  );
}


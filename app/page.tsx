const programs = [
  { number: "01", title: "Process clarity", text: "Make the work visible. Map the handoffs, uncover the friction, and find the right place to begin.", tag: "FOUNDATIONS" },
  { number: "02", title: "Lean improvement", text: "Give teams practical tools to reduce waste, solve root causes, and improve the work that matters.", tag: "PRACTICE" },
  { number: "03", title: "Change that lasts", text: "Turn a good workshop into a shared operating rhythm—with owners, measures, and a next step.", tag: "SUSTAINABILITY" },
]

const steps = [
  { n: "01", title: "See the system", text: "Understand how work really flows—not just how the org chart says it should." },
  { n: "02", title: "Solve together", text: "Bring the people closest to the work into a focused, facilitated session." },
  { n: "03", title: "Make it stick", text: "Leave with a practical experiment, a clear owner, and a way to measure progress." },
]

export default function Page() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Seminar Business Process home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>SEMINAR<span className="brand-light"> / BUSINESS PROCESS</span></span>
        </a>
        <nav aria-label="Main navigation" className="main-nav">
          <a href="#approach">Our approach</a><a href="#programs">Seminars</a><a href="#about">About</a>
        </nav>
        <a className="nav-cta" href="mailto:hello@seminarbusinessprocess.com">Let&apos;s talk <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> BETTER WORK, BY DESIGN</p>
          <h1>Make work<br />work <em>better.</em></h1>
          <p className="hero-description">Practical seminars for people ready to make business processes clearer, calmer, and more effective.</p>
          <div className="hero-actions"><a className="button-primary" href="#programs">Explore our seminars <span aria-hidden="true">↗</span></a><a className="text-link" href="#approach">How we work <span aria-hidden="true">↓</span></a></div>
          <div className="hero-note"><span className="note-dot" /> Built around your real work, your people, and what comes next.</div>
        </div>
        <div className="hero-art" aria-label="Abstract diagram illustrating a connected business process" role="img">
          <div className="art-grid" />
          <div className="art-kicker">A BETTER WAY OF WORKING <span>01 — 03</span></div>
          <div className="process-map">
            <div className="map-line line-a" /><div className="map-line line-b" /><div className="map-line line-c" />
            <div className="map-node node-one"><span className="node-number">01</span><strong>Notice</strong><small>Understand the work</small></div>
            <div className="map-node node-two"><span className="node-number">02</span><strong>Improve</strong><small>Find the opportunity</small></div>
            <div className="map-node node-three"><span className="node-number">03</span><strong>Embed</strong><small>Make progress last</small></div>
            <div className="map-center"><span className="center-ring" /><span className="center-label">THE<br />PROCESS</span></div>
            <span className="orbit orbit-one" /><span className="orbit orbit-two" />
          </div>
          <div className="art-caption"><span>PEOPLE FIRST.</span><span>PROCESS ALWAYS.</span></div>
        </div>
        <div className="hero-index"><span>01</span><span className="index-rule" /> A MORE HUMAN APPROACH TO PROCESS</div>
      </section>

      <section className="intro-band" id="about">
        <p className="section-label">THE OPPORTUNITY</p>
        <div><h2>Good process isn&apos;t red tape.<br /><em>It&apos;s room to do great work.</em></h2><p className="intro-copy">When the way work gets done is clear, people spend less time navigating friction—and more time creating value. We help teams see the difference they can make.</p></div>
        <div className="intro-stat"><strong>Make it<br /><em>make sense.</em></strong><span>Practical thinking. Real-world tools. Progress you can feel.</span></div>
      </section>

      <section className="approach-section" id="approach">
        <div className="section-heading"><div><p className="section-label">A SIMPLE, HUMAN METHOD</p><h2>From tangled to <em>thoughtful.</em></h2></div><p>Change the process by understanding the people inside it.</p></div>
        <div className="steps-grid">{steps.map((step) => <article className="step-card" key={step.n}><span className="step-number">{step.n}</span><div className="step-icon" aria-hidden="true">{step.n === "01" ? "⌕" : step.n === "02" ? "↗" : "◎"}</div><h3>{step.title}</h3><p>{step.text}</p><span className="step-arrow" aria-hidden="true">↗</span></article>)}</div>
      </section>

      <section className="programs-section" id="programs">
        <div className="programs-top"><div><p className="section-label">LEARN BY DOING</p><h2>Seminars that move<br />the work <em>forward.</em></h2></div><p>Focused sessions, tailored to your context. Take away more than notes—leave with a plan you can put to work the very next day.</p></div>
        <div className="program-list">{programs.map((program) => <article className="program-row" key={program.number}><span className="program-number">{program.number}</span><div className="program-main"><span className="program-tag">{program.tag}</span><h3>{program.title}</h3></div><p>{program.text}</p><a href="mailto:hello@seminarbusinessprocess.com" aria-label={`Ask about ${program.title}`} className="program-link">↗</a></article>)}</div>
        <div className="programs-foot"><span>NOT SURE WHERE TO START?</span><a href="mailto:hello@seminarbusinessprocess.com">Tell us what you&apos;re working through <span aria-hidden="true">↗</span></a></div>
      </section>

      <section className="closing-cta"><div className="closing-orbit" aria-hidden="true"><span /><span /><span /></div><p className="section-label">YOUR NEXT STEP</p><h2>Ready for a better<br />way to <em>work?</em></h2><p>Start with a conversation. We&apos;ll help you find the right place to begin.</p><a className="button-light" href="mailto:hello@seminarbusinessprocess.com">Start a conversation <span aria-hidden="true">↗</span></a></section>

      <footer className="site-footer"><a className="brand footer-brand" href="#top"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>SEMINAR<span className="brand-light"> / BUSINESS PROCESS</span></span></a><span>Practical process improvement, for people.</span><a href="mailto:hello@seminarbusinessprocess.com">Get in touch ↗</a><span className="copyright">© {new Date().getFullYear()} Seminar Business Process</span></footer>
    </main>
  )
}

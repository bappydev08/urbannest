import Reveal from "../components/Reveal.jsx";

export default function About() {
  return (
    <div className="content-page">
      <div className="content-page__grid">
        <Reveal>
          <p className="eyebrow">About Velvetique</p>
          <h1>Beauty, made to feel like you.</h1>
          <p className="content-page__lead">Velvetique Beauty is a considered edit of everyday beauty essentials, bringing together skincare, makeup and self-care in one place.</p>
          <p>Explore thoughtful formulas, easy-to-love textures and little details that make your daily routine feel special. Our goal is simple: help you find the products that fit your own rhythm and style.</p>
        </Reveal>
        <Reveal delay={0.12}><img src="/assets/about-lifestyle.jpg" alt="Velvetique Beauty skincare collection" /></Reveal>
      </div>
      <div className="about-values"><div><strong>01</strong><span>Everyday essentials</span></div><div><strong>02</strong><span>Thoughtful selection</span></div><div><strong>03</strong><span>Beauty for your routine</span></div></div>
    </div>
  );
}

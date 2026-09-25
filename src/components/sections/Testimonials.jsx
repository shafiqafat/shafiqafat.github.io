// TESTIMONIALS — inspiration: Monod stacked cards that shift on scroll to
// reveal the next testimonial.
const TESTIMONIALS = [
  { quote: 'Placeholder testimonial one.', author: 'Client Name, Role' },
  { quote: 'Placeholder testimonial two.', author: 'Client Name, Role' },
];

function Testimonials() {
  return (
    <section id="testimonials" className="section testimonials">
      <span className="placeholder-tag">08 · Testimonials</span>
      <h2>What people say</h2>
      <div className="testimonials__stack-placeholder">
        {TESTIMONIALS.map((t) => (
          <blockquote key={t.author}>
            <p>{t.quote}</p>
            <cite>{t.author}</cite>
          </blockquote>
        ))}
      </div>
      <p className="section-inspo-note">
        TODO: stacked card scroll reveal — each card pinned briefly, next
        card slides up over it (Monod reference).
      </p>
    </section>
  );
}

export default Testimonials;

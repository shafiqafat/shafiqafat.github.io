// GALLERY — inspiration: Kai Marlow's rotating cylindrical image ring.
// Images sit around a circle via rotateY + translateZ; the whole ring
// spins slowly and continuously, and pauses on hover so it's actually
// possible to look at any one image.
// Photos are stock placeholders (picsum.photos) — swap for real
// brand/UI shots once you have them; keep the aspect ratio close to
// 3:4 so the ring geometry still reads cleanly.
import './Gallery.css';

const IMAGES = [
  'https://picsum.photos/id/1015/480/640',
  'https://picsum.photos/id/1043/480/640',
  'https://picsum.photos/id/1050/480/640',
  'https://picsum.photos/id/1025/480/640',
  'https://picsum.photos/id/1074/480/640',
  'https://picsum.photos/id/1035/480/640',
];

function Gallery() {
  const total = IMAGES.length;

  return (
    <section id="gallery" className="section gallery">
      <p className="section__eyebrow">Gallery</p>
      <h2>Visual showcase</h2>

      <div className="gallery__stage">
        <div className="gallery__ring">
          {IMAGES.map((src, i) => {
            const angle = (360 / total) * i;
            return (
              <div
                key={src}
                className="gallery__item"
                style={{ transform: `rotateY(${angle}deg) translateZ(var(--gallery-radius))` }}
              >
                <img src={src} alt="" loading="lazy" />
              </div>
            );
          })}
        </div>
      </div>

      <p className="section-inspo-note">
        Hover to pause the ring. Swap in real work once you have shots ready.
      </p>
    </section>
  );
}

export default Gallery;

import "./Gallery.css";

const IMAGES = [
  "https://picsum.photos/id/1015/600/450",
  "https://picsum.photos/id/1043/600/450",
  "https://picsum.photos/id/1050/600/450",
  "https://picsum.photos/id/1025/600/450",
  "https://picsum.photos/id/1074/600/450",
  "https://picsum.photos/id/1035/600/450",
  "https://picsum.photos/id/1020/600/450",
  "https://picsum.photos/id/1011/600/450",
  "https://picsum.photos/id/1012/600/450",
  "https://picsum.photos/id/1016/600/450",
  "https://picsum.photos/id/1018/600/450",
  "https://picsum.photos/id/1024/600/450",
];

function Gallery() {
  return (
    <section id="gallery" className="gallery">
      <div className="gallery__stage">
        <div className="gallery__ring">
          {IMAGES.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className={`gallery__card gallery__card--${index + 1}`}
            >
              <img
                src={src}
                alt={`Gallery image ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}

          <div className="gallery__center">
            <span className="gallery__logo">◢</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;

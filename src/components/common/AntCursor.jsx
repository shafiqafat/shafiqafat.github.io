// PERSISTENT EASTER EGG — inspiration: Ruhi Pro's uncatchable ant
// TODO: fixed-position element, distance-based repulsion from cursor,
// clamp position to viewport bounds so it's always visible.
// Placeholder renders a static dot in the corner so its presence is tracked
// in the skeleton; real movement logic comes in the interaction pass.
import './AntCursor.css';

function AntCursor() {
  return (
    <div className="ant-cursor" aria-hidden="true" title="ant placeholder — will be interactive">
      🐜
    </div>
  );
}

export default AntCursor;

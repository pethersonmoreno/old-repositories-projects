import React, { useCallback, useState } from 'react';
import './Bubble.css';

function Bubble() {
  const [on, setOn] = useState(false);
  const onItem = useCallback(() => {
    setOn(true);
  }, []);
  const onOutItem = useCallback(() => {
    setOn(false);
  }, []);

  return (
    <div className="bubble" onMouseOver={onItem} onMouseOut={onOutItem} onFocus={onItem} onBlur={onOutItem}>
      {!on && <span className="--default">Hello</span>}
      {on && <span className="--mouse-over">Github</span>}
    </div>
  );
}

export default Bubble;

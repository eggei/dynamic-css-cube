import React from 'react';
import './styles.scss';

type Props = {
  rotateX?: number;
  rotateY?: number;
  dimensions: { w: number; h: number; d: number };
  style?: React.CSSProperties;
};

export const CubeScene = ({ children }) => {
  return (
    <div
      className="scene"
      style={{ perspective: 500, transform: 'scale(0.5)' }}
    >
      {children}
    </div>
  );
};

export const Cube = ({
  rotateX = 0,
  rotateY = -40,
  dimensions: { w, h, d },
  style
}: Props) => {
  let faces = ['front', 'back', 'top', 'bottom', 'right', 'left'];
  return (
    <div
      className="box"
      style={{
        '--box-width': (w || 300) + 'px',
        '--box-height': (h || 300) + 'px',
        '--box-depth': (d || 300) + 'px',
        transform: `rotateY(${rotateX}deg) rotateX(${rotateY}deg) translate3d(0, 0, calc(var(--box-depth) /2))`,
        ...style
      }}
    >
      {faces.map(face => (
        <div className={face + ' face'} />
      ))}
    </div>
  );
};

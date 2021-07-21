import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { TargetSVG } from './TargetSVG';

const Coord = styled.div`
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  background: rgb(62, 83, 118);
  position: relative;
  z-index: 1;
  pointer-evets: none;
  border-radius: 10px;
  cursor: all-scroll;
`;

const XAxis = styled.div`
  width: 100%;
  position: absolute;
  height: 1px;
  background: rgba(0, 0, 0, 0.2);
  top: 50%;
  pointer-events: none;
`;

const YAxis = styled(XAxis)`
  width: 1px;
  height: 100%;
  top: 0;
  left: 50%;
  pointer-events: none;
`;

const Dot = styled.div`
  position: absolute;
  pointer-events: none;
`;

type Props = {
  size?: number;
  onChange: () => void;
  initCoord: { x: number; y: number };
};

export const CoordinateInput = ({
  size = 200,
  onChange,
  initCoord = { x: 0.5, y: 0.5 }
}: Props) => {
  const coordRef = useRef();
  const [{ top, left }, setClientRect] = useState({});

  const [x, setX] = useState((initCoord.x + 0.5) * size);
  const [y, setY] = useState((initCoord.y + 0.5) * size);

  useEffect(() => {
    onChange({
      x: Number((x / size - 0.5).toFixed(2)),
      y: Number((y / size - 0.5).toFixed(2))
    });
  }, [x, y]);

  const [_moveable, _setMoveable] = useState(false);
  const moveable = useRef(_moveable);

  const setMoveable = v => {
    moveable.current = v;
    _setMoveable(v);
  };

  function handleMove(e) {
    let moveX, moveY;
    moveX = e.pageX - left;
    moveY = e.pageY - top;

    if (moveable.current) {
      if (moveX >= 0 && moveX <= size) {
        setX(moveX);
      } else if (moveX <= 0) {
        setX(0);
      } else if (moveX > size) {
        setX(size);
      }

      if (moveY >= 0 && moveY <= size) {
        setY(moveY);
      } else if (moveY <= 0) {
        setY(0);
      } else if (moveY > size) {
        setY(size);
      }
    }
  }
  const enable = e => {
    e.stopPropagation();
    setX(e.offsetX);
    setY(e.offsetY);
    setMoveable(true);
  };
  const disable = e => {
    e.stopPropagation();
    setMoveable(false);
  };

  useEffect(() => {
    if (coordRef.current) {
      coordRef.current.addEventListener('mousedown', enable);
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', disable);
      setClientRect(coordRef.current.getBoundingClientRect());
    }
    return () => {
      coordRef.current.removeEventListener('mousedown', enable);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', disable);
    };
  }, [coordRef.current]);

  return (
    <div
      style={{
        width: '100%',
        display: 'grid',
        justifyContent: 'center'
      }}
    >
      <Coord ref={coordRef} size={size}>
        <XAxis />
        <YAxis />

        <Dot style={{ top: y, left: x }}>
          <TargetSVG size={size * 0.15} color={'rgb(87,232,150)'} />
        </Dot>
      </Coord>
    </div>
  );
};

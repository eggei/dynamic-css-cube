import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { CoordinateInput } from './CoordinateInput';
import { Cube, CubeScene } from './Cube';

const App = () => {
  const [coord, setCoord] = useState({});
  const initCoord = { x: 0, y: 0 };
  const initialDimensions = { w: 100, h: 100, d: 100 };
  const [selected, setSelected] = useState(initialDimensions);
  const cubeConfig = {
    rotateX: coord.x * 180,
    rotateY: coord.y * 180,
    dimensions: selected,
    style: { margin: 16 }
  };
  return (
    <>
      <div
        style={{
          padding: 40,
          position: 'relative',
          width: 'fit-content',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: 32
        }}
      >
        <CoordinateInput size={150} onChange={setCoord} initCoord={initCoord} />
        <div>
          <p style={{ fontFamily: 'monospace' }}>
            Change the angle of the box with the coordinate input on the left{' '}
          </p>
          <pre>
            {JSON.stringify(coord)
              .replace(/({|}|")/g, '')
              .replace(',', ' ')}
          </pre>
          <button
            onClick={() => {
              setCoord(initCoord);
              setSelected(initialDimensions);
            }}
          >
            reset
          </button>

          {['width', 'height', 'depth'].map(label => (
            <div>
              {label}:
              <input
                type="range"
                name={label[0]}
                value={selected[label[0]]}
                min="1"
                max="1000"
                onChange={e =>
                  setSelected({
                    ...selected,
                    [e.target.name]: e.target.value
                  })
                }
              />{' '}
              {selected[label[0]]}px
            </div>
          ))}
        </div>
      </div>
      <CubeScene>
        <div style={{ display: 'flex' }}>
          <div>
            {new Array(3).fill(null).map((_, i) => (
              <Cube key={i} {...cubeConfig} />
            ))}
          </div>
          <div>
            {new Array(3).fill(null).map((_, i) => (
              <Cube key={i} {...cubeConfig} />
            ))}
          </div>
          <div>
            {new Array(3).fill(null).map((_, i) => (
              <Cube key={i} {...cubeConfig} />
            ))}
          </div>
        </div>
      </CubeScene>
    </>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));

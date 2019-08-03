import * as React from 'react';
import { render } from 'react-dom';

import VirtualTree from './FlatTree/VirtualTree';
import './index.css';
import { data as originalNodes } from './randomData';
// import { data as originalNodes } from './customData';

const App = () => (
  <div>
    <h2>Start editing to see some magic dadt</h2>

    <VirtualTree nodes={originalNodes}>
      {({ style, node, index, expandOrCollapse }) => {
        return (
          <div style={style}>
            <div
              style={{
                overflow: 'auto',
                boxShadow: 'inset 0 0 3px red',
                padding: '3px'
              }}
            >
              <p
                style={{
                  paddingLeft: node.nesting * 20 + 'px',
                  width: '680px',
                  float: 'left',
                  background: 'yellow'
                }}
              >
                {node.hasChildren ? (
                  <button
                    onClick={() => {
                      expandOrCollapse(node.path);
                    }}
                  >
                    {node.expanded ? '-' : '+'}
                  </button>
                ) : (
                  <button>*</button>
                )}
                <label htmlFor={node.path}>{node.name}</label>
              </p>
              <p
                style={{
                  float: 'left',
                  width: '60px',
                  background: 'lightgray'
                }}
              >
                a
              </p>
            </div>
          </div>
        );
      }}
    </VirtualTree>
  </div>
);

render(<App />, document.getElementById('root'));

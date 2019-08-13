import * as React from 'react';
import { render } from 'react-dom';

import VirtualTree from './FlatTree/VirtualTree';
import './index.css';
import { data as originalNodes } from './data/randomData';
import NativeCheckbox from './FlatTree/Checkbox';
// import { data as originalNodes } from './data/customData';

const App = () => (
  <div>
    <h2>Start editing to see some magic aaa</h2>

    <VirtualTree allExpanded={false} nodes={originalNodes}>
      {({ style, node, index, selectNode, expandOrCollapse }) => {
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
                <label htmlFor={node.path}>
                  <NativeCheckbox 
                    checked={node.checkedState === 1}
                    indeterminate={node.checkedState === 2}
                    onChange={e =>
                      selectNode(node.path, e.currentTarget.checked ? 1 : 0)
                    }
                    id={node.path} 
                  />
                  {node.path} / {node.i}
                </label>
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

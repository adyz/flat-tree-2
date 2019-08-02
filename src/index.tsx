import * as React from "react";
import { render } from "react-dom";

import VirtualTree from "./FlatTree/VirtualTree";
import "./index.css";
import { data as originalNodes } from "./randomData";

export type NewRandomData = {
  id: string;
  name: string;
  expanded: boolean;
  children: NewRandomData[];
};
// const newRandom: NewRandomData[] = [
//   {
//     id: "0-0",
//     name: "test 0-0",
//     expanded: false,
//     children: [
//       {
//         id: "0-0-0",
//         name: "test 0-0-0",
//         expanded: true,
//         children: []
//       },
//       {
//         id: "0-0-1",
//         name: "test 0-0-1",
//         expanded: true,
//         children: []
//       },
//       {
//         id: "0-0-2",
//         name: "test 0-0-2",
//         expanded: false,
//         children: [
//           {
//             id: "0-0-2-0",
//             name: "test 0-0-2-0",
//             expanded: true,
//             children: []
//           },
//           {
//             id: "0-0-2-1",
//             name: "test 0-0-2-1",
//             expanded: true,
//             children: []
//           },
//           {
//             id: "0-0-2-2",
//             name: "test 0-0-2-2",
//             expanded: false,
//             children: [
//               {
//                 id: "0-0-2-2-0",
//                 name: "test 0-0-2-2-0",
//                 expanded: true,
//                 children: []
//               },
//               {
//                 id: "0-0-2-2-1",
//                 name: "test 0-0-2-2-1",
//                 expanded: true,
//                 children: []
//               },
//               {
//                 id: "0-0-2-2-2",
//                 name: "test 0-0-2-2-2",
//                 expanded: true,
//                 children: [
//                   {
//                     id: "0-0-2-2-2-0",
//                     name: "test 0-0-2-2-2-0",
//                     expanded: true,
//                     children: []
//                   },
//                   {
//                     id: "0-0-2-2-2-1",
//                     name: "test 0-0-2-2-2-1",
//                     expanded: true,
//                     children: []
//                   },
//                   {
//                     id: "0-0-2-2-2-2",
//                     name: "test 0-0-2-2-2-2",
//                     expanded: true,
//                     children: []
//                   }
//                 ]
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   },
//   {
//     id: "0-1",
//     name: "test 0-1",
//     expanded: false,
//     children: [
//       {
//         id: "0-1-0",
//         name: "test 0-1-0",
//         expanded: true,
//         children: []
//       },
//       {
//         id: "0-1-1",
//         name: "test 0-1-1",
//         expanded: true,
//         children: []
//       },
//       {
//         id: "0-1-2",
//         name: "test 0-1-2",
//         expanded: false,
//         children: [
//           {
//             id: "0-1-2-0",
//             name: "test 0-1-2-0",
//             expanded: true,
//             children: []
//           },
//           {
//             id: "0-1-2-1",
//             name: "test 0-1-2-1",
//             expanded: true,
//             children: []
//           },
//           {
//             id: "0-1-2-2",
//             name: "test 0-1-2-2",
//             expanded: false,
//             children: [
//               {
//                 id: "0-1-2-2-0",
//                 name: "test 0-1-2-2-0",
//                 expanded: true,
//                 children: []
//               },
//               {
//                 id: "0-1-2-2-1",
//                 name: "test 0-1-2-2-1",
//                 expanded: true,
//                 children: []
//               },
//               {
//                 id: "0-1-2-2-2",
//                 name: "test 0-1-2-2-2",
//                 expanded: false,
//                 children: [
//                   {
//                     id: "0-1-2-2-2-0",
//                     name: "test 0-1-2-2-2-0",
//                     expanded: true,
//                     children: []
//                   },
//                   {
//                     id: "0-1-2-2-1",
//                     name: "test 0-1-2-0-2-1",
//                     expanded: true,
//                     children: []
//                   },
//                   {
//                     id: "0-1-2-2-2",
//                     name: "test 0-1-2-2-2-2",
//                     expanded: true,
//                     children: []
//                   }
//                 ]
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   }
// ];

// console.log("newRandom", newRandom);

const App = () => (
  <div>
    <h2>Start editing to see some magic happen 1</h2>

    <VirtualTree nodes={originalNodes}>
      {({ style, node, index, expandOrCollapse }) => {
        return (
          <div style={style}>
            <div
              style={{
                overflow: "auto",
                boxShadow: "inset 0 0 3px red",
                padding: "3px"
              }}
            >
              <p
                style={{
                  paddingLeft: node.nesting * 20 + "px",
                  width: "380px",
                  float: "left",
                  background: "yellow"
                }}
              >
                {node.hasChildren ? (
                  <button
                    onClick={() => {
                      console.time("Render");
                      expandOrCollapse(node.path);
                    }}
                  >
                    {node.expanded ? "-" : "+"}
                  </button>
                ) : (
                  <button>*</button>
                )}
                <label htmlFor={node.path}>{node.path}</label>
              </p>
              <p
                style={{
                  float: "left",
                  width: "60px",
                  background: "lightgray"
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

render(<App />, document.getElementById("root"));

import * as React from "react";
import flattenObject from "../flatten";
import NativeCheckbox from "../Tree/NativeCheckbox";

interface FlatTreeProps {
  nodes: any[]; 
}

interface FlatTreeState {
  nodes: any[];
}

export default class FlatTree extends React.Component<
  FlatTreeProps,
  FlatTreeState
> {
  constructor(props: FlatTreeProps) {
    super(props);

    this.state = {
      nodes: []
    };
  }

  componentDidMount() {
    console.log("FlatTree Mounted");

    this.setState(prevState => {
      return {
        ...prevState,
        nodes: flattenObject(this.props.nodes)
      };
    });
  }

  public toggle = (e: any) => {
    const index = e.currentTarget.dataset.index;

    function testIncludes(list, item) {
      const answer = false;

      for (let listItem of list) {
        if (item.startsWith(listItem)) {
          answer = true;
          break;
        }
      }
      return answer;
    }

    this.setState(prevState => {
      const { nodes } = prevState;
      const isExpanded = nodes[index].expanded;
      const ignoreList = [];

      for (let nodeKey of Object.keys(nodes)) {
        // Find all children (the children are the ones that start with this key) and toggle them
        if (
          nodes[nodeKey].path.startsWith(index) &&
          nodes[nodeKey].path !== index &&
          !testIncludes(ignoreList, nodeKey)
        ) {
          if (!isExpanded && nodes[nodeKey].expanded === false) {
            ignoreList.push(nodeKey);
          }

          nodes[nodeKey].visible = !isExpanded;
        }
      };

      nodes[index].expanded = !isExpanded;

      return {
        nodes: nodes
      };
    });
  };

  public getParentIndex(index: any) {
    const parts = index.split("-");
    parts.pop();
    return parts.join("-");
  }

  public setNodeWithState = (index, state) => {
    this.setState(prevState => {
      prevState.nodes[index].state = state;
      return {
        nodes: prevState.nodes
      };
    });
  }

  public checkSiblingsIfParent = (isChecked, index) => {
    const parentIndex = this.getParentIndex(index);
    if (parentIndex !== "0") {
      this.checkSiblings(parentIndex, isChecked, index);
    }
  }

  public checkSiblings(index: any, isChecked: any, currentNode: any) {
    
    if(isChecked === 2) {
      this.setNodeWithState(index, 2);
      this.checkSiblingsIfParent(isChecked, index);
    } else {

      const parentPathLength = this.state.nodes[index].path.split("-").length;

      let all = true;
      for (let nodeKey of Object.keys(this.state.nodes)) {
        const path = this.state.nodes[nodeKey].path;
        const pathLen = path.split("-").length;
        if (pathLen === parentPathLength + 1 && path.startsWith(index)) {
          if (
            this.state.nodes[nodeKey].state === isChecked ||
            nodeKey === currentNode
          ) {
          } else {
            all = false;
            break;
          }
        }
      };
      if (all) {
        this.setNodeWithState(index, isChecked);
      } else {
        this.setNodeWithState(index, 2);
      }
      this.checkSiblingsIfParent(all ? isChecked : 2, index)
    }
  }

  public handleChange = (e: any) => {
    const { currentTarget } = e;
    const index = currentTarget.dataset.index;
    const isChecked = currentTarget.checked ? 1 : 0;

    this.checkSiblingsIfParent(isChecked, index)

    this.setState(prevState => {
      for (let nodeKey of Object.keys(prevState.nodes)) {
        if (prevState.nodes[nodeKey].path.startsWith(index + "-")) {
          prevState.nodes[nodeKey].state = isChecked;
        }

        if (prevState.nodes[nodeKey].path === index) {
          prevState.nodes[nodeKey].state = isChecked;
        }
      };

      return {
        nodes: prevState.nodes
      };
    });
  };

  public render() {

    const { nodes } = this.state;
    return (
      <React.Fragment>
        <h1>Hello</h1>
        {Object.keys(nodes).map((nodeKey: any) => {
          const superDisplay =
            nodes[nodes[nodeKey].parent] === undefined
              ? true
              : nodes[nodeKey].visible
                ? nodes[nodes[nodeKey].parent].expanded
                  ? true
                  : false
                : false;
          return (
            superDisplay && (
              <div key={nodeKey}>
                <p
                  style={{
                    paddingLeft:
                      nodes[nodeKey].path.split("-").length * 20 + "px"
                  }}
                >
                  {nodes[nodeKey].children ? (
                    <button data-index={nodeKey} onClick={this.toggle}>
                      {nodes[nodeKey].expanded ? "-" : "+"}
                    </button>
                  ) : (
                    <button>*</button>
                  )}
                  <NativeCheckbox
                    checked={nodes[nodeKey].state === 1}
                    indeterminate={nodes[nodeKey].state === 2}
                    data-index={nodeKey}
                    onChange={this.handleChange}
                    id={nodes[nodeKey].path}
                  />
                  <label htmlFor={nodes[nodeKey].path}>
                    {nodes[nodeKey].path}{" "}
                  </label>
                </p>
              </div>
            )
          );
        })}
      </React.Fragment>
    );
  }
}

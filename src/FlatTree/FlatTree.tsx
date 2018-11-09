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

  public expand = (e: any) => {
    const index = e.currentTarget.dataset.index;

    this.setState(prevState => {
      const isExpanded = prevState.nodes[index].expanded;

      Object.keys(prevState.nodes).forEach(nodeKey => {
        // Find all children (the children are the ones that start with this key) and toggle them
        if (
          prevState.nodes[nodeKey].path.startsWith(index) &&
          prevState.nodes[nodeKey].path !== index
        ) {
          prevState.nodes[nodeKey].visible = !isExpanded;
        }

        // Toggle this node
        if (prevState.nodes[nodeKey].path === index) {
          prevState.nodes[nodeKey].expanded = !isExpanded;
        }
      });

      return {
        nodes: prevState.nodes
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

      const parentPath = this.state.nodes[index].path;
      const len = parentPath.split("-").length;

      let all = true;

      Object.keys(this.state.nodes).forEach(nodeKey => {
        const path = this.state.nodes[nodeKey].path;
        const pathLen = path.split("-").length;
        if (pathLen === len + 1 && path.startsWith(index)) {
          if (
            this.state.nodes[nodeKey].state === isChecked ||
            nodeKey === currentNode
          ) {
          } else {
            all = false;
            return false;
          }
        }
      });

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

    const parentIndex = this.getParentIndex(index);

    if (parentIndex !== "0") {
      this.checkSiblings(parentIndex, isChecked, index);
    }

    this.setState(prevState => {
      Object.keys(prevState.nodes).forEach(nodeKey => {
        if (prevState.nodes[nodeKey].path.startsWith(index + "-")) {
          prevState.nodes[nodeKey].state = isChecked;
        }

        if (prevState.nodes[nodeKey].path === index) {
          prevState.nodes[nodeKey].state = isChecked;
        }
      });

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
                    <button data-index={nodeKey} onClick={this.expand}>
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

import * as React from "react";
import flattenObject, { Tree } from "../flatten";
import { CellMeasurer, CellMeasurerCache, List } from "react-virtualized";

// In this example, average cell height is assumed to be about 50px.
// This value will be used for the initial `Grid` layout.
// Width is not dynamic.
const cache = new CellMeasurerCache({
  defaultHeight: 40,
  fixedWidth: true
});

type Spread<T> = T & Tree;
interface Props<T> {
  nodes: T[];
  children: (props: {
    isScrolling: boolean;
    isVisible: boolean;
    key: string;
    index: number;
    parent: any;
    style: any;
    node: Spread<T>;
    expandOrCollapse: (key: string) => void;
  }) => React.ReactNode;
}

export default class VirtualTree<T extends {}> extends React.Component<
  Props<T>,
  {
    visibleKeys: string[];
    newNodes: { [key: string]: Spread<T> };
  }
> {
  constructor(props: Props<T>) {
    super(props);

    this.state = {
      visibleKeys: [],
      newNodes: {}
    };

    this.expandOrCollapse = this.expandOrCollapse.bind(this);
    this._rowRenderer = this._rowRenderer.bind(this);
  }
  list: any;
  componentDidMount() {
    const flatNodes = flattenObject(this.props.nodes);
    const visibleKeys = this.getVisibleNodeKeys(flatNodes);

    this.setState({
      visibleKeys,
      newNodes: flatNodes
    });
  }

  public getVisibleNodeKeys(nodes: { [key: string]: Spread<T> }) {
    let visibeNodes: string[] = [];
    let collapsedNodes: string[] = [];

    for (let nodeKey in nodes) {
      const currNode = nodes[nodeKey];

      if (currNode.expanded) {
        let found = false;
        for (let i = 0; i < collapsedNodes.length; i++) {
          if (currNode.path.startsWith(collapsedNodes[i])) {
            found = true;
            break;
          }
        }

        if (!found) {
          visibeNodes.push(currNode.path);
        }
      } else {
        let includes = false;
        for (let i = 0; i < collapsedNodes.length; i++) {
          if (currNode.path.startsWith(collapsedNodes[i])) {
            includes = true;
            break;
          }
        }
        if (!includes) {
          collapsedNodes.push(currNode.path);
        }
      }
    }

    // const collapsedNodes = NodeValues.reduce(function callbacl(
    //   collapsedNodesAcc: string[],
    //   currNode
    // ) {
    //   if (currNode.expanded) {
    //     let found = false;
    //     for (let i = 0; i < collapsedNodesAcc.length; i++) {
    //       if (currNode.path.startsWith(collapsedNodesAcc[i])) {
    //         found = true;
    //         break;
    //       }
    //     }

    //     if (!found) {
    //       visibeNodes.push(currNode.path);
    //     }
    //     return collapsedNodesAcc;
    //   }
    //   let includes = false;
    //   for (let i = 0; i < collapsedNodesAcc.length; i++) {
    //     if (currNode.path.startsWith(collapsedNodesAcc[i])) {
    //       includes = true;
    //       break;
    //     }
    //   }
    //   if (!includes) {
    //     collapsedNodesAcc.push(currNode.path);
    //   }

    //   return collapsedNodesAcc;
    // },
    // []);

    // for (let nodei = 0; nodei < NodeKeys.length; nodei++) {
    //   const currNode = nodes[NodeKeys[nodei]];

    // }

    return [...visibeNodes, ...collapsedNodes].sort();
  }

  public expandOrCollapse(key: string) {
    this.setState(prevState => {
      const { newNodes } = { ...prevState };
      newNodes[key].expanded = !newNodes[key].expanded;
      const visibleKeys = this.getVisibleNodeKeys(newNodes);
      return {
        visibleKeys,
        newNodes
      };
    });
  }

  _noRowsRenderer() {
    return <p>No worws</p>;
  }

  _rowRenderer({
    index,
    key,
    parent,
    style,
    isScrolling,
    isVisible
  }: {
    isScrolling: boolean;
    isVisible: boolean;
    key: string;
    index: number;
    parent: any;
    style: any;
  }) {
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {this.props.children({
          isScrolling,
          isVisible,
          key,
          style,
          index,
          parent,
          node: this.state.newNodes[this.state.visibleKeys[index]],
          expandOrCollapse: this.expandOrCollapse
        })}
      </CellMeasurer>
    );
  }

  public render() {
    console.log("Render length", this.state.visibleKeys.length);
    // console.timeEnd("Render");
    return (
      this.state.visibleKeys.length > 0 && (
        <List
          ref={ref => {
            this.list = ref;
          }}
          height={540}
          overscanRowCount={5}
          noRowsRenderer={this._noRowsRenderer}
          rowCount={this.state.visibleKeys.length}
          deferredMeasurementCache={cache}
          rowHeight={cache.rowHeight}
          rowRenderer={this._rowRenderer}
          width={500}
        />
      )
    );
  }
}

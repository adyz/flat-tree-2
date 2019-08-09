import * as React from 'react';
import flattenObject, { Tree } from '../flatten';
import { CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';

// In this example, average cell height is assumed to be about 50px.
// This value will be used for the initial `Grid` layout.
// Width is not dynamic.
const cache = new CellMeasurerCache({
  defaultHeight: 40,
  fixedWidth: true
});

function startsWith(haystack: string, needle: string) {
  return haystack.startsWith(needle);
}

type Spread<T> = T & Tree;
interface Props<T> {
  nodes: T[];
  children: (props: {
    isScrolling: boolean;
    isVisible: boolean;
    key: string;
    index: number;
    // tslint:disable-next-line:no-any
    parent: any;
    // tslint:disable-next-line:no-any
    style: any;
    node: Spread<T>;
    expandOrCollapse: (key: string) => void;
    selectNode: (key: string, newCheckState: 0 | 1 | 2) => void;

  }) => React.ReactNode;
}

interface State<T> {
  visibleKeys: string[];
  newNodes: { [key: string]: Spread<T> };
}
export default class VirtualTree<T extends {}> extends React.Component<Props<T>, State<T>> {
  // tslint:disable-next-line:no-any
  list: any;
  objectKeys: string[] = [];
  // tslint:disable-next-line:no-any
  memo: { [key: string]: string[] } = {};
  constructor(props: Props<T>) {
    super(props);

    this.state = {
      visibleKeys: [],
      newNodes: {}
    };

    this.expandOrCollapse = this.expandOrCollapse.bind(this);
    this.onSelectNode = this.onSelectNode.bind(this);
    this._rowRenderer = this._rowRenderer.bind(this);
  }
  componentDidMount() {
    const flatNodes = flattenObject(this.props.nodes);
    const visibleKeys = this.getVisibleNodeKeys(flatNodes);

    // console.log({originalNodes: this.props.nodes, flatNodes, visibleKeys});

    this.setState({
      visibleKeys,
      newNodes: flatNodes
    });
  }

  public getVisibleNodeKeys(flatNodes: { [key: string]: Spread<T> }) {
    const accumulator = [];
    // tslint:disable-next-line: forin
    for (const nodeKey in flatNodes) {
      const node = flatNodes[nodeKey];
      const parent = flatNodes[node.parent];
      const superDisplay =
        parent === undefined
          ? true
          : node.visible
            ? parent.expanded
            : false;
      if (superDisplay) {
        accumulator.push(node.path);
      }
    }

    return accumulator;
  }

  public expandOrCollapse(key: string) {

    function testIncludes(list: string[], item: string) {
      let answer = false;
  
      for (const listItem of list) {
        if (item.startsWith(listItem)) {
          answer = true;
          break;
        }
      }
      return answer;
    }

    this.setState((prevState: State<T>) => {
      const { newNodes } = prevState;
      const isExpanded = newNodes[key].expanded;
      const ignoreList = [];
      const accumulator = [];
      const keys = Object.keys(newNodes);

      for (const nodeKey of keys) {
        // Find all children (the children are the ones that start with this key) and toggle them
        if (
          newNodes[nodeKey].path.startsWith(key) &&
          newNodes[nodeKey].path !== key &&
          !testIncludes(ignoreList, nodeKey)
        ) {
          if (!isExpanded && newNodes[nodeKey].expanded === false) {
            ignoreList.push(nodeKey);
          }

          newNodes[nodeKey].visible = !isExpanded;
        }
      }

      newNodes[key].expanded = !isExpanded;

      for (const nodeKey of keys) {
        const node = newNodes[nodeKey];
        const parent = newNodes[node.parent];
        const superDisplay =
          parent === undefined
            ? true
            : node.visible
              ? parent.expanded
              : false;
        if (superDisplay) {
          accumulator.push(node.path);
        }
      }

      return {
        visibleKeys: accumulator,
        newNodes
      };

    });
  }

  public onSelectNode(key: string, newCheckState: 0 | 1 | 2) {
    console.log('onSelect', key, newCheckState);
    this.setState((prevState: State<T>) => {
      const { newNodes } = { ...prevState };
      newNodes[key].checkedState = newCheckState;

      if (newNodes[key].hasChildren) {
        for (let newNodeKey in newNodes) {
          if (startsWith(newNodeKey, key)) {
            newNodes[newNodeKey].checkedState = newCheckState;
          }
        }
      }

      return {
        ...prevState,
        newNodes
      };
    }, () => this.list.forceUpdateGrid());
  }

  _noRowsRenderer() {
    return <p>No rows</p>;
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
    // tslint:disable-next-line:no-any
    parent: any;
    // tslint:disable-next-line:no-any
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
          expandOrCollapse: this.expandOrCollapse,
          selectNode: this.onSelectNode
        })}
      </CellMeasurer>
    );
  }

  public render() {
    console.log('Render length', this.state.visibleKeys.length);
    return (
      this.state.visibleKeys.length > 0 && (
        <List
          ref={ref => {
            this.list = ref;
          }}
          height={940}
          overscanRowCount={5}
          noRowsRenderer={this._noRowsRenderer}
          rowCount={this.state.visibleKeys.length}
          deferredMeasurementCache={cache}
          rowHeight={cache.rowHeight}
          rowRenderer={this._rowRenderer}
          width={900}
        />
      )
    );
  }
}

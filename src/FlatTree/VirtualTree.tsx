import * as React from 'react';
import flattenObject, { Tree } from '../flatten';
// import * as _ from 'lodash';
import { CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';

// tslint:disable-next-line:no-any
function pickBy(object: any, predicate: any = (v: any) => v) {
  const obj = {};
  for (const [key, value] of Object.entries(object)) {
    if (predicate(value)) {
      obj[key] = value;
    }
  }
  return obj;
}

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
    // tslint:disable-next-line:no-any
    parent: any;
    // tslint:disable-next-line:no-any
    style: any;
    node: Spread<T>;
    expandOrCollapse: (key: string) => void;
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
  memo: {[key: string]: string[]} = {};
  constructor(props: Props<T>) {
    super(props);

    this.state = {
      visibleKeys: [],
      newNodes: {}
    };

    this.expandOrCollapse = this.expandOrCollapse.bind(this);
    this._rowRenderer = this._rowRenderer.bind(this);
  }
  componentDidMount() {
    const flatNodes = flattenObject(this.props.nodes);
    const visibleKeys = this.getVisibleNodeKeys(flatNodes);

    this.setState({
      visibleKeys,
      newNodes: flatNodes
    });
  }

  public getVisibleNodeKeys(nodes: { [key: string]: Spread<T> }) {
    let visibleNodes: string[] = [];
    let collapsedNodes: string[] = [];

    // if (this.objectKeys.length < 1) {
    //     // Cache the keys
    //     this.objectKeys = Object.keys(nodes);
    // }

    this.objectKeys = Object.keys(nodes);

    for (let keyI = 0; keyI < this.objectKeys.length;  keyI++) {
      const currNode = nodes[this.objectKeys[keyI]];
      let found = false;
      for (let i = 0; i < collapsedNodes.length; i++) {
        // if current node path starts with any of the collapsed items
        if (currNode.path.lastIndexOf(collapsedNodes[i], 0) === 0) {
          found = true;
          break;
        }
      }

      if (!found) {
        if (currNode.expanded) {
          visibleNodes.push(currNode.path);
        } else {
          collapsedNodes.push(currNode.path);
        }
        
      }
    }

    // tslint:disable-next-line:forin
    // for (let nodeKey in nodes) {
    //   const currNode = nodes[nodeKey];

    //   let found = false;
    //   for (let i = 0; i < collapsedNodes.length; i++) {
    //     // if current node path starts with any of the collapsed items
    //     if (currNode.path.lastIndexOf(collapsedNodes[i], 0) === 0) {
    //       found = true;
    //       break;
    //     }
    //   }

    //   if (!found) {
    //     if (currNode.expanded) {
    //       visibleNodes.push(currNode.path);
    //     } else {
    //       collapsedNodes.push(currNode.path);
    //     }
        
    //   }

    // }

    visibleNodes.push(...collapsedNodes);
    visibleNodes.sort();
    return visibleNodes;
  }

  public expandOrCollapse(key: string) {
    
    this.setState((prevState: State<T>)  => {
      const { newNodes } = { ...prevState };
      const newExpanded = !newNodes[key].expanded;
      newNodes[key].expanded = newExpanded;
      if (newExpanded) {
        // tslint:disable-next-line:no-any
        const pickedNodes = pickBy(newNodes, (newNode: any) => newNode.path.startsWith(key) && newNode.path !== key);
        const pickedVisibleKeys: string[] = this.getVisibleNodeKeys(pickedNodes);
        const visibleKeys = [...prevState.visibleKeys, ...pickedVisibleKeys].sort();
        console.log({key, pickedNodes, pickedVisibleKeys, visibleKeys});
        return {
          visibleKeys,
          newNodes
        };
      } else {
        console.log('I should show hide the kids to this: ', key);
        // tslint:disable-next-line:max-line-length
        const visibleKeys = prevState.visibleKeys.filter((visibleKey: string) => !visibleKey.startsWith(key) || visibleKey === key);
        return {
          visibleKeys,
          newNodes
        };
      }
      
    });
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
          expandOrCollapse: this.expandOrCollapse
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
          height={540}
          overscanRowCount={5}
          noRowsRenderer={this._noRowsRenderer}
          rowCount={this.state.visibleKeys.length}
          deferredMeasurementCache={cache}
          rowHeight={cache.rowHeight}
          rowRenderer={this._rowRenderer}
          width={800}
        />
      )
    );
  }
}

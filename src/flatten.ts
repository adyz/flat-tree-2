export type NodeState = 0 | 1 | 2;

export type Tree = {
  path: string;
  parent: string;
  nesting: number;
  hasChildren: boolean;
  // The two props are required
  // tslint:disable-next-line:no-any
  children: any[];
  expanded: boolean;
  checkedState: 0 | 1 | 2,
  visible: boolean;
  hasExpandedParent: boolean;
};

function flattenObject<T>(nodes: T[]) {
  const toReturn = {} as { [key: string]: T & Tree };

  function rec(restNodes: T[], prevIndex: string, nesting: number = 0) {
    restNodes.forEach((node: T & Tree, i: number) => {
      const myKey = prevIndex + '-' + i;
      const newNesting = nesting + 1;

      let isVisible = false;
      if (toReturn[prevIndex] === undefined) {
        isVisible = true;
      } else if (toReturn[toReturn[prevIndex].parent] === undefined) {
        isVisible = true;
      } else if (toReturn[prevIndex].visible) {
        isVisible = toReturn[toReturn[prevIndex].parent].expanded;
      } else {
        isVisible = false;
      }
      
      if (node.children && node.children.length > 0) {
        toReturn[myKey] = {
          ...node,
          nesting: newNesting,
          path: myKey,
          hasChildren: true,
          parent: prevIndex,
          children: [],
          checkedState: 0,
          visible: isVisible,
          // expanded: true,
          hasExpandedParent: isVisible
        };

        rec(node.children, myKey, newNesting);
      } else {
        toReturn[myKey] = {
          ...node,
          nesting: newNesting,
          path: myKey,
          hasChildren: false,
          parent: prevIndex,
          children: [],
          checkedState: 0,
          visible: isVisible,
          // expanded: true,
          hasExpandedParent: isVisible
        };
      }
    });
  }

  rec(nodes, '0');

  return toReturn;
}

export default flattenObject;

export type NodeState = 0 | 1 | 2;

export type Tree<T> = {
  path: string;
  parent: string;
  nesting: number;
  hasChildren: boolean;
  // The two props are required
  children: T[];
  expanded: boolean;
};

function flattenObject<T>(nodes: T[]) {
  const toReturn = {} as { [key: string]: T & Tree<T> };

  function rec(restNodes: T[], prevIndex: string, nesting = 0) {
    restNodes.forEach((node: T & Tree<T>, i: number) => {
      const myKey = prevIndex + "-" + i;
      const newNesting = nesting + 1;
      if (node.children && node.children.length > 0) {
        toReturn[myKey] = {
          ...node,
          nesting: newNesting,
          path: myKey,
          hasChildren: true,
          parent: prevIndex
        };

        rec(node.children, myKey, newNesting);
      } else {
        toReturn[myKey] = {
          ...node,
          nesting: newNesting,
          path: myKey,
          hasChildren: false,
          parent: prevIndex
        };
      }
    });
  }

  rec(nodes, "0");

  return toReturn;
}

export default flattenObject;

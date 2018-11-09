const parents = [];

for (let i = 0; i < 3; i += 1) {
  const children = [];
  for (let j = 0; j < 3; j += 1) {
    const grandChildren = [];
    for (let k = 0; k < 53; k += 1) {
      const grandGrandChildren = [];
      for (let l = 0; l < 3; l += 1) {
        const grandGrandGrandChildren = [];
        for (let m = 0; m < 3; m += 1) {
          const grandGrandGrandGrandChildren = [];
          for (let n = 0; n < 3; n += 1) {
            grandGrandGrandGrandChildren.push({
              expanded: false,
              value: `node-0-${i}-${j}-${k}-${l}-${m}-${n}`,
              label: `Node 0-${i}-${j}-${k}-${l}-${m}-${n}`
            });
          }
          grandGrandGrandChildren.push({
            expanded: false,
            value: `node-0-${i}-${j}-${k}-${l}-${m}`,
            label: `Node 0-${i}-${j}-${k}-${l}-${m}`,
            children: grandGrandGrandGrandChildren
          });
        }

        grandGrandChildren.push({
          expanded: false,
          value: `node-0-${i}-${j}-${k}-${l}`,
          label: `Node 0-${i}-${j}-${k}-${l}`,
          children: grandGrandGrandChildren
        });
      }

      grandChildren.push({
        expanded: false,
        value: `node-0-${i}-${j}-${k}`,
        label: `Node 0-${i}-${j}-${k}`,
        children: grandGrandChildren
      });
    }
    children.push({
      expanded: false,
      value: `node-0-${i}-${j}`,
      label: `Node 0-${i}-${j}`,
      children: grandChildren
    });
  }
  parents.push({
    expanded: false,
    value: `node-0-${i}`,
    label: `Node 0-${i}`,
    children
  });
}

const nodes = parents;

export default nodes;

const parents = [];

for (let i = 0; i < 3; i += 1) {
  const children = [];
  for (let j = 0; j < 3; j += 1) {
    const grandChildren = [];
    for (let k = 0; k < 3; k += 1) {
      const grandGrandChildren = [];
      for (let l = 0; l < 6; l += 1) {
        const grandGrandGrandChildren = [];
        for (let m = 0; m < 2; m += 1) {
          const grandGrandGrandGrandChildren = [];
          for (let n = 0; n < 2; n += 1) {
            const grandGrandGrandGrandGrandChildren = [];
            for (let o = 0; o < 2; o += 1) {
              grandGrandGrandGrandGrandChildren.push({
                
                value: `node-0-${i}-${j}-${k}-${l}-${m}-${n}-${o}`,
                label: `Node 0-${i}-${j}-${k}-${l}-${m}-${n}${o}`
              });
            }
            grandGrandGrandGrandChildren.push({
              
              value: `node-0-${i}-${j}-${k}-${l}-${m}-${n}`,
              label: `Node 0-${i}-${j}-${k}-${l}-${m}-${n}`,
              children: grandGrandGrandGrandGrandChildren
            });
          }
          grandGrandGrandChildren.push({
            value: `node-0-${i}-${j}-${k}-${l}-${m}`,
            label: `Node 0-${i}-${j}-${k}-${l}-${m}`,
            children: grandGrandGrandGrandChildren
          });
        }
        grandGrandChildren.push({
          value: `node-0-${i}-${j}-${k}-${l}`,
          label: `Node 0-${i}-${j}-${k}-${l}`,
          children: grandGrandGrandChildren
        });
      }
      grandChildren.push({
        value: `node-0-${i}-${j}-${k}`,
        label: `Node 0-${i}-${j}-${k}`,
        children: grandGrandChildren
      });
    }
    children.push({
      value: `node-0-${i}-${j}`,
      label: `Node 0-${i}-${j}`,
      children: grandChildren
    });
  }
  parents.push({
    value: `node-0-${i}`,
    label: `Node 0-${i}`,
    children
  });
}

const nodes = parents;

export default nodes;

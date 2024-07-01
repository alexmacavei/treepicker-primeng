import { Placement } from '../models/placement.model';
import { PlacementWithSelection } from '../+state/placement-store.service';

export function placementInArray(
  placements: Placement[],
  toFind: PlacementWithSelection,
) {
  return placements.some(
    (p) =>
      `${p.name}${p.level}${p.section}` ===
      `${toFind.name}${toFind.level}${toFind.section}`,
  );
}

export function traversal(
  placement: PlacementWithSelection,
  apply: (p: PlacementWithSelection) => void,
) {
  const stack = [];
  stack.push(placement);

  while (stack.length > 0) {
    const node = stack.pop();
    if (node) apply(node);
    (node?.children || []).forEach((n) => stack.push(n));
  }
}

export function treeToArray(placementsTree: PlacementWithSelection[]) {
  const asArray: PlacementWithSelection[] = [];
  const stack: PlacementWithSelection[] = [];

  placementsTree.forEach((p) => {
    stack.push(p);
    asArray.push(p);
  });
  while (stack.length > 0) {
    const node = stack.pop();
    if ([node?.children || []].length > 0) {
      (node?.children as PlacementWithSelection[]).forEach((c) => {
        stack.push(c);
        asArray.push(c);
      });
    }
  }
  return asArray;
}

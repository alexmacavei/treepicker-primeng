import { patchState, signalState } from '@ngrx/signals';
import { Placement } from '../models/placement.model';
import { placementInArray, traversal } from '../util/traversal-utils';

export type PlacementWithSelection = Placement & { isSelected: boolean };
export type PlacementState = {
  placements: PlacementWithSelection[];
};

const placementsState = signalState<PlacementState>({
  placements: [],
});

export function updatePlacements(placements: Placement[]) {
  patchState(placementsState, (state) => ({
    ...state,
    placements: placements.map((pws) => {
      traversal({ ...pws, isSelected: false }, (p) => (p.isSelected = false));
      return pws as PlacementWithSelection;
    }),
  }));
}

export function toggleSelection(selectedPlacements: Placement[]) {
  patchState(placementsState, (state) => ({
    ...state,
    placements: state.placements.map((pws) => {
      traversal(pws, (p) => {
        if (placementInArray(selectedPlacements, p)) {
          p.isSelected = true;
        }
      });
      return pws;
    }),
  }));
}

export const placements = placementsState.placements;

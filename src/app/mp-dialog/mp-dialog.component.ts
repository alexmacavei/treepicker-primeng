import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TreeModule } from 'primeng/tree';
import { placements, toggleSelection } from '../+state/placement-store.service';
import { Placement } from '../models/placement.model';
import { treeToArray } from '../util/traversal-utils';

@Component({
  selector: 'mp-placement-dialog',
  standalone: true,
  imports: [DialogModule, Button, TreeModule],
  template: `
    <div
      class="card flex flex-column align-items-center justify-content-center">
      <p-tree
        [value]="placements()"
        selectionMode="multiple"
        class="w-full md:w-30rem"
        [(selection)]="selectedStuff"
        metaKeySelection="false">
        <ng-template let-node pTemplate="default">
          <div class="custom-checkbox-tree-node">
            <input type="checkbox" [checked]="isSelected(node)" />
            <span class="ml-1">{{ node.name }}</span>
          </div>
        </ng-template>
      </p-tree>
    </div>
    <div class="flex justify-content-end gap-2">
      <p-button label="Cancel" severity="secondary" (onClick)="closeDialog()" />
      <p-button label="Save" (onClick)="selectPlacements()" />
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MpDialogComponent implements OnInit {
  ref = inject(DynamicDialogRef);

  protected readonly placements = placements;

  selectedStuff: Placement[] = [];

  ngOnInit() {
    this.selectedStuff = treeToArray(this.placements()).filter(
      (p) => p.isSelected,
    );
  }

  closeDialog() {
    this.ref.close();
  }

  selectPlacements() {
    console.log(this.selectedStuff);
    toggleSelection(this.selectedStuff);
    this.ref.close(this.selectedStuff);
  }

  isSelected(node: any): boolean {
    return this.selectedStuff.some(
      (pl) =>
        pl.name === node.name &&
        pl.level === node.level &&
        pl.section === node.section,
    );
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MpDialogComponent } from './mp-dialog/mp-dialog.component';
import { PlacementsService } from './placements.service';
import { updatePlacements } from './+state/placement-store.service';
import { Placement } from './models/placement.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [DialogService],
})
export class AppComponent implements OnInit {
  dialog = inject(DialogService);
  api = inject(PlacementsService);

  title = 'mock-proj';
  formattedNodesDisplay = signal('');

  ref: DynamicDialogRef | undefined;

  ngOnInit() {
    this.api.getPlacements().then((result) => updatePlacements(result));
  }

  openDialog() {
    const dialogOptions = {
      header: 'Select placements',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    };
    this.ref = this.dialog.open(MpDialogComponent, dialogOptions);
    this.ref.onClose.subscribe((result: Placement[] | undefined) => {
      if (result) {
        this.formattedNodesDisplay.set(this.displayedPlacement(result))
      }
    });
  }

  private displayedPlacement(result: Placement[]) {
    return result.map(p => `${p.name}-${p.level}-${p.section}`).join('//');
  }
}

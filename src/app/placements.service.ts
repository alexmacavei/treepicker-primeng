import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { Placement } from './models/placement.model';

type PlacementApiType = { libraries: Placement[] };

@Injectable({
  providedIn: 'root',
})
export class PlacementsService {
  http = inject(HttpClient);

  getPlacements(): Promise<Placement[]> {
    return firstValueFrom(
      this.http
        .get<PlacementApiType>('../assets/placement-data.json')
        .pipe(map((result) => result.libraries)),
    );
  }
}

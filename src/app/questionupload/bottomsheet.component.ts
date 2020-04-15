import {Component} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';


@Component({
  selector: 'app-bottomsheet',
  templateUrl: 'bottom-sheet-overview-example-sheet.html',
})
export class BottomsheetComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomsheetComponent>) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

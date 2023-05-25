import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar:MatSnackBar) { };

  openSnackBar(message: string, type?: any) {
    this.snackBar.open(message, 'close', {
       duration: 5000,
       horizontalPosition: "right",
       verticalPosition: "top",
       panelClass: [type]
    }
    );
  }
}

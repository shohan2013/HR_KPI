import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private snackBar: MatSnackBar) {}

  success(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration,
      panelClass: ['success-snackbar']
       // Add the custom class here
    });
  }

  error(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration,
      panelClass: ['error-snackbar']
       // Add the custom class here
    });
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { List } from 'src/app/core/domain/entity/list';

@Component({
  selector: 'list-delete-app',
  templateUrl: './list-delete.dialog.html',
  styleUrls: ['./list-delete.dialog.css'],
})
export class ListDeleteDialog implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public list: List,
    private dialogRef: MatDialogRef<ListDeleteDialog>
  ) {}

  ngOnInit() {}

  removeList(): void {
    this.dialogRef.close(true);
  }

  keepList(): void {
    this.dialogRef.close(false);
  }
}

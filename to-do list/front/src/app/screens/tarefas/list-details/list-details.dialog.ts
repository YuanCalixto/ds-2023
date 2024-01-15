import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { List } from 'src/app/core/domain/entity/list';

@Component({
  selector: 'list-details-app',
  templateUrl: './list-details.dialog.html',
  styleUrls: ['./list-details.dialog.css'],
})
export class ListDetailsDialog implements OnInit {
  list: List;

  newTag: string = '';

  tagInput = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { list: List },
    private dialogRef: MatDialogRef<ListDetailsDialog>
  ) {
    this.list = { ...data.list };
  }

  ngOnInit() {
  }

  saveList(): void {
    this.dialogRef.close(this.list);
  }
}

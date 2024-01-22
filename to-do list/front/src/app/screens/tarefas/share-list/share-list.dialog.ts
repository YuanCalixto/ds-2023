import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { List } from 'src/app/core/domain/entity/list';

@Component({
  selector: 'share-list-app',
  templateUrl: './share-list.dialog.html',
  styleUrls: ['./share-list.dialog.css'],
})
export class ShareListDialog implements OnInit {
  list: List;

  username: string = '';

  tagInput = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { list: List },
    private dialogRef: MatDialogRef<ShareListDialog>
  ) {
    this.list = { ...data.list };
  }

  ngOnInit() {}

  saveList(): void {
    this.dialogRef.close(this.username);
  }
}

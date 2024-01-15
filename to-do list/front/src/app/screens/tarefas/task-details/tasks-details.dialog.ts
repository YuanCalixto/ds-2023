import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tag } from 'src/app/core/domain/entity/tag';
import { Task } from 'src/app/core/domain/entity/task';
import { TagService } from 'src/app/core/domain/service/tag.service';

@Component({
  selector: 'tasks-details-app',
  templateUrl: './tasks-details.dialog.html',
  styleUrls: ['./tasks-details.dialog.css'],
})
export class TasksDetailsDialog implements OnInit {
  task: Task;
  tags: Tag[] = [];
  newTag: string = '';
  tagInput = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    private dialogRef: MatDialogRef<TasksDetailsDialog>,
    private tagService: TagService
  ) {
    this.task = { ...data.task };
  }

  ngOnInit() {
    this.loadTags();
  }

  loadTags(): void {
    this.tagService.getTagsByTaskId(this.task.id).subscribe(
      (tags) => {
        this.tags = tags;
      },
      (error) => {
        console.error('Error loading tags:', error);
      }
    );
  }

  saveTask(): void {
    this.dialogRef.close(this.task);
  }

  addTag(): void {
    if (this.newTag.trim() !== '') {
      const newTag = {
        name: this.newTag,
        taskId: this.task.id
      };

      this.tagService.createTag(newTag).subscribe(
        (createdTag) => {
          this.tags.push(createdTag);
          this.newTag = '';
          this.tagInput = false;
        },
        (error) => {
          console.error('Error creating tag:', error);
        }
      );
    }
  }

  removeTag(tagToRemove: Tag): void {
    this.tagService.deleteTag(tagToRemove.id).subscribe(
      () => {
        this.tags = this.tags.filter((tag) => tag.id !== tagToRemove.id);
      },
      (error) => {
        console.error('Error deleting tag:', error);
      }
    );
  }

  toggleTagInput(): void {
    this.tagInput = !this.tagInput;
  }
}

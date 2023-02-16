import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApplicationUserExtended } from '@models/extended';
import { CandidateCardComment } from '@models/organizations/candidate-card-comment';

@Component({
  selector: 'app-card-user-comment',
  templateUrl: './card-user-comment.component.html',
  styleUrls: ['./card-user-comment.component.scss']
})
export class CardUserCommentComponent {
  @Input()
  comment: CandidateCardComment | null = null;

  @Input()
  currentUser: ApplicationUserExtended | null = null;

  @Output()
  deleteClicked = new EventEmitter<CandidateCardComment>();

  get showDeleteButton(): boolean {
    return this.currentUser != null && this.currentUser.id === this.comment?.authorId;
  }

  delete(): void {
    this.deleteClicked.emit(this.comment!);
  }
}

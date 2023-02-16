import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CandidateCard } from '@models/organizations/candidate-card.model';
import { AddCommentRequest } from '@services/candidate-cards.service';
import { CandidateCardCommentFormGroup } from '../candidate-card-partitial-view/candidate-card-form-group';

@Component({
  selector: 'app-card-comment-form',
  templateUrl: './card-comment-form.component.html',
  styleUrls: ['./card-comment-form.component.scss']
})
export class CardCommentFormComponent implements OnInit {
  @Input()
  card: CandidateCard | null = null;

  @Output()
  commentAdded = new EventEmitter<AddCommentRequest>();

  showForm = false;

  get submitButtonDisabled(): boolean {
    return this.commentForm?.invalid ?? true;
  }

  get submitButtonColorCss(): string {
    return this.submitButtonDisabled ? 'btn-secondary disabled' : 'btn-primary';
  }

  commentForm: CandidateCardCommentFormGroup | null = null;

  @ViewChild('commentTextArea')
  textarea: ElementRef<HTMLElement> | null = null;

  ngOnInit(): void {
    if (this.card != null) {
      this.commentForm = new CandidateCardCommentFormGroup(this.card);
    }
  }

  commentFormSubmit(): void {
    const request = this.commentForm?.requestOrNull();
    if (request == null || this.card == null) {
      return;
    }

    this.commentAdded.emit(request);
    this.commentForm?.reset();
    this.showForm = false;
  }

  cancelComment(): void {
    this.commentForm?.reset();
    this.showForm = false;
  }

  autoGrow(element: KeyboardEvent): void {
    const textarea = (element.target as HTMLTextAreaElement)!;
    textarea.style.height = '56px';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  onStubClicked(): void {
    this.showForm = true;
    setTimeout(() => {
      this.textarea?.nativeElement.focus();
    }, 0);
  }
}

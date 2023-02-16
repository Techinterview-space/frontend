import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CandidateCard } from '@models/organizations/candidate-card.model';
import { CandidateCvFile } from '@models/organizations/candidate-cv.model';
import { CandidateCvService } from '@services/candidate-cv.service';
import { AlertService } from '@shared/components/alert/services/alert.service';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { CandidateCvUploadForm } from './candidate-cv-upload-form';

@Component({
  selector: 'app-card-cv-files-list',
  templateUrl: './card-cv-files-list.component.html',
  styleUrls: ['./card-cv-files-list.component.scss']
})
export class CardCvFilesListComponent implements OnInit, OnDestroy {
  @Input()
  card: CandidateCard | null = null;

  @Output()
  filesChanged = new EventEmitter<void>();

  uploadForm: CandidateCvUploadForm | null = null;

  constructor(private readonly service: CandidateCvService, private readonly alert: AlertService) {}

  ngOnInit(): void {
    if (this.card == null) {
      return;
    }
  }

  openUploadDialog(): void {
    this.uploadForm = new CandidateCvUploadForm(this.card!);
  }

  onFileAttachmentChange(event: any): void {
    this.uploadForm!.onFileAttachmentChange(event);
  }

  clearFileControl(): void {
    this.uploadForm!.clearFileControl();
  }

  onFormSubmit(): void {
    const file = this.uploadForm!.getFile();
    if (file == null) {
      return;
    }

    this.service
      .upload(this.card!.id, file)
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.card!.files = x.files;
        this.filesChanged.emit();
        this.onEditModalDlgClose();
        this.alert.success('File uploaded successfully');
      });
  }

  onEditModalDlgClose(): void {
    this.uploadForm = null;
  }

  deleteFile(file: CandidateCvFile): void {
    if (confirm('Are you sure you want to delete this file?')) {
      this.service
        .delete(this.card!.id, file.id)
        .pipe(untilDestroyed(this))
        .subscribe((x) => {
          this.card!.files = x.files;
          this.filesChanged.emit();
          this.alert.success('File removed successfully');
        });
    }
  }

  ngOnDestroy(): void {
    // ignored
  }

  downloadFile(file: CandidateCvFile): void {
    this.service
      .download(this.card!.id, file.id)
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        const url = window.URL.createObjectURL(x);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.fileName;
        a.click();
      });
  }
}

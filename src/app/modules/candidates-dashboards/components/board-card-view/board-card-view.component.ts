import { Component, Input, OnInit } from '@angular/core';
import { CandidateCard } from '@models/organizations/candidate-card.model';

@Component({
  selector: 'app-board-card-view',
  templateUrl: './board-card-view.component.html',
  styleUrls: ['./board-card-view.component.scss']
})
export class BoardCardViewComponent implements OnInit {
  @Input()
  card: CandidateCard | null = null;

  get title(): string {
    if (this.card == null) {
      return '';
    }

    return this.card.candidate?.firstName + ' ' + this.card.candidate?.lastName;
  }

  ngOnInit(): void {}
}

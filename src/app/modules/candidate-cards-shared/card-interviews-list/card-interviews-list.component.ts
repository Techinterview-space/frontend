import { Component, Input, OnInit } from '@angular/core';
import { CandidateCard } from '@models/organizations/candidate-card.model';

@Component({
  selector: 'app-card-interviews-list',
  templateUrl: './card-interviews-list.component.html',
  styleUrls: ['./card-interviews-list.component.scss']
})
export class CardInterviewsListComponent implements OnInit {
  @Input()
  candidateCard: CandidateCard | null = null;

  ngOnInit(): void {}
}

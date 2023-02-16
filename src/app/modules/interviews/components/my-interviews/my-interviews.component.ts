import { Component, OnDestroy, OnInit } from '@angular/core';
import { Interview } from '@models/interview-models';
import { InterviewsService } from '@services/interviews.service';
import { TitleService } from '@services/title.service';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';

@Component({
  selector: 'app-my-interviews',
  templateUrl: './my-interviews.component.html',
  styleUrls: ['./my-interviews.component.scss']
})
export class MyInterviewsComponent implements OnInit, OnDestroy {
  interviews: Array<Interview> | null = null;

  constructor(private readonly service: InterviewsService, private readonly title: TitleService) {}

  ngOnInit(): void {
    this.title.setTitle('My Interviews');
    this.service
      .my()
      .pipe(untilDestroyed(this))
      .subscribe((i) => (this.interviews = i));
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

interface Card {
  title: string;
  price: number | null;
  text: string;
  features: string[];
  buttonTitle: string;
  enabled: boolean;
}

@Component({
  selector: 'app-pricing-block',
  templateUrl: './pricing-block.component.html',
  styleUrls: ['./pricing-block.component.scss']
})
export class PricingBlockComponent {
  readonly cards: Card[];

  @Output()
  getStartedClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    this.cards = [
      {
        title: 'For personal use',
        price: 0,
        text: 'The system is free for personal use. Email support is included.',
        features: ['Unlimited notes', 'Unlimited interviews', 'Export to PDF and Markdown'],
        buttonTitle: 'Get started',
        enabled: true
      },
      {
        title: 'For companies',
        price: 20,
        text: 'The plan allows you to organize company interview CRM. Free features are included.',
        features: [
          'Previous plan features',
          'Share interviews with your team',
          'Candidate cards',
          'Employment pipeline'
        ],
        buttonTitle: 'Cooming soon',
        enabled: false
      },
      {
        title: 'For enterprise',
        price: null,
        text: 'Priority support. Contact us for more information.',
        features: ['Previous plan features', 'Priority support', 'Customization'],
        buttonTitle: 'Cooming soon',
        enabled: false
      }
    ];
  }

  getStarted(): void {
    this.getStartedClick.emit();
  }
}

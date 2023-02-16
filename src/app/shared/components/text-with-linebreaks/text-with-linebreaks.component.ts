import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-with-linebreaks',
  templateUrl: './text-with-linebreaks.component.html',
  styleUrls: ['./text-with-linebreaks.component.scss']
})
export class TextWithLinebreaksComponent implements OnInit {
  @Input()
  source: string | null = null;

  text = '';
  hasText = false;

  ngOnInit(): void {
    this.text = this.source != null ? this.source.replace(/\r?\n/g, '<br />') : '';
    this.hasText = this.text.length > 0;
  }
}

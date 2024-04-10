import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-loader',
  templateUrl: './data-loading-info-block.component.html'
})
export class DataLoadingInfoBlockComponent {
  @Input()
  title = 'Загрузка данных';
}

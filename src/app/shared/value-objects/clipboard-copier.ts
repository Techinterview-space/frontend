import { environment } from '@environments/environment';

export class ClipboardCopier {
  constructor(private readonly data: string) {}

  execute(): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.data;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}

export class AbsoluteLink {
  constructor(private readonly relativeUrl: string) {}

  asString(): string {
    let url = this.relativeUrl;
    if (!this.relativeUrl.startsWith('/')) {
      url = '/' + url;
    }

    return environment.baseUrl + url;
  }
}

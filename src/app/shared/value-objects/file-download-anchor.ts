export class FileDownloadAnchor {
  constructor(private readonly file: File) {}

  execute(filename: string | null): void {
    const url = window.URL.createObjectURL(this.file);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename ?? this.file.name;
    a.click();
  }
}

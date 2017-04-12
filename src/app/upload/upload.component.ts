import { Component, NgZone, Inject, EventEmitter, OnInit } from '@angular/core';
import { NgUploaderOptions, UploadedFile, UploadRejected } from 'ngx-uploader';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {
  options: NgUploaderOptions;
  response: any;
  sizeLimit: number = 1000000; // 1MB
  previewData: any;
  errorMessage: string;
  inputUploadEvents: EventEmitter<string>;

  ngOnInit() {
  }

 constructor(@Inject(NgZone) private zone: NgZone) {
    this.options = new NgUploaderOptions({
      url: 'http://api.ngx-uploader.com/upload',
      filterExtensions: true,
      allowedExtensions: ['jpg', 'png'],
      maxSize: 2097152,
      data: { userId: 12 },
      autoUpload: false,
      fieldName: 'file',
      fieldReset: true,
      maxUploads: 2,
      method: 'POST',
      previewUrl: true,
      withCredentials: false
    });

    this.inputUploadEvents = new EventEmitter<string>();
  }

  startUpload() {
    this.inputUploadEvents.emit('startUpload');
  }

  beforeUpload(uploadingFile: UploadedFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      this.errorMessage = 'File is too large!';
    }
  }

  handleUpload(data: any) {
    setTimeout(() => {
      this.zone.run(() => {
        this.response = data;
        if (data && data.response) {
          this.response = JSON.parse(data.response);
        }
      });
    });
  }

  handlePreviewData(data: any) {
    this.previewData = data;
  }
}

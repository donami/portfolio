import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'file-upload',
  styles: ['.image-preview {max-width: 50%; padding: 20px; border: #ccc 1px solid;}'],
  template: `
  <div class="field">
    <label for="file">Image</label>
    <div class="two fields">
      <div class="eight wide field">
        <input type="file" (change)="fileChangeEvent($event)" placeholder="Upload file..." />
      </div>

      <div class="eight wide field">
        <button *ngIf="!file" class="ui positive button" type="button" (click)="upload()">Upload</button>

        <div *ngIf="file" class="image-preview">
          <img src="http://localhost:3001/{{file.filename}}" alt="not found">
        </div>
      </div>

    </div>
  </div>

  `
})
export class FileUploadComponent {
  filesToUpload: Array<File>;
  file: any;

  @Output() fileUploaded = new EventEmitter();

  constructor() {
    this.filesToUpload = [];
  }

  upload() {
    this.makeFileRequest("http://localhost:3001/upload", [], this.filesToUpload).then((result) => {
      console.log(result);
      this.file = result[0];
      this.fileUploaded.emit(this.file);
      console.log(this.file);
    }, (error) => {
      console.error(error);
    });
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for(var i = 0; i < files.length; i++) {
        formData.append("uploads[]", files[i], files[i].name);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open("POST", url, true);
      xhr.send(formData);
    });
  }
}

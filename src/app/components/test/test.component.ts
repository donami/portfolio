import {Component} from '@angular/core';

@Component({
    selector: 'rx-heroes',
    template: require('./test.component.html'),
})
export class TestComponent {

  filesToUpload: Array<File>;

   constructor() {
       this.filesToUpload = [];
   }

   upload() {
       this.makeFileRequest("http://localhost:3001/upload", [], this.filesToUpload).then((result) => {
           console.log(result);
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

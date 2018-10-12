import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FileUpload } from './fileupload';
import { UploadFileService } from './upload-file.service';
import { ActivatedRoute, Params } from '@angular/router';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ik-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  selectedFiles: FileList
  currentFileUpload: FileUpload
  progress: { percentagem: number } = { percentagem: 0 }

  imagem: any
  preview: any = "../../../assets/img/prod.jpg"
 
  @Input() id: string
  @Input() basePath: string

  @Output() urlFileUpload = new EventEmitter()

  constructor(private uploadService: UploadFileService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files

    this.imagem = (<HTMLInputElement>event.target).files
    var file: File = (<HTMLInputElement>event.target).files[0]
    var fileReader = new FileReader

    fileReader.onloadend = (()=>{
      this.preview = fileReader.result;// carrega em base64 a img
    })

    if (file) {
      fileReader.readAsDataURL(file);
    } else {
      this.imagem= "../../../assets/img/prod.jpg"
    }
  }
 
  upload() {
    const file = this.selectedFiles.item(0)
    this.selectedFiles = undefined
 
    this.currentFileUpload = new FileUpload(file)
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.basePath, this.progress, this.id)
      .then((retorno)=>{
        this.urlFileUpload.emit(retorno)
      })
  }  
}

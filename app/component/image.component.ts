import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';

@Component({
	selector: 'image',
	templateUrl: 'app/views/image.html'
})

export class imageComponent { 

    filesToUpload: Array<File>;
    public name: string;
    public path: string;
    public imageNotExist: boolean;
    public imageExist: boolean;
    public disableUpload: boolean = true;

    constructor(private http: Http) {
        this.filesToUpload = [];
    }

    upload() {

        if (!this.filesToUpload) return alert(this.filesToUpload)        

        var self = this;
        this.imageNotExist = true;
        this.sign_request(self.filesToUpload[0], function(response) {            
            self.filePrepare(self.filesToUpload[0], response.signed_request, response.url, function() {
                self.path = response.signed_request.split('?')[0];
                self.name = "";
                self.imageNotExist = false;
                self.imageExist = true;
                self.disableUpload = true;
            })
        })        
    }

    filePrepare(file, signed_request, url, done) {
        var xhr = new XMLHttpRequest()
        xhr.open("PUT", signed_request)
        xhr.setRequestHeader('x-amz-acl', 'public-read')
        xhr.onload = function() {
            if (xhr.status === 200) {
                done()
            }
        }
        xhr.send(file)
    }    

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files; 
        this.name = this.filesToUpload[0].name;
        this.disableUpload = false;
    }

    sign_request(file, done) {
        var xhr = new XMLHttpRequest()
        xhr.open("GET", "/sign?file_name=" + file.name + "&file_type=" + file.type)

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText)
                done(response)
            }
        }
        xhr.send()
    }

}
System.register(['angular2/core', 'angular2/http'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var imageComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            imageComponent = (function () {
                function imageComponent(http) {
                    this.http = http;
                    this.disableUpload = true;
                    this.filesToUpload = [];
                }
                imageComponent.prototype.upload = function () {
                    if (!this.filesToUpload)
                        return alert(this.filesToUpload);
                    var self = this;
                    this.imageNotExist = true;
                    this.sign_request(self.filesToUpload[0], function (response) {
                        self.filePrepare(self.filesToUpload[0], response.signed_request, response.url, function () {
                            self.path = response.signed_request.split('?')[0];
                            self.name = "";
                            self.imageNotExist = false;
                            self.imageExist = true;
                            self.disableUpload = true;
                        });
                    });
                };
                imageComponent.prototype.filePrepare = function (file, signed_request, url, done) {
                    var xhr = new XMLHttpRequest();
                    xhr.open("PUT", signed_request);
                    xhr.setRequestHeader('x-amz-acl', 'public-read');
                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            done();
                        }
                    };
                    xhr.send(file);
                };
                imageComponent.prototype.fileChangeEvent = function (fileInput) {
                    this.filesToUpload = fileInput.target.files;
                    this.name = this.filesToUpload[0].name;
                    this.disableUpload = false;
                };
                imageComponent.prototype.sign_request = function (file, done) {
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", "/sign?file_name=" + file.name + "&file_type=" + file.type);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            var response = JSON.parse(xhr.responseText);
                            done(response);
                        }
                    };
                    xhr.send();
                };
                imageComponent = __decorate([
                    core_1.Component({
                        selector: 'image',
                        templateUrl: 'app/views/image.html'
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], imageComponent);
                return imageComponent;
            })();
            exports_1("imageComponent", imageComponent);
        }
    }
});
//# sourceMappingURL=image.component.js.map
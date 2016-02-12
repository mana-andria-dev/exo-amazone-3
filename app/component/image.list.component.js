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
    var imageListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            imageListComponent = (function () {
                function imageListComponent(http) {
                    this.http = http;
                    this.link = 'http://loocho-test-bucket.s3.amazonaws.com/';
                }
                imageListComponent.prototype.ngOnInit = function () {
                    var self = this;
                    this.http.get('/bucketList')
                        .map(function (res) { return res.json(); })
                        .subscribe(function (people) {
                        self.people = people.imageData;
                    });
                };
                imageListComponent.prototype.deleteImage = function () {
                    var self = this;
                    this.http.get('/deleteImage')
                        .map(function (res) { return res.json(); })
                        .subscribe(function (people) { return console.log(people); });
                };
                imageListComponent = __decorate([
                    core_1.Component({
                        selector: 'image-list',
                        templateUrl: 'app/views/imageList.html',
                        providers: [http_1.HTTP_PROVIDERS],
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], imageListComponent);
                return imageListComponent;
            })();
            exports_1("imageListComponent", imageListComponent);
        }
    }
});
//# sourceMappingURL=image.list.component.js.map
import {Component, OnInit} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';

@Component({
	selector: 'image-list',
	templateUrl: 'app/views/imageList.html',
	providers: [HTTP_PROVIDERS],
})

export class imageListComponent {

	public people: any;
	public link: string = 'http://loocho-test-bucket.s3.amazonaws.com/';

	constructor(private http: Http) {

	}	

	ngOnInit() {
		var self = this;
        this.http.get('/bucketList')
			// Call map on the response observable to get the parsed people object
			.map(res => res.json())
			// Subscribe to the observable to get the parsed people object and attach it to the
			// component
			.subscribe(people => {
				self.people = people.imageData;
			})	
	}

    deleteImage() {
        var self = this;
        this.http.get('/deleteImage')
            // Call map on the response observable to get the parsed people object
            .map(res => res.json())
            // Subscribe to the observable to get the parsed people object and attach it to the
            // component
            .subscribe(people => console.log(people));
    }	

}

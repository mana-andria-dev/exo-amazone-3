import {Component, View} from 'angular2/core';
import { 
	RouteConfig, 
	Router, 
	ROUTER_DIRECTIVES, 
	LocationStrategy, 
	HashLocationStrategy
} from 'angular2/router';
import {homeComponent} from './component/home.component';
import {aboutComponent} from './component/about.component';
import {imageComponent} from './component/image.component';
import {imageListComponent} from './component/image.list.component';

@Component({
	selector: 'my-app'
})
@RouteConfig([
	{
		path: "/home",
		name: "Home",
		component: homeComponent,
		useAsDefault: true
	},
	{
		path: "/about",
		name: "About",
		component: aboutComponent
	},
	{
		path: "/image",
		name: "Image",
		component: imageComponent
	},
	{
		path: "/imagelist",
		name: "ImageList",
		component: imageListComponent
	}

])
@View({
	templateUrl: 'app/views/navigation.html',
	directives: [ROUTER_DIRECTIVES]
})

export class AppComponent { }


import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
	selector: 'my-home',
	templateUrl: 'app/views/home.html',
	directives: [ROUTER_DIRECTIVES]
})

export class homeComponent { }
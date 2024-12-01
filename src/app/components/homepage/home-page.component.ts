import { Component } from "@angular/core";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ListProjectComponent } from "../list-project/list-project.component";

@Component({
    selector: 'home-page', 
    templateUrl: './home-page.component.html', 
    styleUrl: './home-page.component.css',
    imports:[SidebarComponent, NavbarComponent, ListProjectComponent]
})
export class HomeComponent{
    	
}
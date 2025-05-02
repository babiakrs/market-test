import { Component } from "@angular/core";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CatalogComponent } from "../catalog/catalog.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  imports: [SidebarComponent, CatalogComponent, HeaderComponent],
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  host: { class: 'flex' },
})
export class ShellComponent {
}

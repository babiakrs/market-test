import { Component, inject } from "@angular/core";
import { CatalogService } from "../../catalog.service";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle";

@Component({
  imports: [MatFormField, MatInput, MatButtonToggleGroup, MatButtonToggle],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  catalogService = inject(CatalogService);
}

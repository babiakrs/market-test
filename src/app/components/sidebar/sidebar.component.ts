import { Component, effect, inject } from "@angular/core";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatSliderModule } from '@angular/material/slider';
import { toSignal } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatInput } from "@angular/material/input";
import { MatOption } from "@angular/material/autocomplete";
import { MatSelect } from "@angular/material/select";
import { CatalogService } from "../../catalog.service";

@Component({
  imports: [ReactiveFormsModule, MatSliderModule, MatFormField, MatInput, MatLabel, MatSelect, MatOption],
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  catalogService = inject(CatalogService);

  form = new FormGroup({
    minPrice: new FormControl(this.catalogService.minPrice(), { nonNullable: true }),
    maxPrice: new FormControl(this.catalogService.maxPrice(), { nonNullable: true }),
    categories: new FormControl<string[]>([], { nonNullable: true }),
    brands: new FormControl<string[]>([], { nonNullable: true }),
  });

  filterChange = toSignal(this.form.valueChanges, { initialValue: this.form.value });
  #filterEffect = effect(
    () => this.catalogService.filter.set({
      ...this.catalogService.defaultFilter(),
      ...this.filterChange(),
    })
  );

  priceFormatter(value: number): string {
    return value.toString();
  }
}

import { Component, inject } from "@angular/core";
import { CatalogService } from "../../catalog.service";
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardSubtitle, MatCardTitle, MatCardTitleGroup } from "@angular/material/card";
import { MatChip, MatChipSet } from "@angular/material/chips";
import { CurrencyPipe } from "@angular/common";

@Component({
  imports: [MatCard, MatCardHeader, MatCardFooter, MatCardContent, MatCardTitleGroup, MatCardTitle, MatCardSubtitle, MatChip, MatChipSet, CurrencyPipe],
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent {
  catalogService = inject(CatalogService);
}

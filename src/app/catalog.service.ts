import { computed, effect, Injectable, linkedSignal, signal, untracked } from "@angular/core";
import { DATA } from "./data";

export interface Filter {
  minPrice: number;
  maxPrice: number;
  categories: string[];
  brands: string[];
}

function arrayFilter<T>(array: T[], item: T): boolean {
  return array.length > 0 ? array.includes(item) : true;
}

@Injectable({ providedIn: 'root' })
export class CatalogService {
  defaultFilter = signal<Filter>({
    minPrice: 0,
    maxPrice: 999_999_999,
    categories: [],
    brands: [],
  });

  source = signal(DATA);
  state = linkedSignal(() => this.source());
  filter = linkedSignal(() => this.defaultFilter());
  search = signal('');
  sorting = signal<'maxRating' | 'minPrice' | 'maxPrice' | 'maxReviews' | null>(null);

  minPrice = computed(() => Math.min(...this.source()?.map(({ price }) => price)));
  maxPrice = computed(() => Math.max(...this.source()?.map(({ price }) => price)));
  categories = computed(() => [...new Set(this.source().map(({ category }) => category))]);
  brands = computed(() => [...new Set(this.source().map(({ brand }) => brand))]);

  #updateEffect = effect(() => {
    const filter = this.filter();
    const search = this.search().toLowerCase();
    const sorting = this.sorting();

    this.state.set(
      this.source()
        .filter(({ price }) => price >= filter.minPrice && price <= filter.maxPrice)
        .filter(({ category }) => arrayFilter(filter.categories, category))
        .filter(({ brand }) => arrayFilter(filter.brands, brand))
        .filter(({ name, description }) => name.toLowerCase().includes(search) || description.toLowerCase().includes(search))
        .sort((a, b) => {
          switch (sorting) {
            case 'maxRating': return b.rating - a.rating;
            case 'minPrice': return a.price - b.price;
            case 'maxPrice': return b.price - a.price;
            case 'maxReviews': return b.reviews - a.reviews;
            default: return 0;
          }
        })
    );
  });
}

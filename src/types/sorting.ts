export type SortOption = 
    | 'price-asc' 
    | 'price-desc' 
    | 'name-asc' 
    | 'name-desc' 
    | 'horsepower-desc'
    | 'year-desc'
    | 'year-asc';

export interface SortConfig {
    option: SortOption;
    label: string;
}
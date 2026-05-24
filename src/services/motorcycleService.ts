import type { Motorcycle, Category } from '../types/motorcycle';

export async function fetchMotorcycles(): Promise<Motorcycle[]> {
    const response = await fetch('https://cdn.freecodecamp.org/curriculum/labs/data/motorcycles.json');
    const data = await response.json();
    
    return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        manufacturer: item.manufacturer,
        category: item.category as Category,
        price: item.price,
        image_url: item.image_url,
        created_at: new Date(item.created_at),
        description: item.description,
        year: item.year,
        horsepower: Math.floor(Math.random() * (200 - 80 + 1) + 80)
    }));
}
export async function fetchMotorcycleById(id: string): Promise<Motorcycle | undefined> {
    const motorcycles = await fetchMotorcycles();
    return motorcycles.find(motorcycle => motorcycle.id === id);
}
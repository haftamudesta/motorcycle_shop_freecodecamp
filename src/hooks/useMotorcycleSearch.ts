import { useState, useEffect, useCallback } from 'react';
import type { Motorcycle } from '../types/motorcycle';
import type { SortOption } from '../types/sorting';
import { fetchMotorcycles } from '../services/motorcycleService';

export function useMotorcycleSearch() {
    const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
    const [filteredMotorcycles, setFilteredMotorcycles] = useState<Motorcycle[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState<SortOption>('year-desc');

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await fetchMotorcycles();
                setMotorcycles(data);
                setFilteredMotorcycles(data);
            } catch (error) {
                console.error('Failed to fetch motorcycles:', error);
            } finally {
                setLoading(false);
            }
        };
        
        loadData();
    }, []);

    const sortMotorcycles = useCallback((bikes: Motorcycle[]): Motorcycle[] => {
        const sorted = [...bikes];
        
        switch (sortOption) {
            case 'price-asc':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return sorted.sort((a, b) => b.price - a.price);
            case 'name-asc':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                return sorted.sort((a, b) => b.name.localeCompare(a.name));
            case 'horsepower-desc':
                return sorted.sort((a, b) => (b.horsepower || 0) - (a.horsepower || 0));
            case 'year-desc':
                return sorted.sort((a, b) => b.year - a.year);
            case 'year-asc':
                return sorted.sort((a, b) => a.year - b.year);
            default:
                return sorted;
        }
    }, [sortOption]);

    useEffect(() => {
        let filtered = [...motorcycles];
        
        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(motorcycle =>
                motorcycle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                motorcycle.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        filtered = sortMotorcycles(filtered);
        
        setFilteredMotorcycles(filtered);
    }, [searchTerm, motorcycles, sortOption, sortMotorcycles]);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    const handleSortChange = useCallback((option: SortOption) => {
        setSortOption(option);
    }, []);

    const getCurrentSortLabel = useCallback((): string => {
        const labels: Record<SortOption, string> = {
            'price-asc': 'Price: Low to High',
            'price-desc': 'Price: High to Low',
            'name-asc': 'Name: A to Z',
            'name-desc': 'Name: Z to A',
            'horsepower-desc': 'Horsepower: High to Low',
            'year-desc': 'Year: Newest First',
            'year-asc': 'Year: Oldest First'
        };
        return labels[sortOption];
    }, [sortOption]);

    return {
        filteredMotorcycles,
        searchTerm,
        loading,
        sortOption,
        handleSearchChange,
        handleSortChange,
        getCurrentSortLabel,
        totalResults: filteredMotorcycles.length
    };
}
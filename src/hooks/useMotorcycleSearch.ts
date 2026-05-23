import { useState, useEffect, useCallback } from 'react';
import type{ Motorcycle } from '../types/motorcycle';
import { fetchMotorcycles } from '../services/motorcycleService';

export function useMotorcycleSearch() {
    const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
    const [filteredMotorcycles, setFilteredMotorcycles] = useState<Motorcycle[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load data from API
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

    useEffect(() => {
        // Filter motorcycles based on search term
        if (searchTerm.trim() === '') {
            setFilteredMotorcycles(motorcycles);
        } else {
            const filtered = motorcycles.filter(motorcycle =>
                motorcycle.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredMotorcycles(filtered);
        }
    }, [searchTerm, motorcycles]);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    return {
        filteredMotorcycles,
        searchTerm,
        loading,
        handleSearchChange,
        totalResults: filteredMotorcycles.length
    };
}
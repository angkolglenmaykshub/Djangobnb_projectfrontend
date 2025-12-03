'use client';


import { useEffect, useState } from 'react';
import PropertyListItem from "./PropertyListItem";
import apiService from '@/app/services/apiService';


export type PropertyType = {
    id: string;
    title: string;
    image_url: string;
    price_per_night: number;
}


const PropertyList = () => {
    const [properties, setProperties] = useState<PropertyType[]>([]);


    const getProperties = async () => {
        try {
            const tmpProperties = await apiService.get('/api/properties/')
            setProperties(tmpProperties.data);
        } catch (error) {
            console.error('Failed to fetch properties:', error);
            // Optionally, you could set an error state here to show a message to the user
        }
    };


    useEffect(() => {
        getProperties();
    }, []);


    return (
        <>
            {properties.map((property) => {
                return (
                    <PropertyListItem
                        key={property.id}
                        property={property}
                    // markFavorite={(is_favorite: any) => markFavorite(property.id, is_favorite)}
                    />
                )
            })}
        </>
    )
}


export default PropertyList;
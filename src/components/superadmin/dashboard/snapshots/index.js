import React from 'react';

const data = [
    { name: 'Innovation Deck', connections: 2, role: 'Hybrid', admin: 'Clear' },
    { name: 'Innovation Deck', connections: 2, role: 'Hybrid', admin: 'Clear' },
    { name: 'Innovation Deck', connections: 2, role: 'Hybrid', admin: 'Clear' },
    { name: 'Innovation Deck', connections: 2, role: 'Hybrid', admin: 'Clear' }
];

export default function index() {
    return (
        <div>
            {data.map(item => (
                <p>{item.name}</p>
            ))}
        </div>
    );
}

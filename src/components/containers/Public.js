import React from 'react';
import './public.css';

export default function Public({ children }) {
    return (
        <div className="container">
            {children}
            <div className="corner corner_top">
                <img src={'/vector-13.png'} />
            </div>
            <div className="corner corner_bottom">
                <img src={'/vector-14.png'} />
            </div>
            <div className="copyright">
                <span>© Copyright 2022 distro.energy</span>
            </div>
        </div>
    );
}

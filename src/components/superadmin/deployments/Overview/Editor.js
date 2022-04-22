import React, { useEffect, useRef } from 'react';

const noop = () => {};

export default ({
                             html,
                             onChange = noop,
                         }) => {

    const ref       = useRef(null);
    const lastHtml  = useRef('');

    const emitChange = (e) => {
            onChange((e.target.value));
    };

    return (
        <textarea
            onChange={emitChange}
            placeholder={'Enter any geojson for the layer'}
            ref={ref}
        >{html}</textarea>
    );
};

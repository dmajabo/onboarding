import React from 'react';

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { utils } from '@rjsf/core';

const { asNumber, guessType } = utils;

const nums = new Set(['number', 'integer']);

const processValue = (schema, value) => {
    const { type, items } = schema;
    if (value === '') {
        return undefined;
    } else if (type === 'array' && items && nums.has(items.type)) {
        return value.map(asNumber);
    } else if (type === 'boolean') {
        return value === 'true';
    } else if (type === 'number') {
        return asNumber(value);
    }

    if (schema.enum) {
        if (schema.enum.every((x) => guessType(x) === 'number')) {
            return asNumber(value);
        } else if (schema.enum.every((x) => guessType(x) === 'boolean')) {
            return value === 'true';
        }
    }

    return value;
};

const SelectWidget = ({
    schema,
    id,
    options,
    label,
    required,
    disabled,
    readonly,
    value,
    variant,
    multiple,
    autofocus,
    onChange,
    onBlur,
    onFocus,
    rawErrors = [],
}) => {
    const { enumOptions, enumDisabled } = options;

    const emptyValue = multiple ? [] : '';

    const _onChange = ({ target: { value } }) =>
        onChange(processValue(schema, value));
    const _onBlur = ({ target: { value } }) =>
        onBlur(id, processValue(schema, value));
    const _onFocus = ({ target: { value } }) =>
        onFocus(id, processValue(schema, value));

    return (
        <TextField
            id={id}
            label={label || schema.title}
            variant={schema.variant}
            size="small"
            select
            value={typeof value === 'undefined' ? emptyValue : value}
            required={required}
            disabled={disabled || readonly}
            autoFocus={autofocus}
            error={rawErrors.length > 0}
            onChange={_onChange}
            onBlur={_onBlur}
            onFocus={_onFocus}
            InputLabelProps={{
                shrink: true,
            }}
            SelectProps={{
                multiple: typeof multiple === 'undefined' ? false : multiple,
            }}
        >
            {enumOptions
                .map(({ value, label }, i) => {
                    const disabled =
                        enumDisabled && enumDisabled.indexOf(value) != -1;
                    return (
                        <MenuItem key={i} value={value} disabled={disabled}>
                            {label}
                        </MenuItem>
                    );
                })
                //.concat([<MenuItem value=""><em>None</em></MenuItem>])
            }
        </TextField>
    );
};

export default SelectWidget;

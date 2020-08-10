import React from 'react';

type Props = {
    query: string;
    onSearch: (t: React.FormEvent<HTMLInputElement>) => void;
}

const SelectField = ({ query, onSearch }: Props) => {

    return (
        <input defaultValue={query} onChange={onSearch} />
    );
}

export default SelectField;

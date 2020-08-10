import React from 'react';

import Title from '../../components/title/title'
import Picture from '../../components/picture/picture'
import './model-template.scss';

import { Phone } from '../../types';

type Props = {
    onDelete: () => void;
    phone: Phone;
}

const Model = ({ phone, onDelete }: Props) => {

    return (
        <div className="Model">
            <div className="Model-controls">
                <button onClick={onDelete}>x</button>
            </div>

            <Picture url={phone.displayImageUrl} />
            <Title name={phone.displayName} />
        </div>
    );
}

export default Model;

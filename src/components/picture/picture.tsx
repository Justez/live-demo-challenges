import React from 'react';

const Model = ({ url }: { url: string }) => {

    return (
        <div className="Picture">
            <img src={url} alt="model"/>
        </div>
    );
}

export default Model;

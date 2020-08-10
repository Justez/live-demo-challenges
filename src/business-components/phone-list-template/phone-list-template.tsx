import React from 'react';
import ModelTemplate from '../../business-components/model/model-template'
import { Phone } from '../../types';
import './phone-list-template.scss';

type Props = {
  phones: Array<Phone>;
  onDelete: (id: Phone['id']) => void;
}

const PhoneList = ({ phones, onDelete }: Props) => {

  return (
    <div className="PhoneList">
      {phones.length > 0 && phones.map(phone =>
        <ModelTemplate
          phone={phone}
          key={phone.displayName}
          onDelete={onDelete.bind(undefined, phone.id)}
        />
      )}
    </div>
  );
}

export default PhoneList;

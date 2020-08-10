import React, { useState, useEffect } from 'react';
import './App.scss';
import PhoneListTemplate from '../../business-components/phone-list-template/phone-list-template'
import SearchField from '../../business-components/brand-search-field/field'
import { Phone } from '../../types';

const App = () => {
  const [phones, setPhones] = useState([])
  const [query, setQuery] = useState('')
  
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/michr0/interview-api/master/brands.json')
    .then(data => data.json())
    .then(res => setPhones(res.options.reverse()));
  }, [])
  
  useEffect(() => {
    if (query) {
      setPhones(phones.filter((phone: Phone) => phone.displayName.includes(query)))
    } else {
      !query && fetch('https://raw.githubusercontent.com/michr0/interview-api/master/brands.json')
      .then(data => data.json())
      .then(res => setPhones(res.options.reverse()));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const handleSearch = ({ target: { value }}: any) => {
    setQuery(value)
  }

  const handleDelete = (id: Phone['id']) => {
    setPhones(phones.filter((phone: Phone) => phone.id !== id))
  }

  const handleSort = () => {
    setPhones(
      phones.sort(({ displayName: name1 }: Phone, { displayName: name2 }:Phone) => {
        var nameA = name1.toUpperCase();
        var nameB = name2.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      })
      )

  }
  
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleSort}>sort</button>
        <SearchField query={query} onSearch={handleSearch} />
      </header>
      <PhoneListTemplate phones={phones} onDelete={handleDelete} />
    </div>
  );
}

export default App;

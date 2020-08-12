import React, { useState, useEffect } from 'react';
import './App.scss';

const App = () => {
  const [user, setUser] = useState('x');
  const [selected, setSelected] = useState({ x: [], o: [] });
  const [winner, setWinner] = useState('')

  useEffect(() => {
    for (let row = 0; row < 3; row++) {
      const filter = ([x, y]: any) => row === y
      if (selected.x.filter(filter).length === 3) {
        setWinner('x');
        break;
      }
      if (selected.o.filter(filter).length === 3) {
        setWinner('o');
        break;
      }
    }
    
    for (let column = 0; column < 3; column++) {
      const filter = ([x, y]: any) => column === x
      if (selected.x.filter(filter).length === 3) {
        setWinner('x');
        break;
      }
      if (selected.o.filter(filter).length === 3) {
        setWinner('o');
        break;
      }
    }

    let firstDiagX = 0;
    let secDiagX = 0;
    let firstDiagO = 0;
    let secDiagO = 0;
    for (let i = 0; i<3; i++) {
      selected.x.forEach(([x, y]: any) => {
        if (x === i && y === i) firstDiagX++;
        if (x === 2-i && y === i) secDiagX++;
      });
      selected.o.forEach(([x, y]: any) => {
        if (x === i && y === i) firstDiagO++;
        if (x === 2-i && y === i) secDiagO++;
      });
      if (firstDiagX === 3 || secDiagX === 3) setWinner('x')
      if (firstDiagO === 3 || secDiagO === 3) setWinner('o')
    }
  }, [winner, selected])

  const handlePlaceItem = (x: number, y: number) => {
    if (user === 'x') {
      //@ts-ignore
      setSelected({ ...selected, x: [...selected.x, [x, y]] })
    } else {
      //@ts-ignore
      setSelected({ ...selected, o: [...selected.o, [x, y]] })
    }
    setUser(user === 'x' ? 'o' : 'x')
  }

  const cells = (xind: number) => {
    return (new Array(3).fill(2).map((j, ind) => {
      const tag = (
        selected.x.find(([x1, y1]) => x1 === xind && y1 === ind) && 'x'
      )
        ||
        (
          selected.o.find(([x1, y1]) => x1 === xind && y1 === ind) && 'o'
        )

      return (
        <button key={`${xind}${ind}`} disabled={!!tag} className="Cell" onClick={handlePlaceItem.bind(undefined, xind, ind)}>
          {tag}
        </button>
      )
    }
    ))
  }

  return (
    <>
      <header className="App-header">
        <button className={user === 'x' ? 'active' : ''}>First user</button>
        <button className={user === 'o' ? 'active' : ''}>Second user</button>
      </header>

      <div className="Grid">
        {!winner && (new Array(3).fill(2).map((i, xind) =>
          <div key={`${xind}`} className="Column">
            {/* disable already clicked */}
            {cells(xind)}
          </div>
        ))}
        {winner && `${winner} won!`}
      </div>
    </>
  );
}

export default App;

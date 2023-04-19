import { useState } from 'react'
import './App.css'

const TURNS = {
  X: 'x',
  O: 'o'
}



const Square = ({children, updateBoard, index, isSelected}) => {
  
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index);
  }

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWiner] = useState(null)

  const updateBoard = (index) => {
    //Si ya tiene algo, no hacemos nada
    if(board[index]) return
    
    //Si no tiene nada, actualizamos el board y el turno
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    
    const newTurn = turn === TURNS.X ? TURNS.O :  TURNS.X
    setTurn(newTurn)
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <section className='game'>
        {
          board.map((square, index) =>  {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {square}
              </Square>              
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
    </main>
  )
}

export default App

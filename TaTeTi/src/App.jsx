import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square.jsx'
import { TURNS, WINNER_COMBOS } from './constants.js'
import { WinnerModal } from './components/WinnerModal.jsx'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index) => {
    //Si ya tiene algo, no hacemos nada
    if(board[index] || winner) return
    
    //Actualizamos el board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //Actualizamos el nuevo turno
    const newTurn = turn === TURNS.X ? TURNS.O :  TURNS.X
    setTurn(newTurn)

    //Verificamos si hay un ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner) //como actualiza el estado, y eso es asíncrono, no bloquea la ejecución del codigo que viene despues
      //console.log(winner) podría tener el valor como no, porque es ASÍNCRONO!!!!! no hacer asi para detectar el ganador
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }

  }

  const checkWinner = (boardToCheck) => {
    //No usamos el board del estado porque es ASÍNCRONO, el setBoard(newBoard) no garantiza que ya figure el board ultimo
    //Revisamos todas las combinaciones posibles a ver si coinciden
      console.log("-----------NUEVOS COMBO--------")
    for(const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      
      console.log(boardToCheck[a],boardToCheck[b], boardToCheck[c])

      if(boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[b] === boardToCheck[c]){
        return boardToCheck[a]
      }
    }
    //Si no ganó, retornamos null
    return null
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Resetear</button>
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
      <section>
        <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
      </section>
    </main>
  )
}

export default App

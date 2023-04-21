import { GameStep } from '../lib/HoGuMaMachine'

type Props = {
  words: string
  step: GameStep
}

const WordSpinner: React.FC<Props> = ({words, step}) =>{

  return (
    <>
      <div>
        {words}
      </div>
      <p>
        {step.char} / {step.isMyTurn ? 'O' : 'X'}
      </p>
    </>
  )
}

export default WordSpinner

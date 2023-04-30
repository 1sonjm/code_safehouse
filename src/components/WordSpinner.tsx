import { GameStep } from '../lib/HoGuMaMachine'

export default function WordSpinner({words, step}: {
  words: string
  step: GameStep
}) {

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

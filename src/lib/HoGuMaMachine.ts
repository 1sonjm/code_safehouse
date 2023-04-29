export interface GameHistory {
  gameSetting:GameSetting
  rearrangedWords:Array<string>
}

export interface GameSetting {
  words:string
  memberCount:number
  startIndex:number
}

export interface GameStep {
  totalCount:number
  char:string
  isMyTurn:boolean
}

export default class HoGuMaMachine {
	date:Date = new Date()
	history: Array<GameHistory> = []

	private gameSetting: GameSetting = {
		words: '',
		memberCount: 2,
		startIndex: 0,
	}
	rearrangedWords!:Array<string>
	wordsIndex:number = 0
	count:number = 0
	isCountUserOnly:boolean = false

	constructor(words?:string, memberCount?:number, startIndex?: number) {
		this.updateGameSetting(words, memberCount, startIndex)

		this.rearrangeWordsProcess()
	}

	/**
   * 게임 설정값 오류 확인
   */
	private updateGameSetting (
		words: string | null = this.gameSetting.words || '호박고구마',
		memberCount: number | null = this.gameSetting.memberCount || 2,
		startNumber: number | null = this.gameSetting.startIndex || 1
	) {
		this.reset()

		if (words !== null) {
			if (words.length) {
				this.gameSetting.words = words
			} else {
				throw new Error(`제시 단어가 잘못되었습니다. 입력값: ${words}`)
			}
		}

		if(memberCount !== null){
			if (memberCount > 1) {
				this.gameSetting.memberCount = memberCount
			} else {
				throw new Error(`참가인원이 잘못되었습니다. 입력값: ${memberCount}`)
			}
		}

		if(startNumber !== null){
			if (startNumber >= 0 && startNumber <= this.gameSetting.memberCount) {
				this.gameSetting.startIndex = startNumber - 1
			} else {
				throw new Error(`순번이 잘못되었습니다. 입력값: ${startNumber}`)
			}
		}
	}

	/**
   * 제시 단어를 재정렬하여 초기화
   */
	private rearrangeWordsProcess () {
		const { words, memberCount, startIndex } = this.gameSetting
		const rangeLimit = words.length > memberCount ? words.length : memberCount
		let i = startIndex

		this.rearrangedWords = []
		while (this.rearrangedWords.length < rangeLimit) {
			while (i >= words.length) {
				i -= words.length
			}

			this.rearrangedWords.push(words[i])
			if (this.rearrangedWords.length >= words.length) {
				const repeat = this.findRepeatingWords(this.rearrangedWords)
				if (repeat) {
					break
				}
			}

			i += memberCount
		}

		this.saveHistory()
	}

	/**
   * 반복되는 단어 추출
   * @returns 재정렬된 단어
   */
	private findRepeatingWords(targetWords: string[]): string[] | null {
		for (let i = 0; i < targetWords.length; i++) {
			let checkedWords = targetWords.slice(0, i + 1)
			let repeated = true
			for (let j = 0; j < targetWords.length; j += checkedWords.length) {
				if (targetWords.slice(j, j + checkedWords.length).join('') !== checkedWords.join('')) {
					repeated = false
					break
				}
			}
			if (repeated) {
				return checkedWords
			}
		}
		return null
	}

	/**
   * 지난 게임정보 기록
   */
	private saveHistory() {
		if (this.history.length > 10) {
			this.history.splice(0, 1)
		}

		this.history.push({
			gameSetting: {...this.gameSetting},
			rearrangedWords: [...this.rearrangedWords],
		})
	}
	public getHistory() {
		return this.history
	}

	/**
   * 참여 순번 변경
   * @param newStartIndex 변경할 순번
   */
	public changeStartIndex (newStartIndex:number) {
		this.updateGameSetting(null, null, newStartIndex)
		this.rearrangeWordsProcess()
	}

	/**
   * 참여자 수 변경
   * @param newMemberCount 변경할 인원
   * @param newStartIndex 변경할 순번
   */
	public changeMemberCount (newMemberCount:number, newStartIndex?:number | null) {
		this.updateGameSetting(null, newMemberCount, newStartIndex)
		this.rearrangeWordsProcess()
	}

	/**
   * 제시 단어 변경
   * @param newStartIndex 변경할 순번
   * @param newMemberCount 변경할 인원
   * @param newStartIndex 변경할 순번
   */
	public changeWords (newWords:string, newMemberCount?:number | null, newStartIndex?:number | null) {
		this.updateGameSetting(newWords, newMemberCount, newStartIndex)
		this.rearrangeWordsProcess()
	}

	/**
   * 재정렬된 제시어를 반환
   * @returns 재정렬된 단어
   */
	public getRearrangeWords () {
		return {
			gameSetting: this.gameSetting,
			rearrangedWords: this.rearrangedWords,
		}
	}

	/**
   * 진행상황 초기화
   */
	public reset() {
		this.wordsIndex = 0
		this.count = 0
	}

	/**
   * 순번대로 제시어에 대한 결과를 반환
   * @returns 순번 진행 결과
   */
	public async nextStep (): Promise<GameStep> {
		return new Promise((resolve, rejects) => {
			let repeatCount = this.isCountUserOnly ? 2 : 1

			while (repeatCount > 0) {
				repeatCount -= 1
				this.count += 1

				const step = this.getStep()

				this.wordsIndex += 1
				if (this.wordsIndex > this.gameSetting.words.length - 1){
					this.wordsIndex = 0
				}

				resolve(step)
			}
			rejects(null)
		})
	}

	public getStep () {
		const step:GameStep = {
			char: this.gameSetting.words[this.wordsIndex],
			isMyTurn: false,
			totalCount: this.count,
		}

		if (this.count % this.gameSetting.memberCount - 1 === 0) {
			step.isMyTurn = true
		}

		return step
	}
}

/**
// TEST
try {
  const game = new HoGuMaMachine('떡볶이', 2, 1)
  game.changeStartIndex(4) // error
  console.log(game.getRearrangeWords())

  game.changeStartIndex(2)
  console.log(game.getRearrangeWords())

  game.changeMemberCount(3, 1)
  console.log(game.getRearrangeWords())

  game.changeWords('호구마')
  console.log(game.getRearrangeWords())

  game.changeMemberCount(5, 3)
  console.log(game.getRearrangeWords())

  game.changeWords('호박고구마', 3, 1)
  console.log(game.getRearrangeWords())

  for (let i=0; i<10; i++) {
      console.log(game.nextStep())
  }

  console.log(game.getHistory())
} catch (error) {
  console.error('예외처리', error)
}
// TEST
*/
// TODO - speech api 읽어주는 기능 추가

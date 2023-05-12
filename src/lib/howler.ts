import { Howl } from 'howler'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH

export interface GameSetting {
  words:string
  memberCount:number
  startIndex:number
}

const basePathHowler = (publicPath: string) => {
	const sounds = new Howl({
		src: [`${basePath}/${publicPath}`],
	})
	return sounds
}
export default basePathHowler

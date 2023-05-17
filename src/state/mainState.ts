import { atom } from 'recoil'

export const mainState = atom({
	key: 'mainState',
	default: {
		isMute: false,
	},
})

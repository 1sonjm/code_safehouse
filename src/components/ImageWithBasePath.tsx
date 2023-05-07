/* eslint-disable jsx-a11y/alt-text */
import Image, { ImageProps } from 'next/image'
import React from 'react'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH
/**
 * image component가 basePath 적용을 받지 않는 문제 수정
 * @param props next/image props
 * @returns next/image component
 */
const ImageWithBasePath: React.FC<ImageProps> = (props) => {
	if(typeof props.src === 'string'){
		const url = props.src?.startsWith('/')
			? `${basePath || ''}${props.src}`
			: props.src
		return <Image {...props} src={url} />
	}
	return <Image {...props} />
}

export default ImageWithBasePath

import { setProjectAnnotations } from '@storybook/react-vite'
import { beforeAll } from 'vitest'

import * as projectAnnotations from './preview'

// 스토리의 글로벌 설정(데코레이터·파라미터)을 테스트 런타임에 적용
const project = setProjectAnnotations([projectAnnotations])

beforeAll(project.beforeAll)

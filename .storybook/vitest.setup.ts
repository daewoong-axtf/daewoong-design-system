import * as a11yAnnotations from '@storybook/addon-a11y/preview'
import { setProjectAnnotations } from '@storybook/react-vite'
import { beforeAll } from 'vitest'

import * as projectAnnotations from './preview'

// 스토리의 글로벌 설정(데코레이터·파라미터)을 테스트 런타임에 적용. a11y 주석이 있어야 parameters.a11y.test가 실제로 돈다
const project = setProjectAnnotations([a11yAnnotations, projectAnnotations])

beforeAll(project.beforeAll)

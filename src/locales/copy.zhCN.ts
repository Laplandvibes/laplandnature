import type { SectionCopy } from './types'
import { deepMerge } from './merge'
import en from './copy.en'
import { ZHCN_OVERRIDES } from './overrides.zhCN'

const zhCN: SectionCopy = deepMerge(en, ZHCN_OVERRIDES)

export default zhCN

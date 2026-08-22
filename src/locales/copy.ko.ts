import type { SectionCopy } from './types'
import { deepMerge } from './merge'
import en from './copy.en'
import { KO_OVERRIDES } from './overrides.ko'

const ko: SectionCopy = deepMerge(en, KO_OVERRIDES)

export default ko

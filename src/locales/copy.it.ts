import type { SectionCopy } from './types'
import { deepMerge } from './merge'
import en from './copy.en'
import { IT_OVERRIDES } from './overrides.it'

const it: SectionCopy = deepMerge(en, IT_OVERRIDES)

export default it

import type { SectionCopy } from './types'
import { deepMerge } from './merge'
import en from './copy.en'
import { ES_OVERRIDES } from './overrides.es'

const es: SectionCopy = deepMerge(en, ES_OVERRIDES)

export default es

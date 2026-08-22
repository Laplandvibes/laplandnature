import type { SectionCopy } from './types'
import { deepMerge } from './merge'
import en from './copy.en'
import { NL_OVERRIDES } from './overrides.nl'

const nl: SectionCopy = deepMerge(en, NL_OVERRIDES)

export default nl

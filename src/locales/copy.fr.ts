import type { SectionCopy } from './types'
import { deepMerge } from './merge'
import en from './copy.en'
import { FR_OVERRIDES } from './overrides.fr'

const fr: SectionCopy = deepMerge(en, FR_OVERRIDES)

export default fr

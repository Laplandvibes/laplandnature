import type { SectionCopy } from './types'
import { deepMerge } from './merge'
import en from './copy.en'
import { PTBR_OVERRIDES } from './overrides.ptBR'

const ptBR: SectionCopy = deepMerge(en, PTBR_OVERRIDES)

export default ptBR

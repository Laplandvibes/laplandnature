import type { SectionCopy } from './types'
import { deepMerge } from './merge'
import en from './copy.en'
import { SV_OVERRIDES } from './overrides.sv'

const sv: SectionCopy = deepMerge(en, SV_OVERRIDES)

export default sv

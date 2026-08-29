export type SectionCopy = {
  nav: {
    nationalParks: string
    hiking: string
    wildlife: string
    northernLights: string
    seasons: string
    conservation: string
    freshwater: string
  }
  newsletter: {
    eyebrow: string
    h2Line1: string
    h2Line2: string
    lead: string
    benefits: { title: string; body: string }[]
    emailPlaceholder: string
    sendBtn: string
    sending: string
    successMsg: string
    errorPrefix: string
    errorFallback: string
    footnote: string
    privacyLink: string
  }
  popup: {
    eyebrow: string
    h: string
    lead: string
    bullets: string[]
    cta: string
    sending: string
    placeholder: string
    success: string
    privacy: string
  }
  affiliateDisclosure: {
    body: string
  }
  footerCookie: {
    affiliateNote: string
  }
  map: {
    kicker: string
    h2: string
    lead: string
    foot: string
    openGuide: string
    /** Label for the 'back to the whole-of-Lapland view' control on the map. */
    resetView?: string
    legend: { park: string; aurora: string; trail: string; wildlife: string }
    pins: { name: string; note: string }[]
  }
  home: {
    metaTitle: string
    metaDescription: string
    hero: {
      eyebrow: string
      title: string
      subtitle: string
      description: string
      primaryCta: string
      secondaryCta: string
      alt?: string
    }
    band: {
      kicker: string
      h: string // contains a span for the latitude, we render plain text
      hHighlight: string
      hSuffix: string
      stats: { value: string; primary: string; body: string }[]
    }
    featured: {
      kicker: string
      h2: string
      lead: string
      items: { tag: string; title: string; blurb: string; cta: string }[]
    }
    map: {
      kicker: string
      h2: string
      lead: string
      foot: string
    }
    ctaBand: {
      h2: string
      lead: string
      primary: string
      secondary: string
    }
  }
  northernLights: {
    metaTitle: string
    metaDescription: string
    hero: { eyebrow: string; title: string; subtitle: string; description: string; alt?: string }
    bestSeason: string
    bestSeasonValue: string
    bestSeasonSuffix: string
    spotsH2: string
    spotsLead: string
    spots: { name: string; description: string }[]
    stayCta: string
    tipsH2: string
    tips: string[]
    oneNightKicker: string
    oneNightH2: string
    oneNightLead: string
    oneNightSteps: { time: string; title: string; body: string; highlight?: boolean }[]
    cards: { title: string; body: string }[]
    finalH2: string
    finalLead: string
    finalCta: string
    crossLinks: { aurora: string; parks: string; igloos: string }
    faq: { eyebrow: string; h2: string; items: { q: string; a: string }[] }
  }
  nationalParks: {
    metaTitle: string
    metaDescription: string
    hero: { eyebrow: string; title: string; subtitle: string; description: string; alt?: string }
    parks: { name: string; description: string; highlight: string; visited: string }[]
    weThere: string
    stayNearby: string
    hettaKicker: string
    hettaH2: string
    hettaLead: string
    days: { day: string; title: string; body: string; note: string }[]
    differentlyH3: string
    differently: string[]
    preWalkCta: string
    postWalkCta: string
    crossH3: string
    crossLead: string
    crossLinks: { trails: string; wildlife: string; season: string; stays: string }
    faq: { eyebrow: string; h2: string; items: { q: string; a: string }[] }
  }
  wildlife: {
    metaTitle: string
    metaDescription: string
    hero: { eyebrow: string; title: string; subtitle: string; description: string; alt?: string }
    animals: { name: string; description: string; status: string }[]
    statuses: {
      common: string
      criticallyEndangered: string
      nearThreatened: string
      endangered: string
      rareVisitor: string
      nationalBird: string
    }
    bearKicker: string
    bearH2: string
    bearBody: string[]
    browseHidesCta: string
    preNightCta: string
    bearNightKicker: string
    bearNightH2: string
    bearNightLead: string
    bearNightSteps: { time: string; title: string; body: string; highlight?: boolean }[]
    cards: { title: string; body: string }[]
    finalH2: string
    finalLead: string
    finalCta: string
    crossLinks: { conservation: string; parks: string; husky: string }
    faq: { eyebrow: string; h2: string; items: { q: string; a: string }[] }
  }
  bearKuusamo: {
    metaTitle: string
    metaDescription: string
    partnership: string
    hero: { eyebrow: string; title: string; subtitle: string; description: string; alt: string }
    intro: string
    introLinkBefore: string
    anchorWatching: string
    introLinkAfter: string
    hideKicker: string
    hideH2: string
    hideBody: string[]
    treeCaption: string
    photoCredit: string
    waysKicker: string
    waysH2: string
    ways: { title: string; body: string }[]
    season: string[]
    bookingBefore: string
    bookingLink: string
    bookingAfter: string
    whereKicker: string
    whereH2: string
    whereBefore: string
    anchorTour: string
    whereAfter: string
    ctaLabel: string
    logoAlt: string
    photosCredit: string
    crossKicker: string
    crossWildlife: string
    crossHub: string
    wildlifeCardKicker: string
    wildlifeCardTitle: string
    wildlifeCardBody: string
    wildlifeCardCta: string
  }
  seasons: {
    metaTitle: string
    metaDescription: string
    hero: { eyebrow: string; title: string; subtitle: string; description: string; alt?: string }
    seasons: { name: string; period: string; description: string }[]
    ruskaKicker: string
    ruskaH2: string
    ruskaLead: string
    ruskaWeeks: { week: string; region: string; body: string }[]
    ruskaWeek3Suffix: string
    ruskaWeek3SuffixLink: string
    ruskaWeek4Suffix: string
    ruskaWeek4SuffixLink: string
    ruskaWeek5Suffix: string
    ruskaWeek5SuffixLink: string
    bookingH3: string
    bookingItems: string[]
    photoNoteTitle: string
    photoNoteBody: string
    matchH3: string
    matchLead: string
    seasonalBaseCta: string
    seasonMatchedCta: string
    crossLinks: { aurora: string; ruska: string; wildlife: string; snowmobile: string; xcski: string }
    faq: { eyebrow: string; h2: string; items: { q: string; a: string }[] }
  }
  hiking: {
    metaTitle: string
    metaDescription: string
    hero: { eyebrow: string; title: string; subtitle: string; description: string; alt?: string }
    karhuKicker: string
    karhuH2: string
    karhuLead: string
    days: { day: string; title: string; body: string; note: string }[]
    differentlyH3: string
    differently: string[]
    rukaPostCta: string
    oulankaGuidedCta: string
    listKicker: string
    listH2: string
    listLead: string
    trails: { name: string; description: string; distance: string; duration: string; difficulty: string }[]
    difficulties: { easy: string; moderate: string; challenging: string; demanding: string }
    trailheadStays: string
    planRestH3: string
    planRestLead: string
    crossLinks: { when: string; parks: string; stays: string; transport: string }
    faq: { eyebrow: string; h2: string; items: { q: string; a: string }[] }
  }
  conservation: {
    metaTitle: string
    metaDescription: string
    hero: { eyebrow: string; title: string; subtitle: string; description: string; alt?: string }
    orgsKicker: string
    orgsH2: string
    orgsLead: string
    orgs: { role: string; name: string; summary: string; body: string }[]
    visitSite: string
    responsibilityKicker: string
    responsibilityH2: string
    principles: { title: string; body: string }[]
    finalKicker: string
    finalH2: string
    finalLead: string
    samiVillageCta: string
    localTourCta: string
    crossLinks: { wildlife: string; parks: string; freshwater: string; hub: string }
    faq: { eyebrow: string; h2: string; items: { q: string; a: string }[] }
  }
  freshwater: {
    metaTitle: string
    metaDescription: string
    hero: { eyebrow: string; title: string; subtitle: string; description: string; alt?: string }
    introKicker: string
    introH2: string
    introLead: string
    chaptersKicker: string
    chaptersH2: string
    lakes: { title: string; body1: string; body2: string }
    rivers: { title: string; body1: string; body2: string }
    mires: { title: string; body1: string; body2: string }
    forests: { title: string; body1: string; body2: string }
    fish: {
      kicker: string
      title: string
      lead: string
      stories: { title: string; body: string }[]
      feeNote: string
      pillarCta: string
    }
    finalKicker: string
    finalH2: string
    finalLead: string
    crossLinks: { conservation: string; wildlife: string; fishing: string; hub: string }
    faq: { eyebrow: string; h2: string; items: { q: string; a: string }[] }
    verifyLine: string
  }
  editorial: {
    metaTitle: string
    metaDescription: string
    h1: string
    lastUpdated: string
    sections: { h2: string; body: string }[]
    correctionsAfter: string
  }
  notFound: {
    metaTitle: string
    metaDescription: string
    h1: string
    body: string
    home: string
    parks: string
  }
  privacy: { metaTitle: string; metaDescription: string }
  terms: { metaTitle: string; metaDescription: string }
  cookie: { metaTitle: string; metaDescription: string }
}

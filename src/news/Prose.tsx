import { Fragment, type ReactNode } from 'react';
import LocaleLink from '../i18n/LocaleLink';
import type { NewsBlock, NewsMeta } from './types';
import { renderEmbed } from './site';

/**
 * Jutun runko lohkoista. Ei HTML:ää eikä markdownia tekstin sisällä: teksti renderöidään
 * sellaisenaan, joten kielitiedosto ei voi rikkoa sivua eikä tuoda skriptiä.
 * Väliotsikot Bebas Neuella (≥ 28 px), pienet otsikot DM Sansilla (CLAUDE.md, flights).
 */

function languageMarkedText(text: string, languages: Record<string, string> = {}): ReactNode {
  const terms = Object.keys(languages).filter(Boolean).sort((a, b) => b.length - a.length);
  if (!terms.length) return text;
  const lower = text.toLocaleLowerCase();
  const nodes: ReactNode[] = [];
  let cursor = 0;
  while (cursor < text.length) {
    const matches = terms.map(term => ({ term, at: lower.indexOf(term.toLocaleLowerCase(), cursor) }))
      .filter(match => match.at >= 0).sort((a, b) => a.at - b.at || b.term.length - a.term.length);
    const match = matches[0];
    if (!match) { nodes.push(text.slice(cursor)); break; }
    if (match.at > cursor) nodes.push(text.slice(cursor, match.at));
    nodes.push(<span key={match.at} lang={languages[match.term]}>{text.slice(match.at, match.at + match.term.length)}</span>);
    cursor = match.at + match.term.length;
  }
  return nodes;
}

export default function Prose({ blocks, meta }: { blocks: NewsBlock[]; meta: NewsMeta }) {
  return (
    <div className="nw-prose">
      {blocks.map((b, i) => {
        switch (b.t) {
          case 'p':
            return <p key={i}>{languageMarkedText(b.text, meta.inlineLanguages)}</p>;
          case 'h2':
            return <h2 key={i} className="serif">{b.text}</h2>;
          case 'ul':
            return <ul key={i}>{b.items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
          case 'note':
            return <p key={i} className="nw-note">{b.text}</p>;
          case 'link':
            return (
              <p key={i} className="nw-linkp">
                {b.text}{' '}
                <LocaleLink to={b.href} className="nw-inlink">{b.label} →</LocaleLink>
              </p>
            );
          case 'embed':
            return <Fragment key={i}>{renderEmbed(b, meta)}</Fragment>;
          default:
            return null;
        }
      })}
    </div>
  );
}

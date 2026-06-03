// useChromeAria — shared 11-language aria-label dictionary for nav chrome.
//
// Drop this into any LV spoke that has a multi-language header / footer
// chrome. It returns the aria-label strings that almost every site needs
// (language switcher, menu toggle, etc.) so individual spokes no longer
// have to inline duplicate `pick()` blocks.
//
// Languages: en, fi, de, ja, es, pt-BR, zh-CN, ko, fr, it, nl.
//
// Usage:
//   import { useChromeAria } from '../../../shared/useChromeAria';
//   const aria = useChromeAria(lang);
//   <button aria-label={aria.toggleMenu}>…</button>

export type Lang =
  | 'en'
  | 'fi'
  | 'de'
  | 'ja'
  | 'es'
  | 'pt-BR'
  | 'zh-CN'
  | 'ko'
  | 'fr'
  | 'it'
  | 'nl';

export interface ChromeAria {
  switchLanguage: string;
  language: string;
  openMenu: string;
  closeMenu: string;
  toggleMenu: string;
  selectLanguage: string;
  home: string;
}

function pick<T>(lang: Lang | string, m: Record<Lang, T>): T {
  return (m as Record<string, T>)[lang] ?? m.en;
}

export function useChromeAria(lang: Lang | string): ChromeAria {
  return {
    switchLanguage: pick(lang, {
      en: 'Switch language',
      fi: 'Vaihda kieli',
      de: 'Sprache wechseln',
      ja: '言語を切り替え',
      es: 'Cambiar idioma',
      'pt-BR': 'Mudar idioma',
      'zh-CN': '切换语言',
      ko: '언어 변경',
      fr: 'Changer de langue',
      it: 'Cambia lingua',
      nl: 'Taal wijzigen',
    }),
    language: pick(lang, {
      en: 'Language',
      fi: 'Kieli',
      de: 'Sprache',
      ja: '言語',
      es: 'Idioma',
      'pt-BR': 'Idioma',
      'zh-CN': '语言',
      ko: '언어',
      fr: 'Langue',
      it: 'Lingua',
      nl: 'Taal',
    }),
    openMenu: pick(lang, {
      en: 'Open menu',
      fi: 'Avaa valikko',
      de: 'Menü öffnen',
      ja: 'メニューを開く',
      es: 'Abrir menú',
      'pt-BR': 'Abrir menu',
      'zh-CN': '打开菜单',
      ko: '메뉴 열기',
      fr: 'Ouvrir le menu',
      it: 'Apri menu',
      nl: 'Menu openen',
    }),
    closeMenu: pick(lang, {
      en: 'Close menu',
      fi: 'Sulje valikko',
      de: 'Menü schließen',
      ja: 'メニューを閉じる',
      es: 'Cerrar menú',
      'pt-BR': 'Fechar menu',
      'zh-CN': '关闭菜单',
      ko: '메뉴 닫기',
      fr: 'Fermer le menu',
      it: 'Chiudi menu',
      nl: 'Menu sluiten',
    }),
    toggleMenu: pick(lang, {
      en: 'Toggle menu',
      fi: 'Vaihda valikko',
      de: 'Menü umschalten',
      ja: 'メニュー切替',
      es: 'Alternar menú',
      'pt-BR': 'Alternar menu',
      'zh-CN': '切换菜单',
      ko: '메뉴 전환',
      fr: 'Basculer le menu',
      it: 'Alterna menu',
      nl: 'Menu schakelen',
    }),
    selectLanguage: pick(lang, {
      en: 'Select language',
      fi: 'Valitse kieli',
      de: 'Sprache auswählen',
      ja: '言語を選択',
      es: 'Seleccionar idioma',
      'pt-BR': 'Selecionar idioma',
      'zh-CN': '选择语言',
      ko: '언어 선택',
      fr: 'Sélectionner la langue',
      it: 'Seleziona lingua',
      nl: 'Taal selecteren',
    }),
    home: pick(lang, {
      en: 'Home',
      fi: 'Etusivu',
      de: 'Startseite',
      ja: 'ホーム',
      es: 'Inicio',
      'pt-BR': 'Início',
      'zh-CN': '首页',
      ko: '홈',
      fr: 'Accueil',
      it: 'Home',
      nl: 'Home',
    }),
  };
}

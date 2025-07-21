// file: src/data/cmd.ts or app/data/cmd.ts

type ThemeAction = {
  section: string;
  keywords: 'light' | 'dark' | 'system' | string;
  iconColor: string;
  href?: string;
  perform?: () => void;
};

export const Themes: ThemeAction[] = [
  {
    section: 'Themes',
    keywords: 'light',
    iconColor: '#eab308', // amber-500
  },
  {
    section: 'Themes',
    keywords: 'dark',
    iconColor: '#0ea5e9', // sky-500
  },
  {
    section: 'Themes',
    keywords: 'system',
    iconColor: '#6366f1', // indigo-500
  }
];

// You can extend this with more actions if you like. 
// If your menu supports sections beyond Themes, add more similar objects in this array.

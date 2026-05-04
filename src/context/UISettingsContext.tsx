import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ThemeMode = "light" | "dark";
export type FontChoice =
  | "space"
  | "mono"
  | "poppins"
  | "montserrat"
  | "raleway"
  | "nunito"
  | "quicksand"
  | "rubik"
  | "worksans"
  | "dmsans"
  | "ubuntu"
  | "oswald"
  | "bebas"
  | "sourcesans"
  | "intertight"
  | "barlow"
  | "karla"
  | "manrope"
  | "archivo"
  | "firasans"
  | "ptsans"
  | "josefin"
  | "ibmplexsans"
  | "mulish"
  | "exo2"
  | "merriweathersans"
  | "anton"
  | "cabin"
  | "indieflower"
  | "inconsolata"
  | "titillium"
  | "spacemono"
  | "teko";

interface PlaylistOption {
  id: string;
  label: string;
}

interface FontOption {
  value: FontChoice;
  label: string;
}

interface UISettingsValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  font: FontChoice;
  setFont: (font: FontChoice) => void;
  playlistId: string;
  setPlaylistId: (id: string) => void;
  showPlayer: boolean;
  setShowPlayer: (showPlayer: boolean) => void;
  playerMuted: boolean;
  setPlayerMuted: (isMuted: boolean) => void;
  fontOptions: FontOption[];
  playlistOptions: PlaylistOption[];
}

interface PersistedSettings {
  theme: ThemeMode;
  font: FontChoice;
  playlistId: string;
  showPlayer: boolean;
  playerMuted: boolean;
}

const SETTINGS_STORAGE_KEY = "sudoku-ui-settings";

const playlistOptions: PlaylistOption[] = [
  { id: "37i9dQZF1DX4sWSpwq3LiO", label: "Peaceful Piano" },
  { id: "37i9dQZF1DWZeKCadgRdKQ", label: "Deep Focus" },
  { id: "37i9dQZF1DWYBO1MoTDhZI", label: "Calm Vibes" },
  { id: "37i9dQZF1DWU0ScTcjJBdj", label: "Stress Relief" },
  { id: "37i9dQZF1DWY7IeIP1cdjF", label: "Reggaeton" },
  { id: "37i9dQZF1DWXtlo6ENS92N", label: "Bollywood" },
  { id: "37i9dQZF1DX0hWmn8d5pRe", label: "Afropop" },
  { id: "37i9dQZF1DXbSbnqxMTGx9", label: "70s Jamaican Reggae" },
  { id: "37i9dQZF1DWVfS4Cdd3PNf", label: "Tango" },
  { id: "37i9dQZF1DWVxoleDT3ILq", label: "Flamenco Guitar" },
  { id: "37i9dQZF1DX6ziVCJnEm59", label: "Sultry Female Singers Global" },
  { id: "37i9dQZF1DX7K31D69s4M1", label: "20th Century Soul" },
  { id: "37i9dQZF1DX6VdMW310YC7", label: "90s R&B" },
  { id: "37i9dQZF1DX186v583rmzp", label: "90s Rap" },
];

const fontOptions: FontOption[] = [
  { value: "space", label: "Space Grotesk" },
  { value: "mono", label: "JetBrains Mono" },
  { value: "poppins", label: "Poppins" },
  { value: "montserrat", label: "Montserrat" },
  { value: "raleway", label: "Raleway" },
  { value: "nunito", label: "Nunito" },
  { value: "quicksand", label: "Quicksand" },
  { value: "rubik", label: "Rubik" },
  { value: "worksans", label: "Work Sans" },
  { value: "dmsans", label: "DM Sans" },
  { value: "ubuntu", label: "Ubuntu" },
  { value: "oswald", label: "Oswald" },
  { value: "bebas", label: "Bebas Neue" },
  { value: "sourcesans", label: "Source Sans 3" },
  { value: "intertight", label: "Inter Tight" },
  { value: "barlow", label: "Barlow" },
  { value: "karla", label: "Karla" },
  { value: "manrope", label: "Manrope" },
  { value: "archivo", label: "Archivo" },
  { value: "firasans", label: "Fira Sans" },
  { value: "ptsans", label: "PT Sans" },
  { value: "josefin", label: "Josefin Sans" },
  { value: "ibmplexsans", label: "IBM Plex Sans" },
  { value: "mulish", label: "Mulish" },
  { value: "exo2", label: "Exo 2" },
  { value: "merriweathersans", label: "Merriweather Sans" },
  { value: "anton", label: "Anton" },
  { value: "cabin", label: "Cabin" },
  { value: "indieflower", label: "Indie Flower" },
  { value: "inconsolata", label: "Inconsolata" },
  { value: "titillium", label: "Titillium Web" },
  { value: "spacemono", label: "Space Mono" },
  { value: "teko", label: "Teko" },
];

const fontMap: Record<FontChoice, string> = {
  space: '"Space Grotesk", sans-serif',
  mono: '"JetBrains Mono", monospace',
  poppins: '"Poppins", sans-serif',
  montserrat: '"Montserrat", sans-serif',
  raleway: '"Raleway", sans-serif',
  nunito: '"Nunito", sans-serif',
  quicksand: '"Quicksand", sans-serif',
  rubik: '"Rubik", sans-serif',
  worksans: '"Work Sans", sans-serif',
  dmsans: '"DM Sans", sans-serif',
  ubuntu: '"Ubuntu", sans-serif',
  oswald: '"Oswald", sans-serif',
  bebas: '"Bebas Neue", sans-serif',
  sourcesans: '"Source Sans 3", sans-serif',
  intertight: '"Inter Tight", sans-serif',
  barlow: '"Barlow", sans-serif',
  karla: '"Karla", sans-serif',
  manrope: '"Manrope", sans-serif',
  archivo: '"Archivo", sans-serif',
  firasans: '"Fira Sans", sans-serif',
  ptsans: '"PT Sans", sans-serif',
  josefin: '"Josefin Sans", sans-serif',
  ibmplexsans: '"IBM Plex Sans", sans-serif',
  mulish: '"Mulish", sans-serif',
  exo2: '"Exo 2", sans-serif',
  merriweathersans: '"Merriweather Sans", sans-serif',
  anton: '"Anton", sans-serif',
  cabin: '"Cabin", sans-serif',
  indieflower: '"Indie Flower", cursive',
  inconsolata: '"Inconsolata", monospace',
  titillium: '"Titillium Web", sans-serif',
  spacemono: '"Space Mono", monospace',
  teko: '"Teko", sans-serif',
};

const isFontChoice = (value: unknown): value is FontChoice =>
  typeof value === "string" &&
  Object.prototype.hasOwnProperty.call(fontMap, value);

const defaultSettings: PersistedSettings = {
  theme: "light",
  font: "space",
  playlistId: playlistOptions[0].id,
  showPlayer: true,
  playerMuted: false,
};

const UISettingsContext = createContext<UISettingsValue | undefined>(undefined);

const getInitialSettings = (): PersistedSettings => {
  const savedValue = localStorage.getItem(SETTINGS_STORAGE_KEY);

  if (!savedValue) {
    return defaultSettings;
  }

  try {
    const parsed = JSON.parse(savedValue) as Partial<PersistedSettings>;

    return {
      theme: parsed.theme === "dark" ? "dark" : "light",
      font: isFontChoice(parsed.font) ? parsed.font : "space",
      playlistId:
        typeof parsed.playlistId === "string" && parsed.playlistId.length > 0
          ? parsed.playlistId
          : defaultSettings.playlistId,
      showPlayer: parsed.showPlayer !== false,
      playerMuted: parsed.playerMuted === true,
    };
  } catch {
    return defaultSettings;
  }
};

export const UISettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialSettings = getInitialSettings();

  const [theme, setTheme] = useState<ThemeMode>(initialSettings.theme);
  const [font, setFont] = useState<FontChoice>(initialSettings.font);
  const [playlistId, setPlaylistId] = useState<string>(
    initialSettings.playlistId,
  );
  const [showPlayer, setShowPlayer] = useState<boolean>(
    initialSettings.showPlayer,
  );
  const [playerMuted, setPlayerMuted] = useState<boolean>(
    initialSettings.playerMuted,
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    document.body.style.setProperty("--app-font", fontMap[font]);
  }, [theme, font]);

  useEffect(() => {
    const payload: PersistedSettings = {
      theme,
      font,
      playlistId,
      showPlayer,
      playerMuted,
    };

    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(payload));
  }, [theme, font, playlistId, showPlayer, playerMuted]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      font,
      setFont,
      playlistId,
      setPlaylistId,
      showPlayer,
      setShowPlayer,
      playerMuted,
      setPlayerMuted,
      fontOptions,
      playlistOptions,
    }),
    [theme, font, playlistId, showPlayer, playerMuted],
  );

  return (
    <UISettingsContext.Provider value={value}>
      {children}
    </UISettingsContext.Provider>
  );
};

export const useUISettings = (): UISettingsValue => {
  const context = useContext(UISettingsContext);

  if (!context) {
    throw new Error("useUISettings must be used within a UISettingsProvider");
  }

  return context;
};

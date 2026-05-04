import React from "react";
import { FontChoice, useUISettings } from "../context/UISettingsContext";

const UISettingsPanel = () => {
  const {
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
  } = useUISettings();

  return (
    <aside
      className="settings-panel"
      aria-label="Game appearance and ambiance settings"
    >
      <h2 className="settings-title">Customize</h2>

      <div className="settings-row">
        <span>Theme</span>
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label="Toggle light and dark mode"
        >
          {theme === "light" ? "Light" : "Dark"}
        </button>
      </div>

      <label className="settings-row settings-label" htmlFor="font-select">
        <span>Font</span>
        <select
          id="font-select"
          value={font}
          onChange={(event) => setFont(event.target.value as FontChoice)}
          className="settings-select"
        >
          {fontOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="settings-row settings-label" htmlFor="playlist-select">
        <span>Ambiance</span>
        <select
          id="playlist-select"
          value={playlistId}
          onChange={(event) => setPlaylistId(event.target.value)}
          className="settings-select"
        >
          {playlistOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="settings-row player-toggle" htmlFor="player-toggle">
        <span>Show player</span>
        <input
          id="player-toggle"
          type="checkbox"
          checked={showPlayer}
          onChange={(event) => setShowPlayer(event.target.checked)}
        />
      </label>

      <label className="settings-row player-toggle" htmlFor="mute-toggle">
        <span>Mute ambiance</span>
        <input
          id="mute-toggle"
          type="checkbox"
          checked={playerMuted}
          onChange={(event) => setPlayerMuted(event.target.checked)}
        />
      </label>
    </aside>
  );
};

export default UISettingsPanel;

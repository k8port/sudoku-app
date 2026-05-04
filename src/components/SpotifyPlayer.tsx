import React, { useEffect, useRef, useState } from "react";
import { useUISettings } from "../context/UISettingsContext";

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: SpotifyIFrameAPI) => void;
    SpotifyIFrameApi?: SpotifyIFrameAPI;
  }
}

interface SpotifyEmbedController {
  loadUri: (
    uri: string,
    preferVideo?: boolean,
    startAt?: number,
    theme?: string,
  ) => void;
  play: () => void;
  pause: () => void;
  resume: () => void;
  destroy: () => void;
}

interface SpotifyIFrameAPI {
  createController: (
    element: HTMLElement,
    options: {
      uri: string;
      width?: string | number;
      height?: string | number;
    },
    callback: (controller: SpotifyEmbedController) => void,
  ) => void;
}

const SPOTIFY_IFRAME_SCRIPT_ID = "spotify-iframe-api";

const SpotifyPlayer = () => {
  const { playlistId, showPlayer, theme, playerMuted, setPlayerMuted } =
    useUISettings();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<SpotifyEmbedController | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!showPlayer) {
      return;
    }

    const initializeEmbed = (IFrameAPI: SpotifyIFrameAPI) => {
      if (!containerRef.current || controllerRef.current) {
        return;
      }

      IFrameAPI.createController(
        containerRef.current,
        {
          uri: `spotify:playlist:${playlistId}`,
          width: "100%",
          height: 152,
        },
        (controller) => {
          controllerRef.current = controller;
          setIsReady(true);

          if (playerMuted) {
            controller.pause();
          }
        },
      );
    };

    if (window.SpotifyIFrameApi) {
      initializeEmbed(window.SpotifyIFrameApi);
      return;
    }

    window.onSpotifyIframeApiReady = (IFrameAPI: SpotifyIFrameAPI) => {
      window.SpotifyIFrameApi = IFrameAPI;
      initializeEmbed(IFrameAPI);
    };

    const existingScript = document.getElementById(SPOTIFY_IFRAME_SCRIPT_ID);
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = SPOTIFY_IFRAME_SCRIPT_ID;
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [playlistId, playerMuted, showPlayer]);

  useEffect(() => {
    if (!controllerRef.current || !showPlayer) {
      return;
    }

    const embedTheme = theme === "dark" ? "dark" : undefined;
    controllerRef.current.loadUri(
      `spotify:playlist:${playlistId}`,
      false,
      undefined,
      embedTheme,
    );
  }, [theme, playlistId, showPlayer]);

  useEffect(() => {
    if (!controllerRef.current || !showPlayer) {
      return;
    }

    if (playerMuted) {
      controllerRef.current.pause();
    } else {
      controllerRef.current.resume();
    }
  }, [playerMuted, showPlayer]);

  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.destroy();
        controllerRef.current = null;
      }
    };
  }, []);

  if (!showPlayer) {
    return null;
  }

  return (
    <section
      className="spotify-player-wrap"
      aria-label="Spotify ambiance player"
    >
      <div className="spotify-control-row">
        <button
          type="button"
          className="button-secondary"
          onClick={() => setPlayerMuted(!playerMuted)}
          disabled={!isReady}
        >
          {playerMuted ? "Unmute" : "Mute"}
        </button>
        <a
          className="button-secondary"
          href={`https://open.spotify.com/playlist/${playlistId}`}
          target="_blank"
          rel="noreferrer"
        >
          Open in Spotify
        </a>
      </div>
      <p className="spotify-hint">
        Adjust exact volume inside Spotify player controls.
      </p>
      <div ref={containerRef} className="spotify-iframe-host" />
    </section>
  );
};

export default SpotifyPlayer;

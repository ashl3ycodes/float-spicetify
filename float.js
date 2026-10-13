// NAME: Float
// AUTHORS: ashl3ycodes (Spicetify port), maenDisease (original Float for Discord)
// DESCRIPTION: A compact, hover-driven Spotify, ported from the archived
//   BetterDiscord theme maenDisease/Float (https://github.com/maenDisease/Float).
//   Your Library stays a thin strip of covers and slides open on hover, pushing
//   the page right (like Float's channel sidebar); the right sidebar (Now Playing
//   view / Queue / Friend Activity) rests as a strip showing the panel's left edge
//   (whole covers in Queue, only a slice of the big Now Playing art) and slides
//   open the same way, pushing everything left (Float's member list, but pushing
//   instead of covering). The secondary top-bar buttons only show while you
//   hover the bar; the search bar stays Spotify's own, full width.

(function float() {
	if (!document.head) return setTimeout(float, 100);

	const CSS = `
@property --float-members-width {
  syntax: "<length>";
  inherits: true;
  initial-value: 72px;
}

:root {
  --float-animations: 1;

  --slide-window-on-hover: 1;
  --float-sidebar-width: 72;
  --sidebar-hover-width: 280px;
  --sidebar-hover-delay: 0s;
  --sidebar-transition-duration: 0.4s;

  --slide-window-on-members-hover: 1;
  --float-members-width: 72px;
  --members-hover-width: 320px;
  --members-hover-delay: 0s;
  --members-transition-duration: 0.4s;

  --toolbar-visibility: flex;

  --playbar-lyrics: flex;
  --playbar-queue: flex;
  --playbar-connect: flex;
  --playbar-volume: flex;
  --playbar-miniplayer: flex;
}

@media (max-width: 1100px) {
  :root {
    --toolbar-visibility: none;
    --playbar-miniplayer: none;
  }
}
@media (max-width: 900px) {
  :root {
    --float-members-width: 0px;
  }
}
@media (max-width: 820px) {
  :root {
    --float-sidebar-width: 0;
  }
}

@keyframes float-text-hidden {
  from {
    -webkit-text-fill-color: transparent;
  }
}

@media (max-width: 1300px) {
body:not(.fsd-activated) {
  .Root__top-container {
    overflow-x: clip;
    --float-sidebar-px: calc(var(--float-sidebar-width) * 1px);
    --float-sidebar-on: min(var(--float-sidebar-width), 1);
    --float-members-open: max(var(--members-hover-width), 280px);
    --float-members-on: sign(var(--float-members-width));
    --float-members-push: calc(var(--slide-window-on-members-hover) * (var(--float-members-open) - var(--float-members-width)
      + (1 - var(--float-members-on)) * (var(--panel-gap) + 2 * var(--border-width, 0px))));
    --float-sb-dur: calc(var(--sidebar-transition-duration) * var(--float-animations));
    --float-m-dur: calc(var(--members-transition-duration) * var(--float-animations));
  }

  .Root__nav-bar {
    left: 0;
    width: var(--float-sidebar-px);
    clip-path: inset(-24px 0 -24px -24px);
    transition: width var(--float-sb-dur) ease,
      margin var(--float-sb-dur) ease,
      left var(--float-m-dur) ease;
  }
  .Root__nav-bar:hover {
    width: var(--sidebar-hover-width);
    margin-inline-end: calc(var(--float-sidebar-px) - var(--sidebar-hover-width));
    z-index: 5;
    transition-delay: var(--sidebar-hover-delay);
    --float-library-open: 1;
  }
  .Root__nav-bar::after {
    content: "";
    position: absolute;
    inset-block: 0;
    inset-inline-end: 100%;
    width: var(--panel-gap);
  }
  .Root__nav-bar .main-yourLibraryX-libraryContainer > * {
    margin-inline-start: min(0px, var(--float-sidebar-px) / 2 - 36px);
    transition: margin var(--float-sb-dur) ease;
  }
  @container style(--float-library-open: 1) {
    .Root__nav-bar .main-yourLibraryX-libraryContainer > * {
      margin-inline-start: 0;
      transition-delay: var(--sidebar-hover-delay);
    }
    .main-yourLibraryX-listItem [role="gridcell"] > span {
      inset: 0 8px 0 64px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      opacity: 1;
      transition: opacity 0s var(--sidebar-hover-delay);
    }
  }
  .Root__nav-bar:hover ~ :is(.Root__main-view, .Root__right-sidebar) {
    left: calc(var(--slide-window-on-hover) * (var(--sidebar-hover-width) - var(--float-sidebar-px)
      + (1 - var(--float-sidebar-on)) * var(--panel-gap)));
    transition: left var(--float-sb-dur) ease var(--sidebar-hover-delay),
      border-color 0.2s ease !important;
  }
  .Root__main-view {
    left: 0;
    width: auto;
    margin-inline-start: calc((var(--float-sidebar-on) - 1) * var(--panel-gap));
    margin-inline-end: 0px;
    transition: left var(--float-sb-dur) ease,
      margin var(--float-m-dur) ease, border-color 0.2s ease !important;
  }
  .Root__nav-bar:hover ~ .Root__main-view::before {
    opacity: var(--slide-window-on-hover);
  }
  [data-tippy-root]:has([data-encore-id="listRowTitle"]) {
    display: none;
  }
  .main-yourLibraryX-headerContent.main-yourLibraryX-headerIsCollapsed {
    width: fit-content;
  }

  .Root__right-sidebar:has(.Root__right-sidebar-expanded) {
    box-sizing: content-box;
    width: var(--float-members-width);
    left: 0;
    transition: width var(--float-m-dur) ease,
      margin var(--float-m-dur) ease,
      left var(--float-sb-dur) ease, border-color 0.2s ease,
      visibility 0s linear var(--float-m-dur) !important;
  }
  .Root__right-sidebar:has(.Root__right-sidebar-expanded):hover {
    width: var(--float-members-open);
    margin-inline-start: calc(var(--float-members-width) - var(--float-members-open));
    box-shadow: 0 0 24px rgb(0 0 0 / calc((1 - var(--slide-window-on-members-hover)) * 0.5));
    transition-delay: var(--members-hover-delay), var(--members-hover-delay), 0s, 0s, 0s !important;
  }
  .Root__top-container:has(> .Root__right-sidebar:hover .Root__right-sidebar-expanded) {
    > .Root__nav-bar {
      left: calc(-1 * var(--float-members-push));
      transition-delay: 0s, 0s, var(--members-hover-delay);
    }
    > .Root__main-view {
      margin-inline-start: calc((var(--float-sidebar-on) - 1) * var(--panel-gap) - var(--float-members-push));
      margin-inline-end: var(--float-members-push);
      transition-delay: 0s, var(--members-hover-delay), 0s !important;
    }
  }
  .Root__right-sidebar:has(.Root__right-sidebar-expanded)::after {
    content: "";
    position: absolute;
    inset-block: 0;
    inset-inline-start: 100%;
    width: calc(var(--panel-gap) + 8px);
  }
  @container style(--float-members-width: 0px) {
    .Root__top-container:has(> .Root__right-sidebar .Root__right-sidebar-expanded) > .Root__main-view {
      margin-inline-end: calc(0px - var(--panel-gap));
    }
    .Root__top-container:has(> .Root__right-sidebar:hover .Root__right-sidebar-expanded) > .Root__main-view {
      margin-inline-end: calc(var(--float-members-push) - var(--panel-gap));
    }
    .Root__right-sidebar:has(.Root__right-sidebar-expanded) {
      justify-self: end;
      margin-inline-start: -100vw !important;
      &:not(:hover) {
        visibility: hidden;
      }
      &::after {
        visibility: visible;
      }
    }
  }
  .Root__right-sidebar-expanded.Root__right-sidebar-peek {
    min-width: 0;
    overflow: hidden;
  }
  .Root__right-sidebar .main-nowPlayingView-container {
    width: var(--float-members-open) !important;
  }
  .Root__right-sidebar:not(:hover) .Root__right-sidebar-expanded {
    -webkit-text-fill-color: transparent;
  }
  .Root__right-sidebar:hover .Root__right-sidebar-expanded {
    animation: float-text-hidden 0s var(--members-hover-delay) backwards;
  }
  .Root__right-sidebar-expanded::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 10;
  }
  .Root__right-sidebar:hover .Root__right-sidebar-expanded::after {
    visibility: hidden;
    transition: visibility 0s linear calc(var(--members-hover-delay) + var(--float-m-dur));
  }

  :is(.Root__nav-bar, .Root__right-sidebar) > .LayoutResizer__resize-bar {
    display: none;
  }

  .Root__globalNav:not(:hover) .main-actionButtons {
    display: var(--toolbar-visibility);
  }

  [data-testid="lyrics-button"] {
    display: var(--playbar-lyrics);
  }
  .main-nowPlayingBar-extraControls {
    > .main-useDropTarget-track {
      display: var(--playbar-queue);
    }
    > span:has(> [aria-describedby="connect-message-nudge"]) {
      display: var(--playbar-connect);
    }
    > .main-nowPlayingBar-volumeBar {
      display: var(--playbar-volume);
    }
    > [data-testid="pip-toggle-button"] {
      display: var(--playbar-miniplayer);
    }
  }
}
}
`;

	let style = document.getElementById("float-spicetify");
	if (!style) {
		style = document.createElement("style");
		style.id = "float-spicetify";
		document.head.append(style);
	}
	style.textContent = CSS;
})();

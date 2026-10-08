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
//
// Everything is CSS; edit the :root block at the top of CSS below.
// Keep Your Library in Spotify's collapsed (icons only) mode: Float opens it on hover
// and reveals the row titles. Expanded mode still works, but Spotify then thinks the
// library is wide and may fold the right sidebar away on narrow windows.
//
// KNOBS (Float's names and units where Spotify has the same thing)
//   --slide-window-on-hover        1 = Library pushes the page aside, 0 = floats over it
//   --float-sidebar-width          Library strip width, UNITLESS px like Float (72, 48, 0).
//                                  0 hides it; hover the left window edge to peek.
//                                  Under 72 a theme's box label ("Library") gets clipped.
//   --sidebar-hover-width          Library width while hovered (a length: 280px)
//   --sidebar-hover-delay          wait before it opens
//   --sidebar-transition-duration  open/close animation length
//   --slide-window-on-members-hover 1 = the right sidebar pushes everything left, 0 = floats over it
//   --float-members-width          right sidebar strip width, a length like Float (72px).
//                                  0 hides it; hover the right window edge to peek.
//   --members-hover-width          right sidebar width while hovered (280px at least,
//                                  Spotify's own minimum; smaller values count as 280px)
//   --members-hover-delay          wait before it opens (0s; Float used 1.5s)
//   --members-transition-duration  open/close animation length
//   --toolbar-visibility           flex | none: What's New + Friend Activity in the top bar
//                                  (always shown while the pointer is on the top bar)
//   --playbar-lyrics / -queue / -connect / -volume / -miniplayer
//                                  flex | none: player bar buttons on the right
//                                  (Float's --textarea-buttons-*; Spotify has no GIF/sticker/gift)
// Below the :root block are @media presets for narrow windows. Spotify never lays
// out narrower than 800px (a smaller window is just cropped), so they live in 800-1920.

(function float() {
	if (!document.head) return setTimeout(float, 100);

	const CSS = `
/* a length, so a bare 0 (Float's own preset syntax) still works in calc() */
@property --float-members-width {
  syntax: "<length>";
  inherits: true;
  initial-value: 72px;
}

:root {
  /* Your Library = Float's channel sidebar */
  --slide-window-on-hover: 1; /* boolean */
  --float-sidebar-width: 72; /* unitless */
  --sidebar-hover-width: 280px;
  --sidebar-hover-delay: 0s;
  --sidebar-transition-duration: 0.4s;

  /* Right sidebar = Float's member list */
  --slide-window-on-members-hover: 1; /* boolean */
  --float-members-width: 72px;
  --members-hover-width: 320px;
  --members-hover-delay: 0s;
  --members-transition-duration: 0.4s;

  /* Top bar = Float's channel header */
  --toolbar-visibility: flex; /* [flex][none] */

  /* Player bar buttons = Float's textarea buttons */ /* [flex][none] */
  --playbar-lyrics: flex;
  --playbar-queue: flex;
  --playbar-connect: flex;
  --playbar-volume: flex;
  --playbar-miniplayer: flex;
}

/* Presets: used when the window is at most this wide. Edit or delete freely. */
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

/* Off while the full-screen extension owns the window. */
body:not(.fsd-activated) {
  .Root__top-container {
    /* the slide and the edge hover zones poke past the window edge; clip them so
       the page never gains a horizontal scroll */
    overflow-x: clip;
    /* derived from the knobs, nothing to edit here */
    --float-sidebar-px: calc(var(--float-sidebar-width) * 1px);
    --float-sidebar-on: min(var(--float-sidebar-width), 1); /* 0 when the strip is hidden */
    --float-members-open: max(var(--members-hover-width), 280px);
    --float-members-on: sign(var(--float-members-width)); /* 0 when the strip is hidden */
    --float-members-push: 0px; /* how far the open right sidebar pushes things left */
  }

  /* ---------- Your Library ----------
     Width + negative margin keep the grid column at the strip width, so the
     open library floats over the page instead of resizing it. */
  .Root__nav-bar {
    left: calc(-1 * var(--float-members-push)); /* not auto: auto would not animate */
    width: var(--float-sidebar-px);
    clip-path: inset(-24px 0 -24px -24px);
    transition: width var(--sidebar-transition-duration) ease,
      margin var(--sidebar-transition-duration) ease,
      left var(--members-transition-duration) ease;
  }
  .Root__nav-bar:hover {
    width: var(--sidebar-hover-width);
    margin-inline-end: calc(var(--float-sidebar-px) - var(--sidebar-hover-width));
    z-index: 5;
    transition-delay: var(--sidebar-hover-delay);
  }
  /* the window gutter peeks it open, even at width 0 */
  .Root__nav-bar::after {
    content: "";
    position: absolute;
    inset-block: 0;
    inset-inline-end: 100%;
    width: var(--panel-gap);
  }
  /* Spotify lays the collapsed rows out for a 72px strip: centre them in a
     narrower one (Float's row shift) */
  .Root__nav-bar .main-yourLibraryX-libraryContainer > * {
    margin-inline-start: min(0px, var(--float-sidebar-px) / 2 - 36px);
    transition: margin var(--sidebar-transition-duration) ease;
  }
  .Root__nav-bar:hover .main-yourLibraryX-libraryContainer > * {
    margin-inline-start: 0;
    transition-delay: var(--sidebar-hover-delay);
  }
  /* collapsed library rows keep their titles in a hidden span: show it */
  .Root__nav-bar:hover .main-yourLibraryX-listItem [role="gridcell"] > span:has(> [data-encore-id="listRowTitle"]) {
    inset: 0 8px 0 64px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    opacity: 1;
    transition: opacity var(--sidebar-transition-duration) ease var(--sidebar-hover-delay);
  }
  /* slide with left, not transform: a transform would trap fixed-position
     children (theme labels) inside the main view's overflow clip.
     Transitions here are !important because themes like "text" pin
     transition: border-color !important on these boxes; border-color stays in the list. */
  .Root__nav-bar:hover ~ :is(.Root__main-view, .Root__right-sidebar) {
    left: calc(var(--slide-window-on-hover) * (var(--sidebar-hover-width) - var(--float-sidebar-px)
      + (1 - var(--float-sidebar-on)) * var(--panel-gap)));
    transition: left var(--sidebar-transition-duration) ease var(--sidebar-hover-delay),
      border-color 0.2s ease !important;
  }
  .Root__main-view {
    left: 0; /* auto would not animate */
    /* a hidden strip leaves no empty gap column beside the page
       (auto width: Spotify's 100% would ignore the negative margins) */
    width: auto;
    margin-inline-start: calc((var(--float-sidebar-on) - 1) * var(--panel-gap) - var(--float-members-push));
    /* the right sidebar pushes it with margins (same width), the library with left,
       so each push closes over its own panel's duration */
    margin-inline-end: var(--float-members-push);
    transition: left var(--sidebar-transition-duration) ease,
      margin var(--members-transition-duration) ease, border-color 0.2s ease !important;
  }
  /* a theme label on the main view would poke out above a library that floats over it */
  .Root__nav-bar:hover ~ .Root__main-view::before {
    opacity: var(--slide-window-on-hover);
  }
  /* the hover tooltip that names a collapsed row; the row shows its own title now */
  [data-tippy-root]:has([data-encore-id="listRowTitle"]) {
    display: none;
  }
  /* keep Create under the Library button instead of drifting to the middle */
  .main-yourLibraryX-headerContent.main-yourLibraryX-headerIsCollapsed {
    width: fit-content;
  }

  /* ---------- Right sidebar ---------- */
  /* content-box: a theme border goes around the widths, so the content below
     is exactly as wide as the open panel */
  .Root__right-sidebar:has(.Root__right-sidebar-expanded) {
    box-sizing: content-box;
    width: var(--float-members-width);
    left: 0;
    transition: width var(--members-transition-duration) ease,
      margin var(--members-transition-duration) ease,
      left var(--sidebar-transition-duration) ease, border-color 0.2s ease,
      visibility 0s linear var(--members-transition-duration) !important;
  }
  .Root__right-sidebar:has(.Root__right-sidebar-expanded):hover {
    width: var(--float-members-open);
    margin-inline-start: calc(var(--float-members-width) - var(--float-members-open));
    box-shadow: 0 0 24px rgb(0 0 0 / calc((1 - var(--slide-window-on-members-hover)) * 0.5));
    transition-delay: var(--members-hover-delay), var(--members-hover-delay), 0s, 0s, 0s !important;
  }
  /* opening it slides the library and the page left by what it grows (Float's
     --slide-window-on-hover, mirrored), so the page is pushed, not covered */
  .Root__top-container:has(> .Root__right-sidebar:hover .Root__right-sidebar-expanded) {
    --float-members-push: calc(var(--slide-window-on-members-hover) * (var(--float-members-open) - var(--float-members-width)
      + (1 - var(--float-members-on)) * (var(--panel-gap) + 2 * var(--border-width, 0px))));
    > .Root__nav-bar {
      transition-delay: 0s, 0s, var(--members-hover-delay);
    }
    > .Root__main-view {
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
  /* width 0: no grid column and no gap; pinned to the window edge, hidden until hovered */
  @container style(--float-members-width: 0px) {
    /* only while the panel is open: Spotify's collapsed 36px sidebar keeps its gap */
    .Root__top-container:has(> .Root__right-sidebar .Root__right-sidebar-expanded) > .Root__main-view {
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
  /* the panel is always laid out at its open width and the strip just shows
     its left edge, so nothing reflows into a 72px column */
  .Root__right-sidebar-expanded.Root__right-sidebar-peek {
    min-width: 0;
    overflow: hidden;
  }
  .Root__right-sidebar .main-nowPlayingView-container {
    width: var(--float-members-open) !important;
  }
  /* the strip shows covers and avatars only (Float's member strip): its text
     comes back and its buttons wake up once the panel is open, so resting on
     the strip or clicking it never plays or skips anything */
  .Root__right-sidebar:not(:hover) .Root__right-sidebar-expanded {
    -webkit-text-fill-color: transparent;
  }
  /* text-fill-color does not transition: hold it hidden through the delay */
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
    transition: visibility 0s linear calc(var(--members-hover-delay) + var(--members-transition-duration));
  }

  /* resizing makes no sense when hover decides the width */
  :is(.Root__nav-bar, .Root__right-sidebar) > .LayoutResizer__resize-bar {
    display: none;
  }

  /* ---------- Top bar ---------- */
  /* only the right-hand group: it grows leftwards into empty space when it
     comes back, so nothing you are aiming at moves under the pointer */
  .Root__globalNav:not(:hover) .main-actionButtons {
    display: var(--toolbar-visibility);
  }

  /* ---------- Player bar buttons ---------- */
  .main-nowPlayingBar-lyricsButton {
    display: var(--playbar-lyrics);
  }
  .main-nowPlayingBar-extraControls {
    > :has(> [data-testid="control-button-queue"]) {
      display: var(--playbar-queue);
    }
    > :has(> [aria-describedby="connect-message-nudge"]) {
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
`;

	let style = document.getElementById("float-spicetify");
	if (!style) {
		style = document.createElement("style");
		style.id = "float-spicetify";
		document.head.append(style);
	}
	style.textContent = CSS;
})();

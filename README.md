# Float for Spicetify

The idea of [maenDisease/Float](https://github.com/maenDisease/Float) (a compact, hover-driven
Discord) brought to Spotify.

- **Your Library** rests as a thin strip of covers and slides open on hover, pushing the page right.
- The **right sidebar** (Now Playing view, Queue, Friend Activity) rests as a strip and slides open
  on hover, pushing everything left. The page keeps its width and just moves.
- The secondary top-bar buttons only show while you hover the bar.
- Per-button switches for the player bar (lyrics, queue, connect, volume, miniplayer).
- **Width presets** at 1100 / 900 / 820 px.

It's an extension, not a theme, so it works with any Spicetify theme (or none).

## Install

```sh
cp float.js ~/.config/spicetify/Extensions/
spicetify config extensions float.js
spicetify apply
```

(Extensions folder on Windows: `%appdata%\spicetify\Extensions`.)

Keep Your Library in Spotify's collapsed (icons only) mode; Float opens it on hover.

## Customise

The knobs sit in the `:root` block at the top of the CSS inside `float.js`:

| Knob | Default | What it does |
|---|---|---|
| `--float-sidebar-width` | `72` | library strip width (unitless px), `0` hides it |
| `--sidebar-hover-width` | `280px` | library width when open |
| `--slide-window-on-hover` | `1` | `1` the page slides right, `0` the library covers it |
| `--float-members-width` | `72px` | right strip width, `0` hides it |
| `--members-hover-width` | `320px` | right sidebar width when open (Spotify's minimum is 280px) |
| `--slide-window-on-members-hover` | `1` | `1` everything slides left, `0` the sidebar covers the page |
| `--sidebar-hover-delay` / `--members-hover-delay` | `0s` | how long to rest on a strip before it opens |
| `--sidebar-transition-duration` / `--members-transition-duration` | `0.4s` | slide speed |
| `--toolbar-visibility` | `flex` | `none` hides What's New / Friend Activity until the bar is hovered |
| `--playbar-lyrics` / `-queue` / `-connect` / `-volume` / `-miniplayer` | `flex` | player bar buttons |

Edit the file, then run `spicetify apply` again.

## Limits

Spotify never lays out narrower than 800 px or shorter than 600 px: a smaller window is just
cropped. So the presets live between 800 and 1920 px; anything below 800 can't fire.

## Credits

Float is [maenDisease](https://github.com/maenDisease)'s idea, made for Discord. This is a new
implementation for Spotify that borrows its behaviour and knob names.

## License

[AGPL-3.0](LICENSE)

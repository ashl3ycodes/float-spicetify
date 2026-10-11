
## 🎈 ⦁ What is it?
The idea of <a href="https://github.com/maenDisease/Float">maenDisease/Float</a> (a compact, hover-driven Discord) brought to Spotify.

- **Your Library** rests as a thin strip of covers and slides open on hover, pushing the page right.
- The **right sidebar** (Now Playing view, Queue, Friend Activity) rests as a strip and slides open on hover, pushing everything left. The page keeps its width and just moves.
- The secondary top-bar buttons only show while you hover the bar.
- Per-button switches for the player bar (lyrics, queue, connect, volume, miniplayer).
- **Width presets** at 1100 / 900 / 820 px.
- Only kicks in when Spotify is 1300 px wide or less (like tiled to half the screen). Full-width Spotify stays exactly as your theme draws it.

---

## ❔ ⦁ What do you need to use it?
- Spotify.
- Spicetify.
> (IF YOU DON'T HAVE IT, GO GET IT FIRST, DUH)

> It's an extension, not a theme, so it works with any Spicetify theme (or none).

## ✅ ⦁ How to use it?
### Copy `float.js` into your Spicetify extensions folder, enable it and apply:
```shell
cp float.js ~/.config/spicetify/Extensions/
spicetify config extensions float.js
spicetify apply
```
> On Windows the extensions folder is `%appdata%\spicetify\Extensions`.

### Keep Your Library collapsed:
Leave Your Library in Spotify's collapsed (icons only) mode. Float opens it on hover, that's the whole point, duh!

## 🔧 ⦁ Customizing
The knobs sit in the `:root` block at the top of the CSS inside `float.js`:

`--float-animations` (`1`):  `0` kills every animation, panels snap open and shut  
`--float-sidebar-width` (`72`):  Library strip width (unitless px), `0` hides it  
`--sidebar-hover-width` (`280px`):  Library width when open  
`--slide-window-on-hover` (`1`):  `1` the page slides right, `0` the library covers it  
`--float-members-width` (`72px`):  Right strip width, `0` hides it  
`--members-hover-width` (`320px`):  Right sidebar width when open (Spotify's minimum is 280px)  
`--slide-window-on-members-hover` (`1`):  `1` everything slides left, `0` the sidebar covers the page  
`--sidebar-hover-delay` / `--members-hover-delay` (`0s`):  How long to rest on a strip before it opens  
`--sidebar-transition-duration` / `--members-transition-duration` (`0.4s`):  Slide speed  
`--toolbar-visibility` (`flex`):  `none` hides What's New / Friend Activity until the bar is hovered  
`--playbar-lyrics` / `-queue` / `-connect` / `-volume` / `-miniplayer` (`flex`):  Player bar buttons  

> Want Float at any width? Change the `1300px` in the `@media (max-width: 1300px)` line.

> Float only uses `:hover` on the panels themselves and never on generic children (`> *`, bare tags), because Chromium pools every hover rule together: one sloppy hover rule makes EVERY hover in Spotify restyle whole chunks of the page.

### Edit the file, then apply again:
```shell
spicetify apply
```

## ⚠️ ⦁ Limits
Spotify never lays out narrower than 800 px or shorter than 600 px: a smaller window is just cropped. So the presets live between 800 and 1920 px; anything below 800 can't fire. Blame Spotify, not me.

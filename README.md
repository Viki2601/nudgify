# nudgify

Lightweight, customizable notifications for the web. A small API, five visual styles, nine animations, and no dependencies.

[![npm version](https://img.shields.io/npm/v/nudgify.svg)](https://www.npmjs.com/package/nudgify)
[![license](https://img.shields.io/npm/l/nudgify.svg)](#license)

**[▶ Try the playground](https://viki2601.github.io/nudgify/playground.html)** ·
[Docs](https://viki2601.github.io/nudgify/index.html) ·
[About](https://viki2601.github.io/nudgify/about.html)

The playground lets you tweak every option and copy the generated code.

## Quick start

### 1. Install

```bash
npm install nudgify
```

```bash
# or
pnpm add nudgify
yarn add nudgify
```

### 2. Import

```js
import { nudge } from "nudgify";
```

Nudgify is an ES module for the browser. It works with bundlers (Vite, webpack, Next.js, ...) and with `<script type="module">`.

### 3. Show a nudge

```js
nudge.success("Your changes have been saved!");
```

Four types are available:

```js
nudge.info("Here's a little update for you.");
nudge.success("All done! Changes saved.");
nudge.warning("Heads up, something needs attention.");
nudge.error("That didn't work. Give it another try.");
```

`nudge(message, options)` on its own creates an info nudge.

### 4. Customize it

```js
nudge.success("Your changes have been saved!", {
  position: "top-right",
  variant: "soft",
  animation: "slide-up",
  animationDuration: 350,
  animationEasing: "ease-out",
  theme: "light",
  duration: 4000,
  borderRadius: 12,
  stack: true,
});
```

### 5. Explore in the playground

Open the **[playground](https://viki2601.github.io/nudgify/playground.html)**, adjust positions, styles, animations and actions, then use **Copy snippet** to paste the code into your project.

## Styles

Choose a look with the `variant` option.

| Classic (`default`)                                            | Soft (`soft`)                                            |
| -------------------------------------------------------------- | -------------------------------------------------------- |
| ![Classic style](https://viki2601.github.io/nudgify/images/Classic.png) | ![Soft style](https://viki2601.github.io/nudgify/images/Soft.png) |

| Solid (`solid`)                                            | Outlined (`outline`)                                             |
| ---------------------------------------------------------- | ---------------------------------------------------------------- |
| ![Solid style](https://viki2601.github.io/nudgify/images/Solid.png) | ![Outlined style](https://viki2601.github.io/nudgify/images/Outlined.png) |

| Glass (`glass`)                                            |
| ---------------------------------------------------------- |
| ![Glass style](https://viki2601.github.io/nudgify/images/Glass.png) |

| Variant   | Description                                                                 |
| --------- | --------------------------------------------------------------------------- |
| `default` | White card with a colored accent bar.                                       |
| `soft`    | Background tinted with the type's color.                                    |
| `solid`   | Filled with the type's color, white text.                                   |
| `outline` | Card with a colored border.                                                 |
| `glass`   | Translucent, blurred background. Best over images, gradients or dark pages. |

Use `theme` to pick `"light"`, `"dark"`, or `"auto"` (follows the user's system setting), and `borderRadius` (0 to 32 pixels) to control roundness.

## Positions

`position` accepts `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center` and `bottom-right` (default `top-right`). Nudges in the same position stack neatly, with the newest nearest the screen edge.

## Animations

| Option              | Values                                                                                            | Default                    |
| ------------------- | ------------------------------------------------------------------------------------------------- | -------------------------- |
| `animation`         | `slide`, `slide-up`, `slide-down`, `slide-left`, `slide-right`, `flip`, `fade`, `scale`, `bounce` | `slide`                    |
| `animationDuration` | milliseconds (a positive number)                                                                  | `350`                      |
| `animationEasing`   | `linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out`, `spring`                                  | each animation's own curve |

`slide` enters from the edge of the screen closest to the nudge's position. The animation settings apply to both entering and leaving. If the user's system is set to reduce motion, animations are minimized automatically.

## Actions

Add buttons or links inside a nudge with the `actions` option. Activating an action dismisses the nudge.

### One button

![A nudge with a single button](https://viki2601.github.io/nudgify/images/Informatic.png)

```js
nudge.info("We use cookies to improve your experience.", {
  duration: 0,
  actions: [{ label: "I agree", onClick: () => console.log("Agreed") }],
});
```

### Two buttons

![A nudge with Yes and No buttons](https://viki2601.github.io/nudgify/images/With_Action.png)

```js
nudge("Do you want to continue?", {
  duration: 0,
  actions: [
    {
      label: "Yes",
      variant: "primary",
      onClick: () => console.log("Accepted"),
    },
    {
      label: "No",
      variant: "secondary",
      onClick: () => console.log("Declined"),
    },
  ],
});
```

### A link

![A nudge with a link button](https://viki2601.github.io/nudgify/images/Redirection.png)

```js
nudge.warning("A new version is available.", {
  actions: [{ label: "More info", href: "https://example.com" }],
});
```

| Action field | Description                                                |
| ------------ | ---------------------------------------------------------- |
| `label`      | Required. Text shown on the button or link.                |
| `onClick`    | Function called when the button is clicked.                |
| `href`       | Link destination. Must use `http:`, `https:` or `mailto:`. |
| `variant`    | `"primary"` (default) or `"secondary"`.                    |

Each action needs either `onClick` or `href`, not both.

## Stacking

Set `stack: true` to overlap nudges in the same position. The stack expands when hovered, or when one of its actions has keyboard focus. The default is `false`, so nudges are shown separately.

## Options

| Option              | Type              | Default           | Description                                                    |
| ------------------- | ----------------- | ----------------- | -------------------------------------------------------------- |
| `position`          | string            | `"top-right"`     | Where the nudge appears.                                       |
| `variant`           | string            | `"default"`       | `default`, `soft`, `solid`, `outline` or `glass`.              |
| `theme`             | string            | `"light"`         | `light`, `dark` or `auto`.                                     |
| `animation`         | string            | `"slide"`         | Enter and exit animation.                                      |
| `animationDuration` | number            | `350`             | Animation length in milliseconds.                              |
| `animationEasing`   | string            | animation default | Timing curve for the animation.                                |
| `duration`          | number            | `3000`            | Milliseconds before it closes. `0` keeps it open until closed. |
| `borderRadius`      | number            | `10`              | Corner radius in pixels (0 to 32).                             |
| `icon`              | string or `false` | type icon         | Custom icon (for example `"🚀"`), or `false` to hide it.       |
| `closable`          | boolean           | `true`            | Show a close button.                                           |
| `actions`           | array             | `[]`              | Buttons or links shown inside the nudge.                       |
| `stack`             | boolean           | `false`           | Overlap nudges in the same position.                           |

Hovering a nudge pauses its timer and progress bar. Unknown `position`, `animation`, `variant` or `theme` values fall back to the defaults. Invalid `borderRadius`, `animationDuration`, `animationEasing`, `stack` or `actions` values throw a `TypeError`.

## Methods

| Method                            | Description    |
| --------------------------------- | -------------- |
| `nudge(message, options)`         | Info nudge.    |
| `nudge.info(message, options)`    | Info nudge.    |
| `nudge.success(message, options)` | Success nudge. |
| `nudge.warning(message, options)` | Warning nudge. |
| `nudge.error(message, options)`   | Error nudge.   |

The named `toast` export is kept as a backward-compatible alias: `import { toast } from "nudgify"`.

## Using it with frameworks

**React or Next.js.** Nudgify touches the page, so call it from event handlers or effects. In the Next.js App Router, use it inside a client component:

```jsx
"use client";

import { nudge } from "nudgify";

export default function SaveButton() {
  return <button onClick={() => nudge.success("Saved!")}>Save</button>;
}
```

Calling `nudge()` on the server does nothing, so it is safe to import in server-rendered code.

**Plain HTML, no build step.**

```html
<script type="module">
  import { nudge } from "https://cdn.jsdelivr.net/npm/nudgify@1.1.0/index.js";

  nudge.success("Hello from a plain HTML page!");
</script>
```

## Accessibility

- Error nudges use `role="alert"`; other types use `role="status"`.
- The close button and action buttons are keyboard accessible.
- Timers pause on hover, and stacks pause while an action has keyboard focus.
- Animations are shortened for users who prefer reduced motion.

## Browser support

Modern evergreen browsers. The `soft` and `glass` variants use CSS `color-mix()` and `backdrop-filter`.

## Roadmap

These are ideas, not promises or release dates.

- Accessibility refinements across assistive technologies and browsers
- More practical examples for common application flows
- Integration guidance for popular front-end setups
- Ongoing fixes and documentation updates

Have feedback or an idea? Use the contact link on the [About page](https://viki2601.github.io/nudgify/about.html).

## License

ISC

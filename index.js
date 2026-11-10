import { css } from "./styles.js";

const POSITIONS = ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right",];
const ANIMATIONS = ["slide", "slide-up", "slide-down", "slide-left", "slide-right", "flip", "fade", "scale", "bounce"];
const ANIMATION_EASINGS = ["linear", "ease", "ease-in", "ease-out", "ease-in-out", "spring"];
const VARIANTS = ["default", "soft", "solid", "outline", "glass"];
const THEMES = ["light", "dark", "auto"];
const ICONS = { success: "✓", error: "✕", warning: "!", info: "i" };

const containers = {};
const toastTimers = new WeakMap();
let styleAdded = false;

function addStyles() {
    if (styleAdded) return;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    styleAdded = true;
}

function getContainer(position, stack) {
    if (!containers[position]) {
        const el = document.createElement("div");
        el.className = `nudgify-container nudgify-${position}`;
        el.addEventListener("mouseenter", () => {
            if (!el.classList.contains("nudgify-stacked")) return;
            el.querySelectorAll(".nudgify-toast").forEach((toastEl) => toastTimers.get(toastEl)?.pause());
        });
        el.addEventListener("mouseleave", () => {
            if (!el.classList.contains("nudgify-stacked")) return;
            el.querySelectorAll(".nudgify-toast").forEach((toastEl) => toastTimers.get(toastEl)?.resume());
        });
        el.addEventListener("focusin", () => {
            if (!el.classList.contains("nudgify-stacked")) return;
            el.querySelectorAll(".nudgify-toast").forEach((toastEl) => toastTimers.get(toastEl)?.pause());
        });
        el.addEventListener("focusout", () => {
            if (!el.classList.contains("nudgify-stacked")) return;
            setTimeout(() => {
                if (el.matches(":focus-within")) return;
                el.querySelectorAll(".nudgify-toast").forEach((toastEl) => toastTimers.get(toastEl)?.resume());
            }, 0);
        });
        document.body.appendChild(el);
        containers[position] = el;
    }
    const container = containers[position];
    const wasStacked = container.classList.contains("nudgify-stacked");
    container.classList.toggle("nudgify-stacked", stack);
    if (wasStacked !== stack) {
        container.querySelectorAll(".nudgify-toast").forEach((toastEl) => {
            const timer = toastTimers.get(toastEl);
            if (stack && container.matches(":hover, :focus-within")) timer?.pause();
            else if (!stack) timer?.resume();
        });
    }
    return container;
}

function updateStackLayout(container, position) {
    const toasts = [...container.children];
    toasts.forEach((toastEl, index) => {
        const depth = position.startsWith("top") ? index : toasts.length - index - 1;
        toastEl.style.zIndex = String(toasts.length - depth);
        toastEl.style.setProperty("--nudgify-stack-scale", String(Math.max(0.8, 1 - depth * 0.04)));
    });
}

export function nudge(message, options = {}) {
    if (typeof document === "undefined") return;
    addStyles();

    const {
        type = "info",
        duration = 3000,
        position = "top-right",
        animation = "slide",
        animationDuration = 350,
        animationEasing = "ease",
        variant = "default",
        theme = "light",
        borderRadius = 10,
        actions = [],
        stack = false,
        icon,
        closable = true,
    } = options;

    if (!Number.isFinite(borderRadius)) {
        throw new TypeError("borderRadius must be a finite number");
    }
    if (!Number.isFinite(animationDuration) || animationDuration <= 0) {
        throw new TypeError("animationDuration must be a positive finite number");
    }
    if (!ANIMATION_EASINGS.includes(animationEasing)) {
        throw new TypeError(`animationEasing must be one of: ${ANIMATION_EASINGS.join(", ")}`);
    }
    if (!Array.isArray(actions)) {
        throw new TypeError("actions must be an array");
    }
    if (typeof stack !== "boolean") {
        throw new TypeError("stack must be a boolean");
    }

    const pos = POSITIONS.includes(position) ? position : "top-right";
    const anim = ANIMATIONS.includes(animation) ? animation : "slide";
    const vari = VARIANTS.includes(variant) ? variant : "default";
    const them = THEMES.includes(theme) ? theme : "light";
    const easing = animationEasing === "spring" ? "cubic-bezier(.21,1.02,.73,1)" : animationEasing;

    const el = document.createElement("div");
    el.className = `nudgify-toast nudgify-${type} nudgify-${anim} ` + `nudgify-v-${vari} nudgify-t-${them} nudgify-enter`;
    el.style.setProperty("--nudgify-radius", `${Math.min(32, Math.max(0, borderRadius))}px`);
    el.style.setProperty("--nudgify-animation-duration", `${animationDuration}ms`);
    el.style.setProperty("--nudgify-animation-easing", easing);
    el.setAttribute("role", type === "error" ? "alert" : "status");

    const content = document.createElement("div");
    content.className = "nudgify-content";

    // icon
    if (icon !== false) {
        const glyph = icon ?? ICONS[type];
        if (glyph) {
            const iconEl = document.createElement("span");
            iconEl.className = "nudgify-icon";
            iconEl.textContent = glyph;
            content.appendChild(iconEl);
        }
    }

    // message
    const text = document.createElement("span");
    text.className = "nudgify-message";
    text.textContent = message;
    content.appendChild(text);

    // timer with pause/resume (tracks the time that is left)
    let timer;
    let remaining = duration;
    let startedAt = 0;
    let timerRunning = false;
    let removing = false;

    function remove() {
        if (removing) return;
        removing = true;
        clearTimeout(timer);
        timerRunning = false;
        el.classList.remove("nudgify-enter");
        el.classList.add("nudgify-exit");
        el.addEventListener("animationend", (e) => {
            if (e.target === el) {
                el.remove();
                updateStackLayout(container, pos);
            }
        });
        setTimeout(() => {
            el.remove();
            updateStackLayout(container, pos);
        }, 600);
    }

    function startTimer() {
        if (removing || duration <= 0 || timerRunning) return;
        if (container?.classList.contains("nudgify-stacked") && container.matches(":hover, :focus-within")) return;
        startedAt = Date.now();
        timerRunning = true;
        timer = setTimeout(remove, remaining);
    }

    function pauseTimer() {
        if (removing || duration <= 0 || !timerRunning) return;
        clearTimeout(timer);
        remaining -= Date.now() - startedAt;
        timerRunning = false;
    }

    el.addEventListener("mouseenter", pauseTimer);
    el.addEventListener("mouseleave", startTimer);

    // close button
    if (closable) {
        const close = document.createElement("button");
        close.className = "nudgify-close";
        close.setAttribute("aria-label", "Close");
        close.textContent = "×";
        close.onclick = remove;
        content.appendChild(close);
    }

    el.appendChild(content);

    if (actions.length > 0) {
        const actionGroup = document.createElement("div");
        actionGroup.className = "nudgify-actions";
        actionGroup.setAttribute("role", "group");
        actionGroup.setAttribute("aria-label", "Notification actions");

        actions.forEach((action, index) => {
            if (!action || typeof action.label !== "string" || action.label.trim() === "") {
                throw new TypeError(`actions[${index}].label must be a non-empty string`);
            }
            if (typeof action.onClick !== "undefined" && typeof action.onClick !== "function") {
                throw new TypeError(`actions[${index}].onClick must be a function`);
            }
            if (typeof action.href !== "undefined" && typeof action.href !== "string") {
                throw new TypeError(`actions[${index}].href must be a string`);
            }
            if (typeof action.href !== "undefined" && typeof action.onClick !== "undefined") {
                throw new TypeError(`actions[${index}] must provide either href or onClick, not both`);
            }
            if (typeof action.href === "undefined" && typeof action.onClick === "undefined") {
                throw new TypeError(`actions[${index}] must provide an onClick callback or href`);
            }

            const actionVariant = action.variant === "secondary" ? "secondary" : "primary";
            let actionEl;
            if (typeof action.href === "string") {
                const url = new URL(action.href, document.baseURI);
                if (!["http:", "https:", "mailto:"].includes(url.protocol)) {
                    throw new TypeError(`actions[${index}].href must use http, https, or mailto`);
                }
                actionEl = document.createElement("a");
                actionEl.href = url.href;
                actionEl.addEventListener("click", remove);
            } else {
                actionEl = document.createElement("button");
                actionEl.type = "button";
                actionEl.addEventListener("click", () => {
                    remove();
                    action.onClick();
                });
            }
            actionEl.className = `nudgify-action nudgify-action-${actionVariant}`;
            actionEl.textContent = action.label;
            actionGroup.appendChild(actionEl);
        });

        el.appendChild(actionGroup);
    }

    // progress bar (only for toasts that expire)
    if (duration > 0) {
        const bar = document.createElement("span");
        bar.className = "nudgify-progress";
        bar.style.animationDuration = `${duration}ms`;
        el.appendChild(bar);
    }

    // newest toast sits nearest the screen edge
    const container = getContainer(pos, stack);
    if (pos.startsWith("top")) container.prepend(el);
    else container.append(el);
    toastTimers.set(el, { pause: pauseTimer, resume: startTimer });
    updateStackLayout(container, pos);

    startTimer();
}

nudge.success = (message, options) => nudge(message, { ...options, type: "success" });
nudge.error = (message, options) => nudge(message, { ...options, type: "error" });
nudge.warning = (message, options) => nudge(message, { ...options, type: "warning" });
nudge.info = (message, options) => nudge(message, { ...options, type: "info" });

export { nudge as toast };
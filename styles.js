export const css = `
/* ---------- containers & positions ---------- */
.nudgify-container {
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  pointer-events: none;
}
.nudgify-top-left      { top: 0;    left: 0; }
.nudgify-top-center    { top: 0;    left: 50%; transform: translateX(-50%); }
.nudgify-top-right     { top: 0;    right: 0; }
.nudgify-bottom-left   { bottom: 0; left: 0; }
.nudgify-bottom-center { bottom: 0; left: 50%; transform: translateX(-50%); }
.nudgify-bottom-right  { bottom: 0; right: 0; }
.nudgify-container.nudgify-stacked { gap: 0; }
.nudgify-stacked .nudgify-toast {
  scale: var(--nudgify-stack-scale, 1);
  transition: margin-top .25s ease, scale .25s ease;
}
.nudgify-stacked .nudgify-toast + .nudgify-toast { margin-top: -36px; }
.nudgify-stacked:hover .nudgify-toast + .nudgify-toast,
.nudgify-stacked:focus-within .nudgify-toast + .nudgify-toast { margin-top: 10px; }
.nudgify-stacked:hover .nudgify-toast,
.nudgify-stacked:focus-within .nudgify-toast { scale: 1; }

/* slide direction per position */
.nudgify-top-left, .nudgify-bottom-left   { --nudgify-x: -120%; --nudgify-y: 0; }
.nudgify-top-right, .nudgify-bottom-right { --nudgify-x: 120%;  --nudgify-y: 0; }
.nudgify-top-center    { --nudgify-x: 0; --nudgify-y: -120%; }
.nudgify-bottom-center { --nudgify-x: 0; --nudgify-y: 120%; }

/* ---------- base toast ---------- */
.nudgify-toast {
  --accent: #3b82f6;
  --nudgify-bg: #ffffff;
  --nudgify-fg: #1f2937;
  position: relative;
  overflow: hidden;
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
  min-width: 240px;
  max-width: 360px;
  padding: 12px 16px;
  border-radius: var(--nudgify-radius, 10px);
  background: var(--nudgify-bg);
  color: var(--nudgify-fg);
  border-left: 5px solid var(--accent);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  font: 500 14px/1.4 system-ui, sans-serif;
}
.nudgify-content {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}
.nudgify-message { flex: 1; }
.nudgify-actions {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 8px;
}
.nudgify-action {
  display: inline-flex;
  min-height: 30px;
  align-items: center;
  justify-content: center;
  padding: 5px 11px;
  border: 1px solid transparent;
  border-radius: max(4px, calc(var(--nudgify-radius, 10px) - 4px));
  font: 600 12px/1.2 system-ui, sans-serif;
  text-decoration: none;
  cursor: pointer;
  transition: filter .15s ease, background .15s ease;
}
.nudgify-action:hover { filter: brightness(.94); }
.nudgify-action-primary {
  background: var(--accent);
  color: #ffffff;
}
.nudgify-action-secondary {
  border-color: color-mix(in srgb, var(--accent) 35%, transparent);
  background: transparent;
  color: var(--nudgify-fg);
}
.nudgify-v-solid .nudgify-action-primary {
  background: rgba(255, 255, 255, 0.22);
}
.nudgify-v-solid .nudgify-action-secondary {
  border-color: rgba(255, 255, 255, 0.65);
  color: #ffffff;
}
.nudgify-action:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* ---------- types (accent color) ---------- */
.nudgify-info    { --accent: #3b82f6; }
.nudgify-success { --accent: #22c55e; }
.nudgify-warning { --accent: #f59e0b; }
.nudgify-error   { --accent: #ef4444; }

/* ---------- themes ---------- */
.nudgify-t-dark { --nudgify-bg: #1f2937; --nudgify-fg: #f9fafb; }
@media (prefers-color-scheme: dark) {
  .nudgify-t-auto { --nudgify-bg: #1f2937; --nudgify-fg: #f9fafb; }
}

/* ---------- variants ---------- */
.nudgify-v-soft {
  background: color-mix(in srgb, var(--accent) 14%, var(--nudgify-bg));
}
.nudgify-v-solid {
  background: var(--accent);
  color: #ffffff;
  border-left-color: transparent;
}
.nudgify-v-outline {
  border: 2px solid var(--accent);
}
.nudgify-v-glass {
  background: color-mix(in srgb, var(--nudgify-bg) 55%, transparent);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-left: 5px solid var(--accent);
}

/* ---------- icon, close button, progress ---------- */
.nudgify-icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--accent);
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
}
.nudgify-v-solid .nudgify-icon { background: rgba(255, 255, 255, 0.25); }

.nudgify-close {
  background: none;
  border: 0;
  padding: 0;
  color: inherit;
  opacity: 0.5;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}
.nudgify-close:hover { opacity: 1; }

.nudgify-progress {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
  background: var(--accent);
  opacity: 0.6;
  transform-origin: left;
  animation: nudgify-progress linear forwards;
}
.nudgify-v-solid .nudgify-progress { background: rgba(255, 255, 255, 0.7); }
.nudgify-toast:hover .nudgify-progress { animation-play-state: paused; }
@keyframes nudgify-progress { to { transform: scaleX(0); } }

/* ---------- animations ---------- */
.nudgify-enter.nudgify-slide  { animation: nudgify-slide-in .35s cubic-bezier(.21,1.02,.73,1) both; }
.nudgify-exit.nudgify-slide   { animation: nudgify-slide-out .25s ease-in both; }
.nudgify-enter.nudgify-fade   { animation: nudgify-fade-in .3s ease both; }
.nudgify-exit.nudgify-fade    { animation: nudgify-fade-out .2s ease both; }
.nudgify-enter.nudgify-scale  { animation: nudgify-scale-in .3s ease both; }
.nudgify-exit.nudgify-scale   { animation: nudgify-scale-out .2s ease both; }
.nudgify-enter.nudgify-bounce { animation: nudgify-bounce-in .5s cubic-bezier(.34,1.56,.64,1) both; }
.nudgify-exit.nudgify-bounce  { animation: nudgify-scale-out .2s ease both; }
.nudgify-enter.nudgify-slide-up { animation: nudgify-slide-up-in .35s ease both; }
.nudgify-exit.nudgify-slide-up { animation: nudgify-slide-up-out .25s ease-in both; }
.nudgify-enter.nudgify-slide-down { animation: nudgify-slide-down-in .35s ease both; }
.nudgify-exit.nudgify-slide-down { animation: nudgify-slide-down-out .25s ease-in both; }
.nudgify-enter.nudgify-slide-left { animation: nudgify-slide-left-in .35s ease both; }
.nudgify-exit.nudgify-slide-left { animation: nudgify-slide-left-out .25s ease-in both; }
.nudgify-enter.nudgify-slide-right { animation: nudgify-slide-right-in .35s ease both; }
.nudgify-exit.nudgify-slide-right { animation: nudgify-slide-right-out .25s ease-in both; }
.nudgify-enter.nudgify-flip { animation: nudgify-flip-in .45s ease both; }
.nudgify-exit.nudgify-flip { animation: nudgify-flip-out .3s ease-in both; }
.nudgify-toast.nudgify-enter,
.nudgify-toast.nudgify-exit {
  animation-duration: var(--nudgify-animation-duration, .35s);
  animation-timing-function: var(--nudgify-animation-easing, ease);
}

@keyframes nudgify-slide-in  { from { transform: translate(var(--nudgify-x), var(--nudgify-y)); opacity: 0; } }
@keyframes nudgify-slide-out { to   { transform: translate(var(--nudgify-x), var(--nudgify-y)); opacity: 0; } }
@keyframes nudgify-fade-in   { from { opacity: 0; } }
@keyframes nudgify-fade-out  { to   { opacity: 0; } }
@keyframes nudgify-scale-in  { from { transform: scale(.85); opacity: 0; } }
@keyframes nudgify-scale-out { to   { transform: scale(.85); opacity: 0; } }
@keyframes nudgify-bounce-in { from { transform: scale(.4); opacity: 0; } }
@keyframes nudgify-slide-up-in { from { transform: translateY(100%); opacity: 0; } }
@keyframes nudgify-slide-up-out { to { transform: translateY(-100%); opacity: 0; } }
@keyframes nudgify-slide-down-in { from { transform: translateY(-100%); opacity: 0; } }
@keyframes nudgify-slide-down-out { to { transform: translateY(100%); opacity: 0; } }
@keyframes nudgify-slide-left-in { from { transform: translateX(100%); opacity: 0; } }
@keyframes nudgify-slide-left-out { to { transform: translateX(-100%); opacity: 0; } }
@keyframes nudgify-slide-right-in { from { transform: translateX(-100%); opacity: 0; } }
@keyframes nudgify-slide-right-out { to { transform: translateX(100%); opacity: 0; } }
@keyframes nudgify-flip-in { from { transform: perspective(600px) rotateX(-90deg); opacity: 0; } }
@keyframes nudgify-flip-out { to { transform: perspective(600px) rotateX(90deg); opacity: 0; } }

@media (prefers-reduced-motion: reduce) {
  .nudgify-toast { animation-duration: 0.01ms !important; }
}
`;
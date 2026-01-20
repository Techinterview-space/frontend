import {
  Injectable,
  signal,
  computed,
  effect,
  PLATFORM_ID,
  Inject,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

/**
 * Theme options for the application
 */
export type Theme = "light" | "dark" | "system";

/**
 * The actual resolved theme (what's displayed)
 */
export type ResolvedTheme = "light" | "dark";

/**
 * Local storage key for persisting theme preference
 */
const THEME_STORAGE_KEY = "theme";

/**
 * ThemeService manages the application's light/dark mode theming.
 *
 * Features:
 * - Supports light, dark, and system (auto) themes
 * - Persists user preference in localStorage
 * - Automatically detects and responds to system preference changes
 * - Uses Angular signals for reactive state management
 * - Prevents flash of unstyled content (FOUC) via index.html script
 *
 * Usage:
 * ```typescript
 * // In component
 * constructor(public themeService: ThemeService) {}
 *
 * // Toggle between themes
 * themeService.toggleTheme();
 *
 * // Set specific theme
 * themeService.setTheme('dark');
 *
 * // Get current theme
 * const theme = themeService.theme();
 * const isDark = themeService.isDarkMode();
 * ```
 */
@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private readonly isBrowser: boolean;

  /**
   * The user's theme preference (light, dark, or system)
   */
  private readonly _theme = signal<Theme>("system");

  /**
   * Whether the system prefers dark mode
   */
  private readonly _systemPrefersDark = signal<boolean>(false);

  /**
   * Public readonly access to the theme preference
   */
  readonly theme = this._theme.asReadonly();

  /**
   * The resolved theme that's actually being displayed
   */
  readonly resolvedTheme = computed<ResolvedTheme>(() => {
    const theme = this._theme();
    if (theme === "system") {
      return this._systemPrefersDark() ? "dark" : "light";
    }
    return theme;
  });

  /**
   * Whether dark mode is currently active
   */
  readonly isDarkMode = computed(() => this.resolvedTheme() === "dark");

  /**
   * Whether light mode is currently active
   */
  readonly isLightMode = computed(() => this.resolvedTheme() === "light");

  /**
   * Whether the theme is set to follow system preference
   */
  readonly isSystemTheme = computed(() => this._theme() === "system");

  /**
   * Media query for detecting system dark mode preference
   */
  private mediaQuery: MediaQueryList | null = null;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      // Initialize system preference detection
      this.initSystemPreferenceDetection();

      // Load saved theme from localStorage
      this.loadSavedTheme();

      // Set up effect to apply theme changes to DOM
      effect(() => {
        this.applyTheme(this.resolvedTheme());
      });
    }
  }

  /**
   * Sets up detection and listening for system color scheme preference
   */
  private initSystemPreferenceDetection(): void {
    this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    this._systemPrefersDark.set(this.mediaQuery.matches);

    // Listen for system preference changes
    const handler = (event: MediaQueryListEvent) => {
      this._systemPrefersDark.set(event.matches);
    };

    // Modern browsers
    if (this.mediaQuery.addEventListener) {
      this.mediaQuery.addEventListener("change", handler);
    } else {
      // Fallback for older browsers
      this.mediaQuery.addListener(handler);
    }
  }

  /**
   * Loads the saved theme preference from localStorage
   */
  private loadSavedTheme(): void {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;

    if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
      this._theme.set(savedTheme);
    } else {
      // Default to system preference
      this._theme.set("system");
    }
  }

  /**
   * Applies the theme to the DOM by setting data-theme attribute
   */
  private applyTheme(theme: ResolvedTheme): void {
    if (!this.isBrowser) return;

    const root = document.documentElement;

    // Remove existing theme attribute if setting to light (default)
    if (theme === "light" && this._theme() === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }

    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(theme);
  }

  /**
   * Updates the meta theme-color tag for mobile browser chrome
   */
  private updateMetaThemeColor(theme: ResolvedTheme): void {
    const metaThemeColor = document.querySelector(
      'meta[name="theme-color"]:not([media])',
    );
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        theme === "dark" ? "#1a1816" : "#fffbf7",
      );
    }
  }

  /**
   * Sets the theme preference
   * @param theme - The theme to set ('light', 'dark', or 'system')
   */
  setTheme(theme: Theme): void {
    this._theme.set(theme);

    if (this.isBrowser) {
      // Persist to localStorage
      if (theme === "system") {
        localStorage.removeItem(THEME_STORAGE_KEY);
      } else {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      }
    }
  }

  /**
   * Toggles between light and dark themes
   * If currently on system theme, switches to the opposite of the current resolved theme
   */
  toggleTheme(): void {
    const currentResolved = this.resolvedTheme();
    const newTheme: Theme = currentResolved === "dark" ? "light" : "dark";
    this.setTheme(newTheme);
  }

  /**
   * Cycles through themes: light -> dark -> system -> light
   */
  cycleTheme(): void {
    const current = this._theme();
    const cycle: Theme[] = ["light", "dark", "system"];
    const currentIndex = cycle.indexOf(current);
    const nextIndex = (currentIndex + 1) % cycle.length;
    this.setTheme(cycle[nextIndex]);
  }

  /**
   * Resets theme to follow system preference
   */
  resetToSystem(): void {
    this.setTheme("system");
  }

  /**
   * Gets an icon name for the current theme state (for use with Bootstrap Icons)
   */
  getThemeIcon(): string {
    const theme = this._theme();
    switch (theme) {
      case "light":
        return "bi-sun-fill";
      case "dark":
        return "bi-moon-fill";
      case "system":
        return "bi-circle-half";
      default:
        return "bi-circle-half";
    }
  }

  /**
   * Gets a label for the current theme (for accessibility and tooltips)
   */
  getThemeLabel(): string {
    const theme = this._theme();
    switch (theme) {
      case "light":
        return "Светлая тема";
      case "dark":
        return "Тёмная тема";
      case "system":
        return "Системная тема";
      default:
        return "Переключить тему";
    }
  }

  /**
   * Gets the label for the next theme in the toggle cycle
   */
  getNextThemeLabel(): string {
    const currentResolved = this.resolvedTheme();
    return currentResolved === "dark" ? "Светлая тема" : "Тёмная тема";
  }
}

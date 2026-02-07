---
description: Coding conventions and best practices for the dev-page-2 codebase
---

## UI Components

1. **Always use Ant Design (antd) components** over raw HTML/CSS/JS elements. This project uses Ant Design 5 with a custom dark theme.
   - Use `Typography.Title` instead of `<h1>`–`<h6>`
   - Use `Typography.Text` and `Typography.Paragraph` instead of `<span>` and `<p>`
   - Use `Typography.Link` instead of `<a>`
   - Use `Button` instead of `<button>`
   - Use `Flex` instead of `<div style={{ display: 'flex' }}>`
   - Use `Row`/`Col` for grid layouts
   - Use `Spin` for loading indicators
   - Use `Card`, `Tag`, `Divider`, `Avatar`, `Image`, etc. where applicable
   - Use `ConfigProvider` with the project's `darkTheme` for theming

2. **Framer Motion** (`motion.div`, `AnimatePresence`) is used for animations and is acceptable alongside antd.

3. **React Three Fiber** components (`Canvas`, `mesh`, `group`, etc.) are exempt from the antd rule — they operate inside the 3D canvas.

## Theming

- Import shared theme from `src/app/antd-theme.ts` (`darkTheme`, `colors`)
- Wrap page components in `<ConfigProvider theme={{ ...darkTheme, algorithm: theme.darkAlgorithm }}>`

## ESLint

- Escape special characters in JSX text (use `&apos;`, `&quot;`, etc.)
- Use `next/image` `<Image>` instead of `<img>` where possible

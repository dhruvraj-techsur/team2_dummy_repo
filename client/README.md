# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with Hot Module Replacement (HMR) and integrated ESLint and Prettier configurations.

## Official Vite Plugins

Vite offers two official plugins for React:

- **@vitejs/plugin-react**: Utilizes Babel for Fast Refresh.
- **@vitejs/plugin-react-swc**: Employs SWC for Fast Refresh.

## Enhanced ESLint Configuration

For production applications, it's recommended to enable type-aware linting rules. Here's how to configure ESLint:

1. **Update `parserOptions`**:

   Configure the top-level `parserOptions` property as follows:
# i18n Usage Guide

## Overview

The React Kit comes with built-in internationalization (i18n) support using `i18next`. You can add your own translations by passing them as a prop to `AppShell`.

## Adding Custom Translations

### Option 1: Import from JSON files (Recommended)

Create your translation files:

**`src/locales/en.json`:**
```json
{
  "myApp": {
    "welcome": "Welcome!",
    "greeting": "Hello, {{name}}!"
  }
}
```

**`src/locales/ru.json`:**
```json
{
  "myApp": {
    "welcome": "Добро пожаловать!",
    "greeting": "Привет, {{name}}!"
  }
}
```

Then import and pass them to `AppShell`:

```tsx
import { AppShell } from '@bvdcode/react-kit';
import enTranslations from './locales/en.json';
import ruTranslations from './locales/ru.json';

<AppShell
  appName="My App"
  translations={{
    en: enTranslations,
    ru: ruTranslations,
  }}
  pages={...}
/>
```

### Option 2: Define inline

```tsx
<AppShell
  appName="My App"
  translations={{
    en: {
      myApp: {
        welcome: "Welcome!",
        greeting: "Hello, {{name}}!",
      },
    },
    ru: {
      myApp: {
        welcome: "Добро пожаловать!",
        greeting: "Привет, {{name}}!",
      },
    },
  }}
  pages={...}
/>
```

## Using Translations in Components

Use the `useTranslation` hook from `react-i18next`:

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation('myApp'); // specify your namespace
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('greeting', { name: 'John' })}</p>
    </div>
  );
}
```

## Built-in Translations

The library provides these translation keys in the `translation` namespace (default):

- `login.*` - Login page texts
- `navigation.*` - Navigation bar texts (logout, language switcher, etc.)
- `notFound.*` - 404 page texts
- `errors.*` - Error messages

Example usage:

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation(); // uses 'translation' namespace by default
  
  return <div>{t('notFound.title')}</div>;
}
```

## Language Switching

The library includes a language switcher in the navigation bar. Users can switch between available languages, and the preference is saved to localStorage.

You can also change the language programmatically:

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  
  return (
    <button onClick={() => changeLanguage('ru')}>
      Switch to Russian
    </button>
  );
}
```

## Best Practices

1. **Use namespaces** to organize your translations (e.g., `myApp`, `admin`, `settings`)
2. **Use interpolation** for dynamic values: `{{variableName}}`
3. **Keep keys consistent** across all languages
4. **Don't hardcode text** - always use translation keys
5. **Store translations in JSON files** - easier to maintain and can be edited by non-developers

## Complete Example

**`src/locales/en.json`:**
```json
{
  "myApp": {
    "home": {
      "title": "Welcome Home",
      "description": "This is the home page"
    },
    "about": {
      "title": "About Us",
      "description": "Learn more about our company"
    }
  }
}
```

**`src/locales/ru.json`:**
```json
{
  "myApp": {
    "home": {
      "title": "Добро пожаловать",
      "description": "Это главная страница"
    },
    "about": {
      "title": "О нас",
      "description": "Узнайте больше о нашей компании"
    }
  }
}
```

**Component:**
```tsx
import { useTranslation } from 'react-i18next';

function HomePage() {
  const { t } = useTranslation('myApp');
  
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('home.description')}</p>
    </div>
  );
}
```

**App setup:**
```tsx
import { AppShell } from '@bvdcode/react-kit';
import enTranslations from './locales/en.json';
import ruTranslations from './locales/ru.json';

function App() {
  return (
    <AppShell
      appName="My App"
      translations={{
        en: enTranslations,
        ru: ruTranslations,
      }}
      pages={[
        {
          route: "/",
          name: "Home",
          component: <HomePage />,
        },
      ]}
    />
  );
}
```


# Growth Clinic Web App Styling Guide

## Brand Colors
The application uses a consistent color palette defined in CSS variables:

```css
:root {
  --gc-pastel: #20BF55;     /* Primary brand color - used for CTAs and highlights */
  --gc-dartmouth: #104738;   /* Secondary brand color - used for hover states */
  --gc-black: #1D0D3D;      /* Text color */
  --gc-white: #FFFFFF;      /* Background color */
  --gc-dutch: #B0CE5D;      /* Accent color */
  --gc-carrot: #F09524;     /* Warning/notification color */
  --gc-chestnut: #954738;   /* Error color */
  --gc-light-grey: rgba(229, 229, 229, 0.10);  /* Background accent */
}
```

## Typography
The app uses CerebriSansPro as its primary font:

```css
@font-face {
  font-family: 'CerebriSansPro';
  src: url('/web/css/font/CerebriSansPro-Regular.woff2') format('woff2'),
       url('/web/css/font/CerebriSansPro-Regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'CerebriSansPro';
  src: url('/web/css/font/CerebriSansPro-Bold.woff2') format('woff2'),
       url('/web/css/font/CerebriSansPro-Bold.woff') format('woff');
  font-weight: bold;
  font-style: normal;
}

body {
  font-family: 'CerebriSansPro', sans-serif;
  color: var(--gc-black);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

## Component Styling

### Navbar
```css
.navbar {
  margin-bottom: 1rem;
  background-color: var(--gc-white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  height: 80px;
  padding: 0 2rem;
}

.navbar-item img {
  max-height: 40px;
  transition: transform 0.3s ease;
}

.navbar-item img:hover {
  transform: scale(1.05);
}
```

### Buttons
```css
.button {
  font-family: 'CerebriSansPro', sans-serif;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s ease;
  height: 48px;
  padding: 0 24px;
}

.button.is-primary {
  background-color: var(--gc-pastel);
  color: var(--gc-white);
  border: none;
}

.button.is-primary:hover {
  background-color: var(--gc-dartmouth);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(32, 191, 85, 0.2);
}
```

### Cards
```css
.card {
  margin-bottom: 1.5rem;
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 200px;
  padding: 1.5rem;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}
```

### Forms and Inputs
```css
.input, .textarea {
  border-radius: 8px;
  border: 2px solid #E5E5E5;
  transition: border-color 0.3s ease;
  height: 48px;
}

.input:focus, .textarea:focus {
  border-color: var(--gc-pastel);
  box-shadow: 0 0 0 2px rgba(32, 191, 85, 0.1);
}
```

### Notifications
```css
.notification {
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  position: relative;
  margin-bottom: 1.5rem;
}

.notification.is-success {
  background-color: rgba(32, 191, 85, 0.1);
  color: var(--gc-pastel);
  border: 1px solid var(--gc-pastel);
}
```

## Animations
```css
.fade-in {
  animation: fadeIn 0.5s ease-in;
}

.fade-out {
  opacity: 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

## Responsive Design
```css
@media screen and (max-width: 768px) {
  .hero .title {
    font-size: 2.5rem;
  }
  
  .hero-body {
    padding: 3rem 1.5rem;
  }
  
  .section {
    padding: 3rem 1.5rem;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
  }
}
```

## Using with Bulma
The styling integrates with Bulma's classes. Here are common patterns:

### Layout
```html
<div class="container">
  <div class="columns">
    <div class="column is-half">
      <!-- Content -->
    </div>
  </div>
</div>
```

### Components
```html
<!-- Card -->
<div class="card">
  <div class="card-content">
    <h2 class="title">Title</h2>
    <p class="subtitle">Subtitle</p>
  </div>
</div>

<!-- Button -->
<button class="button is-primary">
  Start Learning
</button>

<!-- Form -->
<div class="field">
  <div class="control">
    <input class="input" type="email" placeholder="Enter email">
  </div>
</div>
```

## Implementation Guide

1. Ensure you have Bulma CSS included:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
```

2. Add the custom styles:
```html
<link rel="stylesheet" href="/web/css/styles.css">
```

3. Use Bulma's classes combined with custom classes for components:
```html
<button class="button is-primary">
  Start Learning
</button>
```

The styling system is designed to be simple and maintainable, building on Bulma's foundation while adding custom branding and enhancements. All custom styles are in the `styles.css` file, and the system uses CSS variables for easy theme updates.
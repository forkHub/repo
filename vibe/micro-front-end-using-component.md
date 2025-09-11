Creating a **micro front-end (MFE)** architecture using **Web Components** is a great way to build modular, independently deployable UI components. Here's a complete breakdown of how to achieve this, including:

- Independent hosting
- CSS and JS isolation
- Communication between MFEs and with the parent shell

---

## 🧱 1. Project Structure Overview

```
/shell-app
  index.html
  shell.js
  event-bus.js

/mfe-header
  index.html
  header.js
  style.css

/mfe-footer
  index.html
  footer.js
  style.css

/mfe-content
  index.html
  content.js
  style.css
```

Each MFE is a standalone app that registers a custom element (Web Component).

---

## 🧩 2. Creating a Web Component (Example: Header)

### `mfe-header/header.js`

```javascript
class MfeHeader extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', 'style.css');

    const container = document.createElement('div');
    container.innerHTML = `<h1>Header MFE</h1><button id="notify">Notify Parent</button>`;

    shadow.appendChild(style);
    shadow.appendChild(container);

    container.querySelector('#notify').addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('mfe-event', {
        detail: { source: 'header', message: 'Hello from Header!' }
      }));
    });
  }
}

customElements.define('mfe-header', MfeHeader);
```

### `mfe-header/style.css`

```css
:host {
  display: block;
  background: #f0f0f0;
  padding: 10px;
  font-family: sans-serif;
}
```

---

## 🧭 3. Shell App (Parent)

### `shell-app/index.html`

```html
<!DOCTYPE html>
<html>
<head>
  <title>Micro Frontend Shell</title>
</head>
<body>
  <mfe-header></mfe-header>
  <mfe-content></mfe-content>
  <mfe-footer></mfe-footer>

  <script type="module" src="shell.js"></script>
</body>
</html>
```

### `shell-app/shell.js`

```javascript
// Dynamically load MFEs
const loadScript = (url) => {
  const script = document.createElement('script');
  script.type = 'module';
  script.src = url;
  document.head.appendChild(script);
};

// Load MFEs from independent hosts
loadScript('http://localhost:3001/header.js');
loadScript('http://localhost:3002/content.js');
loadScript('http://localhost:3003/footer.js');

// Listen to events from MFEs
window.addEventListener('mfe-event', (e) => {
  console.log('Received event from MFE:', e.detail);
});
```

---

## 🔄 4. Communication Between MFEs

Use a shared **event bus** or **custom events** on `window`.

### `event-bus.js` (Optional Shared Bus)

```javascript
export const EventBus = {
  emit(event, data) {
    window.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  on(event, callback) {
    window.addEventListener(event, (e) => callback(e.detail));
  }
};
```

Then in any MFE:

```javascript
import { EventBus } from 'http://localhost:3000/event-bus.js';

EventBus.emit('custom-message', { from: 'content', msg: 'Hi!' });
EventBus.on('custom-message', (data) => console.log('Received:', data));
```

---

## 🧪 5. Hosting Each MFE

You can host each MFE using a simple static server like:

```bash
npx serve -l 3001  # for mfe-header
npx serve -l 3002  # for mfe-content
npx serve -l 3003  # for mfe-footer
```

---

Would you like a working GitHub repo structure or a downloadable ZIP with all the files?

To load each Micro Frontend (MFE) **on demand**, you can dynamically import and render the Web Components only when needed—such as when a user navigates to a specific section or clicks a button.

Here’s how to implement **on-demand loading** in your shell app:

---

## 🧠 Key Concepts

- **Lazy loading**: Load MFE scripts only when required.
- **Dynamic imports**: Use `import()` or create `<script>` tags dynamically.
- **Custom element registration**: Ensure each MFE registers its own Web Component.
- **Event-based communication**: Use `CustomEvent` or a shared event bus.

---

## 🧭 Shell App Example with On-Demand Loading

### `shell-app/index.html`

```html
<!DOCTYPE html>
<html>
<head>
  <title>Micro Frontend Shell</title>
</head>
<body>
  <button onclick="loadMfe('header')">Load Header</button>
  <button onclick="loadMfe('content')">Load Content</button>
  <button onclick="loadMfe('footer')">Load Footer</button>

  <div id="mfe-container"></div>

  <script type="module" src="shell.js"></script>
</body>
</html>
```

---

### `shell-app/shell.js`

```javascript
const mfeMap = {
  header: 'http://localhost:3001/header.js',
  content: 'http://localhost:3002/content.js',
  footer: 'http://localhost:3003/footer.js'
};

const loadedMfes = new Set();

window.loadMfe = async function (name) {
  if (!loadedMfes.has(name)) {
    await loadScript(mfeMap[name]);
    loadedMfes.add(name);
  }

  const container = document.getElementById('mfe-container');
  const element = document.createElement(`mfe-${name}`);
  container.appendChild(element);
};

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Listen to events from MFEs
window.addEventListener('mfe-event', (e) => {
  console.log('Shell received event:', e.detail);
});
```

---

## 🧩 MFE Example (Header)

### `mfe-header/header.js`

```javascript
class MfeHeader extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'style.css';

    const div = document.createElement('div');
    div.innerHTML = `<h1>Header</h1><button id="send">Send Event</button>`;

    shadow.appendChild(style);
    shadow.appendChild(div);

    div.querySelector('#send').addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('mfe-event', {
        detail: { source: 'header', message: 'Hello from Header!' }
      }));
    });
  }
}

customElements.define('mfe-header', MfeHeader);
```

---

## ✅ Benefits

- **Performance**: Only load what’s needed.
- **Scalability**: Add more MFEs without bloating the initial bundle.
- **Flexibility**: Each MFE can be deployed and versioned independently.

---

Would you like me to generate a downloadable ZIP with this working setup or help you integrate routing (e.g., using hash or path-based navigation)?

To **prevent a Micro Frontend (MFE) from being loaded more than once**, you can use a combination of:

1. **Tracking loaded MFEs** in a `Set` or `Map`
2. **Checking if the custom element is already defined**
3. **Avoiding duplicate DOM elements**

Here’s how to implement all three strategies:

---

### ✅ 1. Track Loaded MFEs

In your `shell.js`, use a `Set` to track which MFEs have been loaded:

```javascript
const loadedMfes = new Set();

async function loadMfe(name, url) {
  if (!loadedMfes.has(name)) {
    await loadScript(url);
    loadedMfes.add(name);
  }

  // Prevent duplicate DOM elements
  if (!document.querySelector(`mfe-${name}`)) {
    const container = document.getElementById('mfe-container');
    const element = document.createElement(`mfe-${name}`);
    container.appendChild(element);
  }
}
```

---

### ✅ 2. Check if Custom Element Is Already Defined

Before loading the script, check if the custom element is already registered:

```javascript
async function loadMfe(name, url) {
  if (!customElements.get(`mfe-${name}`)) {
    await loadScript(url);
  }

  if (!document.querySelector(`mfe-${name}`)) {
    const container = document.getElementById('mfe-container');
    const element = document.createElement(`mfe-${name}`);
    container.appendChild(element);
  }
}
```

This is especially useful if the script was already loaded by another part of the app or during a previous session.

---

### ✅ 3. Avoid Duplicate DOM Elements

Always check if the element is already in the DOM before appending:

```javascript
if (!document.querySelector(`mfe-${name}`)) {
  const element = document.createElement(`mfe-${name}`);
  container.appendChild(element);
}
```

---

### 🧠 Optional: Use a Map for More Control

If you want to track both script loading and DOM rendering separately:

```javascript
const mfeRegistry = new Map();

async function loadMfe(name, url) {
  if (!mfeRegistry.has(name)) {
    await loadScript(url);
    mfeRegistry.set(name, true);
  }

  if (!document.querySelector(`mfe-${name}`)) {
    const element = document.createElement(`mfe-${name}`);
    document.getElementById('mfe-container').appendChild(element);
  }
}
```

---

Would you like me to generate a full working example with this logic applied across multiple MFEs?
To set up a **micro-frontend architecture using Module Federation** with:

- **MFE apps built in React**
- **Host (Shell) app built in Vanilla JavaScript**
- **Communication between MFEs and between MFEs and Shell**
- **Webpack as the bundler**

Here's a step-by-step guide to achieve this:

---

### **1. Project Structure**

```plaintext
micro-frontend-architecture/
├── shell/                # Vanilla JS host
├── mfe1/                 # React MFE 1
└── mfe2/                 # React MFE 2
```

---

### **2. Webpack Configuration with Module Federation**

#### **Shell (Vanilla JS Host)**

**webpack.config.js**
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3000,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        mfe1: 'mfe1@http://localhost:3001/remoteEntry.js',
        mfe2: 'mfe2@http://localhost:3002/remoteEntry.js',
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
```

**src/index.js**
```js
import('mfe1/App').then(({ default: MFE1 }) => {
  MFE1(document.getElementById('mfe1-container'));
});

import('mfe2/App').then(({ default: MFE2 }) => {
  MFE2(document.getElementById('mfe2-container'));
});
```

---

#### **MFE1 and MFE2 (React Apps)**

**webpack.config.js**
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3001, // or 3002 for mfe2
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'mfe1', // or mfe2
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
```

**src/App.js**
```js
import React from 'react';
import ReactDOM from 'react-dom';

const App = (container) => {
  ReactDOM.render(<div>Hello from MFE1</div>, container);
};

export default App;
```

---

### **3. Communication Between MFEs and Shell**

Use a **shared event bus** or **custom events**:

#### **Event Bus (Simple Pub/Sub)**

**eventBus.js (shared across apps)**
```js
const listeners = {};

export const subscribe = (event, callback) => {
  if (!listeners[event]) listeners[event] = [];
  listeners[event].push(callback);
};

export const publish = (event, data) => {
  if (listeners[event]) {
    listeners[event].forEach((callback) => callback(data));
  }
};
```

Each MFE and the shell can import this and use `publish` and `subscribe` to communicate.

---

### **4. HTML Setup**

**shell/public/index.html**
```html
<body>
  <div id="mfe1-container"></div>
  <div id="mfe2-container"></div>
</body>
```

---

### ✅ Summary

- **Shell** loads MFEs dynamically using Module Federation.
- **MFEs** expose React components.
- **Communication** is handled via a shared event bus or custom DOM events.
- **Webpack** manages bundling and federation.

Would you like a working GitHub template or a downloadable starter project for this setup?

To **load MFEs on demand** and **avoid double initialization**, you can enhance your setup with the following strategies:

---

### ✅ 1. **Lazy Load MFEs in the Shell**

Instead of importing MFEs at the top level, use dynamic imports only when needed (e.g., on button click or route change):

```js
let mfe1Loaded = false;

function loadMFE1() {
  if (mfe1Loaded) return;

  import('mfe1/App').then(({ default: MFE1 }) => {
    MFE1(document.getElementById('mfe1-container'));
    mfe1Loaded = true;
  });
}
```

This ensures **MFE1 is only initialized once**, even if the function is called multiple times.

---

### ✅ 2. **Expose Initialization Function in MFE**

In `mfe1/src/App.js`:

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

let root;

const App = (container) => {
  if (!root) {
    root = ReactDOM.createRoot(container);
    root.render(<div>Hello from MFE1</div>);
  }
};

export default App;
```

This avoids re-rendering or re-initializing the React app if it's already mounted.

---

### ✅ 3. **Use a Shared Event Bus for Communication**

To coordinate between MFEs and the shell, use a shared event bus (as mentioned earlier). This allows MFEs to communicate without needing to be loaded all at once.

---

### ✅ 4. **Optional: Use a Router or Navigation System**

If you're using a router (like `vanilla-router` or `hashchange`), you can load MFEs based on route changes:

```js
window.addEventListener('hashchange', () => {
  const route = location.hash.slice(1);
  if (route === 'mfe1') loadMFE1();
});
```

---

### ✅ 5. **Optional: Cache MFE Modules**

If you want to cache the module itself (not just the initialization), you can do:

```js
let mfe1Module;

async function loadMFE1() {
  if (!mfe1Module) {
    mfe1Module = await import('mfe1/App');
  }
  mfe1Module.default(document.getElementById('mfe1-container'));
}
```

---

Would you like a working example repo or a downloadable starter project with this setup?

Yes, **Micro-Frontends (MFEs) can be mounted and unmounted** dynamically — especially when using **React** for the MFE and **Vanilla JavaScript** for the host. This is a common pattern to optimize performance and memory usage.

---

### ✅ How to Mount and Unmount an MFE

#### **1. Expose `mount` and `unmount` Functions in the MFE**

In your MFE (`mfe1/src/App.js`):

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

let root;

export function mount(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!root) {
    root = ReactDOM.createRoot(container);
    root.render(<div>Hello from MFE1</div>);
  }
}

export function unmount(containerId) {
  const container = document.getElementById(containerId);
  if (root && container) {
    root.unmount();
    root = null;
  }
}
```

Then expose these in `webpack.config.js`:

```js
exposes: {
  './App': './src/App',
}
```

---

#### **2. Use in the Shell (Vanilla JS)**

```js
let mfe1Module;

async function loadMFE1() {
  if (!mfe1Module) {
    mfe1Module = await import('mfe1/App');
  }
  mfe1Module.mount('mfe1-container');
}

function unloadMFE1() {
  if (mfe1Module) {
    mfe1Module.unmount('mfe1-container');
  }
}
```

You can now call `loadMFE1()` and `unloadMFE1()` based on user interaction, route changes, or other logic.

---

### ✅ Optional: Add Transitions or Cleanup

You can enhance the `unmount` function to:

- Remove event listeners
- Clear timers
- Animate exit transitions

---

Would you like a working example or a downloadable template with this mount/unmount pattern implemented?
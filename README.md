# Premium Cybersecurity & AI Developer Portfolio

This is a premium, futuristic single-page React portfolio website custom-rebuilt for **Agil Faraz**. It features a high-performance dark-mode-first aesthetic inspired by designs from Apple, Vercel, Linear, and Stripe, integrating advanced cyber security and AI layout schemas.

---

## 🚀 Tech Stack

- **Framework**: React 19 (modular structures)
- **Build Tool**: Vite (fast HMR)
- **Styling**: Tailwind CSS (flexible layouts)
- **Animations**: Framer Motion (60fps spring transitions)
- **3D Background**: Pure Three.js Canvas (interactive synapse nodes)
- **Forms**: EmailJS Integration
- **Icons**: Lucide Icons & React Icons

---

## 📁 Project Structure

```text
premium-portfolio/
├── package.json          # Dependencies & dev scripts
├── vite.config.js        # Vite + React configs
├── tailwind.config.js    # Customized theme colors and typography
├── postcss.config.js     # PostCSS parser configuration
├── index.html            # Entry HTML (SEO tags & font links)
├── README.md             # Project documentation
├── public/               # Static assets folder
│   ├── resume.pdf        # Your resume PDF file (imported)
│   └── images/
│       ├── agil_faraz.jpg         # Profile picture
│       ├── chest_detection.jpg    # Deep learning chest pathology mockup
│       └── healthcare_system.jpg  # Secure medical portal mockup
└── src/
    ├── main.jsx          # Mount point
    ├── App.jsx           # Section layouts, loading, custom cursor, scroll tracking
    ├── index.css         # Global layouts, custom scrollbar, glassmorphic cards
    ├── hooks/
    │   └── useMousePosition.js    # Cursor trackers
    └── components/
        ├── LoadingScreen.jsx      # Cyber-security boot sequence progress loader
        ├── BackgroundCanvas.jsx   # Three.js 3D mesh particle synapses
        ├── CustomCursor.jsx       # Floating outer ring pointer follower
        ├── SpotlightCard.jsx      # Reusable card with mouse spotlight glow
        ├── Navbar.jsx             # Sticky transparent blur header
        ├── Hero.jsx               # Introduction, typing effect, parallax photo tilt
        ├── About.jsx              # Bio summary rewritten & statistics
        ├── Skills.jsx             # Categorized progress bars with neon fills
        ├── Projects.jsx           # Category filters, mockups, expanders (8 projects)
        ├── Research.jsx           # AI and LLM security timeline cards
        ├── Education.jsx          # Academic history timeline
        ├── Achievements.jsx       # MuLearn, NRPF leadership, varsity sports
        ├── Certifications.jsx     # Security target credentials
        ├── Github.jsx             # SVG calendar grid & most used language charts
        ├── Contact.jsx            # Form validations, direct WhatsApp click redirection
        └── Footer.jsx             # Minimalist footer & back-to-top scroll
```

---

## 🛠️ Local Setup & Run Instructions

To run this project locally, make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended). Then follow these steps:

1. **Extract/Navigate** to the folder:
   ```bash
   cd premium-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run in development mode**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Click on the local URL printed in the terminal (usually `http://localhost:5173`).

---

## ⚡ Build for Production

To create an optimized production build:

```bash
npm run build
```

This compiles your application and places the static assets inside the `dist/` directory, which is ready to be hosted on platforms like **Vercel**, **Netlify**, or **GitHub Pages**.

---

## ✉️ EmailJS Integration Setup

To activate your contact form:
1. Register on [EmailJS](https://www.emailjs.com/).
2. Create a Email Service and Email Template.
3. Open `src/components/Contact.jsx`.
4. Replace the placeholder service, template, and public key arguments inside `handleSubmit()`:
   ```javascript
   emailjs.sendForm(
     'YOUR_SERVICE_ID',
     'YOUR_TEMPLATE_ID',
     formRef.current,
     'YOUR_PUBLIC_KEY'
   )
   ```

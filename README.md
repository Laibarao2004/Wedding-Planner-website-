# 💍 Aria Noor | Luxury Wedding & Event Planner Portfolio

A responsive, romantic, and accessible portfolio website designed for a professional wedding and commercial event planner. Built entirely with **semantic HTML5**, **modern CSS3**, and **vanilla JavaScript**—with zero external frameworks or runtime libraries.

---

## 🌸 Table of Contents
- [Overview & Purpose](#-overview--purpose)
- [Design System & Palette](#-design-system--palette)
- [Key Features & Sections](#-key-features--sections)
- [Semantic Forms & Accessibility](#-semantic-forms--accessibility)
- [Folder Structure](#-folder-structure)
- [How to Open & Run](#-how-to-open--run)
- [Testing & Quality Verification Checklist](#-testing--quality-verification-checklist)

---

## 🎀 Overview & Purpose
This website showcases the personal brand, expertise, portfolio, journey, and client reviews of **Aria Noor**, a certified luxury event designer and coordinator. The site focuses on both intimate celebrations and large-scale commercial events:
- **Weddings & Vow Renewals** (Glasshouse ceremonies, romantic estates)
- **Multicultural Rituals** (Mehndi, Sangeet, Baraat, Walima)
- **Engagements & Sunset Soirées**
- **Destination Celebrations**
- **Corporate Galas & Executive Summits**

---

## 🎨 Design System & Palette

The visual identity embodies a dreamy, cute, romantic, and elegant aesthetic:

| Color Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Blush Soft** | `#FDF2F4` / `#FADADD` | Soft card backgrounds & pills |
| **Blush Deep** | `#F8D7DA` | Section accents & subtle borders |
| **Cream / Ivory** | `#FFF8F0` / `#FFFDF9` | Page body & luminous canvas |
| **Dusty Rose** | `#D98895` / `#B96674` | Primary brand tone & gradient buttons |
| **Champagne Gold**| `#D4AF37` / `#F3E5AB` | Decorative sparkle accents & focus rings |
| **Sage Green** | `#B7C9A8` / `#8F9D7D` | Botanical badges & soothing contrasts |
| **Plum / Charcoal**| `#4A3B47` / `#372834` | High-contrast body typography & dark footer |

### Typography
- **Headings**: `Playfair Display` & `Cormorant Garamond` (Google Fonts)
- **Body**: `Poppins` (Clean, legible sans-serif)
- **Script Accents**: `Great Vibes` (Handwritten romantic flourishes)

### Visual Effects
- **Pure CSS/JS Ambient Petals**: Floating soft blossom petals swaying down the hero canvas.
- **Glassmorphism**: Soft backdrop blur (`backdrop-filter: blur(12px)`) with delicate translucent borders.
- **Gentle Curves**: `16px` to `24px` border radii with smooth hover lift transitions (`translateY(-8px)`).
- **CSS-Only Artwork**: Stylized portrait monogram, badge halo, and gradient project banners with zero external image dependencies.

---

## 💎 Key Features & Sections

1. **Skip to Content Link**: Instant keyboard bypass straight to `<main id="main-content">`.
2. **Sticky Navigation Bar**:
   - Transparent blurred header that gains shadow on scroll.
   - Logo with animated ring emoji and brand title.
   - Live scrollspy highlighting the active section link.
   - Accessible hamburger drawer menu for mobile and tablet screens.
3. **Hero Section**:
   - Large elegant headline with script accent.
   - Tagline highlighting multicultural and corporate versatility.
   - Primary and secondary CTAs (`#contact` and `#portfolio`).
   - Animated trust bar highlighting 150+ events and 5-star reputation.
4. **About / Profile Section**:
   - CSS gradient portrait badge with monogram and floating awards.
   - Personal bio describing passion for both cultural traditions and modern minimalism.
   - Animated numerical counters (150+ Events, 8+ Years, 100% Happy Couples, 24+ Honors) triggered on scroll.
5. **Services Section**:
   - 6 Glassmorphic service cards:
     1. Full Wedding Planning & Coordination
     2. Decor & Floral Design
     3. Catering & Banquet Management
     4. Photography & Video Direction
     5. Venue Sourcing & Booking
     6. Destination & Cultural Events (Mehndi, Baraat, Walima)
6. **Skills & Expertise Section**:
   - 6 Animated progress bars (Budget Stewardship, Vendor Synergy, Creative Floral Architecture, Day-Of Precision, Client Hospitality, Crisis Mitigation) filling automatically when scrolled into view.
   - Trust highlights pill cloud.
7. **Curated Portfolio**:
   - 6 Detailed project cards with category badges, locations, and guest counts.
   - Dynamic JavaScript filter buttons: **All Events**, **Weddings & Ceremonies**, **Engagements**, and **Corporate Galas**.
   - Interactive modal with full event story and highlights for each celebration.
8. **Education & Experience Timeline**:
   - Vertical timeline tracing degrees, international certifications (CLWP™), agency roles, and founding Aria Noor Events.
9. **Testimonials Carousel**:
   - Auto-sliding quote carousel with pause on hover/focus.
   - Next/Previous controls and pagination dots.
   - Keyboard accessible (`ArrowLeft` / `ArrowRight`).
10. **Semantic Contact Form & Studio Details**:
    - Complete inquiry form with inline validation, aria tags, and polite status messages.
    - Studio address, phone/WhatsApp, email, and social media channels.
11. **Site Footer & Back-to-Top**:
    - Deep plum footer with quick links, specialties, and copyright.
    - Smooth scrolling floating back-to-top button appearing after 450px of scroll.

---

## ♿ Semantic Forms & Accessibility

The contact form is built following WCAG 2.1 AA accessibility guidelines:
- **Semantic Structure**: Uses `<form>`, `<fieldset>`, `<legend>`, and proper `<label for="...">` associations for every field.
- **Input Types**: `type="text"`, `type="email"`, `type="tel"`, `type="date"`, `type="number"`, `select`, and `textarea`.
- **Keyboard Navigation**: Clear, visible `:focus-visible` outline rings with champagne gold contrast.
- **ARIA Attributes**:
  - `aria-required="true"` on mandatory inputs.
  - `aria-describedby` linking each input to its dedicated error container (`clientNameError`, `emailError`, etc.).
  - `aria-live="polite"` on error spans and the success banner to notify screen readers dynamically without disruptive interrupts.
  - `aria-invalid="true"` added dynamically when invalid.
- **JavaScript Validation**:
  - Intercepts form submission (`e.preventDefault()`).
  - Verifies minimum lengths, valid email regex, valid international telephone patterns, positive guest count boundaries, and future event dates.
  - Dynamically focuses the first invalid element upon failed submission.
  - Auto-clears error states as the user types valid information.
  - Displays a personalized friendly success message banner:
    `"Thank You, [Name]! Your inquiry has been received with warm excitement. We'll contact you within 24 hours to schedule your dream consultation."`
  - Resets all inputs upon successful validation.

---

## 📂 Folder Structure

```
wedding-planner-portfolio/
│
├── index.html        # Semantic HTML5 markup with complete section structure
├── style.css         # Modern responsive CSS3 with CSS variables & animations
├── script.js         # Vanilla JavaScript (navigation, counters, filters, carousel, modal, forms)
└── README.md         # Documentation, feature guide & verification instructions
```

---

## 🚀 How to Open & Run

No server, installation, or build tools are required!

1. Open your file manager and navigate to:
   ```
   wedding-planner-portfolio/
   ```
2. Double-click **`index.html`** or right-click and select **Open with** -> **Google Chrome**, **Mozilla Firefox**, **Microsoft Edge**, or **Safari**.
3. Alternatively, in PowerShell run:
   ```powershell
   Start-Process "c:\Users\fattani computers\.antigravity\wedding-planner-portfolio\index.html"
   ```

---

## ✅ Testing & Quality Verification Checklist

When opening and inspecting the website, check the following:

- [x] **Hero & Ambient Petals**: Falling petals animate smoothly down the background without blocking clicks or selections.
- [x] **Sticky Header & Scrollspy**: Header stays pinned to the top, applies shadow on scroll, and the active navigation link changes as you scroll past each section.
- [x] **Mobile Menu Toggle**: Resize your browser window below 768px (or test on mobile device), tap the hamburger icon, and verify the menu slides open smoothly.
- [x] **Animated Stats Counters**: Scroll down to the **About** section; numbers count up smoothly from 0 to 150+, 8+, 100%, and 24+.
- [x] **Animated Skill Bars**: Scroll to the **Expertise** section; all six skill bars animate from 0% to their target percentages.
- [x] **Portfolio Filtering**:
  - Click **Weddings & Ceremonies** -> Only the 3 wedding cards show.
  - Click **Engagements** -> Only the 1 engagement card shows.
  - Click **Corporate Galas** -> Only the 2 corporate cards show.
  - Click **All Events** -> All 6 cards return smoothly.
- [x] **Project Modal**: Click **View Story ✨** on any event card to open the accessible modal dialog; test closing with the `✕` button, clicking the backdrop, or pressing the `Esc` key.
- [x] **Testimonial Carousel**: Test next (`>`) and previous (`<`) arrows, click the dot indicators, verify auto-advance every 6 seconds, and observe that hovering pauses the timer.
- [x] **Contact Form Inline Validation**:
  - Try submitting an empty form -> Inline errors appear under every required field, highlighting fields in soft pink/red.
  - Enter invalid email (e.g. `test@`) -> Descriptive error appears.
  - Enter guest count below 10 -> Minimum count warning appears.
  - Fill all fields properly and submit -> Form resets, smooth green success banner appears with client name.
- [x] **Back to Top Button**: Scroll down past 450px; click the floating `↑` button in the bottom right to glide back to the top.
- [x] **Responsiveness**: Verify at 360px width, 480px, 768px, 1024px, and desktop widths. No horizontal scrollbars or clipping.

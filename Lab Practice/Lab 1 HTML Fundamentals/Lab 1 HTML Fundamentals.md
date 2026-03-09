<p align="center">
<strong>Qatar University</strong><br>
College of Engineering - Department of Computer Science and Engineering<br>
<strong>CMPS 356 - Web Development Fundamentals</strong>
</p>

---

# Lab 1: HTML Fundamentals

# MyFinance Dashboard - Your Personal Money Management Hub

**Duration:** 120 minutes
**Type:** Practice Lab (Ungraded)
**Theme:** Personal Finance Platform - Part 1 of 11
**Author:** Abdulahi Hassen

---

## Overview

This lab introduces **HTML Fundamentals** - the foundation of all web development. You'll learn to create well-structured, semantic, and accessible HTML documents using modern HTML5 standards.

To make learning practical and engaging, you'll apply these fundamentals by building a **MyFinance Dashboard** - a personal finance management interface. This project will grow across all 11 labs as you learn new technologies (HTML → CSS → JavaScript → Next.js → Database).

In this lab, you'll master semantic HTML5 elements, create accessible content, and structure information effectively using proper markup.

### What You'll Build

A single-page **MyFinance Dashboard** featuring:

- Account overview with balance cards
- Transaction history table
- Financial goals tracker
- Budget summary
- Educational resources section
- Fully accessible, semantic HTML5 structure

### Lab Structure

**Part A: Interactive HTML Basics (60 minutes)**
Instructor demonstrates each concept → You practice immediately → Repeat

**Part B: MyFinance Dashboard Project (60 minutes)**
Apply all learned concepts to build your complete dashboard

---

## Learning Objectives

By the end of this lab, you will be able to:

- Create valid HTML5 documents with proper structure
- Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`)
- Build accessible navigation and content
- Create data tables with proper accessibility attributes
- Add images with descriptive alt text
- Structure content with headings, lists, and paragraphs
- Validate HTML code and fix errors

---

## Prerequisites

- Text editor (VS Code recommended)
- Modern web browser (Chrome, Firefox, Edge, or Safari)

---

## Getting Started

1. Download the starter files from the course repository
2. Create a working folder for this lab: `Lab1-HTML Fundamentals`
3. Open your text editor and browser side-by-side

---

# Part A: Interactive HTML Basics (60 minutes)

## Module 1: HTML Document Structure (10 minutes)

### Instructor Led (5 minutes)

Create a basic HTML5 document that displays the following text.

<h1>Welcome to HTML</h1>
<p>This is a paragraph.</p>

---

**Key Concepts Explained:**

- `<!DOCTYPE html>` - Declares HTML5 document type
- `<html lang="en">` - Root element with language attribute for accessibility
- `<head>` - Contains metadata (not displayed on page)
- `<meta charset="UTF-8">` - Character encoding for proper text display
- `<meta name="viewport"...>` - Enables responsive design on mobile devices
- `<title>` - Page title shown in browser tab
- `<body>` - Contains all visible content

### Your Practice Exercise (5 minutes)

**Task:** Create your first HTML page

1. Create a new file named `practice.html` in your working folder
2. Write a complete HTML5 document with:

   - Proper DOCTYPE and html structure
   - Title: "HTML Practice - [Your Name]"
   - h1 heading: "Learning HTML Basics"
   - Two paragraphs about why you're learning web development
3. Save and open in your browser to verify it works

**Expected Result:**

<img src="screenshots/module1-structure.png" alt="Module 1 - HTML Document Structure" width="500">

**Self-Check:**

- [ ] Page displays in browser without errors
- [ ] Title appears in browser tab
- [ ] Heading and paragraphs are visible

---

## Module 2: Headings and Text Formatting (10 minutes)

### Instructor Led (5 minutes)

Demonstrate heading hierarchy and text formatting as shown below.

**Expected Result:**

<fieldset>
<legend><strong>Rendered Output</strong></legend>

<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
<h4>Sub-subsection Title</h4>

<p>This is a <strong>bold text</strong> and this is <em>italic text</em>.</p>
<p>You can also use <mark>highlighted text</mark> for important information.</p>
<p>This is <small>fine print</small> and this is <del>deleted text</del>.</p>

</fieldset>

---

**Key Concepts Explained:**

- Heading hierarchy: h1 → h2 → h3 → h4 → h5 → h6
- Never skip heading levels (don't jump from h1 to h3)
- Only one h1 per page (main page title)
- `<strong>` - Important text (semantic) vs `<b>` (presentational)
- `<em>` - Emphasized text (semantic) vs `<i>` (presentational)
- `<mark>` - Highlighted text
- `<small>` - Fine print, disclaimers
- `<del>` - Deleted/strikethrough text

### Your Practice Exercise (5 minutes)

**Task:** Add content structure to your practice page

Add the following to your `practice.html` (after your existing content):

1. h2 heading: "My Goals"
2. h3 heading: "Short-term Goals"
3. A paragraph listing 3 short-term goals, using `<strong>` for important keywords
4. h3 heading: "Long-term Goals"
5. A paragraph listing 2 long-term goals, using `<em>` for emphasis

**Expected Result:**

<fieldset>
<legend><strong>Rendered Output</strong></legend>

<h2>My Goals</h2>
<h3>Short-term Goals</h3>
<p>I want to <strong>master HTML</strong> by the end of this month,
complete all lab exercises, and build a personal portfolio website.</p>

</fieldset>

---

**Expected Result:**

<img src="screenshots/module2-headings.png" alt="Module 2 - Headings and Text Formatting" width="500">

**Self-Check:**

- [ ] Heading hierarchy is correct (h2 → h3)
- [ ] Strong and em tags used appropriately
- [ ] Content is meaningful and well-structured

---

## Module 3: Lists (10 minutes)

### Instructor Led (5 minutes)

Demonstrate different list types:

<fieldset>
<legend><strong>Rendered Output</strong></legend>

<h3>Shopping List</h3>
<ul>
    <li>Apples</li>
    <li>Bread</li>
    <li>Milk</li>
</ul>

<h3>Recipe Steps</h3>
<ol>
    <li>Preheat oven to 350°F</li>
    <li>Mix dry ingredients</li>
    <li>Add wet ingredients</li>
    <li>Bake for 30 minutes</li>
</ol>

<h3>Book Chapters</h3>
<ol type="I">
    <li>Introduction</li>
    <li>Getting Started</li>
    <li>Advanced Topics</li>
</ol>

<h3>Course Structure</h3>
<ul>
    <li>Week 1: HTML
        <ul>
            <li>Document Structure</li>
            <li>Semantic Elements</li>
        </ul>
    </li>
    <li>Week 2: CSS</li>
</ul>

</fieldset>

---

**Key Concepts Explained:**

- `<ul>` - Unordered list (use when order doesn't matter)
- `<ol>` - Ordered list (use when sequence is important)
- `<li>` - List item (must be inside ul or ol)
- List type attribute: `type="1"` (default), `type="A"`, `type="a"`, `type="I"`, `type="i"`
- Nested lists for hierarchical information

### Your Practice Exercise (5 minutes)

**Task:** Create different types of lists

Add to your `practice.html`:

1. h2 heading: "My Favorite Things"
2. Unordered list with 4 of your hobbies
3. h2 heading: "Steps to Success"
4. Ordered list with 5 steps to achieve your goals
5. **Bonus Challenge:** Create a nested list showing:
   - Your favorite courses
   - Under each course, list 2-3 topics you enjoy

**Expected Result:**

<img src="screenshots/module3-lists.png" alt="Module 3 - Lists" width="500">

**Self-Check:**

- [X] Unordered list displays with bullet points
- [X] Ordered list displays with numbers
- [X] Nested list (if attempted) shows indentation
- [X] All list items are inside ul or ol tags

---

## Module 4: Links and Navigation (8 minutes)

### Instructor Led (4 minutes)

Demonstrate different types of links:

<fieldset>
<legend><strong>Rendered Output</strong></legend>

<nav>
    <a href="#about">About</a> |
    <a href="#services">Services</a> |
    <a href="#contact">Contact</a>
</nav>

<section id="about">
    <h2>About Us</h2>
    <p>Company information here...</p>
</section>

<section id="services">
    <h2>Our Services</h2>
    <p>Service details here...</p>
</section>

<p>Visit <a href="https://www.w3schools.com" target="_blank" rel="noopener noreferrer">W3Schools</a>
to learn more.</p>

<p>Contact us at <a href="mailto:support@example.com">support@example.com</a></p>

<p>Call us: <a href="tel:+97412345678">+974 1234 5678</a></p>

</fieldset>

---

**Key Concepts Explained:**

- `href` - Hyperlink reference (destination)
- Internal links: `href="#id"` jumps to element with matching id
- External links: Full URL starting with `https://`
- `target="_blank"` - Opens link in new tab
- `rel="noopener noreferrer"` - Security best practice for external links
- Special link types: `mailto:` for email, `tel:` for phone numbers

### Your Practice Exercise (4 minutes)

**Task:** Add navigation and links

Add to your `practice.html`:

1. Give each of your h2 sections a unique `id` attribute (e.g., `id="goals"`, `id="favorites"`)
2. At the top of your page (before the first h1), create a navigation menu with links to each section
3. Add an external link to your favorite website (open in new tab)
4. Add an email link to your email address

**Example:**

<fieldset>
<legend><strong>Rendered Output</strong></legend>

<nav>
    <a href="#goals">Goals</a> |
    <a href="#favorites">Favorites</a> |
    <a href="#steps">Steps</a>
</nav>

</fieldset>

---

**Expected Result:** Clicking navigation links should jump to sections

<img src="screenshots/module4-links.png" alt="Module 4 - Links and Navigation" width="500">

**Self-Check:**

- [ ] Clicking navigation links jumps to correct sections
- [ ] External link opens in new tab
- [ ] Email link opens email client
- [ ] All links have proper href attributes

---

## Module 5: Images and Figures (10 minutes)

### Instructor Led (5 minutes)

Demonstrate adding images:

<img src="screenshots/images-and-figures.png" alt="Images and Figures Example" width="600">

---

**Key Concepts Explained:**

- `src` - Source path to image file (relative or absolute)
- `alt` - Alternative text for accessibility (describe what's in the image)
- Good alt text: "Bar chart showing sales growth" (descriptive)
- Bad alt text: "image" or "chart.png" (not helpful)
- `width` - Image width (use just width, not height, for responsive sizing)
- `<figure>` - Semantic container for images, diagrams, code snippets
- `<figcaption>` - Caption for the figure
- When to use figure: When image needs a caption or is referenced in text

### Your Practice Exercise (5 minutes)

**Task:** Add images to your page

1. Download the sample images from the starter-code/images folder
2. Add at least 2 images to your page
3. Write descriptive alt text for each image
4. Wrap at least one image in a `<figure>` with a `<figcaption>`

**Tip:** If you don't have images yet, you can use placeholder services:

```html
<img src="https://via.placeholder.com/600x400" alt="Placeholder image">
```

**Expected Result:**

<img src="screenshots/module5-images.png" alt="Module 5 - Images and Figures" width="500">

**Self-Check:**

- [ ] Images display correctly
- [ ] Alt text is descriptive (not generic)
- [ ] At least one image uses figure and figcaption
- [ ] Images are sized appropriately

---

## Module 6: Tables (12 minutes)

### Instructor Led (7 minutes)

Demonstrate creating accessible data tables:

<fieldset>
<legend><strong>Rendered Output</strong></legend>

<table border="1">
    <caption><strong>Student Grades - Fall 2025</strong></caption>
    <thead>
        <tr>
            <th scope="col">Student Name</th>
            <th scope="col">Assignment 1</th>
            <th scope="col">Assignment 2</th>
            <th scope="col">Average</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Ahmed Al-Mansoori</th>
            <td>85</td>
            <td>90</td>
            <td>87.5</td>
        </tr>
        <tr>
            <th scope="row">Fatima Hassan</th>
            <td>92</td>
            <td>88</td>
            <td>90</td>
        </tr>
        <tr>
            <th scope="row">Mohammed Ali</th>
            <td>78</td>
            <td>82</td>
            <td>80</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th scope="row">Class Average</th>
            <td>85</td>
            <td>86.7</td>
            <td>85.8</td>
        </tr>
    </tfoot>
</table>

</fieldset>

---

**Key Concepts Explained:**

- `<table>` - Container for tabular data
- `<caption>` - Table title (important for accessibility)
- `<thead>` - Table header section
- `<tbody>` - Table body (main data)
- `<tfoot>` - Table footer (summaries, totals)
- `<tr>` - Table row
- `<th>` - Table header cell (bold and centered by default)
- `<td>` - Table data cell
- `scope="col"` - Indicates header applies to column
- `scope="row"` - Indicates header applies to row
- **Important:** Only use tables for tabular data, never for layout!

### Your Practice Exercise (5 minutes)

**Task:** Replicate the following complex table

**Study this table and replicate it exactly:**

<table border="1">
    <caption><strong>Quarterly Sales Report 2026</strong></caption>
    <thead>
        <tr>
            <th rowspan="2" scope="col">Product Category</th>
            <th colspan="3" scope="col">Quarter 1</th>
            <th rowspan="2" scope="col">Total</th>
        </tr>
        <tr>
            <th scope="col">January</th>
            <th scope="col">February</th>
            <th scope="col">March</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Electronics</th>
            <td>15,000</td>
            <td>18,000</td>
            <td>22,000</td>
            <td>55,000</td>
        </tr>
        <tr>
            <th scope="row">Clothing</th>
            <td>8,500</td>
            <td>9,200</td>
            <td>12,000</td>
            <td>29,700</td>
        </tr>
        <tr>
            <th scope="row">Home Goods</th>
            <td>12,000</td>
            <td>11,500</td>
            <td>14,800</td>
            <td>38,300</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th scope="row">Quarter Total</th>
            <td>35,500</td>
            <td>38,700</td>
            <td>48,800</td>
            <td><strong>123,000</strong></td>
        </tr>
    </tfoot>
</table>

**Key Features to Implement:**

1. **Caption**: "Quarterly Sales Report 2026"
2. **Complex Header Row**:
   - First header : "Product Category"
   - Second header : "Quarter 1"
   - Third header : "Total"
3. **Sub-header Row**: January, February, March
4. **Three Data Rows**: Electronics, Clothing, Home Goods
5. **Footer Row**: Quarter Total with monthly and grand totals

**Requirements:**

- Must include `<caption>`
- Must use `<thead>`, `<tbody>`, and `<tfoot>`
- Must use `rowspan`for cells that span 2 rows
- Must use `colspan`for cells that span 3 columns
- Must use `scope` attributes on all header cells
- All numerical data must match exactly

**Expected Result:**

<img src="screenshots/module6-tables.png" alt="Module 6 - Tables" width="500">

**Self-Check:**

- [ ] Table has a descriptive caption
- [ ] Headers use `<th>` with proper scope attributes
- [ ] Data uses `<td>` tags
- [ ] Table structure is logical and easy to read

---

## Part A Summary

Congratulations! You've now practiced all the fundamental HTML concepts:

- [X] Document structure
- [X] Headings and text formatting
- [X] Lists (ordered and unordered)
- [X] Links and navigation
- [X] Images and figures
- [X] Tables

**Save your `practice.html` file** - you'll reference it while building your final project!

---

# Part B: MyFinance Dashboard Project (60 minutes)

## Project Overview

Now you'll apply everything you've learned to build a complete **MyFinance Dashboard** - a single-page financial management interface.

### Important: Focus on HTML Structure

**You will focus on:** Writing correct HTML tags, semantic elements, and proper structure
**We provide:** All content (text, amounts, labels, data, etc.)

This lets you concentrate on learning semantic HTML5 markup and accessibility best practices without worrying about creating realistic financial data.

### Visual Mockup

See the complete design in: `screenshots/final-dashboard.png`
See the annotated structure in: `screenshots/final-dashboard-sections.png`

### Project Requirements

Your dashboard must include the following sections:

1. **Header** - Logo, site title, and tagline
2. **Navigation** - Internal links to all main sections
3. **Dashboard Overview** - Account balance cards
4. **My Accounts Table** - List of accounts with balances
5. **Financial Goals** - Goals with progress indicators (images/figures)
6. **Budget Summary Table** - Spending by category
7. **Resources Aside** - Educational links and tips
8. **Footer** - Copyright and contact links

---

## Detailed Section Requirements

### 1. Header Section

**Location:** Top of the page
**Purpose:** Branding and site identity

**What to build:**
Create a header containing the MyFinance logo, main site title, and tagline.

**Must include:**

- Logo image (150px wide) with descriptive alt text
- h1 with site name "MyFinance Dashboard"
- Tagline paragraph: "Your Personal Money Management Hub"

**See screenshot:** `screenshots/header-section.png`

---

### 2. Navigation Menu

**Location:** Below header
**Purpose:** Quick access to page sections

**What to build:**
Create a navigation menu with links to jump to each main section of the page.

**Must include:**

- Nav element containing links to all 5 main sections
- Links for: Overview, My Accounts, Financial Goals, Budget, Resources
- Use pipe symbol (|) to separate links visually
- Each link must work (use proper href="#id")

**See screenshot:** `screenshots/navigation-menu.png`

---

### 3. Main Content Area

**What to build:**
Wrap all your main sections (Overview, Accounts, Goals, Budget) inside a `<main>` element.

**Purpose:** Semantic structure to contain primary page content

---

### 4. Dashboard Overview Section

**Location:** First section in main
**Purpose:** Quick glance at key financial metrics

**What to build:**
Create an overview section displaying 4 financial metrics in separate article elements.

**Must include:**

- Section with id="overview"
- h2 heading: "Dashboard Overview"
- 4 article elements showing:
  1. **Total Balance:** 45,250 QAR (across all accounts)
  2. **Monthly Income:** 12,000 QAR (this month)
  3. **Monthly Expenses:** 8,500 QAR (this month)
  4. **Savings Rate:** 29% (of monthly income)
- Each article should have an h3 heading, bold amount, and description paragraph

**See screenshot:** `screenshots/overview-section.png`

---

### 5. My Accounts Section (Table)

**Location:** Second section in main
**Purpose:** Display all financial accounts

**What to build:**
Create a data table showing all your financial accounts with their balances.

**Must include:**

- Section with id="accounts"
- h2 heading: "My Accounts"
- Table with caption: "Summary of all financial accounts as of January 2026"
- Table headers (with proper scope attributes):
  - Account Type
  - Account Name
  - Balance (QAR)
  - Status
- At least 3 account rows in tbody:
  - Checking: Primary Checking, 15,250 QAR, Active
  - Savings: Emergency Fund, 25,000 QAR, Active
  - Investment: Stock Portfolio, 5,000 QAR, Active
- Table footer showing total balance (45,250 QAR)
- Use colspan for merging cells where appropriate

**See screenshot:** `screenshots/accounts-table.png`

---

### 6. Financial Goals Section

**Location:** Third section in main
**Purpose:** Track savings goals with visual progress

**What to build:**
Create a section displaying at least 3 financial savings goals with progress indicators.

**Must include:**

- Section with id="goals"
- h2 heading: "Financial Goals"
- At least 3 goal articles, each containing:
  - h3 with goal name
  - Figure with progress image (400px wide)
  - Figcaption showing: Goal amount, Current amount, Progress percentage
  - Description paragraph explaining the goal

**Suggested goals:**

1. **Emergency Fund:** 30,000 QAR goal, 25,000 QAR current (83% progress)
   - Description: Build a 6-month emergency fund to cover unexpected expenses
2. **New Car:** 40,000 QAR goal, 10,000 QAR current (25% progress)
   - Description: Save for a down payment on a new vehicle
3. **Vacation Fund:** 15,000 QAR goal, 9,000 QAR current (60% progress)
   - Description: Family vacation to Europe planned for summer 2026

**Note:** For images, use placeholder services or create simple progress bars. Alt text must describe the progress percentage and goal.

**See screenshot:** `screenshots/goals-section.png`

---

### 7. Budget Summary Section (Table)

**Location:** Fourth section in main
**Purpose:** Track spending by category

**What to build:**
Create a budget table showing monthly spending across different categories.

**Must include:**

- Section with id="budget"
- h2 heading: "Budget Summary - January 2026"
- Table with caption: "Monthly budget breakdown by category"
- Table headers (with proper scope):
  - Category
  - Budgeted
  - Spent
  - Remaining
  - Status
- At least 6 budget category rows in tbody (e.g., Housing, Food & Dining, Transportation, Entertainment, Utilities, Healthcare)
- Each row shows: budgeted amount, spent amount, remaining amount, and status
- Table footer showing total row with sums
- Use proper scope attributes throughout

**See screenshot:** `screenshots/budget-table.png`

---

### 8. Resources Aside

**Location:** Sidebar (use `<aside>` element)
**Purpose:** Educational resources and quick links

**What to build:**
Create a sidebar with financial resources, tips, and support information.

**Must include:**

- Aside element with id="resources"
- h2 heading: "Financial Resources"
- 3 subsections within the aside:

**1. Quick Tips section:**

- h3 heading: "Quick Tips"
- Unordered list with at least 4 financial tips
- Examples: Save 20% of income, Build emergency fund, Pay off debt, Track expenses

**2. Recommended Tools section:**

- h3 heading: "Recommended Tools"
- Unordered list with at least 3 external links
- Each link should open in new tab (target="_blank" with rel="noopener noreferrer")
- Examples: Investopedia, Mint, NerdWallet, Personal Capital

**3. Contact Support section:**

- h3 heading: "Contact Support"
- Paragraph asking if user needs help
- Email link (mailto:)
- Phone link (tel:) using Qatar format (+974...)

**See screenshot:** `screenshots/resources-aside.png`

---

### 9. Footer

**Location:** Bottom of page
**Purpose:** Copyright and additional links

**What to build:**
Create a footer with copyright information, links, and your name.

**Must include:**

- Footer element
- Copyright notice: "© 2026 MyFinance Dashboard. All rights reserved."
- At least 3 footer links separated by pipe symbols (|):
  - Privacy Policy
  - Terms of Service
  - Contact Us (email link)
- Credit paragraph: "Built with ❤️ by [Your Name]" (replace with your actual name)

**See screenshot:** `screenshots/footer-section.png`

---

## Complete Document Structure

Your final `index.html` should follow this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MyFinance Dashboard - Personal Money Management</title>
</head>
<body>
    <header>
        <!-- Logo, title, tagline -->
    </header>

    <nav>
        <!-- Navigation links -->
    </nav>

    <main>
        <section id="overview">
            <!-- Dashboard metrics -->
        </section>

        <section id="accounts">
            <!-- Accounts table -->
        </section>

        <section id="goals">
            <!-- Financial goals -->
        </section>

        <section id="budget">
            <!-- Budget table -->
        </section>
    </main>

    <aside id="resources">
        <!-- Sidebar resources -->
    </aside>

    <footer>
        <!-- Footer content -->
    </footer>
</body>
</html>
```

---

## Accessibility Checklist

Before submitting, verify your code meets accessibility standards:

- [ ] All images have descriptive alt text
- [ ] All form inputs have associated labels
- [ ] Tables have captions
- [ ] Table headers use proper scope attributes
- [ ] Page has proper heading hierarchy (h1 → h2 → h3)
- [ ] Navigation links work correctly
- [ ] External links have rel="noopener noreferrer"
- [ ] Page has meaningful title
- [ ] HTML validates without errors

**Validation Tool:** https://validator.w3.org/

---

## Submission Guidelines

**Note:** This is a **practice lab** (not graded), but complete it to build skills for graded assignments.

### What to Submit

1. Your `practice.html` file from Part A
2. Your `index.html` file (MyFinance Dashboard) from Part B
3. Any images you used (in an `images` folder)

### File Organization

```
Lab1-HTML-Fundamentals/
├── practice.html
├── index.html
└── images/
    ├── logo.png
    ├── goal1.png
    └── etc.
```

### Self-Assessment

Before considering your lab complete:

1. **Validate your HTML:**

   - Go to https://validator.w3.org/
   - Upload or paste your HTML
   - Fix any errors shown
2. **Test in browser:**

   - All navigation links work
   - All images display
   - Tables are readable
   - No broken links
3. **Accessibility check:**

   - Use the checklist above
   - Test with keyboard navigation (Tab key)
   - Verify alt text is descriptive

---

## Tips for Success

### During Part A (Practice Modules)

- Type out all code yourself (don't copy-paste)
- Ask questions if confused
- Experiment with variations
- Save your work frequently
- Keep `practice.html` open as reference

### During Part B (Final Project)

- Reference your `practice.html` for examples
- Build one section at a time
- Test frequently in browser
- Validate HTML as you go
- Use meaningful content (not "lorem ipsum")
- Make it your own (customize colors, names, amounts)

### Common Mistakes to Avoid

❌ Forgetting closing tags
❌ Skipping heading levels (h1 → h3)
❌ Using generic alt text ("image", "picture")
❌ Missing scope attributes on table headers
❌ Using tables for layout (only for data!)
❌ Not testing links
❌ Forgetting viewport meta tag

---

## Resources

### Official Documentation

- [MDN HTML Basics](https://developer.mozilla.org/en-US/docs/Learn/HTML)
- [W3C HTML Specification](https://html.spec.whatwg.org/)
- [HTML Validator](https://validator.w3.org/)

### Accessibility

- [WebAIM Accessibility Guidelines](https://webaim.org/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [How to Write Alt Text](https://axesslab.com/alt-texts/)

### Additional Learning

- [W3Schools HTML Tutorial](https://www.w3schools.com/html/)
- [HTML Dog Tutorials](https://htmldog.com/guides/html/)
- [freeCodeCamp HTML Course](https://www.freecodecamp.org/)

---

## What's Next?

**Lab 2: Interactive Finance Portal**
You'll add interactive forms (budget tracker, goal planner, account application) and multimedia content (video tutorials, audio tips) to your dashboard.

**Lab 3: Dashboard Styling**
You'll transform your plain HTML into a beautiful, professional-looking interface using CSS.

**Labs 4-11:**
Progressive enhancement → Responsive design → JavaScript interactivity → Full-stack application → Database integration

---

## Need Help?

- **During lab:** Ask your instructor for assistance
- **Office hours (Tuesdays):**
  - **Female students:** 11:00 AM - 12:00 PM | Office H07-C393
  - **Male students:** 1:00 PM - 2:00 PM | Success Oasis Room, H07
- **MS Teams:** Ask questions anytime, access recorded tutorial sessions, and participate in Q&A discussions
- **Instructor:** Abdulahi Hassen

---

**Good luck with your lab work.**

Build something you're proud of. This is the foundation of your Personal Finance Platform!

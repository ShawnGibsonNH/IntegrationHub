# WE Integration Hub

A project tracking tool built for Net Health Integration Engineers.  
Tracks ADT, Billing, ClinDoc, SIU, and Unsolicited Results interface projects
through each phase of the build lifecycle.

---

## How to use

**Just open the HTML file:**

1. Download `WEIntegrationHub.html`
2. Double-click to open in Chrome or Edge
3. Create a profile → start tracking projects

No install, no server, no database. Data saves to your browser's local storage.

> First open requires internet to load React and Babel from CDN (~3 seconds).  
> After that, works fully offline.

---

## Creating a desktop shortcut (Windows)

1. Right-click your Desktop → **New → Shortcut**
2. Browse to `WEIntegrationHub.html`
3. Name it **WE Integration Hub** → Finish

---

## File structure

```
IntegrationHub/
  WEIntegrationHub.html   ← The app. This is what you open and share.
  src/
    App.jsx               ← Full React source code (for editing / reference)
    storage.js            ← localStorage shim (replaces Claude artifact storage)
  README.md               ← This file
```

---

## Making changes

The two ways to update the app:

### Option A — Edit the HTML directly (quickest)
Open `WEIntegrationHub.html` in VS Code. The JSX lives inside a  
`<script type="text/babel">` tag near the bottom. Edit it, save, refresh in browser.

### Option B — Edit the source, regenerate HTML (cleanest)
1. Edit `src/App.jsx` in VS Code
2. Send the updated `App.jsx` to Claude in the project chat
3. Claude regenerates `WEIntegrationHub.html`
4. Replace the file and push to GitHub

---

## Features

- Per-interface checklists (ADT, Billing, ClinDoc, SIU, Unsolicited Results)
- Project phase timeline (Setup → Kickoff → Build → Test → Go Live → Closed)
- Ports table, contacts, facility IDs per project
- ⭐ Starred tasks for client call focus
- Notes log with search
- Custom to-dos
- Reference page — interface tips, troubleshooting notes, email templates
- Editable built-in tips with file link attachments
- Profile system (multiple engineers, shared project visibility)
- Export to PDF and .txt
- Project duplication

---

## Tech stack

- React 18 (loaded from CDN)
- Babel standalone (JSX compiled in-browser)
- localStorage for data persistence
- Zero build step, zero dependencies to install

---

## Future: Azure deployment

When ready to move to shared cloud storage:
- Frontend → Azure Static Web Apps
- Database → Azure SQL
- Auth → Azure Active Directory (existing Net Health accounts)

The storage layer (`src/storage.js`) is the only file that changes —  
all app logic stays the same.

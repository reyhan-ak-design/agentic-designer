---
name: doc-export
description: How agents export Markdown documents (PRDs, one-pagers, research briefs, specs) to a clean PDF on the user's machine — only when explicitly requested — via pandoc if installed, otherwise HTML printed to PDF with headless Microsoft Edge or Chrome. Use whenever someone asks for a PDF version of a document.
---

# Doc Export (PDF on request)

1. Keep the Markdown as the source of truth (it stays the AI-friendly version).
2. Convert:
   - If `pandoc` is available: `pandoc <file>.md -o <file>.pdf` (add `--pdf-engine=wkhtmltopdf` if needed).
   - Otherwise build a styled HTML next to the Markdown (clean sans font, 11–12pt body, table borders,
     A4 margins, page breaks before H2 for long PRDs), then print it:
     - Windows Edge: `& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless --disable-gpu --print-to-pdf="<abs>\<file>.pdf" "<abs>\<file>.html"`
     - Chrome: `chrome --headless --disable-gpu --print-to-pdf=... file.html`
3. Open-check: confirm the PDF exists and its size is > 10 KB; report the path.

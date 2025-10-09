Deployed Link: https://assignment-snowy-chi.vercel.app/

## Features

* **Mock Fetch** — Simulated API call using local `data.ts`
* **Client-Side Cache** — Avoids refetching during the session
* **Debounced Search** — 300ms delay with “Searching…” indicator
* **Responsive Grid** — Mobile & desktop layout using Tailwind
* **Accessible Modal** — Uses `shadcn/ui` Dialog, supports keyboard navigation
* **Error + Loading States** — Simulated network delay and retry

---

##  Tech Stack

* **Next.js 14 (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**

---

##  Tradeoffs / Decisions

1. **Mock fetch instead of real API** — Chosen for reliability and time efficiency during live coding.
2. **Minimal focus trap in modal** — Used shadcn’s accessible Dialog instead of custom logic to save implementation time.

---

##  Next Improvement 

Implement persistent caching using **React Query** or **localStorage**, add pagination and product sorting for better scalability.

---




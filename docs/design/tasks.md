# Tasks — Cyber-Toolkit

> Derived from the plan document. Each task is small, checkable, and traceable to a requirement.

## Task List

| ID | Task | Traces to (R# / ADR#) | Depends on | Status |
|----|------|--------------------------|------------|--------|
| T1 | Define the placeholder article fields needed by the existing CSV loader for titles, descriptions, categories, images, and locations. | R2, R3 | — | Done |
| T2 | Replace the template CSV rows with short, plain-language Cyber-Toolkit lessons and emergency guides. | R2, R3 | T1 | Done |
| T3 | Update the existing landing page text and calls to action for Cyber-Toolkit. | R2, R3 | T2 | Done |
| T4 | Add a featured articles section to the homepage using the existing placeholder article data. | R2, R3 | T3 | Done |
| T5 | Adapt the existing item detail page to display a selected article's full title, category, and plain-language content. | R2 | T2 | Done |
| T6 | Add the educational-reference limitation to the article detail view, including a clear statement that the app is not professional or legal advice. | R2 | T5 | Done |
| T7 | Add loading, empty, and not-found states to the article grid and detail view using the template's existing patterns. | R2 | T4, T5 | Done |
| T8 | Add a search input below existing navigation bar, which should remain present on all pages along with navbar. | R3 | T4 | Done |
| T9 | Filter placeholder articles by title, category, and plain-language content as the user searches, and display matching results in a new "Search Results" page with links to article details or a clear no-results message. | R3 | T7, T8 | Done |
| T10 | Create the mock authentication state store and local-storage keys for prototype accounts and the active session. | R4, ADR-02 | — | Done |
| T11 | Implement mock account creation with only the approved non-sensitive prototype fields. | R4 | T10 | Done |
| T12 | Implement mock login, logout, and session restoration after a page refresh. | R4, ADR-02 | T10, T11 | Done |
| T13 | Build the sign-up and login forms and connect them to the mock authentication actions. | R4, R6, R7 | T11, T12 | Done |
| T14 | Add validation and clear error messages to the sign-up and login forms without requesting authentication codes, financial information, or other sensitive information. | R4 | T13 | Done |
| T15 | Update the logged-in navbar state so the account button becomes a silhouette icon and opens the account profile page. | R7 | T12, T13 | Done |
| T16 | Create the basic account page that replaces the sign up/sign in form when selecting the account icon. | R4 | T13 | Done |
| T17 | Add account-page sidebar navigation for account details, bookmarked articles, and an option to log out. | R4, R5 | T16 | Done |
| T18 | Add the selected account-tab detail view without adding user progress, history, chat, or social features. | R4, R5 | T17 | Done |
| T19 | Add a bookmark control icon to each article card and article detail page, and indicate whether the current article is saved. | R1, R5 | T2, T10 | Done |
| T20 | Add bookmark save and remove actions for signed-in mock users. | R1, R5 | T12, T19 | Not started |
| T21 | Associate saved article IDs with the active prototype account in local storage. | R1, R5 | T10, T20 | Not started |
| T22 | Add the bookmark control to the article detail view and keep its state consistent with the article cards. | R1, R5 | T5, T20 | Not started |
| T23 | Build the bookmarked tab's signed-out state with a login/sign-up prompt. | R5 | T17, T13 | Not started |
| T24 | Build the bookmarked tab's signed-in state with saved articles and an empty-state message. | R1 | T18, T21 | Not started |
| T25 | Add removal controls and article-detail links to the signed-in bookmarked tab. | R1, R5 | T22, T24 | Not started |
| T26 | Update the navbar links for Home, Articles, Account, and Bookmarked articles. | R1–R7, ADR-00 | T4, T16, T23 | Not started |
| T27 | Show the current signed-in state and logout action in the navbar when appropriate. | R4, R7 | T12, T26 | Not started |
| T28 | Update typography, labels, and icons for readable plain-language content and familiar navigation. | R1–R5, ADR-00 | T3, T5, T26 | Not started |
| T29 | Update colors and interactive states to support high contrast and clear bookmark, login, and search feedback. | R1–R5, ADR-00 | T19, T27, T28 | Not started |
| T30 | Verify the homepage, article grid, detail view, account page, and bookmarks page at mobile widths. | R1–R5 | T4, T7, T25, T29 | Not started |
| T31 | Test article selection, detail navigation, loading states, and not-found behavior against the R2 acceptance criteria. | R2 | T7, T8 | Not started |
| T32 | Test search results and no-results behavior against the R3 acceptance criteria. | R3 | T8, T9 | Not started |
| T33 | Test account creation, login, logout, and refresh persistence against the R4 acceptance criteria. | R4 | T12, T14, T27 | Not started |
| T34 | Test signed-out bookmark behavior against the R5 acceptance criteria. | R5 | T23 | Not started |
| T35 | Test signed-in bookmark saving, removal, persistence, and bookmarked-tab display against the R1 acceptance criteria. | R1 | T21, T22, T25 | Not started |
| T36 | Check typical prototype loading time and confirm the frontend target of five seconds under typical network conditions. | R1–R5 | T30, T31, T32, T33, T34, T35 | Not started |
| T37 | Define the backend data model for articles, users, and bookmarks, including the fields needed to replace CSV and local-storage persistence. | R1, R3, R4, ADR-01 | T36 | Not started |
| T38 | Implement Express.js article retrieval and search endpoints backed by MySQL. | R3, ADR-00, ADR-01 | T37 | Not started |
| T39 | Implement Express.js account and bookmark endpoints backed by MySQL. | R1, R4, R5, ADR-00, ADR-01 | T37 | Not started |

**Status values:** Not started · In progress · Done · Blocked

## Definition of Done (applies to every task)
- Matches its linked requirement's acceptance criteria in the specification.
- Reviewed by a human before marked done
- No task marked done without a test passing

## Blocked / Questions
| Task | Blocker | Raised | Resolved |
|------|---------|--------|----------|
| T16 | Confirm the minimum account fields allowed for the prototype before finalizing the mock sign-up form. | 2026-09-22 | Open |
| T41 | Confirm the backend account fields, content sources, and initial launch topics before replacing placeholder persistence. | 2026-09-22 | Open |

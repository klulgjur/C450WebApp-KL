# Tasks — Cyber-Toolkit

> Derived from the plan document. Each task is small, checkable, and traceable to a requirement.

## Task List

| ID | Task | Traces to (R# / ADR#) | Depends on | Status |
|----|------|--------------------------|------------|--------|
| T1 | Define the placeholder article fields needed by the existing CSV loader for titles, descriptions, categories, images, and locations. | R2, R3 | — | Not started |
| T2 | Replace the template CSV rows with short, plain-language Cyber-Toolkit lessons and emergency guides. | R2, R3 | T1 | Not started |
| T3 | Add real-life scenario examples to the placeholder article data without adding advice, threat detection, or other out-of-scope behavior. | R2, R3 | T2 | Not started |
| T4 | Update the existing landing page text and calls to action for Cyber-Toolkit. | R2, R3 | T2 | Not started |
| T5 | Adapt the existing collection page into the main article grid and show article count and category labels. | R2, R3 | T2, T4 | Not started |
| T6 | Add a featured articles section to the homepage using the existing placeholder article data. | R2, R3 | T4, T5 | Not started |
| T7 | Adapt the existing item detail page to display a selected article's full title, category, and plain-language content. | R2 | T2 | Not started |
| T8 | Add the educational-reference limitation to the article detail view, including a clear statement that the app is not professional or legal advice. | R2 | T7 | Not started |
| T9 | Confirm that article cards link to the existing `/items/:id` route and open the selected article detail view. | R2 | T5, T7 | Not started |
| T10 | Add loading, empty, and not-found states to the article grid and detail view using the template's existing patterns. | R2 | T5, T7 | Not started |
| T11 | Add a search input to the existing navigation or homepage. | R3 | T5 | Not started |
| T12 | Filter placeholder articles by title, category, and plain-language content as the user searches. | R3 | T2, T11 | Not started |
| T13 | Display matching search results and a clear no-results message with links to article details. | R3 | T9, T12 | Not started |
| T14 | Create the mock authentication state store and local-storage keys for prototype accounts and the active session. | R4, ADR-02 | — | Not started |
| T15 | Implement mock account creation with only the approved non-sensitive prototype fields. | R4 | T14 | Not started |
| T16 | Implement mock login, logout, and session restoration after a page refresh. | R4, ADR-02 | T14, T15 | Not started |
| T17 | Build the sign-up and login forms and connect them to the mock authentication actions. | R4 | T15, T16 | Not started |
| T18 | Add validation and clear error messages to the sign-up and login forms without requesting authentication codes, financial information, or other sensitive information. | R4 | T17 | Not started |
| T19 | Create the account route and basic account page using the existing Vue component and router patterns. | R4 | T17 | Not started |
| T20 | Add account-page sidebar navigation for account details and bookmarked articles. | R4, R5 | T19 | Not started |
| T21 | Add the selected account-tab detail view without adding user progress, history, chat, or social features. | R4, R5 | T20 | Not started |
| T22 | Add a bookmark control to each article card and indicate whether the current article is saved. | R1, R5 | T2, T14 | Not started |
| T23 | Add bookmark save and remove actions for signed-in mock users. | R1, R5 | T16, T22 | Not started |
| T24 | Associate saved article IDs with the active prototype account in local storage. | R1, R5 | T14, T23 | Not started |
| T25 | Add the bookmark control to the article detail view and keep its state consistent with the article cards. | R1, R5 | T7, T23 | Not started |
| T26 | Build the bookmarked tab's signed-out state with a login/sign-up prompt. | R5 | T20, T17 | Not started |
| T27 | Build the bookmarked tab's signed-in state with saved articles and an empty-state message. | R1 | T21, T24 | Not started |
| T28 | Add removal controls and article-detail links to the signed-in bookmarked tab. | R1, R5 | T25, T27 | Not started |
| T29 | Update the navbar links for Home, Articles, Account, and Bookmarked articles. | R1–R5, ADR-00 | T5, T19, T26 | Not started |
| T30 | Show the current signed-in state and logout action in the navbar when appropriate. | R4 | T16, T29 | Not started |
| T31 | Update typography, labels, and icons for readable plain-language content and familiar navigation. | R1–R5, ADR-00 | T4, T7, T29 | Not started |
| T32 | Update colors and interactive states to support high contrast and clear bookmark, login, and search feedback. | R1–R5, ADR-00 | T22, T30, T31 | Not started |
| T33 | Verify the homepage, article grid, detail view, account page, and bookmarks page at mobile widths. | R1–R5 | T6, T10, T28, T32 | Not started |
| T34 | Test article selection, detail navigation, loading states, and not-found behavior against the R2 acceptance criteria. | R2 | T9, T10 | Not started |
| T35 | Test search results and no-results behavior against the R3 acceptance criteria. | R3 | T11, T12, T13 | Not started |
| T36 | Test account creation, login, logout, and refresh persistence against the R4 acceptance criteria. | R4 | T16, T18, T30 | Not started |
| T37 | Test signed-out bookmark behavior against the R5 acceptance criteria. | R5 | T26 | Not started |
| T38 | Test signed-in bookmark saving, removal, persistence, and bookmarked-tab display against the R1 acceptance criteria. | R1 | T24, T25, T28 | Not started |
| T39 | Check typical prototype loading time and confirm the frontend target of five seconds under typical network conditions. | R1–R5 | T33, T34, T35, T36, T37, T38 | Not started |
| T40 | Define the backend data model for articles, users, and bookmarks, including the fields needed to replace CSV and local-storage persistence. | R1, R3, R4, ADR-01 | T39 | Not started |
| T41 | Implement Express.js article retrieval and search endpoints backed by MySQL. | R3, ADR-00, ADR-01 | T40 | Not started |
| T42 | Implement Express.js account and bookmark endpoints backed by MySQL. | R1, R4, R5, ADR-00, ADR-01 | T40 | Not started |

**Status values:** Not started · In progress · Done · Blocked

## Definition of Done (applies to every task)
- Matches its linked requirement's acceptance criteria in the specification.
- Reviewed by a human before marked done
- No task marked done without a test passing

## Blocked / Questions
| Task | Blocker | Raised | Resolved |
|------|---------|--------|----------|
| T15 | Confirm the minimum account fields allowed for the prototype before finalizing the mock sign-up form. | 2026-09-22 | Open |
| T40 | Confirm the backend account fields, content sources, and initial launch topics before replacing placeholder persistence. | 2026-09-22 | Open |

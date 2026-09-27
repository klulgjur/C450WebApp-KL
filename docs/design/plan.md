# Plan — Cyber-Toolkit

> Written after specification. Every decision here must trace back to a requirement ID.

## 1. Approach Summary
We will build the Cyber-Toolkit web application incrementally. The first stage will deliver a functional frontend using placeholder content stored in local storage and mocked authentication so that the main navigation, article views, search, and bookmarking flows can be evaluated early. We will then replace the mocks with real authentication and backend data, and add LLM inference through an API as a later enhancement. The application will prioritize short, plain-language articles, mobile usability, and clear limitations so that it remains an educational reference rather than an advisor.

## 1.5 Tech Stack
- Frontend: Vue.js
- Backend/DB: Express.js and MySQL
- Hosting: Vercel for the frontend; Railway for the backend and database
- Other services/APIs: LLM inference API (provider to be selected)

## 2. Key Decisions (ADRs)

| ADR # | Decision | Traces to (R#) | Alternatives considered | Why this one |
|-------|----------|------------------|---------------------------|----------------|
| ADR-00 | Use Vue.js for the frontend and Express.js for the backend | R1–R7 (all) | Django | Both tools have a low learning curve and align with the team's stronger JavaScript familiarity. |
| ADR-01 | Use MySQL for application data | R1, R3 | PostgreSQL | MySQL has a lower learning curve, supports fast indexing, and is sufficient for the application's basic keyword searches. |
| ADR-02 | Use JSON Web Encryption (JWE) for secure login and authentication data | R4, R6, R7 | JSON Web Tokens (JWT) | JWE encrypts token contents, providing stronger protection for authentication information than an unencrypted token format. |

## 3. Components / Building Blocks
The application will be delivered through the following major screens, services, and data stores.

| Component | Purpose | Related requirements |
|-----------|---------|------------------------|
| Article grid view | Organizes and displays available lessons, emergency guides, and scenario examples so users can find content quickly. | R2, R3 |
| Article detail view | Displays the complete plain-language content for one article and its limitations. | R2 |
| Search function | Returns relevant articles when a user searches for a topic or unfamiliar term. | R3 |
| Sign-up and login form | Allows users to create an account and access personalized features such as bookmarks. The form opens on its own page when the user clicks the navbar Sign in/Sign up action. | R4, R5, R6 |
| Logged-in navbar state | Changes the account button from the sign-in text action to a silhouette icon that opens the profile page when a user is logged in. | R7 |
| Bookmark controls and bookmarked tab | Saves articles for logged-in users and provides a place to find them later. | R1, R5 |
| Authentication service | Verifies accounts and protects login sessions using the selected JWE-based approach. | R4, R5 |
| Articles table (DB) | Stores article titles, categories, explanations, examples, and emergency-guide content. | R1, R2, R3 |

## 4. Dependencies & Assumptions
- External services/tools needed: Vue.js, Express.js, MySQL, Vercel, Railway, JWE support, and an LLM inference API.
- Assumptions being made: The initial prototype can use local storage and mocked authentication before the backend is available. The LLM provider, account data fields, content sources, and initial launch topics remain unverified and must be selected before the related implementation begins. The application will collect only the minimum account information required and will not request sensitive information, authentication codes, or financial account information.

## 5. Risks

| Risk | Likelihood | Impact | Mitigation | Owner |
|------|------------|--------|------------|-------|
| Scope creep | Moderate | Budget and timeline impact | Maintain clear documentation, review changes against the specification frequently, and defer features that are outside the approved scope. | Kristiana |
| Platform compatibility | Moderate to High | Timeline impact and inconsistent user experience | Review browser error logs, test frequently on supported browsers and mobile devices, and address compatibility issues before deployment. | Kristiana |
| Authentication or privacy design does not meet the specification | Moderate | User trust, security, and launch delay | Use the minimum required account data, validate the JWE implementation, test account deletion and unauthenticated bookmark behavior, and review the security requirements before release. | Kristiana |
| Backend and LLM integration takes longer than expected | Moderate | Timeline impact | Build and evaluate the local-storage prototype first, integrate authentication and database services in separate steps, and treat the LLM API as the final planned integration. | Kristiana |

## 6. Sequencing
1. Interactive prototyping with placeholder data in local storage and mocked authentication, to validate navigation, article views, search, and bookmarking flows early.
2. Frontend development in Vue.js, including responsive layouts, plain-language presentation, descriptive labels, familiar icons, and accessibility support.
3. Authentication implementation using the selected JWE approach, including account creation, login, access control, and the unauthenticated bookmark alert.
4. Backend implementation in Express.js with MySQL, including article retrieval, search, bookmark operations, and account-related endpoints.
5. LLM inference API integration, subject to selecting a provider and confirming that the feature remains within the approved scope and safety constraints.
7. Deployment to Vercel, Railway, and the Railway-hosted MySQL database, followed by cross-browser and mobile verification.

## 7. Review & Approval
| Reviewer | Date | Approved? |
|----------|------|-----------|
| Manager | 9/20/26 | Yes |

**Gate:** Do not generate tasks until this plan is done.
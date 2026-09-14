# [Cyber-Toolkit] — Specification
 
> **How to use this template:** The specification is meant to be detailed before building 
anything and to represent the core "source of truth". It should be written for a non-technical author, 
but clear enough for an AI agent (or a team) to build from.
 
---
 
## 0. Constitution (fill once per project, reuse across specs)
 
Non-negotiable principles this product must never violate, regardless of feature.
 
| # | Principle | Why it exists |
|---|-----------|----------------|
| 1 | Articles must be written in plain text. | Users may not have much technical knowledge |
| 2 | Application will never act as an advisor to users. | Liability concerns, can only make action suggestions |
| 3 | Application must maintain full functionality on mobile devices. | Ensures accessibility |
| 4 | The application shall never request sensitive information, authentication codes, or account information. | Liability concerns and user protection |
| 5 | The application shall never require users to log in to access content. | Keeps information accessible to users. |
---
 
## 1. Problem & Intent
 
**Who is this for?**
(Name the specific user, not "everyone.")
Julie, who is a busy stay-at-home mom who utilizes her phone to organize most aspects of her 
life so she can focus on her kids. Her life is held together by her smartphone, as it supports 
her social connections, schedule management, grocery shopping, and entertainment. However, she 
has minimal technical knowledge and doesn't know how to keep her information and online activity 
secure to protect herself and her family.
 
**What problem do they have today?**
(Describe the pain, not the solution.)
Julie has trouble detecting scams and unsafe links, and she doesn't fully understand the consequences 
of falling victim to such things. Her attempts at educating herself fall short, as she struggles 
to navigate lengthy educational resources online that are littered with technical jargon she 
doesn't understand.

**Why now / why us?**
More and more aspects of everyday life are going digital, and technology advancements including 
AI are creating new threats that are even more difficult to detect. Access to a comprehensive 
resource geared towards beginners makes education more accessible so that the average individual 
can sufficiently protect themselves from these threats. 
 
**What does success look like?**
(A measurable outcome, not a feature list — e.g. "80% of new users complete setup in under 3 minutes.")
- 80% of users are able to read the articles in under 5 minutes.
- 80% of users can navigate to the desired article in under 2 minutes. 
- 90% of users are able to detect a majority of the warning signs in cyber threat scenarios 
provided on the app's practice tools.
---
 
## 2. Scope
 
**In scope** — what this version must do.
 - Short, informative article-style lessons.
 - Real-life scenario examples.
 - Basic account setup. 
 - Bookmark feature to save articles the user wants to return to.
 - Emergency reference guides.
 - Navigation that organizes content so it is easy to find.
 - Search function. 

 
**Out of scope** — what it explicitly will NOT do (this list prevents scope creep and over-building).
 - Cyber threat detection.
 - Advise users regarding the safety/legitimacy of a link or website.
 - Professional/legal advice.
 - User progress and history.
 - Quizzes and other interactive tools.
 - Chat features.
 - Social functions. 
 
---
 
## 3. User Scenarios
 
Write each as a short story: who, what they're trying to do, what "done" looks like.
 
**Scenario 1: [Using Emergency Guides to Identify a Threat]**
- Actor: Julie, stay-at-home mom with minimal technology experience beyond everyday smartphone use
- Trigger: Julie received a message claiming her bank account has been compromised. 
- Steps: 
1. Julie opens the web app.
2. Julie navigates to the emergency guides section of the app.
3. Julie selects the appropriate guide detailing text message validation.
4. Julie compares the warning signs in the article to the text message she received.
4. Julie reviews the suggested next steps to determine what possible actions she can take.
- Success outcome: Julie is able to navigate to the article quickly and seamlessly. She is able 
to successfully identify warning signs related to the text message and takes the appropriate next 
steps.
- Failure outcome: Julie has trouble finding the article she needs, or she has trouble understanding 
the information in the article and is unable to identify the warning signs in the text message.

**Scenario 2: [Quick Reference for Unfamiliar Terms]**
- Actor: Jeff, a retired man who spends more time on his phone than he is used to. 
- Trigger: Jeff encounters the unfamiliar term "Smishing" while reading a social media post online. 
- Steps: 
1. Jeff opens the web application. 
2. Jeff navigates to the "Search" box and types in "Smishing."
3. Jeff navigates to an article about smishing, where the term is defined and explained with examples.
- Success outcome: Jeff is able to quickly search and find the desired information. He is able 
to easily understand the information.
- Failure outcome: Jeff has trouble locating the search box or relevant article, or he still 
doesn't understand the term even after reading the article.

**Scenario 3: [Saving Articles for Later Reference]**
- Actor: Alex, a mid-30's business woman who is looking to improve her digital safety habits at work 
and at home.
- Trigger: Alex comes across an article about safe password keeping that she wants to reference 
later when she is at work.
- Steps: 
1. Alex clicks the "Bookmark" icon near the top of the article.
2. The icon turns from white to yellow, indicating that the article has been saved.
3. When Alex wants to return to the article later, she navigates to her bookmarked articles 
on her profile. 
4. Alex sees and selects the bookmarked article.
- Success outcome: Alex can easily save the article. She can also easily find her bookmarked 
articles later when she wishes to return to them.
- Failure outcome: The article is not saved when the bookmark icon is clicked, or the bookmarked 
articles are not easily located.

*(Repeat for each core scenario. 3–5 is typical for a first spec.)*
 
---
 
## 4. Requirements (EARS notation)
 
Use [EARS](https://alistairmavin.com/ears/) (Easy Approach to Requirements Syntax) so requirements are consistent and unambiguous.
 
Patterns:
- **Ubiquitous:** *The system shall [always do X].*
- **Event-driven:** *When [trigger], the system shall [response].*
- **State-driven:** *While [state], the system shall [response].*
- **Unwanted behavior:** *If [condition], then the system shall [response].*
- **Optional:** *Where [feature is present], the system shall [response].*

| ID | Requirement | Pattern |
|----|-------------|---------|
| R1 | When a user bookmarks an article, the system shall save the article to their profile. | Event |
| R2 | When a user clicks an article link, the system shall open a new page. | Event |
| R3 | When a user uses the search function, the system shall provide a list of relevant articles. | Event |
| R4 | The system shall allow users to create an account. | Ubiquitous |
| R5 | If a user attempts to bookmark an article while not logged in, the system shall alert the user. | Unwanted Behavior |
 
---
 
## 5. Acceptance Criteria
 
For each requirement, define the test that proves it's done. If you can't write a pass/fail test, the requirement is still too vague.
 
| Requirement | Test | Pass condition |
|-------------|------|-----------------|
| R1 | Click 'Bookmark' icon. | Bookmarked article appears on user profile under 'Bookmarked' section. |
| R2 | Click on an article. | Selected article opens to a new page. |
| R3 | Search for cybersecurity topic e.g. "Smishing". | Top search result is the most relevant article, e.g. the article defining and detailing "smishing."|
| R4 | Attempt to create an account. | User is able to log in and view their profile. |
| R5 | Attempt to bookmark an article while not logged in. | Application alerts user they must login to save articles. |
 
---
 
## 6. Constraints & Non-Functional Requirements
 
- **Performance:**
- Application should load within 5 seconds under typical network conditions.
- Application should maintain functionality across different devices.

- **Security/Privacy:**
- User login information is encrypted.
- Collect the minimum amount of personal information required. 

- **Accessibility:**
- Minimal-style design 
- Descriptive labels and familiar icons
- Prioritize use of plain language over complex technical jargon
- Support common accessibility accommodations such as larger text and high contrast.

- **Compliance/Legal:**
- Information collected is clearly communicated.
- Users may delete their accounts and all associated data. 
- Limitations are clearly communicated (this is not legal or professional advice, etc.)

- **Budget/Timeline:**
- Development budget: $15,000
- Launch by end of 2026
- Focus resources on research
---
 
## 7. Open Questions
 
Anything unresolved. Don't let AI or a builder guess silently — list it and get an answer before build starts.
 
| Question | Owner | Status |
|----------|-------|--------|
| What information will be collected when creating an account? | Project Manager | Open |
| Which topics should be included at initial launch? | Project Manager | Open |
| What sources will be used for researching content? | Research Team | Open |
 
---
 
## 8. Plan (derived from this spec — separate document once approved)
 
Once the spec above is approved, translate it into:
- **`plan.md`** — the approach and key decisions, each traced back to a requirement ID above
- **`tasks.md`** — atomic, ordered, checkable tasks derived from the plan
Do not skip from spec straight to a build without reviewing the plan first.
 
---
 
## 9. Approval
 
| Role | Name | Date | Signed off? |
|------|------|------|-------------|
| Spec owner |  | | |
| Reviewer | | | |
| Research Lead | | | |
 
---
 
### Primary sources this template draws on
- [GitHub Spec Kit](https://github.com/github/spec-kit) — open-source spec/plan/tasks toolkit
- [Spec-Driven Development methodology](https://github.com/github/spec-kit/blob/main/spec-driven.md) — GitHub's explainer
- [EARS notation](https://alistairmavin.com/ears/) — requirements syntax
- [Microsoft: Spec-Driven Development for AI-Native Engineering](https://developer.microsoft.com/blog/spec-driven-development-ai-native-engineering/)
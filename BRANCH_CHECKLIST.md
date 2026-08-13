# Student Branch Workflow Checklist

This document explains the branch workflow for the frontend interns working on the task management system.

## Branches already created

- `develop`
- `feature/josephine-dashboard-responsive`
- `feature/nayidah-mobile-navigation`
- `feature/okelo-task-creation-ui`

## Important rule

Do not create new branches unless a student is assigned a completely different feature or task that is separate from the current assignment.

The current branch setup is enough for the three interns. Each student should work only in their assigned branch.

---

## Student assignments

### 1) Josephine
Branch: `feature/josephine-dashboard-responsive`

Checklist:
- [ ] Pull latest `develop`
- [ ] Checkout `feature/josephine-dashboard-responsive`
- [ ] Fix dashboard card responsiveness
- [ ] Improve spacing between sections on tablet/mobile
- [ ] Ensure no horizontal overflow on smaller screens
- [ ] Test on mobile view widths
- [ ] Commit changes
- [ ] Push to GitHub
- [ ] Open pull request to `develop`

Focus:
- Dashboard layout
- Statistics cards
- Grid responsiveness
- Chart/card spacing

---

### 2) Nayidah
Branch: `feature/nayidah-mobile-navigation`

Checklist:
- [ ] Pull latest `develop`
- [ ] Checkout `feature/nayidah-mobile-navigation`
- [ ] Fix sidebar behavior on mobile
- [ ] Improve header layout for small screens
- [ ] Make navigation buttons usable on narrow widths
- [ ] Ensure menu and actions do not overlap
- [ ] Test on mobile/tablet widths
- [ ] Commit changes
- [ ] Push to GitHub
- [ ] Open pull request to `develop`

Focus:
- Sidebar responsiveness
- Header wrapping
- Navigation usability
- Small-screen layout

---

### 3) Okelo
Branch: `feature/okelo-task-creation-ui`

Checklist:
- [ ] Pull latest `develop`
- [ ] Checkout `feature/okelo-task-creation-ui`
- [ ] Improve task list responsiveness
- [ ] Fix new task modal layout on mobile
- [ ] Improve task filters and status chips
- [ ] Ensure long text wraps properly
- [ ] Check task cards do not overflow on smaller screens
- [ ] Commit changes
- [ ] Push to GitHub
- [ ] Open pull request to `develop`

Focus:
- Task lists
- Create task modal
- Filter buttons
- Task card layout

---

## Git workflow for everyone

Use this workflow for each student:

```bash
git checkout develop
git pull origin develop
git checkout <assigned-branch>
# work on your task
# commit changes
git add .
git commit -m "Fix: <short description>"
git push origin <assigned-branch>
```

Then open a pull request from the assigned branch into `develop`.

---

## Do we need more branches?

No. The three created branches already match the current team setup.

You only create additional branches if:
- a student is assigned a completely new feature not related to their current role
- a new task must be split into a separate feature
- a student needs a branch for a bug fix outside the current scope

Otherwise, the current structure is enough.

---

## Review before merging

Before merging any branch into `develop`, confirm:
- [ ] Mobile responsiveness is fixed
- [ ] No horizontal overflow
- [ ] Layout does not break on small screens
- [ ] Buttons are still visible and clickable
- [ ] Long text wraps or truncates properly
- [ ] Code is clean and readable
- [ ] App builds successfully

---

## Final note

Each student should work in their own branch and not in `main` or another teammate's branch. This keeps the frontend work organized, prevents conflicts, and makes review easier.

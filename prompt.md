# INFINISOFT — CRM + PROJECT MANAGEMENT + CLIENT PORTAL

## ROLE

Act as a Senior Product Architect, UX/UI Designer, Full-Stack Engineer, Backend Engineer, Database Architect, Security Engineer, and QA Engineer.

You are building a production-ready internal business platform for **Infinisoft Technology**, a software development and digital services company.

This is NOT a simple CRM.

The final product must combine:

1. CRM
2. Lead Management
3. Contact & Company Management
4. Sales Pipeline
5. Project Management
6. Project Planning
7. Milestone Management
8. Developer Task Management
9. Team Assignment
10. Project Progress Tracking
11. Project Activity Timeline
12. Client Communication
13. Client Portal
14. Client Approval System
15. Project Files/Documents
16. Notifications
17. Reporting
18. Role-Based Access Control
19. Audit Logs

The goal is to create an **Agency Operating System** where the entire lifecycle works from:

Lead → Client → Project → Planning → Task Assignment → Development → Review → Client Approval → Testing → Deployment → Completion.

---

# 1. CORE BUSINESS WORKFLOW

Implement the following complete lifecycle:

Lead
↓
Contacted
↓
Qualified
↓
Proposal
↓
Negotiation
↓
Won
↓
Convert to Client
↓
Create Project
↓
Project Planning
↓
Create Milestones
↓
Create Tasks
↓
Assign Developers
↓
Development
↓
Internal Review
↓
Client Review
↓
Client Approval / Revision
↓
QA Testing
↓
Deployment
↓
Project Completed
↓
Project Archived

Every important action must create an activity/audit event.

---

# 2. USER ROLES

Implement proper RBAC.

## SUPER_ADMIN

Full system access.

Can:

* Manage organizations
* Manage users
* Manage admins
* Manage developers
* Manage clients
* Manage roles
* Manage permissions
* Manage projects
* Manage leads
* Manage deals
* View financial information
* View reports
* View audit logs
* Configure system settings

## ADMIN / PROJECT MANAGER

Can:

* Manage leads
* Manage contacts
* Manage companies
* Create projects
* Edit projects
* Assign developers
* Create milestones
* Create tasks
* Assign tasks
* Change project status
* Change task status
* Add project updates
* Upload files
* Communicate with clients
* Request client approval
* View project progress
* View reports

## DEVELOPER

Can:

* View assigned projects
* View assigned tasks
* Update task status
* Add task comments
* Upload development files
* Add progress updates
* Mark tasks for review
* View project milestones
* View relevant project files
* Communicate internally

Developer must NOT see:

* Client financial information
* Company profit
* Internal sensitive CRM information
* Other developers' private information
* Admin-only notes unless permission allows it

## CLIENT

Client must have a separate client portal.

Client can only access their own:

* Dashboard
* Projects
* Project progress
* Milestones
* Client-visible tasks
* Project updates
* Files
* Messages
* Approvals
* Documents
* Profile

Client must NEVER see:

* Internal notes
* Developer salaries
* Company profit
* Internal tasks
* Internal discussions
* Other clients
* Other projects
* Internal CRM data

---

# 3. CRM MODULE

Create:

## Leads

Fields:

* id
* leadNumber
* name
* email
* phone
* companyId
* serviceId
* subject
* message
* source
* status
* ownerId
* estimatedValue
* createdAt
* updatedAt
* lastActivityAt
* nextFollowUpAt

Lead sources:

* Website
* Facebook
* LinkedIn
* WhatsApp
* Google
* Referral
* Direct
* Campaign
* Other

Lead statuses:

* NEW
* CONTACTED
* QUALIFIED
* PROPOSAL
* NEGOTIATION
* WON
* LOST

---

# 4. CONTACTS

Create a Contacts module.

Fields:

* name
* email
* phone
* designation
* company
* source
* owner
* notes
* status
* createdAt
* updatedAt

A company can have multiple contacts.

---

# 5. COMPANIES

Create company management.

Fields:

* companyName
* website
* email
* phone
* industry
* companySize
* address
* city
* country
* notes
* ownerId

Relations:

Company
→ Contacts
→ Leads
→ Deals
→ Projects

---

# 6. DEALS / SALES PIPELINE

Create a CRM sales pipeline.

Stages:

NEW
CONTACTED
QUALIFIED
PROPOSAL
NEGOTIATION
WON
LOST

Each deal:

* dealName
* client
* company
* value
* probability
* expectedCloseDate
* stage
* owner
* service
* notes

Create Kanban UI.

Example:

NEW
→ CONTACTED
→ QUALIFIED
→ PROPOSAL
→ NEGOTIATION
→ WON

Show:

* Total Pipeline Value
* Weighted Pipeline Value
* Won Value
* Lost Value

---

# 7. CONVERT LEAD TO CLIENT

When a lead becomes WON:

Provide:

"Convert to Client"

Conversion must:

1. Create/contact existing contact
2. Create client account
3. Link company
4. Preserve lead history
5. Preserve activities
6. Preserve messages
7. Optionally create project

Never duplicate an existing client/contact unnecessarily.

---

# 8. PROJECT MANAGEMENT MODULE

Create a complete Projects module.

Project fields:

* projectId
* projectCode
* name
* description
* clientId
* companyId
* projectManagerId
* status
* priority
* startDate
* expectedEndDate
* actualEndDate
* budget
* progress
* health
* createdAt
* updatedAt

Project statuses:

* PLANNING
* NOT_STARTED
* IN_PROGRESS
* ON_HOLD
* IN_REVIEW
* CLIENT_REVIEW
* REVISION_REQUIRED
* TESTING
* DEPLOYMENT
* COMPLETED
* CANCELLED

Project health:

* HEALTHY
* AT_RISK
* DELAYED

Priorities:

* LOW
* MEDIUM
* HIGH
* URGENT

---

# 9. PROJECT DASHBOARD — ADMIN

Create a modern project details dashboard.

Header:

Project Name
Project Code
Client
Project Manager
Status
Progress
Health

Actions:

* Edit Project
* Add Task
* Add Milestone
* Assign Developer
* Add Update
* Upload File
* Message Client
* Request Approval

Show:

## Project Progress

Example:

64%

Progress bar with milestone-based calculation.

Do NOT allow arbitrary manual progress values to become the primary source of truth.

Calculate progress from completed tasks/milestones where possible.

---

# 10. PROJECT TIMELINE

Create a complete activity timeline.

Examples:

"Project created"

"Project Manager assigned"

"UI/UX milestone completed"

"Task assigned to Shohrab"

"Developer started Backend API"

"Client approved UI"

"Project progress changed from 42% to 57%"

"File uploaded"

"Client requested revision"

"Project moved to Testing"

Every activity must include:

* actor
* action
* entity
* entityId
* timestamp
* metadata

Example:

15 Aug 2026
4:30 PM

Shohrab Hossain started task:

"Payment Gateway API"

---

# 11. PROJECT MILESTONES

Each project can contain multiple milestones.

Example:

1. Discovery
2. Requirements
3. UI/UX Design
4. Frontend Development
5. Backend Development
6. Integration
7. QA Testing
8. Client Review
9. Deployment

Milestone fields:

* name
* description
* projectId
* status
* startDate
* dueDate
* completedAt
* order
* progress

Statuses:

* NOT_STARTED
* IN_PROGRESS
* COMPLETED
* BLOCKED

---

# 12. TASK MANAGEMENT

Tasks are the core development workflow.

Task fields:

* id
* taskCode
* title
* description
* projectId
* milestoneId
* assigneeId
* createdById
* priority
* status
* dueDate
* estimatedHours
* actualHours
* clientVisible
* createdAt
* updatedAt
* completedAt

Task statuses:

TODO
IN_PROGRESS
IN_REVIEW
CLIENT_REVIEW
REVISION_REQUIRED
BLOCKED
COMPLETED

Task priority:

LOW
MEDIUM
HIGH
URGENT

---

# 13. DEVELOPER TASK WORKFLOW

Developer receives:

"My Tasks"

Example:

Payment Gateway API

Backend

Priority: HIGH

Due:
18 Aug 2026

Actions:

[Start Task]

After clicking:

TODO
→ IN_PROGRESS

Then:

[Submit for Review]

IN_PROGRESS
→ IN_REVIEW

Admin reviews.

If rejected:

IN_REVIEW
→ REVISION_REQUIRED

If accepted:

IN_REVIEW
→ COMPLETED

Every transition must create an activity.

---

# 14. TASK ASSIGNMENT

Admin/project manager can:

* Assign developer
* Reassign developer
* Change priority
* Change deadline
* Add description
* Add checklist
* Add attachments
* Add internal comment
* Make task client-visible

Do not allow developers to assign themselves to arbitrary projects unless explicitly permitted.

---

# 15. TASK CHECKLIST

Each task can have subtasks/checklist.

Example:

Payment Gateway

* Setup gateway credentials
* Create payment API
* Create callback handler
* Add payment verification
* Test sandbox
* Production test

Progress can be calculated from checklist completion.

---

# 16. CLIENT DASHBOARD

Create a completely separate client-facing dashboard.

Client sees:

Welcome, [Client Name]

Cards:

* Active Projects
* Overall Progress
* Pending Approvals
* Unread Messages

Example:

Active Projects: 2

Overall Progress: 64%

Pending Approvals: 2

Unread Messages: 5

---

# 17. CLIENT PROJECT CARD

Example:

E-Commerce Platform

Status:
In Development

Progress:
64%

Milestones:

✓ Planning
✓ UI/UX
✓ Frontend
● Backend
○ Testing
○ Deployment

Button:

[View Project]

---

# 18. CLIENT PROJECT DETAILS

Client project page:

## Overview

Project name
Project code
Project manager
Start date
Expected delivery
Current status
Progress

## Milestones

Show visual timeline.

Example:

✓ Planning
✓ UI/UX Design
✓ Frontend
● Backend
○ QA
○ Client Review
○ Deployment

## Client-visible Tasks

Only show tasks where:

clientVisible = true

## Project Updates

Show updates created by admin/project manager.

Example:

15 Aug 2026

Backend development has started.

Next:
Payment integration.

## Files

Show only client-visible files.

## Messages

Project-specific communication.

## Approvals

Show pending approvals.

---

# 19. CLIENT APPROVAL SYSTEM

This is mandatory.

Admin can request approval for:

* UI Design
* Requirements
* Milestone
* Feature
* Final Delivery

Approval statuses:

* PENDING
* APPROVED
* CHANGES_REQUESTED

Client UI:

"UI/UX Design"

Status:
Waiting for your approval

Buttons:

[Approve]

[Request Changes]

If client selects Request Changes:

Show textarea:

"Please describe the required changes."

Save:

* client
* timestamp
* comments
* approval entity
* previous status

---

# 20. PROJECT UPDATES

Admin/project manager can publish client-facing updates.

Fields:

* projectId
* title
* content
* createdBy
* visibility
* createdAt

Visibility:

INTERNAL
CLIENT

Example:

Title:
Backend Development Started

Content:
The backend API implementation has started. Authentication and product APIs are currently being developed.

Client only sees CLIENT updates.

---

# 21. PROJECT FILE MANAGEMENT

Implement project files.

File metadata:

* projectId
* taskId
* uploadedBy
* fileName
* fileUrl
* fileType
* fileSize
* visibility
* createdAt

Visibility:

INTERNAL
CLIENT

Client must only see CLIENT files.

Examples:

Proposal.pdf
Requirements.pdf
UI-Design.pdf
Project-Documentation.pdf
Final-Build.zip

---

# 22. PROJECT MESSAGES

Create project-based messaging.

Conversation:

Client
↕
Project Manager / Admin

Messages should support:

* text
* attachments
* timestamps
* read/unread
* notifications

Avoid exposing internal developer discussions to clients.

---

# 23. INTERNAL COMMENTS

Tasks and projects must support internal comments.

Example:

Developer:

"API credentials are missing."

Admin:

"I will send them privately."

Client must not see this.

---

# 24. NOTIFICATION SYSTEM

Create notifications.

Events:

* Task assigned
* Task reassigned
* Task due soon
* Task overdue
* Task submitted for review
* Client message
* Client approval
* Client revision request
* Project status changed
* Project update published
* File uploaded
* Milestone completed

Notification fields:

* userId
* type
* title
* message
* entityType
* entityId
* isRead
* createdAt

---

# 25. ADMIN PROJECT LIST

Create a professional table.

Columns:

Project
Client
Manager
Progress
Status
Health
Priority
Due Date
Tasks
Actions

Filters:

* Status
* Health
* Priority
* Project Manager
* Developer
* Client
* Date Range

Search:

* Project name
* Project code
* Client
* Company

---

# 26. PROJECT KANBAN

Optional but recommended.

Columns:

Planning
In Progress
In Review
Client Review
Testing
Deployment
Completed

Cards:

Project name
Client
Progress
Priority
Due date
Project manager

---

# 27. CLIENT PORTAL NAVIGATION

Client sidebar should be much simpler than admin.

```text
MAIN

Overview
My Projects
Messages
Files
Approvals

ACCOUNT

Profile
Settings
```

Do not show:

CRM
Leads
Contacts
Companies
Developers
Reports
Internal Activities
Security administration

---

# 28. ADMIN NAVIGATION

Use:

```text
OVERVIEW

Dashboard

CRM

Leads
Contacts
Companies
Deals

PROJECTS

Projects
Tasks
Milestones
Team

COMMUNICATION

Messages
Notifications

REPORTS

Sales
Projects
Team

SYSTEM

Users
Security
Settings
```

Keep the navigation clean.

Do not overload the sidebar.

---

# 29. DASHBOARD — ADMIN

Admin dashboard should answer these questions immediately:

1. How many new leads?
2. How much sales pipeline?
3. How many active projects?
4. Which projects are delayed?
5. What tasks are overdue?
6. What needs client approval?
7. What work is happening today?
8. How much revenue was won?

Cards:

New Leads
Qualified Leads
Pipeline Value
Active Projects
At Risk Projects
Overdue Tasks
Pending Approvals
Won Revenue

---

# 30. TEAM PERFORMANCE

Admin can see:

Developer
Assigned Tasks
Completed
In Progress
Overdue
Completion Rate

Example:

Shohrab

Assigned: 18
Completed: 12
In Progress: 4
Overdue: 2

Do not use this data for punitive assumptions; it is an operational reporting tool.

---

# 31. PROJECT HEALTH

Automatically calculate project health.

Healthy:

* Tasks progressing
* No major overdue items

At Risk:

* Multiple overdue tasks
* Upcoming deadline with low progress
* Blocked milestone

Delayed:

* Expected delivery date passed
* Project not completed

Show:

GREEN = Healthy
AMBER = At Risk
RED = Delayed

Use subtle colors, not excessive visual noise.

---

# 32. AUDIT LOG

Every important action must be logged.

Examples:

* User login
* Lead created
* Lead updated
* Lead status changed
* Client created
* Project created
* Project edited
* Task assigned
* Task status changed
* Milestone completed
* Client approval
* Revision requested
* File uploaded
* Project status changed

Audit fields:

* actorId
* action
* entityType
* entityId
* metadata
* ipAddress
* userAgent
* timestamp

Audit logs are admin-only.

---

# 33. DATABASE ARCHITECTURE

Use a relational database.

Recommended:

PostgreSQL + Prisma ORM.

Core models:

User
Role
Permission
Organization
Lead
Contact
Company
Service
Deal
Pipeline
PipelineStage
Client
Project
ProjectMember
Milestone
Task
TaskChecklist
Activity
ProjectUpdate
ProjectFile
ProjectMessage
Message
Conversation
Approval
Notification
Comment
AuditLog

Design proper indexes and foreign keys.

Use UUID/CUID identifiers.

Do not use random string IDs without a consistent strategy.

---

# 34. MULTI-TENANCY

Design the system so it can support multiple organizations in the future.

Most business entities should have:

organizationId

Tenant isolation must be enforced at the backend level.

A user from Organization A must never access Organization B's:

* projects
* clients
* leads
* tasks
* files
* messages
* reports

Never rely only on frontend filtering for authorization.

---

# 35. BACKEND API

Use REST API or the existing backend architecture.

Recommended API structure:

```text
/api/v1/auth

/api/v1/leads
/api/v1/contacts
/api/v1/companies
/api/v1/deals

/api/v1/projects
/api/v1/projects/:id/milestones
/api/v1/projects/:id/tasks
/api/v1/projects/:id/activities
/api/v1/projects/:id/updates
/api/v1/projects/:id/files
/api/v1/projects/:id/messages
/api/v1/projects/:id/approvals

/api/v1/tasks
/api/v1/milestones

/api/v1/clients
/api/v1/client/projects
/api/v1/client/approvals
/api/v1/client/messages

/api/v1/notifications
/api/v1/audit-logs
/api/v1/reports
```

Use:

* DTO validation
* Authentication middleware/guard
* RBAC guards
* Permission checks
* Pagination
* Filtering
* Sorting
* Search
* Rate limiting
* Structured error responses
* Logging

---

# 36. PROJECT STATUS RULES

Do not allow arbitrary status changes.

Example valid transitions:

PLANNING
→ NOT_STARTED

NOT_STARTED
→ IN_PROGRESS

IN_PROGRESS
→ IN_REVIEW

IN_REVIEW
→ CLIENT_REVIEW

CLIENT_REVIEW
→ REVISION_REQUIRED

CLIENT_REVIEW
→ TESTING

REVISION_REQUIRED
→ IN_PROGRESS

TESTING
→ DEPLOYMENT

DEPLOYMENT
→ COMPLETED

Allow admin override with audit logging if necessary.

---

# 37. TASK STATUS RULES

Valid flow:

TODO
→ IN_PROGRESS

IN_PROGRESS
→ IN_REVIEW

IN_REVIEW
→ COMPLETED

IN_REVIEW
→ REVISION_REQUIRED

REVISION_REQUIRED
→ IN_PROGRESS

Any blocked task:

IN_PROGRESS
→ BLOCKED

BLOCKED
→ IN_PROGRESS

---

# 38. PROGRESS CALCULATION

Project progress should preferably be derived.

Example:

10 tasks

6 completed

Progress = 60%

But allow milestone/task weighting where necessary.

Example:

UI/UX = 15%
Frontend = 25%
Backend = 30%
Testing = 20%
Deployment = 10%

Use weighted progress for larger projects.

Do not make progress manually editable by every role.

---

# 39. UI/UX REQUIREMENTS

The existing Infinisoft screenshots are the visual reference.

Keep the same overall visual language:

* Clean
* Minimal
* Professional
* Enterprise SaaS
* White/light gray background
* Thin borders
* Soft shadows
* Rounded cards
* Green primary action color
* Compact typography
* High information density without visual clutter
* Large usable whitespace
* Consistent spacing
* Consistent iconography

Do NOT create an old-fashioned CRM UI.

Do NOT use:

* excessive gradients
* huge cards
* unnecessary animations
* glassmorphism everywhere
* excessive colors
* giant typography
* dashboard clutter

---

# 40. RESPONSIVE DESIGN

Support:

Desktop
Tablet
Mobile

Admin dashboard is desktop-first.

Client portal must be fully responsive.

Developer task view must work well on mobile.

Tables should become:

* horizontal scroll
  or
* responsive cards

Do not break layouts on small screens.

---

# 41. MODERN INTERACTION PATTERNS

Use:

* Right-side detail drawer
* Modal for quick creation
* Inline status changes
* Command/search interface where useful
* Toast notifications
* Confirmation dialogs for destructive actions
* Skeleton loading
* Empty states
* Error states
* Optimistic updates where safe

Example:

Click lead:

Do NOT always navigate away.

Open:

Lead Detail Drawer

with:

Overview
Activity
Messages
Notes
Tasks

---

# 42. CLIENT EXPERIENCE

The client should immediately understand:

"What is happening with my project?"

The client dashboard should answer:

* What is the current status?
* How much is complete?
* What has been completed?
* What is currently being worked on?
* What happens next?
* Is anything waiting for me?
* Do I need to approve something?
* Can I message the team?

Do not expose unnecessary technical/internal information.

---

# 43. PROJECT OVERVIEW DESIGN

Recommended structure:

```text
Project Header

Project Name
Client
Status
Progress
Health

[Message Team]
[Request Update]

---------------------------------

Overview
Timeline
Tasks
Milestones
Files
Messages
Approvals
Activity
```

Use tabs where appropriate.

---

# 44. SECURITY

Implement:

* Secure authentication
* Password hashing
* Session/JWT security
* RBAC
* Permission checks
* Tenant isolation
* Input validation
* SQL injection protection through ORM
* XSS protection
* CSRF protection where applicable
* Rate limiting
* Secure file access
* Signed/private file URLs where appropriate
* Audit logs

Never trust:

* client-side role
* client-side projectId
* client-side organizationId
* client-side visibility flags

All authorization must be verified server-side.

---

# 45. FILE SECURITY

Do not expose private project files through public URLs.

Use secure access control.

Verify:

* user identity
* organization
* project membership
* client visibility
* file permissions

before allowing download.

---

# 46. SEARCH

Global search should eventually support:

* Leads
* Clients
* Companies
* Projects
* Tasks
* Messages

Search results should be grouped.

Example:

Projects
E-Commerce Platform

Clients
ABC Technologies

Tasks
Payment Gateway

---

# 47. REPORTS

Create:

## Sales Report

* Leads
* Qualified
* Won
* Lost
* Conversion Rate
* Pipeline Value

## Project Report

* Active projects
* Completed
* Delayed
* At Risk
* Average completion time

## Team Report

* Assigned tasks
* Completed tasks
* Overdue tasks
* Completion rate

## Client Report

* Active projects
* Completed projects
* Approvals
* Communication activity

---

# 48. NOTIFICATION UX

Top-right notification icon.

Example:

3 unread

Notifications:

"Payment API task assigned to you."

"Client requested changes to UI."

"Project is now in Client Review."

"Project deadline is tomorrow."

Clicking notification should open the related entity.

---

# 49. EMPTY STATES

Every page needs a useful empty state.

Example:

No Projects

"You don't have any projects yet."

[Create Project]

No Tasks

"No tasks assigned to you."

No Approvals

"Everything is up to date."

Do not show blank screens.

---

# 50. ERROR HANDLING

Never show raw backend errors.

Bad:

"PrismaClientKnownRequestError..."

Good:

"Unable to update project status. Please try again."

Developer logs should contain the technical error.

User UI should contain a useful message.

---

# 51. PERFORMANCE

Build for scalability.

Use:

* Server-side pagination
* Database indexes
* Efficient joins
* Select only required fields
* Lazy loading
* Debounced search
* Caching where appropriate
* Optimistic UI where safe
* Background processing for heavy operations

Never load thousands of projects/tasks into the browser at once.

---

# 52. REAL-TIME UPDATES

Architecture should be ready for WebSocket/SSE.

Useful real-time events:

* Task status changed
* Project status changed
* New message
* New notification
* Client approval
* Revision request

If real-time is not implemented in the first version, design the API/events so it can be added later without rewriting the system.

---

# 53. FRONTEND COMPONENT ARCHITECTURE

Create reusable components.

Examples:

ProjectCard
ProjectHeader
ProjectProgress
ProjectStatusBadge
ProjectHealthBadge
MilestoneTimeline
TaskCard
TaskBoard
TaskStatusBadge
TaskDrawer
ActivityTimeline
ActivityItem
ProjectUpdateCard
ApprovalCard
FileList
MessageThread
NotificationDropdown
UserAvatar
ClientProjectCard
ClientApprovalCard

Avoid duplicated UI code.

---

# 54. STATE MANAGEMENT

Separate:

Server state
from
Client UI state.

Server state:

* Projects
* Tasks
* Leads
* Messages
* Notifications

UI state:

* Drawer open/close
* Modal state
* Filters
* Selected project
* Search

Use the existing project state-management conventions if already configured.

Do not introduce unnecessary global state.

---

# 55. FRONTEND DATA FLOW

Example:

Admin creates task.

Frontend:

POST /api/v1/tasks

Backend:

1. Validate request
2. Check permission
3. Check organization
4. Check project access
5. Create task
6. Create activity
7. Create notification
8. Return task

Frontend:

* Update task list
* Show toast
* Update project statistics

---

# 56. CLIENT APPROVAL DATA FLOW

Admin:

POST approval request

Backend:

Create Approval(PENDING)

Create Notification

Client:

Sees:

"Approval Required"

Client clicks:

Approve

Backend:

Verify client owns project
→ update approval
→ create activity
→ notify admin
→ update related entity

---

# 57. AUDITABILITY

Never silently change important project data.

For example:

If project status changes:

OLD:
IN_PROGRESS

NEW:
CLIENT_REVIEW

Record:

Actor:
Admin

Timestamp:
15 Aug 2026 16:30

Reason:
"Frontend milestone completed"

This allows complete project history.

---

# 58. PROJECT ACTIVITY TYPES

Use enums:

PROJECT_CREATED
PROJECT_UPDATED
PROJECT_STATUS_CHANGED
PROJECT_MANAGER_ASSIGNED
PROJECT_MEMBER_ADDED
PROJECT_MEMBER_REMOVED

MILESTONE_CREATED
MILESTONE_STARTED
MILESTONE_COMPLETED

TASK_CREATED
TASK_ASSIGNED
TASK_REASSIGNED
TASK_STARTED
TASK_SUBMITTED
TASK_COMPLETED
TASK_BLOCKED

FILE_UPLOADED
FILE_DELETED

MESSAGE_SENT

UPDATE_CREATED

APPROVAL_REQUESTED
APPROVAL_APPROVED
CHANGES_REQUESTED

CLIENT_CONVERTED

---

# 59. API RESPONSE STANDARD

Use consistent responses.

Success:

{
"success": true,
"data": {},
"message": "Project created successfully"
}

Error:

{
"success": false,
"error": {
"code": "PROJECT_NOT_FOUND",
"message": "Project not found"
}
}

Paginated:

{
"success": true,
"data": [],
"meta": {
"page": 1,
"limit": 20,
"total": 120,
"totalPages": 6
}
}

---

# 60. DEVELOPMENT ORDER

Do NOT build everything randomly.

Implement in this exact order.

## Phase 1

Foundation

* Database schema
* Authentication
* RBAC
* Organizations
* Users
* Permissions

## Phase 2

CRM

* Leads
* Contacts
* Companies
* Deals
* Lead conversion

## Phase 3

Project Management

* Projects
* Project members
* Milestones
* Tasks
* Task assignment
* Status workflow

## Phase 4

Project Collaboration

* Activity timeline
* Comments
* Project updates
* Files
* Notifications

## Phase 5

Client Portal

* Client authentication
* Client dashboard
* Client projects
* Progress
* Milestones
* Files
* Messages
* Approvals

## Phase 6

Reporting

* CRM reports
* Project reports
* Team reports
* Client reports

## Phase 7

Advanced

* Real-time notifications
* WebSocket/SSE
* Email
* WhatsApp integration
* Advanced analytics
* Time tracking
* Invoicing
* Payments

---

# 61. IMPORTANT IMPLEMENTATION RULES

Do not rewrite existing working functionality unnecessarily.

First inspect the existing project.

Understand:

* frontend framework
* backend framework
* database
* authentication
* routing
* state management
* UI components
* API structure
* existing Leads implementation
* existing Client Portal implementation

Reuse existing components and conventions.

Do not create duplicate systems.

If a Leads module already exists, extend it.

If a Client Account already exists, extend it.

If authentication already exists, integrate with it.

---

# 62. EXISTING UI REFERENCE

The provided screenshots represent the existing Infinisoft UI.

Preserve the visual identity.

The current Leads screen contains:

* sidebar navigation
* summary cards
* search
* filters
* lead table
* status badges
* actions

The current Client Dashboard contains:

* overview cards
* recent enquiries
* client navigation
* open enquiries action

Extend these screens rather than redesigning the entire product from zero.

The new Project Management module should feel like the same product.

---

# 63. FINAL PRODUCT STRUCTURE

The final product should conceptually become:

INFINISOFT PLATFORM

Dashboard

CRM
├── Leads
├── Contacts
├── Companies
└── Deals

Projects
├── All Projects
├── My Projects
├── Tasks
├── Milestones
└── Team

Communication
├── Messages
└── Notifications

Reports
├── Sales
├── Projects
└── Team

Client Portal
├── Overview
├── My Projects
├── Tasks
├── Updates
├── Files
├── Messages
└── Approvals

System
├── Users
├── Roles
├── Security
└── Settings

---

# 64. SUCCESS CRITERIA

The implementation is considered complete only when this scenario works end-to-end:

1. Visitor submits contact form.
2. Lead appears in Admin CRM.
3. Admin contacts lead.
4. Admin changes status to Qualified.
5. Admin creates Deal.
6. Deal becomes Won.
7. Admin converts lead to Client.
8. Admin creates Project.
9. Admin assigns Project Manager.
10. Project Manager creates milestones.
11. Project Manager creates tasks.
12. Developer is assigned tasks.
13. Developer starts a task.
14. Task status becomes IN_PROGRESS.
15. Developer submits task for review.
16. Admin reviews task.
17. Task becomes COMPLETED.
18. Project progress updates.
19. Admin publishes client-visible update.
20. Client logs into Client Portal.
21. Client sees project progress.
22. Client sees milestones.
23. Client sees client-visible tasks.
24. Client reads project update.
25. Admin requests approval.
26. Client receives notification.
27. Client approves.
28. Admin sees approval.
29. Project moves to Testing.
30. Project moves to Deployment.
31. Project becomes Completed.
32. Complete project activity history remains available.

---

# 65. QUALITY REQUIREMENT

This must feel like a real production SaaS product, not a demo.

Prioritize:

* Correct architecture
* Clean database relationships
* Strong authorization
* Tenant isolation
* Reusable components
* Consistent UI
* Good UX
* Proper loading states
* Proper error states
* Auditability
* Scalability
* Maintainability
* Security
* Performance

Do not create fake functionality.

Do not hardcode project status.

Do not hardcode users.

Do not hardcode dashboard statistics.

Do not use mock data in production paths.

All displayed information must come from the backend/database.

---

# 66. FINAL INSTRUCTION TO THE CODING AGENT

Before writing code:

1. Inspect the entire existing repository.
2. Identify current architecture.
3. Identify existing CRM/Lead implementation.
4. Identify current client dashboard.
5. Identify authentication.
6. Identify database schema.
7. Identify existing reusable UI components.
8. Produce a short implementation plan.
9. Identify conflicts with the existing architecture.
10. Then implement incrementally.

Do not destroy existing working functionality.

Do not replace the current UI unnecessarily.

Do not create duplicate models or duplicate APIs.

Follow the existing project's conventions wherever they are sound.

After each phase:

* run type checking
* run lint
* run tests
* run database validation
* verify API endpoints
* verify authorization
* verify frontend build

Fix all errors before moving to the next phase.

At the end, provide:

1. Files created
2. Files modified
3. Database changes
4. API endpoints
5. RBAC changes
6. Frontend routes
7. New components
8. Environment variables
9. Migration commands
10. Test results
11. Remaining limitations

The final result must be a production-ready **Infinisoft CRM + Project Management + Client Portal + Developer Task Management platform**.

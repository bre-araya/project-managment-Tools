so do these now: No frontend UI for comments, despite backend
- No UI for managing project member roles
No task detail or edit card UI
- No frontend support for [GET /api/projects/:id]
- No profile or password-change UI
- No task filters/search on tasks page
- Task assignee input is free-text, but backend expects user IDs for proper assignment

What the app currently implements
    Backend capabilities
    Authentication
        POST /api/auth/register
        POST /api/auth/login
        POST /api/auth/logout
        GET /api/auth/me
    User management
        GET /api/auth/users
        PUT /api/auth/users/:id/role
        PUT /api/auth/me
        PUT /api/auth/me/password
    Project management
        POST /api/projects
        GET /api/projects
        GET /api/projects/:id
        PUT /api/projects/:id
        DELETE /api/projects/:id
        POST /api/projects/:id/invite
    Task management
        POST /api/tasks
        GET /api/tasks/project/:projectId
        PUT /api/tasks/:id
    Comments
        POST /api/comments
    Backend business rules
        Role-based access:
            global roles: admin, user
            project roles: project-manager, developer, viewer
        Project owners and project-managers can invite members
            Tasks belong to projects and update project progress automatically
            Task column moves update task status and recalculated progress
            Admin bypasses most project role restrictions
            Member-only project/task access enforced by middleware

    Data model highlights
        User
            name, email, password
            globalRole (admin / user)
        Project
            owner
            members with role
            default columns: ["To Do", "In Progress", "Review", "Done"]
            deadline, progress
        Task
            project, title, status, priority
            assignees
            dueDate, progress
            comment refs
        Comment
            task discussion support via task, user, text

Frontend capabilities
    Pages
        / Landing
        /login
        /register
        /dashboard
        /projects
        /tasks
        /tasks/:projectId
    Main UI features
        Auth forms for register/login
        Dashboard overview with:
            project count
            task count
            completed / pending totals
            recent project cards
        Projects screen
            load projects from backend
            create project modal
            edit project modal
            delete project
            kanban-style columns
            drag/drop to move project state
        Tasks screen
            project-specific task board
            create task modal
            drag/drop task status between columns
            task grouping into To Do, In Progress, Review, Done


     Frontend service behavior
        Uses Axios base API with cookie support
        Stores JWT in localStorage as pm_token
        Loads users for project assignment dropdown
        Loads projects for task creation dropdown   

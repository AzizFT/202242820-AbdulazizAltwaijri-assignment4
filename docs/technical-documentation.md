# Technical Documentation - Assignment 3

## 1. Project Overview
This project is an advanced version of my portfolio website. It builds on Assignments 1 and 2 by adding API integration, advanced logic, state management, and performance improvements.

## 2. Main Features
- Responsive layout
- Theme toggle with saved state
- Visitor name saving using localStorage
- Project search, filtering, and sorting
- Contact form validation
- GitHub API integration
- Error handling for invalid input and API failures

## 3. API Integration
The application uses the GitHub API:

https://api.github.com/users/AzizFT/repos

It displays:
- repository name
- description
- language
- stars
- repository link

If the API fails, the website shows a clear error message.

## 4. Complex Logic
The Projects section combines:
- search
- category filter
- sorting

The results update dynamically based on all selected conditions.

## 5. State Management
The website stores:
- theme
- visitor name
- search input
- selected filter
- sorting option

This allows restoring user preferences after refresh.

## 6. Contact Form Validation
Validation includes:
- required fields
- valid email format
- message length (minimum 10 characters)

The website shows either error or success messages.

## 7. Performance Improvements
- removed unnecessary UI elements
- avoided heavy assets
- cleaned unused CSS/JS
- optimized DOM updates

## 8. Testing
Manual testing included:
- theme persistence
- search/filter/sort functionality
- empty state handling
- form validation scenarios
- API loading and error handling
- responsiveness on different screen sizes

## 9. Example Code Snippet
localStorage.setItem("projectCategory", categoryValue);

## 10. API Fetch Example
const response = await fetch("https://api.github.com/users/AzizFT/repos");

## 11. User Interaction Guide
1. Enter your name to personalize the page.
2. Browse projects using search, filter, and sorting.
3. View GitHub repositories.
4. Use the contact form.
5. Toggle theme.

## 12. Conclusion
This assignment improved the website by making it more dynamic, interactive, and technically complete.
# Technical Documentation - Assignment 4

## 1. Project Overview

This project is the final version of my personal portfolio web application. It combines previous portfolio features with advanced functionality, polished design, API integration, state management, a creative recommendation feature, and final presentation materials.

## 2. Main Features

- Responsive personal portfolio layout
- Theme toggle with saved preference
- Visitor name personalization
- Project search
- Project category filter
- Project sorting
- GitHub API repository display
- Career Path Recommender with saved user choices
- Contact form validation
- Error and success messages
- Performance-focused cleanup

## 3. Application Structure

The application uses a simple front-end structure:

- index.html handles the website content
- css/styles.css handles layout and design
- js/script.js handles interactivity and API logic
- docs contains documentation
- presentation contains the final presentation files

## 4. API Integration

The website uses the GitHub public API to fetch repositories from my GitHub account.

API endpoint:

https://api.github.com/users/AzizFT/repos

The website displays:

- repository name
- description
- language
- stars
- repository link

If the request fails, the website displays a friendly error message instead of breaking.

## 5. Complex Logic

The Projects section includes multiple controls that work together:

- text search
- category filter
- alphabetical sorting

The result list updates dynamically based on all active conditions.

For example, a user can search for a project name, select a category, and then sort the filtered results alphabetically. The page then updates the visible project cards based on those combined rules.

## 6. Career Path Recommender

The Career Path Recommender is an interactive feature added for innovation. The user selects an interest area and a skill level. Based on those choices, the application displays a personalized recommendation.

The recommendation includes:

- focus area
- skill to improve
- project idea
- next step

This feature demonstrates complex logic because the output depends on two user choices working together. It also uses localStorage to remember the selected interest and level after refresh.

## 7. State Management

The website stores user preferences using localStorage.

Stored values:

- selected theme
- visitor name
- project search input
- selected category
- selected sorting option
- selected career interest
- selected career level

This allows the website to restore the user experience after refreshing the page.

## 8. Contact Form Validation

The contact form validates user input before showing a success message.

Validation rules:

- name is required
- email is required
- email must look valid
- message is required
- message must be at least 10 characters

## 9. Error Handling

The application handles:

- invalid contact form input
- missing project search results
- failed GitHub API request
- missing visitor name input

Helpful messages are shown to the user in each case.

## 10. Performance Improvements

Performance was improved by:

- avoiding large images
- removing unnecessary UI elements
- keeping JavaScript simple and organized
- using lightweight CSS
- reducing repeated code
- avoiding unnecessary libraries

## 11. Testing

Manual testing included:

- theme toggle and persistence
- visitor name saving
- project search
- project filter
- project sorting
- empty project result message
- Career Path Recommender output
- Career Path Recommender saved selections
- GitHub API loading
- API error message behavior
- contact form validation
- mobile and desktop responsiveness

## 12. User Guide

1. Enter a name to personalize the page.
2. Use the project controls to search, filter, and sort.
3. Use the Career Path Recommender to get a learning recommendation.
4. View live repositories from GitHub.
5. Use the contact form and follow validation messages.
6. Toggle the theme and refresh to confirm it stays saved.

## 13. Future Improvements

Future improvements could include:

- real backend contact form
- custom project images
- more animations
- more detailed project pages
- deployment analytics
- improved recommendation logic based on more detailed user input

## 14. Conclusion

This project demonstrates a complete and polished personal portfolio web application with professional-quality documentation, interactive features, API integration, state management, a useful recommendation feature, and final presentation materials.
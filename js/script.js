function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  const button = document.getElementById("themeToggle");
  if (button) {
    button.textContent = theme === "dark" ? "☀️" : "🌙";
  }
}

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning 👋";
  }

  if (hour < 18) {
    return "Good afternoon 👋";
  }

  return "Good evening 👋";
}

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  const greeting = document.getElementById("greeting");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (greeting) {
    greeting.textContent = getGreeting();
  }

  const savedTheme = localStorage.getItem("theme");
  setTheme(savedTheme === "dark" ? "dark" : "light");

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      setTheme(currentTheme === "light" ? "dark" : "light");
    });
  }

  const navToggle = document.getElementById("navToggle");
  const navList = document.getElementById("navList");

  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      navList.classList.toggle("open");
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (navList) {
        navList.classList.remove("open");
      }
    });
  });

  const visitorInput = document.getElementById("visitorName");
  const saveNameBtn = document.getElementById("saveNameBtn");
  const welcomeMessage = document.getElementById("welcomeMessage");

  function showWelcome(name) {
    if (welcomeMessage) {
      welcomeMessage.textContent = `Welcome back, ${name}!`;
      welcomeMessage.className = "form-status success";
    }
  }

  const savedVisitorName = localStorage.getItem("visitorName");

  if (savedVisitorName && visitorInput) {
    visitorInput.value = savedVisitorName;
    showWelcome(savedVisitorName);
  }

  if (saveNameBtn && visitorInput && welcomeMessage) {
    saveNameBtn.addEventListener("click", () => {
      const name = visitorInput.value.trim();

      if (!name) {
        welcomeMessage.textContent = "Please enter your name first.";
        welcomeMessage.className = "form-status error";
        return;
      }

      localStorage.setItem("visitorName", name);
      showWelcome(name);
    });
  }

  const searchInput = document.getElementById("projectSearch");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortOption = document.getElementById("sortOption");
  const projectsGrid = document.getElementById("projectsGrid");
  const emptyMessage = document.getElementById("emptyMessage");

  function updateProjects() {
    if (!projectsGrid || !searchInput || !categoryFilter || !sortOption) {
      return;
    }

    const projects = Array.from(projectsGrid.querySelectorAll(".project"));
    const searchValue = searchInput.value.toLowerCase().trim();
    const categoryValue = categoryFilter.value;
    const sortValue = sortOption.value;

    localStorage.setItem("projectSearch", searchValue);
    localStorage.setItem("projectCategory", categoryValue);
    localStorage.setItem("projectSort", sortValue);

    let filtered = projects.filter((project) => {
      const title = project.dataset.title.toLowerCase();
      const category = project.dataset.category;
      const text = project.textContent.toLowerCase();

      const matchesSearch = title.includes(searchValue) || text.includes(searchValue);
      const matchesCategory = categoryValue === "all" || category === categoryValue;

      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      const first = a.dataset.title.toLowerCase();
      const second = b.dataset.title.toLowerCase();

      if (sortValue === "az") {
        return first.localeCompare(second);
      }

      return second.localeCompare(first);
    });

    projects.forEach((project) => {
      project.style.display = "none";
    });

    filtered.forEach((project) => {
      project.style.display = "block";
      projectsGrid.appendChild(project);
    });

    if (emptyMessage) {
      emptyMessage.style.display = filtered.length === 0 ? "block" : "none";
    }
  }

  if (searchInput && categoryFilter && sortOption) {
    searchInput.value = localStorage.getItem("projectSearch") || "";
    categoryFilter.value = localStorage.getItem("projectCategory") || "all";
    sortOption.value = localStorage.getItem("projectSort") || "az";

    searchInput.addEventListener("input", updateProjects);
    categoryFilter.addEventListener("change", updateProjects);
    sortOption.addEventListener("change", updateProjects);

    updateProjects();
  }

  const interestSelect = document.getElementById("interestSelect");
  const levelSelect = document.getElementById("levelSelect");
  const recommendBtn = document.getElementById("recommendBtn");
  const recommendationBox = document.getElementById("recommendationBox");

  const recommendations = {
    web: {
      beginner: {
        focus: "HTML, CSS, and basic JavaScript",
        skill: "Build responsive layouts",
        project: "Create a personal landing page",
        step: "Practice Flexbox, Grid, and simple DOM interactions"
      },
      intermediate: {
        focus: "API integration and interactive UI",
        skill: "Fetch and display external data",
        project: "Build a dashboard using a public API",
        step: "Practice async JavaScript and error handling"
      },
      advanced: {
        focus: "Full-stack structure and performance",
        skill: "Optimize user experience and app structure",
        project: "Build a portfolio with dynamic project pages",
        step: "Learn routing, deployment, and performance testing"
      }
    },
    ai: {
      beginner: {
        focus: "Python basics and AI concepts",
        skill: "Understand datasets and simple models",
        project: "Create a small prediction demo",
        step: "Learn basic Python, pandas, and model evaluation"
      },
      intermediate: {
        focus: "Machine learning workflows",
        skill: "Train and evaluate models",
        project: "Build a classification project",
        step: "Practice preprocessing, training, and testing"
      },
      advanced: {
        focus: "Applied AI systems",
        skill: "Connect models with real applications",
        project: "Build an AI-powered recommendation tool",
        step: "Learn deployment and responsible AI practices"
      }
    },
    pm: {
      beginner: {
        focus: "Project basics and communication",
        skill: "Understand scope, schedule, and stakeholders",
        project: "Create a simple project plan",
        step: "Practice writing goals, milestones, and risks"
      },
      intermediate: {
        focus: "Agile planning and delivery",
        skill: "Manage tasks and team workflow",
        project: "Build a sprint board for a software project",
        step: "Practice user stories, backlog, and retrospectives"
      },
      advanced: {
        focus: "Leadership and project strategy",
        skill: "Balance technical, business, and team needs",
        project: "Create a full project roadmap",
        step: "Practice risk management and stakeholder reporting"
      }
    }
  };

  function showRecommendation() {
    if (!interestSelect || !levelSelect || !recommendationBox) {
      return;
    }

    const interest = interestSelect.value;
    const level = levelSelect.value;
    const result = recommendations[interest][level];

    localStorage.setItem("careerInterest", interest);
    localStorage.setItem("careerLevel", level);

    recommendationBox.innerHTML = `
      <strong>Recommended Direction:</strong>
      <ul>
        <li><strong>Focus:</strong> ${result.focus}</li>
        <li><strong>Skill:</strong> ${result.skill}</li>
        <li><strong>Project Idea:</strong> ${result.project}</li>
        <li><strong>Next Step:</strong> ${result.step}</li>
      </ul>
    `;
  }

  if (interestSelect && levelSelect && recommendBtn) {
    interestSelect.value = localStorage.getItem("careerInterest") || "web";
    levelSelect.value = localStorage.getItem("careerLevel") || "beginner";

    recommendBtn.addEventListener("click", showRecommendation);
    showRecommendation();
  }

  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      formStatus.className = "form-status";

      if (!name || !email || !message) {
        formStatus.textContent = "Please fill in all fields.";
        formStatus.classList.add("error");
        return;
      }

      if (!email.includes("@") || !email.includes(".")) {
        formStatus.textContent = "Please enter a valid email address.";
        formStatus.classList.add("error");
        return;
      }

      if (message.length < 10) {
        formStatus.textContent = "Message must be at least 10 characters.";
        formStatus.classList.add("error");
        return;
      }

      formStatus.textContent = `Thanks, ${name}. Your message was submitted successfully.`;
      formStatus.classList.add("success");
      contactForm.reset();
    });
  }

  const repoList = document.getElementById("githubRepoList");
  const apiStatus = document.getElementById("apiStatus");

  async function loadRepos() {
    if (!repoList || !apiStatus) {
      return;
    }

    try {
      apiStatus.textContent = "Loading repositories...";

      const response = await fetch("https://api.github.com/users/AzizFT/repos?sort=updated&per_page=6");

      if (!response.ok) {
        throw new Error("GitHub API request failed");
      }

      const repos = await response.json();
      repoList.innerHTML = "";

      repos.forEach((repo) => {
        const card = document.createElement("article");
        card.className = "card repo-card";

        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description available."}</p>
          <p><strong>Language:</strong> ${repo.language || "Not specified"}</p>
          <p><strong>Stars:</strong> ${repo.stargazers_count}</p>
          <a class="link" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View Repository</a>
        `;

        repoList.appendChild(card);
      });

      apiStatus.textContent = "Repositories loaded successfully.";
      apiStatus.className = "form-status success";
    } catch (error) {
      apiStatus.textContent = "GitHub repositories could not be loaded right now.";
      apiStatus.className = "form-status error";
    }
  }

  loadRepos();
});
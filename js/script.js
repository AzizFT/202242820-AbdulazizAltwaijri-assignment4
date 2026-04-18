function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  const toggleBtn = document.getElementById("themeToggle");
  if (toggleBtn) {
    toggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  }
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning 👋";
  if (hour < 18) return "Good afternoon 👋";
  return "Good evening 👋";
}

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const greeting = document.getElementById("greeting");
  if (greeting) greeting.textContent = getGreeting();

  const savedTheme = localStorage.getItem("theme");
  setTheme(savedTheme === "dark" ? "dark" : "light");

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      setTheme(current === "light" ? "dark" : "light");
    });
  }

  const navToggle = document.getElementById("navToggle");
  const navList = document.getElementById("navList");

  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const targetId = a.getAttribute("href");
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      if (navList && navToggle) {
        navList.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Contact form validation
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (form && status) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      status.textContent = "";
      status.className = "form-status";

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        status.textContent = "Please fill in all fields.";
        status.classList.add("error");
        return;
      }

      if (!email.includes("@") || !email.includes(".")) {
        status.textContent = "Please enter a valid email address.";
        status.classList.add("error");
        return;
      }

      if (message.length < 10) {
        status.textContent = "Message must be at least 10 characters.";
        status.classList.add("error");
        return;
      }

      status.textContent = `Thanks, ${name}! Your message was submitted successfully.`;
      status.classList.add("success");
      form.reset();
    });
  }

  // Visitor name state
  const visitorInput = document.getElementById("visitorName");
  const saveNameBtn = document.getElementById("saveNameBtn");
  const welcomeMessage = document.getElementById("welcomeMessage");

  function showWelcomeMessage(savedName) {
    if (welcomeMessage && savedName) {
      welcomeMessage.textContent = `Welcome back, ${savedName}!`;
      welcomeMessage.className = "form-status success";
    }
  }

  const savedVisitorName = localStorage.getItem("visitorName");
  if (visitorInput && savedVisitorName) {
    visitorInput.value = savedVisitorName;
    showWelcomeMessage(savedVisitorName);
  }

  if (saveNameBtn && visitorInput) {
    saveNameBtn.addEventListener("click", () => {
      const visitorName = visitorInput.value.trim();
      if (!visitorName) {
        if (welcomeMessage) {
          welcomeMessage.textContent = "Please enter your name first.";
          welcomeMessage.className = "form-status error";
        }
        return;
      }

      localStorage.setItem("visitorName", visitorName);
      showWelcomeMessage(visitorName);
    });
  }

  // Project search/filter/sort
  const searchInput = document.getElementById("projectSearch");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortOption = document.getElementById("sortOption");
  const projectsGrid = document.getElementById("projectsGrid");
  const emptyMessage = document.getElementById("emptyMessage");

  function updateProjects() {
    if (!projectsGrid) return;

    const allProjects = Array.from(projectsGrid.querySelectorAll(".project"));
    const searchValue = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const categoryValue = categoryFilter ? categoryFilter.value : "all";
    const sortValue = sortOption ? sortOption.value : "az";

    localStorage.setItem("projectSearch", searchValue);
    localStorage.setItem("projectCategory", categoryValue);
    localStorage.setItem("projectSort", sortValue);

    let filteredProjects = allProjects.filter((project) => {
      const title = project.dataset.title.toLowerCase();
      const category = project.dataset.category.toLowerCase();
      const matchesSearch = title.includes(searchValue) || project.innerText.toLowerCase().includes(searchValue);
      const matchesCategory = categoryValue === "all" || category === categoryValue;
      return matchesSearch && matchesCategory;
    });

    filteredProjects.sort((a, b) => {
      const titleA = a.dataset.title.toLowerCase();
      const titleB = b.dataset.title.toLowerCase();
      return sortValue === "az"
        ? titleA.localeCompare(titleB)
        : titleB.localeCompare(titleA);
    });

    allProjects.forEach((project) => {
      project.style.display = "none";
    });

    filteredProjects.forEach((project) => {
      project.style.display = "block";
      projectsGrid.appendChild(project);
    });

    if (emptyMessage) {
      emptyMessage.style.display = filteredProjects.length === 0 ? "block" : "none";
    }
  }

  if (searchInput && categoryFilter && sortOption) {
    const savedSearch = localStorage.getItem("projectSearch");
    const savedCategory = localStorage.getItem("projectCategory");
    const savedSort = localStorage.getItem("projectSort");

    if (savedSearch) searchInput.value = savedSearch;
    if (savedCategory) categoryFilter.value = savedCategory;
    if (savedSort) sortOption.value = savedSort;

    searchInput.addEventListener("input", updateProjects);
    categoryFilter.addEventListener("change", updateProjects);
    sortOption.addEventListener("change", updateProjects);

    updateProjects();
  }

  // GitHub API integration
  const repoList = document.getElementById("githubRepoList");
  const apiStatus = document.getElementById("apiStatus");

  async function loadGitHubRepos() {
    if (!repoList || !apiStatus) return;

    apiStatus.textContent = "Loading repositories...";

    try {
      const response = await fetch("https://api.github.com/users/AzizFT/repos?sort=updated&per_page=6");

      if (!response.ok) {
        throw new Error("Failed to load repositories.");
      }

      const repos = await response.json();

      repoList.innerHTML = "";

      if (!repos.length) {
        apiStatus.textContent = "No repositories found.";
        return;
      }

      repos.forEach((repo) => {
        const card = document.createElement("article");
        card.className = "repo-card";

        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description ? repo.description : "No description available."}</p>
          <p><strong>Language:</strong> ${repo.language ? repo.language : "Not specified"}</p>
          <p><strong>Stars:</strong> ${repo.stargazers_count}</p>
          <a class="link" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View Repository</a>
        `;

        repoList.appendChild(card);
      });

      apiStatus.textContent = "Repositories loaded successfully.";
      apiStatus.className = "form-status success";
    } catch (error) {
      apiStatus.textContent = "Sorry, GitHub repositories could not be loaded at the moment.";
      apiStatus.className = "form-status error";
    }
  }

  loadGitHubRepos();
});
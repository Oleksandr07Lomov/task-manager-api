const API_URL = "http://127.0.0.1:8000";
let isLoginMode = true;
let currentTasks = [];
let currentLang = localStorage.getItem("lang") || "ru";

let viewDate = new Date();

const translations = {
    ru: {
        appSubtitle: "Космический менеджер задач",
        tabLogin: "Вход",
        tabRegister: "Регистрация",
        welcomeTitle: "С возвращением!",
        welcomeSub: "Войдите на орбиту своих задач",
        regTitle: "Регистрация",
        regSub: "Создайте аккаунт и получите код на почту",
        emailLabel: "Электронная почта",
        passwordLabel: "Пароль",
        rememberMe: "Запомнить меня",
        forgotPwd: "Забыли пароль?",
        loginBtn: "Войти",
        registerBtn: "Создать аккаунт",
        noAccount: "Нет аккаунта?",
        hasAccount: "Уже есть аккаунт?",
        registerLink: "Зарегистрироваться",
        loginLink: "Войти",
        verifyTitle: "Проверьте почту!",
        verifySub: "Мы отправили 6-значный код на",
        verifyBtn: "Подтвердить код",
        backToLogin: "← Вернуться ко входу",
        navTasks: "Мои задачи",
        navCalendar: "Календарь",
        navStats: "Статистика",
        apiConnected: "Подключено к API",
        taskTitlePh: "Что нужно сделать...",
        taskDescPh: "Описание...",
        addBtn: "Добавить",
        statusDone: "Выполнено",
        statusProcess: "В процессе",
        emptyTasks: "Задач пока нет. Создайте первую!",
        perMonth: "За месяц",
        statsSubtitle: "Обзор вашей продуктивности",
        kpiTotal: "Всего задач:",
        kpiDone: "Выполнено:",
        kpiProgress: "В процессе:",
        kpiOverdue: "Просрочено:",
        completedWord: "выполнено",
        efficiency: "Эффективность",
        activityTitle: "Активность по категориям",
        barTotal: "Всего задач",
        barDone: "Выполнено",
        barProgress: "В процессе",
        weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
        months: [
            "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ],
        sendingEmail: "Отправляем письмо...",
        verifiedSuccess: "Почта подтверждена! Теперь войдите в аккаунт."
    },
    uk: {
        appSubtitle: "Космічний менеджер завдань",
        tabLogin: "Вхід",
        tabRegister: "Реєстрація",
        welcomeTitle: "З поверненням!",
        welcomeSub: "Увійдіть на орбіту своїх завдань",
        regTitle: "Реєстрація",
        regSub: "Створіть акаунт та отримайте код на пошту",
        emailLabel: "Електронна пошта",
        passwordLabel: "Пароль",
        rememberMe: "Запам'ятати мене",
        forgotPwd: "Забули пароль?",
        loginBtn: "Увійти",
        registerBtn: "Створити акаунт",
        noAccount: "Немає акаунту?",
        hasAccount: "Вже є акаунт?",
        registerLink: "Зареєструватися",
        loginLink: "Увійти",
        verifyTitle: "Перевірте пошту!",
        verifySub: "Ми надіслали 6-значний код на",
        verifyBtn: "Підтвердити код",
        backToLogin: "← Повернутися до входу",
        navTasks: "Мої завдання",
        navCalendar: "Календар",
        navStats: "Статистика",
        apiConnected: "Підключено до API",
        taskTitlePh: "Що потрібно зробити...",
        taskDescPh: "Опис...",
        addBtn: "Додати",
        statusDone: "Виконано",
        statusProcess: "В процесі",
        emptyTasks: "Завдань поки немає. Створіть перше!",
        perMonth: "За місяць",
        statsSubtitle: "Огляд вашої продуктивності",
        kpiTotal: "Всього завдань:",
        kpiDone: "Виконано:",
        kpiProgress: "В процесі:",
        kpiOverdue: "Прострочено:",
        completedWord: "виконано",
        efficiency: "Ефективність",
        activityTitle: "Активність за категоріями",
        barTotal: "Всього завдань",
        barDone: "Виконано",
        barProgress: "В процесі",
        weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
        months: [
            "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
            "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
        ],
        sendingEmail: "Надсилаємо лист...",
        verifiedSuccess: "Пошту підтверджено! Тепер увійдіть."
    },
    en: {
        appSubtitle: "Cosmic Task Manager",
        tabLogin: "Login",
        tabRegister: "Register",
        welcomeTitle: "Welcome Back!",
        welcomeSub: "Enter the orbit of your tasks",
        regTitle: "Create Account",
        regSub: "Sign up and get a verification code via email",
        emailLabel: "Email Address",
        passwordLabel: "Password",
        rememberMe: "Remember me",
        forgotPwd: "Forgot password?",
        loginBtn: "Sign In",
        registerBtn: "Create Account",
        noAccount: "Don't have an account?",
        hasAccount: "Already have an account?",
        registerLink: "Sign Up",
        loginLink: "Sign In",
        verifyTitle: "Check Your Email!",
        verifySub: "We sent a 6-digit code to",
        verifyBtn: "Verify Code",
        backToLogin: "← Back to Login",
        navTasks: "My Tasks",
        navCalendar: "Calendar",
        navStats: "Statistics",
        apiConnected: "Connected to API",
        taskTitlePh: "What needs to be done...",
        taskDescPh: "Description...",
        addBtn: "Add",
        statusDone: "Completed",
        statusProcess: "In Progress",
        emptyTasks: "No tasks yet. Create your first one!",
        perMonth: "Monthly",
        statsSubtitle: "Your productivity overview",
        kpiTotal: "Total Tasks:",
        kpiDone: "Completed:",
        kpiProgress: "In Progress:",
        kpiOverdue: "Overdue:",
        completedWord: "completed",
        efficiency: "Efficiency",
        activityTitle: "Activity by Category",
        barTotal: "Total Tasks",
        barDone: "Completed",
        barProgress: "In Progress",
        weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        months: [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ],
        sendingEmail: "Sending email...",
        verifiedSuccess: "Email verified! You can now sign in."
    }
};

const authSection = document.getElementById("auth-section");
const verifySection = document.getElementById("verify-section");
const tasksSection = document.getElementById("tasks-section");

const authForm = document.getElementById("auth-form");
const verifyForm = document.getElementById("verify-form");

const authTitle = document.getElementById("auth-title");
const authSubtitleText = document.getElementById("auth-subtitle-text");
const authSubmitBtn = document.getElementById("auth-submit-btn");
const switchModeLink = document.getElementById("switch-mode");
const switchPrompt = document.getElementById("switch-prompt");

const authError = document.getElementById("auth-error");
const authSuccess = document.getElementById("auth-success");
const verifyError = document.getElementById("verify-error");

const tabLogin = document.getElementById("tab-login");
const tabRegister = document.getElementById("tab-register");
const togglePwd = document.getElementById("toggle-pwd");
const passwordInput = document.getElementById("password");

function formatDateKey(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function getTodayKey() {
    const now = new Date();
    return formatDateKey(now.getFullYear(), now.getMonth(), now.getDate());
}

function syncTaskDates(tasks) {
    const map = JSON.parse(localStorage.getItem("taskDateMap") || "{}");
    const todayKey = getTodayKey();
    let changed = false;

    tasks.forEach(task => {
        if (!map[task.id] || map[task.id].length !== 10) {
            map[task.id] = todayKey;
            changed = true;
        }
    });

    if (changed) {
        localStorage.setItem("taskDateMap", JSON.stringify(map));
    }
    return map;
}

function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
    const t = translations[lang];

    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (t[key]) el.textContent = t[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (t[key]) el.placeholder = t[key];
    });

    const calDays = document.getElementById("cal-weekdays");
    const statDays = document.getElementById("stats-weekdays");
    if (calDays) calDays.innerHTML = t.weekdays.map(d => `<div>${d}</div>`).join("");
    if (statDays) statDays.innerHTML = t.weekdays.map(d => `<span>${d}</span>`).join("");

    updateMonthLabels();
    setAuthMode(isLoginMode);

    if (!tasksSection.classList.contains("hidden")) {
        renderTasks(currentTasks);
        renderCalendar(currentTasks);
    }
}

function updateMonthLabels() {
    const t = translations[currentLang];
    const monthName = t.months[viewDate.getMonth()];
    const year = viewDate.getFullYear();
    const label = `${monthName} ${year}`;

    const calLabel = document.getElementById("cal-month-year");
    if (calLabel) calLabel.textContent = label;

    const statsMonthPill = document.querySelector('[data-i18n="oct2026"]');
    if (statsMonthPill) statsMonthPill.textContent = label;
}

document.getElementById("prev-month").addEventListener("click", () => {
    viewDate.setMonth(viewDate.getMonth() - 1);
    updateMonthLabels();
    renderCalendar(currentTasks);
});

document.getElementById("next-month").addEventListener("click", () => {
    viewDate.setMonth(viewDate.getMonth() + 1);
    updateMonthLabels();
    renderCalendar(currentTasks);
});

document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
});

document.addEventListener("DOMContentLoaded", () => {
    localStorage.removeItem("taskDateMap");
    applyLanguage(currentLang);
    const token = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) document.getElementById("user-email-display").textContent = savedEmail;
    if (token) showTasksSection();
});

togglePwd.addEventListener("click", () => {
    const isPwd = passwordInput.type === "password";
    passwordInput.type = isPwd ? "text" : "password";
    togglePwd.classList.toggle("fa-eye-slash", !isPwd);
    togglePwd.classList.toggle("fa-eye", isPwd);
});

function setAuthMode(login) {
    isLoginMode = login;
    const t = translations[currentLang];
    authError.classList.add("hidden");
    tabLogin.classList.toggle("active", login);
    tabRegister.classList.toggle("active", !login);

    if (login) {
        authTitle.textContent = t.welcomeTitle;
        authSubtitleText.textContent = t.welcomeSub;
        authSubmitBtn.innerHTML = `<span>${t.loginBtn}</span> <i class="fa-solid fa-arrow-right-to-bracket"></i>`;
        switchPrompt.textContent = t.noAccount;
        switchModeLink.textContent = t.registerLink;
    } else {
        authTitle.textContent = t.regTitle;
        authSubtitleText.textContent = t.regSub;
        authSubmitBtn.innerHTML = `<span>${t.registerBtn}</span> <i class="fa-solid fa-user-plus"></i>`;
        switchPrompt.textContent = t.hasAccount;
        switchModeLink.textContent = t.loginLink;
    }
}

tabLogin.addEventListener("click", () => setAuthMode(true));
tabRegister.addEventListener("click", () => setAuthMode(false));
switchModeLink.addEventListener("click", (e) => {
    e.preventDefault();
    setAuthMode(!isLoginMode);
});

document.getElementById("back-to-login").addEventListener("click", (e) => {
    e.preventDefault();
    verifySection.classList.add("hidden");
    authSection.classList.remove("hidden");
    setAuthMode(true);
});

authForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const t = translations[currentLang];
    authError.classList.add("hidden");
    authSuccess.classList.add("hidden");

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
        if (!isLoginMode) {
            authSubmitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> ${t.sendingEmail}`;
            const regRes = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!regRes.ok) {
                const errData = await regRes.json();
                throw new Error(errData.detail || "Ошибка регистрации");
            }

            document.getElementById("verify-email-display").textContent = email;
            authSection.classList.add("hidden");
            verifySection.classList.remove("hidden");
            setAuthMode(false);
            return;
        }

        const formData = new URLSearchParams();
        formData.append("username", email);
        formData.append("password", password);

        const loginRes = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formData
        });

        if (!loginRes.ok) {
            const errData = await loginRes.json();
            if (loginRes.status === 403) {
                document.getElementById("verify-email-display").textContent = email;
                authSection.classList.add("hidden");
                verifySection.classList.remove("hidden");
                return;
            }
            throw new Error(errData.detail || "Ошибка входа");
        }

        const data = await loginRes.json();
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("userEmail", email);
        document.getElementById("user-email-display").textContent = email;
        authForm.reset();
        showTasksSection();

    } catch (err) {
        authError.textContent = err.message;
        authError.classList.remove("hidden");
        setAuthMode(isLoginMode);
    }
});

verifyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    verifyError.classList.add("hidden");
    const t = translations[currentLang];

    const code = document.getElementById("verification-code").value.trim();
    const email = document.getElementById("verify-email-display").textContent;

    try {
        const res = await fetch(`${API_URL}/auth/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, code })
        });

        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.detail || "Неверный код");
        }

        verifySection.classList.add("hidden");
        authSection.classList.remove("hidden");
        setAuthMode(true);
        document.getElementById("email").value = email;
        authSuccess.textContent = t.verifiedSuccess;
        authSuccess.classList.remove("hidden");
        verifyForm.reset();

    } catch (err) {
        verifyError.textContent = err.message;
        verifyError.classList.remove("hidden");
    }
});

document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("token");
    document.body.className = "theme-earth";
    tasksSection.classList.add("hidden");
    authSection.classList.remove("hidden");
});

function showTasksSection() {
    authSection.classList.add("hidden");
    verifySection.classList.add("hidden");
    tasksSection.classList.remove("hidden");
    fetchTasks();
}

document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
        item.classList.add("active");

        const view = item.getAttribute("data-view");
        document.getElementById("view-tasks").classList.toggle("hidden", view !== "tasks");
        document.getElementById("view-calendar").classList.toggle("hidden", view !== "calendar");
        document.getElementById("view-stats").classList.toggle("hidden", view !== "stats");

        const logoIcon = document.getElementById("sidebar-logo-icon");
        if (view === "tasks") {
            document.body.className = "theme-earth";
            logoIcon.innerHTML = '<i class="fa-solid fa-check"></i>';
        } else if (view === "calendar") {
            document.body.className = "theme-sun";
            logoIcon.innerHTML = '<i class="fa-solid fa-sun"></i>';
            renderCalendar(currentTasks);
        } else if (view === "stats") {
            document.body.className = "theme-nebula";
            logoIcon.innerHTML = '<i class="fa-solid fa-check"></i>';
            renderStats(currentTasks);
        }
    });
});

document.getElementById("cal-add-btn").addEventListener("click", () => {
    document.querySelector('[data-view="tasks"]').click();
    document.getElementById("task-title").focus();
});

async function fetchTasks() {
    try {
        const res = await fetch(`${API_URL}/tasks/`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });
        if (res.status === 401) return document.getElementById("logout-btn").click();
        currentTasks = await res.json();
        syncTaskDates(currentTasks);
        renderTasks(currentTasks);
        renderCalendar(currentTasks);
        renderStats(currentTasks);
    } catch (e) {
        console.error("Ошибка загрузки задач:", e);
    }
}

function renderTasks(tasks) {
    const list = document.getElementById("tasks-list");
    const t = translations[currentLang];
    list.innerHTML = "";

    if (!tasks.length) {
        list.innerHTML = `<div class="glass-panel" style="padding: 28px; text-align: center; color: #94a3b8;">${t.emptyTasks}</div>`;
        return;
    }

    tasks.forEach(task => {
        const statusText = task.is_completed ? t.statusDone : t.statusProcess;
        const badgeClass = task.is_completed ? "badge-done" : "badge-process";

        list.innerHTML += `
            <div class="task-card ${task.is_completed ? "done" : ""}">
                <div class="task-left">
                    <div class="task-check" onclick="toggleTask(${task.id}, ${task.is_completed})">
                        ${task.is_completed ? '<i class="fa-solid fa-check"></i>' : ''}
                    </div>
                    <div class="task-texts">
                        <div class="task-title-line">
                            <span class="task-name">${task.title}</span>
                            <span class="badge-status ${badgeClass}" onclick="toggleTask(${task.id}, ${task.is_completed})">${statusText}</span>
                        </div>
                        ${task.description ? `<div class="task-desc-text">${task.description}</div>` : ""}
                    </div>
                </div>
                <button class="delete-btn" onclick="deleteTask(${task.id})">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
        `;
    });
}

function renderCalendar(tasks) {
    const grid = document.getElementById("calendar-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const t = translations[currentLang];
    const taskDates = syncTaskDates(tasks);

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const now = new Date();
    const todayYear = now.getFullYear();
    const todayMonth = now.getMonth();
    const todayDate = now.getDate();

    for (let i = 0; i < firstDayIndex; i++) {
        grid.innerHTML += `<div class="cal-cell empty"></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const cellDateKey = formatDateKey(year, month, day);
        const isToday = (year === todayYear && month === todayMonth && day === todayDate);

        let chipsHtml = "";
        tasks.forEach(task => {
            if (taskDates[task.id] === cellDateKey) {
                const cls = task.is_completed ? "done" : "proc";
                const statusLabel = task.is_completed ? t.statusDone : t.statusProcess;
                const icon = task.is_completed ? "✅" : "⏳";
                chipsHtml += `
                    <div class="cal-chip ${cls}" onclick="toggleTask(${task.id}, ${task.is_completed})" title="${task.title}">
                        <span class="cal-chip-title">${icon} ${task.title}</span>
                        <span class="cal-chip-status">${statusLabel}</span>
                    </div>
                `;
            }
        });

        grid.innerHTML += `
            <div class="cal-cell ${isToday ? "today" : ""}">
                <div class="cal-num">${day}</div>
                <div class="cal-chips-container">${chipsHtml}</div>
            </div>
        `;
    }

    const totalCells = firstDayIndex + daysInMonth;
    const trailingEmpty = (7 - (totalCells % 7)) % 7;
    for (let i = 0; i < trailingEmpty; i++) {
        grid.innerHTML += `<div class="cal-cell empty"></div>`;
    }
}

function renderStats(tasks) {
    const total = tasks.length;
    const done = tasks.filter(t => t.is_completed).length;
    const progress = total - done;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;

    document.getElementById("stat-total").textContent = total;
    document.getElementById("stat-done").textContent = done;
    document.getElementById("stat-progress").textContent = progress;
    document.getElementById("stat-overdue").textContent = 0;
    document.getElementById("stat-percent").textContent = `${percent}%`;

    const offset = 402 - (402 * percent) / 100;
    document.getElementById("ring-circle").style.strokeDashoffset = offset;

    document.getElementById("bar-done").style.width = `${percent}%`;
    document.getElementById("bar-progress").style.width = `${total > 0 ? 100 - percent : 0}%`;
}

document.getElementById("task-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("task-title").value.trim();
    const description = document.getElementById("task-desc").value.trim();

    const res = await fetch(`${API_URL}/tasks/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ title, description })
    });

    if (res.ok) {
        const newTask = await res.json();
        const map = JSON.parse(localStorage.getItem("taskDateMap") || "{}");
        map[newTask.id] = getTodayKey();
        localStorage.setItem("taskDateMap", JSON.stringify(map));
    }

    document.getElementById("task-form").reset();
    fetchTasks();
});

async function toggleTask(id, isCompleted) {
    await fetch(`${API_URL}/tasks/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ is_completed: !isCompleted })
    });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });
    fetchTasks();
}

const deleteAccountBtn = document.getElementById("delete-account-btn");
if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener("click", async () => {
        const confirmMsg = currentLang === "uk" 
            ? "Ви дійсно бажаєте видалити свій акаунт та всі завдання?" 
            : currentLang === "en" 
            ? "Are you sure you want to permanently delete your account and all tasks?" 
            : "Вы действительно хотите удалить свой аккаунт и все задачи?";

        if (!confirm(confirmMsg)) return;

        try {
            const res = await fetch(`${API_URL}/auth/delete-account`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.detail || "Ошибка при удалении аккаунта");
            }

            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
            tasksSection.classList.add("hidden");
            authSection.classList.remove("hidden");
            document.body.className = "theme-earth";

            alert(currentLang === "uk" ? "Акаунт успішно видалено" : currentLang === "en" ? "Account deleted" : "Аккаунт успешно удален");

        } catch (e) {
            alert(e.message);
        }
    });
}
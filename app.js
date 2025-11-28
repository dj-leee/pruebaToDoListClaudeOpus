/**
 * TaskFlow - Premium To-Do List Application
 * Vanilla JavaScript Implementation
 */

// ===== State Management =====
const State = {
  tasks: [],
  filter: 'all',
  searchQuery: '',
  selectedPriority: 'medium',
  theme: 'light',

  init() {
    this.tasks = Storage.get('tasks') || [];
    this.theme = Storage.get('theme') || 'light';
    return this;
  },

  save() {
    Storage.set('tasks', this.tasks);
  },

  addTask(text, priority) {
    const task = {
      id: Utils.generateId(),
      text: text.trim(),
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    this.tasks.unshift(task);
    this.save();
    return task;
  },

  updateTask(id, updates) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      Object.assign(task, updates);
      this.save();
    }
    return task;
  },

  deleteTask(id) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index > -1) {
      this.tasks.splice(index, 1);
      this.save();
      return true;
    }
    return false;
  },

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.save();
    }
    return task;
  },

  completeAll() {
    this.tasks.forEach(task => task.completed = true);
    this.save();
  },

  clearCompleted() {
    this.tasks = this.tasks.filter(t => !t.completed);
    this.save();
  },

  getFilteredTasks() {
    return this.tasks.filter(task => {
      const matchesFilter =
        this.filter === 'all' ||
        (this.filter === 'completed' && task.completed) ||
        (this.filter === 'pending' && !task.completed);

      const matchesSearch = task.text
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  },

  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pending, progress };
  }
};

// ===== Storage Helper =====
const Storage = {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(`taskflow_${key}`));
    } catch {
      return null;
    }
  },

  set(key, value) {
    localStorage.setItem(`taskflow_${key}`, JSON.stringify(value));
  }
};

// ===== Utility Functions =====
const Utils = {
  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  formatDate(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Ahora mismo';
    if (minutes < 60) return `Hace ${minutes} min`;
    if (hours < 24) return `Hace ${hours}h`;
    if (days < 7) return `Hace ${days} días`;
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  },

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  }
};

// ===== DOM Elements =====
const DOM = {
  // Form
  taskForm: document.getElementById('taskForm'),
  taskInput: document.getElementById('taskInput'),
  priorityBtns: document.querySelectorAll('.priority-btn'),

  // Filters & Search
  filterBtns: document.querySelectorAll('.filter-btn'),
  searchInput: document.getElementById('searchInput'),
  clearSearch: document.getElementById('clearSearch'),

  // Task List
  taskList: document.getElementById('taskList'),
  emptyState: document.getElementById('emptyState'),

  // Stats
  totalTasks: document.getElementById('totalTasks'),
  completedTasks: document.getElementById('completedTasks'),
  pendingTasks: document.getElementById('pendingTasks'),
  progressBar: document.getElementById('progressBar'),
  progressText: document.getElementById('progressText'),

  // Actions
  bulkActions: document.getElementById('bulkActions'),
  completeAllBtn: document.getElementById('completeAllBtn'),
  clearCompletedBtn: document.getElementById('clearCompletedBtn'),

  // Theme
  themeToggle: document.getElementById('themeToggle'),

  // Toast & Modal
  toastContainer: document.getElementById('toastContainer'),
  modalOverlay: document.getElementById('modalOverlay'),
  modalMessage: document.getElementById('modalMessage'),
  modalConfirm: document.getElementById('modalConfirm'),
  modalCancel: document.getElementById('modalCancel'),
};

// ===== UI Renderer =====
const UI = {
  renderTasks() {
    const tasks = State.getFilteredTasks();

    if (tasks.length === 0) {
      DOM.taskList.innerHTML = '';
      DOM.emptyState.classList.add('visible');
      return;
    }

    DOM.emptyState.classList.remove('visible');

    DOM.taskList.innerHTML = tasks.map(task => `
      <li class="task-item ${task.completed ? 'completed' : ''}"
          data-id="${task.id}"
          data-priority="${task.priority}">
        <label class="checkbox-wrapper">
          <input type="checkbox" ${task.completed ? 'checked' : ''}>
          <span class="checkmark"><i class="fas fa-check"></i></span>
        </label>
        <div class="task-content">
          <span class="task-text">${Utils.escapeHtml(task.text)}</span>
          <div class="task-meta">
            <span><i class="far fa-clock"></i>${Utils.formatDate(task.createdAt)}</span>
          </div>
        </div>
        <div class="task-actions">
          <button class="action-btn edit" title="Editar">
            <i class="fas fa-pen"></i>
          </button>
          <button class="action-btn delete" title="Eliminar">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </li>
    `).join('');
  },

  renderStats() {
    const stats = State.getStats();

    DOM.totalTasks.textContent = stats.total;
    DOM.completedTasks.textContent = stats.completed;
    DOM.pendingTasks.textContent = stats.pending;
    DOM.progressBar.setAttribute('stroke-dasharray', `${stats.progress}, 100`);
    DOM.progressText.textContent = `${stats.progress}%`;

    // Show/hide bulk actions
    DOM.bulkActions.classList.toggle('visible', stats.total > 0);
  },

  setActiveFilter(filter) {
    DOM.filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
  },

  setActivePriority(priority) {
    DOM.priorityBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.priority === priority);
    });
  },

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = DOM.themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  },

  showToast(message, type = 'success') {
    const icons = {
      success: 'fa-check-circle',
      error: 'fa-times-circle',
      warning: 'fa-exclamation-circle'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="fas ${icons[type]}"></i>
      <span class="toast-message">${message}</span>
    `;

    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  showModal(message) {
    return new Promise((resolve) => {
      DOM.modalMessage.textContent = message;
      DOM.modalOverlay.classList.add('visible');

      const handleConfirm = () => {
        cleanup();
        resolve(true);
      };

      const handleCancel = () => {
        cleanup();
        resolve(false);
      };

      const cleanup = () => {
        DOM.modalOverlay.classList.remove('visible');
        DOM.modalConfirm.removeEventListener('click', handleConfirm);
        DOM.modalCancel.removeEventListener('click', handleCancel);
      };

      DOM.modalConfirm.addEventListener('click', handleConfirm);
      DOM.modalCancel.addEventListener('click', handleCancel);
    });
  },

  render() {
    this.renderTasks();
    this.renderStats();
  }
};

// ===== Event Handlers =====
const Handlers = {
  handleSubmit(e) {
    e.preventDefault();
    const text = DOM.taskInput.value.trim();

    if (!text) {
      UI.showToast('Por favor, escribe una tarea', 'warning');
      DOM.taskInput.focus();
      return;
    }

    State.addTask(text, State.selectedPriority);
    DOM.taskInput.value = '';
    UI.render();
    UI.showToast('Tarea añadida correctamente', 'success');
  },

  handlePrioritySelect(e) {
    const btn = e.target.closest('.priority-btn');
    if (!btn) return;

    State.selectedPriority = btn.dataset.priority;
    UI.setActivePriority(State.selectedPriority);
  },

  handleFilterSelect(e) {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    State.filter = btn.dataset.filter;
    UI.setActiveFilter(State.filter);
    UI.renderTasks();
  },

  handleSearch: Utils.debounce((e) => {
    State.searchQuery = e.target.value;
    DOM.clearSearch.classList.toggle('visible', State.searchQuery.length > 0);
    UI.renderTasks();
  }, 300),

  handleClearSearch() {
    DOM.searchInput.value = '';
    State.searchQuery = '';
    DOM.clearSearch.classList.remove('visible');
    UI.renderTasks();
  },

  handleTaskClick(e) {
    const taskItem = e.target.closest('.task-item');
    if (!taskItem) return;

    const taskId = taskItem.dataset.id;

    // Toggle complete
    if (e.target.closest('.checkbox-wrapper')) {
      State.toggleTask(taskId);
      UI.render();
      return;
    }

    // Delete
    if (e.target.closest('.delete')) {
      taskItem.classList.add('removing');
      setTimeout(() => {
        State.deleteTask(taskId);
        UI.render();
        UI.showToast('Tarea eliminada', 'success');
      }, 300);
      return;
    }

    // Edit
    if (e.target.closest('.edit')) {
      const task = State.tasks.find(t => t.id === taskId);
      if (task) {
        const newText = prompt('Editar tarea:', task.text);
        if (newText && newText.trim()) {
          State.updateTask(taskId, { text: newText.trim() });
          UI.render();
          UI.showToast('Tarea actualizada', 'success');
        }
      }
    }
  },

  async handleCompleteAll() {
    const confirmed = await UI.showModal('¿Marcar todas las tareas como completadas?');
    if (confirmed) {
      State.completeAll();
      UI.render();
      UI.showToast('Todas las tareas completadas', 'success');
    }
  },

  async handleClearCompleted() {
    const completedCount = State.tasks.filter(t => t.completed).length;
    if (completedCount === 0) {
      UI.showToast('No hay tareas completadas', 'warning');
      return;
    }

    const confirmed = await UI.showModal(`¿Eliminar ${completedCount} tareas completadas?`);
    if (confirmed) {
      State.clearCompleted();
      UI.render();
      UI.showToast('Tareas completadas eliminadas', 'success');
    }
  },

  handleThemeToggle() {
    State.theme = State.theme === 'light' ? 'dark' : 'light';
    Storage.set('theme', State.theme);
    UI.applyTheme(State.theme);
  }
};

// ===== Initialize Application =====
function init() {
  // Initialize state
  State.init();

  // Apply saved theme
  UI.applyTheme(State.theme);

  // Initial render
  UI.render();

  // Event listeners
  DOM.taskForm.addEventListener('submit', Handlers.handleSubmit);
  DOM.priorityBtns.forEach(btn => btn.addEventListener('click', Handlers.handlePrioritySelect));
  DOM.filterBtns.forEach(btn => btn.addEventListener('click', Handlers.handleFilterSelect));
  DOM.searchInput.addEventListener('input', Handlers.handleSearch);
  DOM.clearSearch.addEventListener('click', Handlers.handleClearSearch);
  DOM.taskList.addEventListener('click', Handlers.handleTaskClick);
  DOM.completeAllBtn.addEventListener('click', Handlers.handleCompleteAll);
  DOM.clearCompletedBtn.addEventListener('click', Handlers.handleClearCompleted);
  DOM.themeToggle.addEventListener('click', Handlers.handleThemeToggle);

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && e.target !== DOM.taskInput && e.target !== DOM.searchInput) {
      e.preventDefault();
      DOM.searchInput.focus();
    }
  });
}

// Start the app
document.addEventListener('DOMContentLoaded', init);

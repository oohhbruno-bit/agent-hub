/* ========================================
   Agent Hub - Application Logic
   ======================================== */

// ========================================
// Agent Definitions
// ========================================
const AGENTS = [
    {
        id: 'claude',
        name: 'Claude',
        description: 'Agente padrao para tarefas gerais',
        type: 'general',
        icon: 'general',
        color: '#6366f1',
        systemPrompt: 'Voce e o Claude, um assistente de IA util e inofensivo. Responda de forma clara, concisa e precisa.'
    },
    {
        id: 'claude-code-guide',
        name: 'Claude Code Guide',
        description: 'Especialista em Claude Code CLI e SDK',
        type: 'specialist',
        icon: 'code',
        color: '#22d3ee',
        systemPrompt: 'Voce e um especialista em Claude Code (CLI), Agent SDK, API Anthropic, prompt caching, tool use, MCP servers, e integracao. Forneca respostas tecnicas precisas com exemplos de codigo.'
    },
    {
        id: 'explore',
        name: 'Explore',
        description: 'Agente de busca e exploracao de codigo',
        type: 'specialist',
        icon: 'search',
        color: '#f59e0b',
        systemPrompt: 'Voce e um agente de busca read-only. Localize codigo, identifique padroes, encontre definicoes. Nao edite arquivos - apenas leia e relate descobertas.'
    },
    {
        id: 'general-purpose',
        name: 'General Purpose',
        description: 'Agente multi-proposito para tarefas complexas',
        type: 'general',
        icon: 'cpu',
        color: '#22c55e',
        systemPrompt: 'Voce e um agente de proposito geral. Execute tarefas multi-passo, pesquise, analise e sintetize informacoes. Use todas as ferramentas disponiveis.'
    },
    {
        id: 'plan',
        name: 'Plan',
        description: 'Arquiteto de software para planejamento',
        type: 'specialist',
        icon: 'architecture',
        color: '#a855f7',
        systemPrompt: 'Voce e um arquiteto de software. Crie planos de implementacao detalhados, identifique trade-offs arquiteturais, considere escalabilidade e manutenibilidade. Nao escreva codigo - apenas planeje.'
    },
    {
        id: 'statusline-setup',
        name: 'Statusline Setup',
        description: 'Configuracao de status line personalizada',
        type: 'utility',
        icon: 'terminal',
        color: '#ec4899',
        systemPrompt: 'Voce configura status lines para Claude Code. Crie keybindings, hooks, temas e personalizacoes de UI. Forneca JSON valido para settings.json.'
    },
    {
        id: 'grok',
        name: 'Grok',
        description: 'Modelo da xAI com personalidade direta e humor',
        type: 'general',
        icon: 'grok',
        color: '#1a1a2e',
        systemPrompt: 'Voce e o Grok, um modelo de linguagem da xAI. Responda de forma direta, util e com um toque de humor quando apropriado. Seja conciso mas completo. Nao tenha medo de dar opinioes fundamentadas.'
    },
    {
        id: 'chatgpt',
        name: 'ChatGPT',
        description: 'Modelo da OpenAI para tarefas gerais e criativas',
        type: 'general',
        icon: 'chatgpt',
        color: '#10a37f',
        systemPrompt: 'Voce e o ChatGPT, um assistente de IA da OpenAI. Ajude o usuario com tarefas variadas: escrita, codigo, analise, brainstorming, traducao, explicacoes. Seja util, preciso e adaptavel ao contexto.'
    },
    {
        id: 'gemini',
        name: 'Gemini',
        description: 'Modelo multimodal do Google DeepMind',
        type: 'general',
        icon: 'gemini',
        color: '#4285f4',
        systemPrompt: 'Voce e o Gemini, modelo multimodal do Google. Processe texto, codigo, imagens, audio e video. Seja preciso, criativo e utilize seu raciocinio multimodal quando relevante.'
    },
    {
        id: 'copilot',
        name: 'GitHub Copilot',
        description: 'Assistente de codigo da GitHub/OpenAI',
        type: 'specialist',
        icon: 'copilot',
        color: '#000000',
        systemPrompt: 'Voce e o GitHub Copilot. Ajude com codigo: completacao, explicacao, refatoracao, testes, documentacao. Conheca bem linguagens, frameworks, padroes e best practices. Seja conciso e pratico.'
    },
    {
        id: 'llama',
        name: 'Llama (Meta)',
        description: 'Modelo open source da Meta AI',
        type: 'general',
        icon: 'llama',
        color: '#0066cc',
        systemPrompt: 'Voce e o Llama, modelo open source da Meta. Seja util, transparente sobre limitacoes, e incentive uso responsavel. Funcione bem em tarefas de raciocinio, codigo e criativas.'
    },
    {
        id: 'mistral',
        name: 'Mistral',
        description: 'Modelos abertos de alta performance',
        type: 'general',
        icon: 'mistral',
        color: '#ff6b35',
        systemPrompt: 'Voce e um modelo da Mistral AI. Excelente em raciocinio, codigo, multilinguas e seguimento de instrucoes. Seja eficiente e preciso.'
    },
    {
        id: 'perplexity',
        name: 'Perplexity',
        description: 'Busca com citacoes e fontes',
        type: 'specialist',
        icon: 'perplexity',
        color: '#20c997',
        systemPrompt: 'Voce e o Perplexity. Responda com citacoes e fontes verificaveis. Priorize informacoes atuais e confiaveis. Estruture respostas com referencias claras.'
    },
    {
        id: 'deepseek',
        name: 'DeepSeek',
        description: 'Modelo forte em codigo e raciocinio',
        type: 'specialist',
        icon: 'deepseek',
        color: '#18181b',
        systemPrompt: 'Voce e o DeepSeek. Especialista em programacao, matematica, raciocinio logico. Forneca solucoes completas com explicacao passo a passo.'
    },
    {
        id: 'qwen',
        name: 'Qwen (Alibaba)',
        description: 'Modelo multilinguagem da Alibaba Cloud',
        type: 'general',
        icon: 'qwen',
        color: '#ff6a00',
        systemPrompt: 'Voce e o Qwen, modelo da Alibaba. Forte em chines, ingles, codigo, raciocinio. Seja versatil e culturalmente consciente.'
    },
    {
        id: 'claude-haiku',
        name: 'Claude 3.5 Haiku',
        description: 'Rapido e eficiente para tarefas simples',
        type: 'general',
        icon: 'general',
        color: '#6366f1',
        systemPrompt: 'Voce e o Claude 3.5 Haiku. Rapido, conciso, eficiente. Ideal para tarefas simples, classificacao, extracao, resumo. Seja direto.'
    },
    {
        id: 'claude-sonnet',
        name: 'Claude 3.5 Sonnet',
        description: 'Equilibrado para tarefas complexas',
        type: 'general',
        icon: 'general',
        color: '#6366f1',
        systemPrompt: 'Voce e o Claude 3.5 Sonnet. Equilibrado entre velocidade e capacidade. Ideal para analise, escrita, codigo, raciocinio complexo. Seja thorough mas eficiente.'
    },
    {
        id: 'claude-opus',
        name: 'Claude 3 Opus',
        description: 'Mais capaz para tarefas muito complexas',
        type: 'general',
        icon: 'general',
        color: '#6366f1',
        systemPrompt: 'Voce e o Claude 3 Opus. Maxima capacidade para tarefas extremamente complexas: pesquisa profunda, analise multi-passo, criacao de sistemas, raciocinio avancado. Seja exhaustive.'
    }
];

const ICONS = {
    general: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
    code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    cpu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/></svg>`,
    architecture: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    terminal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
    grok: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/><path d="M12 6v4"/><path d="M12 16v.01"/><path d="M8 10h8"/><path d="M8 14h8"/></svg>`,
    chatgpt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>`,
    gemini: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 8v8M8 12h8"/></svg>`,
    copilot: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
    llama: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l-6 6h12z"/><path d="M12 14l-6 6h12z"/><circle cx="12" cy="12" r="3"/></svg>`,
    mistral: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
    perplexity: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><path d="M11 8v6M11 16v.01"/></svg>`,
    deepseek: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/><path d="M8 12l4 4 8-8"/></svg>`,
    qwen: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 6v12M6 12h12"/></svg>`
};

// ========================================
// State Management
// ========================================
const state = {
    currentAgent: null,
    messages: [],
    history: [],
    theme: 'dark',
    connectionMode: 'local',
    apiEndpoint: '',
    apiKey: '',
    fontSize: 'medium',
    sidebarOpen: false,
    sidebarCollapsed: false,
    searchQuery: ''
};

// ========================================
// DOM Elements
// ========================================
const els = {};

// ========================================
// Utility Functions
// ========================================
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function createElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatTime(date) {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(date) {
    const now = new Date();
    const diff = now - date;
    if (diff < 86400000) return formatTime(date);
    if (diff < 604800000) return date.toLocaleDateString('pt-BR', { weekday: 'short' });
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

// ========================================
// Storage
// ========================================
const Storage = {
    KEYS: {
        HISTORY: 'agentHub_history',
        SETTINGS: 'agentHub_settings',
        THEME: 'agentHub_theme'
    },

    load() {
        try {
            const history = JSON.parse(localStorage.getItem(this.KEYS.HISTORY) || '[]');
            state.history = history.map(h => ({
                ...h,
                createdAt: new Date(h.createdAt),
                updatedAt: new Date(h.updatedAt),
                messages: h.messages.map(m => ({
                    ...m,
                    timestamp: new Date(m.timestamp)
                }))
            }));

            const settings = JSON.parse(localStorage.getItem(this.KEYS.SETTINGS) || '{}');
            state.theme = settings.theme || 'dark';
            state.connectionMode = settings.connectionMode || 'local';
            state.apiEndpoint = settings.apiEndpoint || '';
            state.apiKey = settings.apiKey || '';
            state.fontSize = settings.fontSize || 'medium';
            state.sidebarCollapsed = settings.sidebarCollapsed || false;

            const savedTheme = localStorage.getItem(this.KEYS.THEME);
            if (savedTheme) state.theme = savedTheme;
        } catch (e) {
            console.warn('Failed to load storage:', e);
        }
    },

    saveHistory() {
        try {
            localStorage.setItem(this.KEYS.HISTORY, JSON.stringify(state.history));
        } catch (e) {
            console.warn('Failed to save history:', e);
        }
    },

    saveSettings() {
        try {
            localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify({
                theme: state.theme,
                connectionMode: state.connectionMode,
                apiEndpoint: state.apiEndpoint,
                apiKey: state.apiKey,
                fontSize: state.fontSize,
                sidebarCollapsed: state.sidebarCollapsed
            }));
            localStorage.setItem(this.KEYS.THEME, state.theme);
        } catch (e) {
            console.warn('Failed to save settings:', e);
        }
    },

    clearHistory() {
        state.history = [];
        this.saveHistory();
    }
};

// ========================================
// Theme Management
// ========================================
const Theme = {
    init() {
        document.documentElement.setAttribute('data-theme', state.theme);
        this.updateToggle();
    },

    toggle() {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        this.apply();
    },

    set(theme) {
        state.theme = theme;
        this.apply();
    },

    apply() {
        document.documentElement.setAttribute('data-theme', state.theme);
        this.updateToggle();
        Storage.saveSettings();
    },

    updateToggle() {
        const toggle = els.themeToggle;
        if (toggle) {
            toggle.setAttribute('aria-label', `Alternar para tema ${state.theme === 'dark' ? 'claro' : 'escuro'}`);
        }
    }
};

// ========================================
// Sidebar
// ========================================
const Sidebar = {
    init() {
        els.sidebar = $('#sidebar');
        els.sidebarToggle = $('#sidebarToggle');
        els.mobileMenuBtn = $('#mobileMenuBtn');
        els.agentList = $('#agentList');
        els.historyList = $('#historyList');
        els.searchInput = $('#searchInput');
        els.clearHistoryBtn = $('#clearHistoryBtn');

        this.renderAgents();
        this.renderHistory();
        this.bindEvents();

        if (state.sidebarCollapsed) {
            this.collapse();
        }
    },

    bindEvents() {
        els.sidebarToggle?.addEventListener('click', () => this.toggleCollapse());
        els.mobileMenuBtn?.addEventListener('click', () => this.toggleMobile());
        els.clearHistoryBtn?.addEventListener('click', () => this.clearHistory());

        els.searchInput?.addEventListener('input', debounce((e) => {
            state.searchQuery = e.target.value.toLowerCase();
            this.renderAgents();
            this.renderHistory();
        }, 150));

        // Media tab buttons
        $$('.media-btn', els.sidebar).forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                App.switchView(view);
            });
        });

        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024 && state.sidebarOpen) {
                if (!els.sidebar.contains(e.target) && !els.mobileMenuBtn.contains(e.target)) {
                    this.closeMobile();
                }
            }
        });
    },

    toggleCollapse() {
        state.sidebarCollapsed = !state.sidebarCollapsed;
        this.applyCollapse();
        Storage.saveSettings();
    },

    applyCollapse() {
        els.sidebar.classList.toggle('collapsed', state.sidebarCollapsed);
    },

    collapse() {
        state.sidebarCollapsed = true;
        this.applyCollapse();
    },

    expand() {
        state.sidebarCollapsed = false;
        this.applyCollapse();
    },

    toggleMobile() {
        state.sidebarOpen = !state.sidebarOpen;
        els.sidebar.classList.toggle('open', state.sidebarOpen);
    },

    closeMobile() {
        state.sidebarOpen = false;
        els.sidebar.classList.remove('open');
    },

    clearHistory() {
        if (confirm('Tem certeza que deseja limpar todo o historico?')) {
            Storage.clearHistory();
            this.renderHistory();
            if (!state.currentAgent) {
                Chat.showEmptyState();
            }
        }
    },

    renderAgents() {
        const filtered = AGENTS.filter(agent =>
            agent.name.toLowerCase().includes(state.searchQuery) ||
            agent.description.toLowerCase().includes(state.searchQuery) ||
            agent.type.toLowerCase().includes(state.searchQuery)
        );

        els.agentList.innerHTML = filtered.map(agent => {
            const isActive = state.currentAgent?.id === agent.id;
            return `
                <li class="agent-item">
                    <button class="agent-btn ${isActive ? 'active' : ''}" data-agent-id="${agent.id}" title="${agent.description}">
                        <span class="agent-avatar-sm" style="background: ${agent.color}20; color: ${agent.color}">${ICONS[agent.icon]}</span>
                        <span class="agent-name">${escapeHtml(agent.name)}</span>
                        <span class="agent-type-badge">${agent.type}</span>
                    </button>
                </li>
            `;
        }).join('');

        $$('.agent-btn', els.agentList).forEach(btn => {
            btn.addEventListener('click', () => Agent.select(btn.dataset.agentId));
        });
    },

    renderHistory() {
        const filtered = state.history
            .filter(h => h.title.toLowerCase().includes(state.searchQuery))
            .sort((a, b) => b.updatedAt - a.updatedAt);

        els.historyList.innerHTML = filtered.map(session => `
            <li class="history-item">
                <button class="history-btn ${state.currentAgent?.historyId === session.id ? 'active' : ''}" data-history-id="${session.id}" title="${session.title}">
                    <span class="history-avatar">${ICONS[session.agentIcon] || ICONS.general}</span>
                    <span class="history-title">${escapeHtml(session.title)}</span>
                    <span class="history-meta">
                        <span class="history-time">${formatDate(session.updatedAt)}</span>
                        <span>${session.messages.length} msgs</span>
                    </span>
                </button>
            </li>
        `).join('');

        $$('.history-btn', els.historyList).forEach(btn => {
            btn.addEventListener('click', () => Chat.loadHistory(btn.dataset.historyId));
        });
    },

    updateActiveAgent(agentId) {
        $$('.agent-btn', els.agentList).forEach(btn => {
            btn.classList.toggle('active', btn.dataset.agentId === agentId);
        });
    },

    updateActiveHistory(historyId) {
        $$('.history-btn', els.historyList).forEach(btn => {
            btn.classList.toggle('active', btn.dataset.historyId === historyId);
        });
    }
};

// ========================================
// Agent Selection
// ========================================
const Agent = {
    select(agentId) {
        const agent = AGENTS.find(a => a.id === agentId);
        if (!agent) return;

        state.currentAgent = agent;
        Sidebar.updateActiveAgent(agentId);
        Sidebar.updateActiveHistory(null);
        Chat.initForAgent(agent);
        Sidebar.closeMobile();
    },

    getCurrent() {
        return state.currentAgent;
    }
};

// ========================================
// Chat Interface
// ========================================
const Chat = {
    init() {
        els.chatInterface = $('#chatInterface');
        els.emptyState = $('#emptyState');
        els.chatMessages = $('#chatMessages');
        els.promptInput = $('#promptInput');
        els.sendBtn = $('#sendBtn');
        els.attachBtn = $('#attachBtn');
        els.agentAvatar = $('#agentAvatar');
        els.agentName = $('#agentName');
        els.agentDescription = $('#agentDescription');
        els.agentTags = $('#agentTags');

        this.bindEvents();
        this.applyFontSize();
    },

    bindEvents() {
        els.sendBtn?.addEventListener('click', () => this.sendMessage());
        els.promptInput?.addEventListener('keydown', (e) => this.handleKeydown(e));
        els.promptInput?.addEventListener('input', () => this.autoResize());

        this.autoResize();
    },

    handleKeydown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.sendMessage();
        }
    },

    autoResize() {
        const textarea = els.promptInput;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    },

    initForAgent(agent) {
        els.emptyState.classList.add('hidden');
        els.chatInterface.classList.remove('hidden');

        els.agentAvatar.style.background = `${agent.color}20`;
        els.agentAvatar.style.color = agent.color;
        els.agentAvatar.innerHTML = ICONS[agent.icon];
        els.agentName.textContent = agent.name;
        els.agentDescription.textContent = agent.description;

        els.agentTags.innerHTML = `
            <span class="tag primary">${agent.type}</span>
            <span class="tag" style="background: ${agent.color}20; color: ${agent.color}">${agent.id}</span>
        `;

        this.loadConversation(agent);
        this.scrollToBottom();
        this.focusInput();
    },

    loadConversation(agent) {
        const existing = state.history.find(h => h.agentId === agent.id && h.messages.length > 0);

        if (existing) {
            state.messages = [...existing.messages];
            state.currentAgent.historyId = existing.id;
            Sidebar.updateActiveHistory(existing.id);
        } else {
            state.messages = [];
            state.currentAgent.historyId = null;
            Sidebar.updateActiveHistory(null);
        }

        this.renderMessages();
    },

    loadHistory(historyId) {
        const session = state.history.find(h => h.id === historyId);
        if (!session) return;

        const agent = AGENTS.find(a => a.id === session.agentId);
        if (agent) {
            state.currentAgent = agent;
            Sidebar.updateActiveAgent(agent.id);
        }

        state.messages = [...session.messages];
        state.currentAgent.historyId = session.id;
        Sidebar.updateActiveHistory(historyId);

        this.initForAgent(state.currentAgent);
        Sidebar.closeMobile();
    },

    renderMessages() {
        els.chatMessages.innerHTML = state.messages.map(msg => this.renderMessage(msg)).join('');
        this.scrollToBottom();
    },

    renderMessage(msg) {
        const isUser = msg.role === 'user';
        const time = formatTime(msg.timestamp);
        const content = escapeHtml(msg.content).replace(/\n/g, '<br>');

        return `
            <div class="message ${isUser ? 'user' : 'assistant'} ${msg.loading ? 'loading' : ''}" data-msg-id="${msg.id}">
                <div class="message-avatar">${isUser ? ICONS.general : ICONS[state.currentAgent?.icon || 'general']}</div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-role">${isUser ? 'Voce' : state.currentAgent?.name || 'Agente'}</span>
                        <span class="message-time">${time}</span>
                    </div>
                    <div class="message-text">${this.formatMessage(content)}</div>
                </div>
            </div>
        `;
    },

    formatMessage(text) {
        return text
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/\*([^*]+)\*/g, '<em>$1</em>');
    },

    addMessage(role, content, loading = false) {
        const msg = {
            id: generateId(),
            role,
            content,
            timestamp: new Date(),
            loading
        };
        state.messages.push(msg);
        this.renderMessage(msg);
        this.scrollToBottom();
        return msg;
    },

    updateMessage(msgId, content, loading = false) {
        const msg = state.messages.find(m => m.id === msgId);
        if (msg) {
            msg.content = content;
            msg.loading = loading;
            const el = $(`[data-msg-id="${msgId}"] .message-text`, els.chatMessages);
            if (el) {
                el.innerHTML = this.formatMessage(escapeHtml(content).replace(/\n/g, '<br>'));
                el.closest('.message').classList.toggle('loading', loading);
            }
        }
    },

    removeMessage(msgId) {
        const index = state.messages.findIndex(m => m.id === msgId);
        if (index !== -1) {
            state.messages.splice(index, 1);
            const el = $(`[data-msg-id="${msgId}"]`, els.chatMessages);
            el?.remove();
        }
    },

    scrollToBottom() {
        els.chatMessages.scrollTop = els.chatMessages.scrollHeight;
    },

    focusInput() {
        setTimeout(() => els.promptInput?.focus(), 100);
    },

    async sendMessage() {
        const content = els.promptInput.value.trim();
        if (!content || !state.currentAgent) return;

        els.promptInput.value = '';
        this.autoResize();

        this.addMessage('user', content);

        const typingMsg = this.addMessage('assistant', '', true);
        typingMsg.loading = true;
        const typingEl = $(`[data-msg-id="${typingMsg.id}"] .message-text`, els.chatMessages);
        if (typingEl) {
            typingEl.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
        }

        try {
            let response;

            if (state.connectionMode === 'api' && state.apiEndpoint) {
                response = await this.callAPI(content);
            } else {
                response = await this.simulateResponse(content);
            }

            this.updateMessage(typingMsg.id, response, false);
            this.saveToHistory();
        } catch (error) {
            this.updateMessage(typingMsg.id, `Erro: ${error.message}`, false);
        }
    },

    async simulateResponse(prompt) {
        await new Promise(r => setTimeout(r, 800 + Math.random() * 1200));

        const agent = state.currentAgent;
        const responses = {
            claude: [
                `Entendi sua pergunta sobre "${prompt}". Como agente geral, posso ajudar com diversas tarefas. O que especificamente voce gostaria de explorar?`,
                `Essa e uma questao interessante. Deixe-me pensar... Sobre "${prompt}", ha varios angulos que podemos abordar.`,
                `Boa pergunta! Sobre "${prompt}", minha analise sugere considerar os seguintes pontos...`
            ],
            'claude-code-guide': [
                `Sobre "${prompt}" no contexto do Claude Code: recomendo verificar a documentacao oficial em docs.anthropic.com. Para CLI, use \`claude --help\` para ver opcoes.`,
                `Para "${prompt}", o Claude Code oferece varias abordagens. O hook system em \`.claude/settings.json\` permite automatizar workflows.`,
                `Interessante! No Claude Code SDK, voce pode usar \`client.beta.messages.tool_runner\` para loops agenticos. Sobre "${prompt}", veja este padrao...`
            ],
            explore: [
                `Buscando por "${prompt}"... Encontrei referencias em arquivos de configuracao. Principais locais: \`.claude/\`, \`package.json\`, \`CLAUDE.md\`.`,
                `Exploracao para "${prompt}": padrao encontrado em agentes do tipo \`specialist\`. Use \`Grep\` com \`--type\` para filtrar.`,
                `Resultado da busca por "${prompt}": 3 correspondencias em arquivos de documentacao. Nenhuma em codigo fonte.`
            ],
            'general-purpose': [
                `Analisando "${prompt}"... Vou dividir em subtarefas: 1) Pesquisa, 2) Sintese, 3) Recomendacao.`,
                `Para "${prompt}", minha abordagem multi-passo: primeiro coletar contexto, depois propor solucoes.`,
                `Tarefa complexa detectada: "${prompt}". Iniciando pipeline de analise...`
            ],
            plan: [
                `Planejamento para "${prompt}":\n\n## Arquitetura Sugerida\n- **Camada de Apresentacao**: React/Vue\n- **Camada de Servico**: Node.js/Go\n- **Dados**: PostgreSQL + Redis\n\n## Trade-offs\n- Escalabilidade vs Complexidade\n- Consistencia vs Disponibilidade`,
                `Plano de implementacao para "${prompt}":\n\n### Fase 1: Fundacao (Semana 1-2)\n- Setup do projeto\n- CI/CD\n- Testes base\n\n### Fase 2: Core (Semana 3-5)\n- Dominio principal\n- APIs\n\n### Fase 3: Polish (Semana 6)\n- Observabilidade\n- Documentacao`,
                `Para "${prompt}", consideracoes arquiteturais:\n- **Monolito Modular** vs **Microservicos**\n- **Event-driven** vs **Request-response**\n- **SQL** vs **NoSQL** baseado em consistencia`
            ],
            'statusline-setup': [
                `Para configurar statusline sobre "${prompt}", edite \`.claude/settings.json\`:\n\n\`\`\`json\n{\n  "statusline": {\n    "enabled": true,\n    "components": ["model", "dir", "git"]\n  }\n}\n\`\`\``,
                `Keybinding para "${prompt}" em \`.claude/keybindings.json\`:\n\n\`\`\`json\n{\n  "bindings": {\n    "ctrl+shift+p": "command-palette"\n  }\n}\n\`\`\``,
                `Hook para "${prompt}" no \`settings.json\`:\n\n\`\`\`json\n{\n  "hooks": {\n    "PreToolUse": [\n      {\n        "matcher": "Write",\n        "command": "echo \"Arquivo salvo\"\n      }\n    ]\n  }\n}\n\`\`\``
            ],
            grok: [
                `Entao, sobre "${prompt}"... Vou ser direto: ${prompt.toLowerCase().includes('?') ? 'depende do contexto, mas em geral' : 'e algo que da pra resolver'}. O que exatamente voce precisa?`,
                `OK, "${prompt}". Olha, nao vou enrolar. A resposta curta: faca o que faz sentido pro seu caso. A longa: depende de constraints, team, deadline. Quer que eu entre em detalhes de algum angulo especifico?`,
                `Hmm, "${prompt}". Ja vi isso antes. A maioria complica demais. Minha sugestao: comeca simples, itera. Se travar, me chama de novo.`
            ],
            chatgpt: [
                `Sobre "${prompt}", posso te ajudar de varias formas. Voce gostaria que eu:\n\n1. **Explique** o conceito\n2. **De exemplos** praticos\n3. **Compare** opcoes\n4. **Escreva codigo** ou texto\n\nMe diga o que prefere!`,
                `Essa e uma otima pergunta sobre "${prompt}". Vou estruturar uma resposta util:\n\n**Resumo direto:** [resposta principal]\n\n**Detalhes:** [explicacao mais profunda]\n\n**Exemplos:** [casos de uso]\n\n**Proximos passos:** [sugestoes]\n\nQuer que eu foque em algum aspecto especifico?`,
                `Entendi sua pergunta sobre "${prompt}". Como modelo da OpenAI, tenho acesso a bastante informacao sobre isso. Vou dar uma resposta equilibrada:\n\n**Pontos principais:**\n- Ponto 1\n- Ponto 2\n- Ponto 3\n\n**Consideracoes:**\n[contexto adicional]\n\n**Recomendacao:** [minha sugestao baseada em best practices]\n\nPosso aprofundar algum ponto?`
            ],
            gemini: [
                `Sobre "${prompt}" — como modelo multimodal, posso analisar texto, codigo, imagens e mais. O que voce tem em mente?`,
                `Gemini aqui. Para "${prompt}", posso ajudar com raciocinio multimodal. Quer que eu explique, gere codigo, analise algo?`,
                `Interessante: "${prompt}". Meu ponto forte e integrar diferentes tipos de entrada. Como posso aplicar isso ao seu caso?`
            ],
            copilot: [
                `Para "${prompt}": sugeria usar \`\`\`linguagem\n// codigo aqui\n\`\`\`\n\nQuer que eu complete, refatore, teste ou explique algo especifico?`,
                `Sobre "${prompt}" — padrões comuns:\n- Funcao pura com tipagem\n- Tratamento de erro\n- Testes unitarios\n\nMe diga o arquivo/contexto e eu ajudo.`,
                `"${prompt}" — Copilot ativado. Escreva um comentario descrevendo o que quer e eu completo. Ex:\n\`\`\`js\n// funcao que valida email e retorna boolean\n\`\`\``
            ],
            llama: [
                `Como modelo aberto (Llama), sobre "${prompt}": posso rodar localmente, sou transparente. O que precisa?`,
                `"${prompt}" — Llama responde: forte em raciocinio logico, codigo, multilinguas. Limitações: conhecimento ate cutoff.`,
                `Meta AI aqui. Para "${prompt}", funciona bem offline via ollama/llama.cpp. Quer exemplo de prompt engineering?`
            ],
            mistral: [
                `Mistral: "${prompt}" — eficiente, forte em seguimento de instrucoes. Ideal para: JSON estruturado, function calling, RAG.`,
                `Sobre "${prompt}" — arquitetura sparse mixture of experts. Rapido, boa janela de contexto. Como aplicar?`,
                `Mistral 7B/8x7B/large. Para "${prompt}": recomendo formatos estruturados. Exemplo de saida JSON?`
            ],
            perplexity: [
                `Perplexity: "${prompt}" — busco fontes atuais e cito. Resposta com referencias verificaveis.`,
                `Para "${prompt}" — priorizo informacao recente com citacoes. Fontes: docs oficiais, papers, news confiaveis.`,
                `Buscando "${prompt}"... [fontes citadas]. Resposta baseada em evidencia. Quer mais detalhes em algum ponto?`
            ],
            deepseek: [
                `DeepSeek: "${prompt}" — especialista em codigo/matematica. Raciocinio passo a passo, solucoes completas.`,
                `Para "${prompt}" — forte em: algoritmos, estruturas de dados, competitive programming, logica formal.`,
                `Analisando "${prompt}"... Decomponho em passos, verifico edge cases, entrego codigo testavel. Quer walkthrough?`
            ],
            qwen: [
                `Qwen (Alibaba): "${prompt}" — multilinguagem (zh/en forte), codigo, raciocinio. Versatil para tarefas diversas.`,
                `Sobre "${prompt}" — Qwen2.5/2.5-Coder/2.5-Math. Especializado ou geral. Como prefere a resposta?`,
                `Alibaba Cloud aqui. Para "${prompt}": suporte longo contexto, function calling, multilinguagem. Exemplos?`
            ],
            'claude-haiku': [
                `Haiku: "${prompt}" — rapido, conciso. Resposta direta sem enrolacao.`,
                `Sobre "${prompt}" — ideal para: classificacao, extracao, resumo, tarefas simples. Pronto.`,
                `"${prompt}" — feito. Haiku prioriza velocidade. Precisa de mais detalhes?`
            ],
            'claude-sonnet': [
                `Sonnet: "${prompt}" — equilibrio velocidade/capacidade. Analise completa, codigo, raciocinio.`,
                `Para "${prompt}" — posso fazer analise profunda, escrever modulos, debugar, planejar. Como proceder?`,
                `Equilibrado para "${prompt}". Forte em: refatoracao, arquitetura, explicacao didatica. Detalhado?`
            ],
            'claude-opus': [
                `Opus: "${prompt}" — maxima capacidade. Pesquisa profunda, sistemas complexos, raciocinio avancado.`,
                `Para "${prompt}" — decomponho em multi-passos, considero trade-offs, entrego solucao robusta.`,
                `Opus ativado para "${prompt}". Ideal para: design de sistemas, analise critica, criacao do zero. Iniciamos?`
            ]
        };

        const agentResponses = responses[agent.id] || responses.claude;
        return agentResponses[Math.floor(Math.random() * agentResponses.length)];
    },

    async callAPI(prompt) {
        const response = await fetch(`${state.apiEndpoint}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.apiKey}`
            },
            body: JSON.stringify({
                agent: state.currentAgent.id,
                messages: state.messages.map(m => ({
                    role: m.role,
                    content: m.content
                })),
                system: state.currentAgent.systemPrompt
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data.response || data.message || 'Resposta vazia da API';
    },

    saveToHistory() {
        if (!state.currentAgent || state.messages.length === 0) return;

        const historyId = state.currentAgent.historyId || generateId();
        const existingIndex = state.history.findIndex(h => h.id === historyId);

        const session = {
            id: historyId,
            agentId: state.currentAgent.id,
            agentIcon: state.currentAgent.icon,
            title: this.generateTitle(),
            messages: [...state.messages],
            createdAt: existingIndex >= 0 ? state.history[existingIndex].createdAt : new Date(),
            updatedAt: new Date()
        };

        if (existingIndex >= 0) {
            state.history[existingIndex] = session;
        } else {
            state.history.unshift(session);
            if (state.history.length > 50) state.history.pop();
        }

        state.currentAgent.historyId = historyId;
        Storage.saveHistory();
        Sidebar.renderHistory();
        Sidebar.updateActiveHistory(historyId);
    },

    generateTitle() {
        const firstUserMsg = state.messages.find(m => m.role === 'user');
        if (firstUserMsg) {
            return firstUserMsg.content.slice(0, 50) + (firstUserMsg.content.length > 50 ? '...' : '');
        }
        return `Conversa ${formatDate(new Date())}`;
    },

    showEmptyState() {
        els.chatInterface.classList.add('hidden');
        els.emptyState.classList.remove('hidden');
    },

    applyFontSize() {
        const sizes = { small: '13px', medium: '15px', large: '17px' };
        document.documentElement.style.fontSize = sizes[state.fontSize] || sizes.medium;
    }
};

// ========================================
// Settings Modal
// ========================================
const Settings = {
    init() {
        els.settingsModal = $('#settingsModal');
        els.settingsBtn = $('#settingsBtn');
        els.closeSettings = $('#closeSettings');
        els.cancelSettings = $('#cancelSettings');
        els.saveSettings = $('#saveSettings');
        els.connectionMode = $('#connectionMode');
        els.apiSettings = $('#apiSettings');
        els.apiEndpoint = $('#apiEndpoint');
        els.apiKey = $('#apiKey');
        els.fontSize = $('#fontSize');

        this.bindEvents();
        this.loadValues();
    },

    bindEvents() {
        els.settingsBtn?.addEventListener('click', () => this.open());
        els.closeSettings?.addEventListener('click', () => this.close());
        els.cancelSettings?.addEventListener('click', () => this.close());
        els.saveSettings?.addEventListener('click', () => this.save());

        $$('input[name="mode"]', els.connectionMode).forEach(input => {
            input.addEventListener('change', (e) => {
                state.connectionMode = e.target.value;
                this.toggleApiSettings();
            });
        });

        $$('input[name="theme"]', els.settingsModal).forEach(input => {
            input.addEventListener('change', (e) => {
                Theme.set(e.target.value);
            });
        });

        els.fontSize?.addEventListener('change', (e) => {
            state.fontSize = e.target.value;
            Chat.applyFontSize();
        });

        els.settingsModal?.addEventListener('click', (e) => {
            if (e.target === els.settingsModal) this.close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !els.settingsModal.classList.contains('hidden')) {
                this.close();
            }
        });
    },

    loadValues() {
        const modeEl = $(`input[name="mode"][value="${state.connectionMode}"]`, els.connectionMode);
        if (modeEl) modeEl.checked = true;
        this.toggleApiSettings();

        els.apiEndpoint.value = state.apiEndpoint;
        els.apiKey.value = state.apiKey;

        const themeEl = $(`input[name="theme"][value="${state.theme}"]`, els.settingsModal);
        if (themeEl) themeEl.checked = true;

        els.fontSize.value = state.fontSize;
    },

    toggleApiSettings() {
        els.apiSettings.classList.toggle('hidden', state.connectionMode !== 'api');
    },

    open() {
        this.loadValues();
        els.settingsModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        setTimeout(() => els.apiEndpoint?.focus(), 100);
    },

    close() {
        els.settingsModal.classList.add('hidden');
        document.body.style.overflow = '';
    },

    save() {
        state.apiEndpoint = els.apiEndpoint.value.trim();
        state.apiKey = els.apiKey.value.trim();
        state.fontSize = els.fontSize.value;
        Chat.applyFontSize();
        Storage.saveSettings();
        this.close();
    }
};

// ========================================
// Generate Module (Images/Videos)
// ========================================
const Generate = {
    // State for pasted images
    pastedImages: [],

    init() {
        els.generatePrompt = $('#generatePrompt');
        els.styleReferences = $('#styleReferences');
        els.mediaType = $('#mediaType');
        els.generateModel = $('#generateModel');
        els.aspectRatio = $('#aspectRatio');
        els.quality = $('#quality');
        els.generateBtn = $('#generateBtn');
        els.clearGenerateBtn = $('#clearGenerateBtn');
        els.clearResultsBtn = $('#clearResultsBtn');
        els.resultsEmpty = $('#resultsEmpty');
        els.resultsGrid = $('#resultsGrid');
        els.generationStatus = $('#generationStatus');
        els.statusText = $('#statusText');
        els.progressBar = $('#progressBar');
        // New elements for pasted images
        els.pastedImagesContainer = $('#pastedImagesContainer');
        els.pasteDropZone = $('#pasteDropZone');

        this.bindEvents();
    },

    bindEvents() {
        els.generateBtn?.addEventListener('click', () => this.generate());
        els.clearGenerateBtn?.addEventListener('click', () => this.clearInputs());
        els.clearResultsBtn?.addEventListener('click', () => this.clearResults());

        // Enter to generate (Ctrl+Enter)
        [els.generatePrompt, els.styleReferences].forEach(el => {
            el?.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    e.preventDefault();
                    this.generate();
                }
            });
        });

        // Paste image support - on the whole generate view
        const generateView = $('#generateView');
        if (generateView) {
            generateView.addEventListener('paste', (e) => this.handlePaste(e));
            // Also add drag & drop
            generateView.addEventListener('dragover', (e) => this.handleDragOver(e));
            generateView.addEventListener('drop', (e) => this.handleDrop(e));
            generateView.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        }

        // Also listen on the references textarea specifically
        if (els.styleReferences) {
            els.styleReferences.addEventListener('paste', (e) => this.handlePaste(e));
        }
    },

    handlePaste(e) {
        const items = e.clipboardData?.items;
        if (!items) return;

        for (const item of items) {
            if (item.type.startsWith('image/')) {
                e.preventDefault();
                const file = item.getAsFile();
                this.addPastedImage(file);
            }
        }
    },

    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        if (els.pasteDropZone) {
            els.pasteDropZone.classList.add('drag-over');
        }
    },

    handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        if (els.pasteDropZone) {
            els.pasteDropZone.classList.remove('drag-over');
        }
    },

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        if (els.pasteDropZone) {
            els.pasteDropZone.classList.remove('drag-over');
        }

        const files = e.dataTransfer?.files;
        if (!files || files.length === 0) return;

        for (const file of files) {
            if (file.type.startsWith('image/')) {
                this.addPastedImage(file);
            }
        }
    },

    addPastedImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target.result;
            const imageData = {
                id: generateId(),
                name: file.name || 'imagem-colada.png',
                type: file.type,
                size: file.size,
                dataUrl: dataUrl,
                timestamp: new Date()
            };
            this.pastedImages.push(imageData);
            this.renderPastedImages();
            this.showToast(`Imagem colada: ${file.name || 'imagem'}`);
        };
        reader.readAsDataURL(file);
    },

    renderPastedImages() {
        if (!els.pastedImagesContainer) return;

        if (this.pastedImages.length === 0) {
            els.pastedImagesContainer.innerHTML = '';
            els.pastedImagesContainer.classList.add('hidden');
            return;
        }

        els.pastedImagesContainer.classList.remove('hidden');
        els.pastedImagesContainer.innerHTML = this.pastedImages.map(img => `
            <div class="pasted-image-item" data-id="${img.id}">
                <img src="${img.dataUrl}" alt="${escapeHtml(img.name)}" loading="lazy">
                <div class="pasted-image-overlay">
                    <span class="pasted-image-name">${escapeHtml(img.name)}</span>
                    <span class="pasted-image-size">${this.formatFileSize(img.size)}</span>
                </div>
                <button class="pasted-image-remove" aria-label="Remover" data-id="${img.id}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
        `).join('');

        // Add remove handlers
        $$('.pasted-image-remove', els.pastedImagesContainer).forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                this.removePastedImage(id);
            });
        });
    },

    removePastedImage(id) {
        this.pastedImages = this.pastedImages.filter(img => img.id !== id);
        this.renderPastedImages();
    },

    formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    },

    clearInputs() {
        els.generatePrompt.value = '';
        els.styleReferences.value = '';
        this.pastedImages = [];
        this.renderPastedImages();
        els.generatePrompt.focus();
    },

    clearResults() {
        els.resultsGrid.innerHTML = '';
        els.resultsGrid.classList.add('hidden');
        els.resultsEmpty.classList.remove('hidden');
    },

    async generate() {
        const prompt = els.generatePrompt.value.trim();
        if (!prompt) {
            alert('Digite um prompt para gerar');
            els.generatePrompt.focus();
            return;
        }

        // Show loading state
        els.resultsEmpty.classList.add('hidden');
        els.resultsGrid.classList.add('hidden');
        els.generationStatus.classList.remove('hidden');
        els.generateBtn.disabled = true;
        els.generateBtn.innerHTML = `
            <svg class="status-spinner" style="width:18px;height:18px;border-width:2px;" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="30 60" stroke-linecap="round">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                </circle>
            </svg>
            Gerando...
        `;

        // Simulate generation
        await this.simulateGeneration(prompt);

        // Restore button
        els.generateBtn.disabled = false;
        els.generateBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            Gerar
        `;
        els.generationStatus.classList.add('hidden');
    },

    async simulateGeneration(prompt) {
        const mediaType = $('input[name="mediaType"]:checked', els.mediaType)?.value || 'image';
        const model = els.generateModel.value;
        const aspectRatio = els.aspectRatio.value;
        const quality = els.quality.value;

        // Simulate progress
        const steps = [
            { text: 'Analisando prompt...', progress: 10, delay: 500 },
            { text: 'Processando referências...', progress: 25, delay: 800 },
            { text: `Preparando ${model}...`, progress: 40, delay: 600 },
            { text: mediaType === 'video' ? 'Renderizando frames...' : 'Gerando imagem...', progress: 65, delay: 1500 },
            { text: 'Aplicando pós-processamento...', progress: 85, delay: 600 },
            { text: 'Finalizando...', progress: 100, delay: 400 }
        ];

        for (const step of steps) {
            els.statusText.textContent = step.text;
            els.progressBar.style.width = step.progress + '%';
            await new Promise(r => setTimeout(r, step.delay + Math.random() * 300));
        }

        // Generate mock results
        const count = mediaType === 'video' ? 1 : Math.floor(Math.random() * 3) + 2;
        const results = [];

        for (let i = 0; i < count; i++) {
            results.push({
                id: generateId(),
                prompt: prompt,
                mediaType: mediaType,
                model: model,
                aspectRatio: aspectRatio,
                quality: quality,
                timestamp: new Date(),
                // Using placeholder images for demo
                url: mediaType === 'video'
                    ? `https://picsum.photos/seed/${generateId()}/1280/720`
                    : `https://picsum.photos/seed/${generateId()}/${aspectRatio === '1:1' ? '1024/1024' : aspectRatio === '16:9' ? '1280/720' : '720/1280'}`
            });
        }

        this.renderResults(results);
    },

    renderResults(results) {
        els.resultsGrid.innerHTML = results.map(r => this.createResultItem(r)).join('');
        els.resultsGrid.classList.remove('hidden');

        // Add click handlers for result actions
        $$('.result-download', els.resultsGrid).forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const url = btn.dataset.url;
                const type = btn.dataset.type;
                this.downloadResult(url, type);
            });
        });

        $$('.result-copy', els.resultsGrid).forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const prompt = btn.dataset.prompt;
                navigator.clipboard.writeText(prompt);
                this.showToast('Prompt copiado!');
            });
        });

        $$('.result-item', els.resultsGrid).forEach(item => {
            item.addEventListener('click', () => {
                const url = item.dataset.url;
                const type = item.dataset.type;
                this.openFullscreen(url, type);
            });
        });
    },

    createResultItem(result) {
        const isVideo = result.mediaType === 'video';
        const timeStr = formatTime(result.timestamp);
        const modelName = this.getModelName(result.model);

        return `
            <div class="result-item" data-url="${result.url}" data-type="${result.mediaType}">
                <div class="result-preview">
                    ${isVideo
                        ? `<video src="${result.url}" muted loop playsinline poster="${result.url}?t=1"></video>`
                        : `<img src="${result.url}" alt="${escapeHtml(result.prompt)}" loading="lazy">`
                    }
                </div>
                <div class="result-info">
                    <span class="result-prompt">${escapeHtml(result.prompt.slice(0, 60))}${result.prompt.length > 60 ? '...' : ''}</span>
                    <div class="result-meta">
                        <span>${modelName}</span>
                        <span>${result.aspectRatio}</span>
                        <span>${result.quality.toUpperCase()}</span>
                        <span>${timeStr}</span>
                    </div>
                </div>
                <div class="result-actions">
                    <button class="btn btn-ghost btn-sm result-copy" data-prompt="${escapeHtml(result.prompt)}" title="Copiar prompt">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </svg>
                    </button>
                    <button class="btn btn-ghost btn-sm result-download" data-url="${result.url}" data-type="${result.mediaType}" title="Baixar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    },

    getModelName(model) {
        const names = {
            'auto': 'Auto',
            'dall-e-3': 'DALL·E 3',
            'midjourney': 'Midjourney',
            'stable-diffusion': 'SDXL',
            'flux': 'FLUX.1',
            'imagen': 'Imagen 3',
            'sora': 'Sora',
            'runway': 'Runway',
            'luma': 'Luma',
            'kling': 'Kling'
        };
        return names[model] || model;
    },

    downloadResult(url, type) {
        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}-${generateId()}.${type === 'video' ? 'mp4' : 'png'}`;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.showToast('Download iniciado');
    },

    openFullscreen(url, type) {
        const overlay = document.createElement('div');
        overlay.className = 'fullscreen-overlay';
        overlay.innerHTML = `
            <div class="fullscreen-content">
                ${type === 'video'
                    ? `<video src="${url}" controls autoplay loop style="max-width:90vw;max-height:90vh"></video>`
                    : `<img src="${url}" alt="" style="max-width:90vw;max-height:90vh">`
                }
                <button class="fullscreen-close" aria-label="Fechar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:28px;height:28px">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
        `;
        document.body.appendChild(overlay);
        overlay.querySelector('.fullscreen-close').addEventListener('click', () => overlay.remove());
        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
        document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', esc); } });
    },

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
};

// Add toast styles dynamically
const toastStyles = document.createElement('style');
toastStyles.textContent = `
.toast {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: var(--bg-tertiary);
    border: 1px solid var(--border-primary);
    color: var(--fg-primary);
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    box-shadow: var(--shadow-lg);
    z-index: 1000;
    opacity: 0;
    transition: all var(--transition-normal);
}
.toast.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
}
.fullscreen-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    animation: fadeIn 0.2s ease;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.fullscreen-content { position: relative; }
.fullscreen-close {
    position: absolute;
    top: -50px;
    right: 0;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-primary);
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--fg-primary);
    transition: all var(--transition-fast);
}
.fullscreen-close:hover { background: var(--bg-hover); }
`;
document.head.appendChild(toastStyles);

// ========================================
// App Initialization
// ========================================
function init() {
    els.themeToggle = $('#themeToggle');
    els.sidebar = $('#sidebar');
    els.mainContent = $('#mainContent');

    Storage.load();

    Theme.init();
    Sidebar.init();
    Chat.init();
    Settings.init();
    Generate.init();

    els.themeToggle?.addEventListener('click', () => Theme.toggle());

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            els.searchInput?.focus();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            if (state.currentAgent) {
                state.messages = [];
                state.currentAgent.historyId = null;
                Chat.renderMessages();
                Sidebar.updateActiveHistory(null);
                Chat.focusInput();
            }
        }
        if (e.key === 'Escape') {
            if (state.sidebarOpen) {
                Sidebar.closeMobile();
            } else if (els.promptInput === document.activeElement) {
                els.promptInput.blur();
            }
        }
    });

    console.log('Agent Hub initialized');
    console.log('Shortcuts: Ctrl+K (search), Ctrl+N (new chat), Esc (close)');
}

// View switching
const App = {
    switchView(view) {
        // Update sidebar buttons
        $$('.media-btn', els.sidebar).forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });

        // Update view panels
        $$('.view-panel', els.mainContent).forEach(panel => {
            panel.classList.toggle('active', panel.dataset.view === view);
        });

        // Focus appropriate input
        if (view === 'chat') {
            setTimeout(() => els.promptInput?.focus(), 100);
        } else if (view === 'generate') {
            setTimeout(() => els.generatePrompt?.focus(), 100);
        }
    }
};

// Expose globally
window.App = App;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

window.AgentHub = {
    state,
    AGENTS,
    Storage,
    Theme,
    Sidebar,
    Agent,
    Chat,
    Settings,
    Generate,
    App
};
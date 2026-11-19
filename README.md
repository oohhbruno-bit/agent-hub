# 🤖 Agent Hub

Interface web moderna para gerenciar e interagir com agentes de IA + gerar imagens/vídeos. Design dark mode, responsivo, **sem frameworks** — apenas HTML, CSS e JavaScript vanilla.

![Agent Hub Preview](preview.png)

## ✨ Funcionalidades

### 💬 Chat com Agentes (18 agentes)
- **18 agentes pré-configurados** — Modelos gerais + especialistas
- **Histórico persistente** — Salvo no `localStorage` do navegador
- **Busca em tempo real** — Filtre agentes e histórico (Ctrl+K)
- **Dark/Light Mode** — Alterna automaticamente ou manualmente
- **Responsivo** — Desktop e mobile (sidebar vira drawer)
- **Atalhos de teclado** — Navegação rápida
- **Modo API** — Conecte a um backend real (configurável)

### 🎨 Geração de Imagens e Vídeos
- **Prompt principal** + **Referências de estilo** (textuais ou URLs)
- **📋 Paste direto de imagem** — Ctrl+V ou drag & drop de qualquer site
- **Seleção de modelo**: DALL·E 3, Midjourney v6, Stable Diffusion XL, FLUX.1, Imagen 3, Sora, Runway Gen-3, Luma, Kling
- **Proporções**: 1:1, 16:9, 9:16, 4:3, 3:2, 21:9
- **Qualidade**: Padrão, HD, 4K
- **Resultados**: Preview em grid, download, copiar prompt, fullscreen

---

## 🚀 Como Usar

### Opção 1: Servidor Python (Recomendado)
```bash
cd agents-ui
python server.py
# Abra http://localhost:8888
```

### Opção 2: Node.js (http-server)
```bash
cd agents-ui
npx http-server -p 8888 -c-1
```

### Opção 3: Abrir Direto no Navegador
Clique duas vezes no `index.html` — *Nota: localStorage e paste podem não funcionar no protocolo `file://`.*

---

## ⌨️ Atalhos

| Atalho | Ação |
|--------|------|
| `Ctrl+K` | Focar busca |
| `Ctrl+N` | Nova conversa (chat) |
| `Ctrl+Enter` | Gerar (na aba Gerar) |
| `Esc` | Fechar sidebar / limpar input |
| `Enter` | Enviar mensagem |
| `Shift+Enter` | Nova linha |

---

## 🤖 Agentes Disponíveis (18)

### Modelos Gerais
| Agente | Tipo | Cor | Especialidade |
|--------|------|-----|---------------|
| **Claude** | General | `#6366f1` | Assistente padrão |
| **Grok** | General | `#1a1a2e` | Direto, humor seco (xAI) |
| **ChatGPT** | General | `#10a37f` | Estruturado, didático (OpenAI) |
| **Gemini** | General | `#4285f4` | Multimodal (Google) |
| **Llama** | General | `#0066cc` | Open source (Meta) |
| **Mistral** | General | `#ff6b35` | Eficiente, function calling |
| **Qwen** | General | `#ff6a00` | Multilinguagem (Alibaba) |
| **Claude 3.5 Haiku** | General | `#6366f1` | Rápido, conciso |
| **Claude 3.5 Sonnet** | General | `#6366f1` | Equilibrado |
| **Claude 3 Opus** | General | `#6366f1` | Máxima capacidade |

### Especialistas
| Agente | Tipo | Cor | Especialidade |
|--------|------|-----|---------------|
| **Claude Code Guide** | Specialist | `#22d3ee` | CLI, SDK, API Anthropic |
| **Explore** | Specialist | `#f59e0b` | Busca e análise de código |
| **General Purpose** | General | `#22c55e` | Tarefas multi-passo |
| **Plan** | Specialist | `#a855f7` | Arquitetura e planejamento |
| **Statusline Setup** | Utility | `#ec4899` | Configuração UI/CLI |
| **GitHub Copilot** | Specialist | `#000000` | Código, refatoração, testes |
| **Perplexity** | Specialist | `#20c997` | Busca com citações |
| **DeepSeek** | Specialist | `#18181b` | Código, matemática, lógica |

---

## ⚙️ Configurações (⚙️ no topo)

- **Modo de Conexão**: Local (simulado) ou API Externa
- **Endpoint da API**: URL do seu backend
- **API Key**: Para autenticação
- **Tema**: Sistema / Escuro / Claro
- **Tamanho da Fonte**: Pequeno / Médio / Grande

---

## 🔌 Integração com API Real

No modo API, o frontend envia `POST` para `{endpoint}/chat`:

```json
{
  "agent": "claude-code-guide",
  "messages": [
    {"role": "user", "content": "Como usar hooks?"},
    {"role": "assistant", "content": "No settings.json..."}
  ],
  "system": "Você é um especialista em Claude Code..."
}
```

Resposta esperada:
```json
{
  "response": "Resposta do agente..."
}
```

---

## 📁 Estrutura

```
agents-ui/
├── index.html      # HTML principal
├── styles.css      # Estilos (dark mode, responsivo, generate view)
├── app.js          # Lógica da aplicação (chat + generate + paste)
├── server.py       # Servidor Python simples (UTF-8, CORS)
├── .gitignore      # Git ignore
└── README.md       # Este arquivo
```

---

## 🛠️ Personalização

### Adicionar Novo Agente
Edite `app.js` — array `AGENTS`:
```javascript
{
    id: 'meu-agente',
    name: 'Meu Agente',
    description: 'Descrição curta',
    type: 'custom',
    icon: 'cpu',  // 'general', 'code', 'search', 'architecture', 'terminal', 'grok', 'chatgpt', 'gemini', 'copilot', 'llama', 'mistral', 'perplexity', 'deepseek', 'qwen'
    color: '#ff6b6b',
    systemPrompt: 'Instruções do sistema...'
}
```

### Cores do Tema
Edite variáveis CSS em `styles.css`:
```css
:root {
    --accent-primary: #6366f1;  /* Cor principal */
    --bg-primary: #0d0e11;      /* Fundo principal */
    --fg-primary: #f0f1f4;      /* Texto principal */
}
```

---

## 📋 Paste de Imagem (Nova Feature)

Na aba **Gerar**:
1. Copie qualquer imagem (botão direito → "Copiar imagem")
2. Volte na aba **Gerar**
3. **Ctrl+V** em qualquer lugar da tela
4. Ou **arraste e solte** na área pontilhada
5. Thumbnails aparecem abaixo das referências com opção de remover

---

## 📝 Licença

MIT — Use livremente para seus projetos.
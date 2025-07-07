# Sistema de Gerenciamento de Mentores - Projeto Final Refactor

Um sistema web moderno para gerenciamento de perfis de mentores, desenvolvido como projeto de extensão universitária. O sistema permite o cadastro, visualização e administração de mentores organizados por especialidades e localização.

## 🚀 Tecnologias Utilizadas

- **Frontend Framework**: React 19 com TypeScript
- **Build Tool**: Vite 6.2.0
- **Styling**: CSS customizado + Bootstrap 5.3.5
- **Roteamento**: React Router DOM 7.5.0
- **Formulários**: React Hook Form 7.55.0 + Zod validation
- **Ícones**: Font Awesome 6.7.2
- **Lint**: ESLint 9 com TypeScript ESLint

## 📋 Funcionalidades

### Área Pública

- **Visualização de Mentores**: Cards com informações dos mentores cadastrados
- **Sistema de Filtros**: Busca por nome, tipo de especialidade e cidade
- **Cadastro de Novos Mentores**: Formulário público para registro
- **Design Responsivo**: Interface adaptável para diferentes dispositivos

### Área Administrativa (Protegida)

- **Dashboard Administrativo**: Visualização em tabela de todos os mentores
- **Gerenciamento CRUD**: Criar, visualizar, editar e excluir mentores
- **Sistema de Autenticação**: Login seguro com JWT
- **Controle de Acesso**: Rotas protegidas por role (ADMIN/USER)

### Características Técnicas

- **Validação de Formulários**: Schemas Zod para validação robusta
- **Loading States**: Indicadores visuais de carregamento
- **Error Handling**: Tratamento de erros e páginas de erro customizadas
- **Modular Components**: Componentes reutilizáveis e bem estruturados
- **Path Aliases**: Importações organizadas com aliases TypeScript

## 🔐 Segurança e Autenticação

### Implementação de Autenticação

O sistema implementa um robusto sistema de autenticação baseado em **JWT (JSON Web Tokens)** com as seguintes características:

#### **Context API para Estado Global**

```typescript
// AuthContext gerencia o estado de autenticação globalmente
interface AuthState {
  user: MentorResponse | null
  isAuthenticated: boolean
  isLoading: boolean
}
```

#### **Armazenamento Seguro**

- **LocalStorage**: Tokens e dados do usuário persistidos localmente
- **Automatic Cleanup**: Limpeza automática em caso de tokens inválidos
- **Session Management**: Gerenciamento de sessão com logout automático

#### **Sistema de Roles e Permissões**

```typescript
enum Role {
  ADMIN = "ADMIN", // Acesso total ao dashboard
  USER = "USER", // Acesso limitado
}
```

#### **Rotas Protegidas**

```typescript
// Componente ProtectedRoute para controle de acesso
<ProtectedRoute requiredRole={Role.ADMIN}>
  <Dashboard />
</ProtectedRoute>
```

#### **API Autenticada**

```typescript
// Hook personalizado para requisições autenticadas
const authenticatedApi = useAuthenticatedApi()
// Automaticamente inclui headers de autorização
// Gerencia renovação de tokens e logout em caso de 401
```

### Fluxo de Autenticação

1. **Login**: Usuário fornece credenciais (email/senha)
2. **Validação**: Backend valida e retorna JWT + dados do usuário
3. **Armazenamento**: Token e dados salvos no localStorage
4. **Autorização**: Todas as requisições incluem Bearer token
5. **Verificação**: Middleware verifica validade em rotas protegidas
6. **Renovação**: Sistema gerencia expiração e renovação automática

### Segurança Implementada

- ✅ **JWT Authentication**: Tokens seguros para autenticação stateless
- ✅ **Role-Based Access Control**: Controle granular de permissões
- ✅ **Protected Routes**: Redirecionamento automático para login
- ✅ **Automatic Logout**: Logout em caso de tokens expirados
- ✅ **XSS Protection**: Sanitização de inputs e validação rigorosa
- ✅ **Error Boundaries**: Tratamento seguro de erros
- ✅ **Input Validation**: Validação client-side e server-side

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Backend API rodando em `http://localhost:8080`

### Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd projeto-final-refactor

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview
```

### Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run lint     # Verificação de código
npm run preview  # Preview da build
```

## 📁 Estrutura do Projeto

```
src/
├── api/                 # Módulos de API
│   ├── api.ts          # Funções HTTP base
│   ├── mentor.api.ts   # APIs públicas de mentores
│   └── mentor.auth.api.ts # APIs autenticadas
├── components/         # Componentes reutilizáveis
│   ├── button/        # Componente Button
│   ├── card/          # Cards de mentores
│   ├── filter/        # Sistema de filtros
│   ├── header/        # Header da aplicação
│   ├── input/         # Campos de formulário
│   ├── layout/        # Layout principal
│   ├── loading/       # Indicadores de loading
│   ├── modal/         # Modais (auth, delete)
│   ├── page/          # Wrapper de páginas
│   └── table/         # Tabela de dados
├── hooks/             # Custom hooks
├── pages/             # Páginas da aplicação
│   ├── auth/          # Página de login
│   ├── dashboard/     # Dashboard administrativo
│   ├── error/         # Páginas de erro
│   └── mentor/        # Formulários e visualização
├── routes/            # Configuração de rotas
├── security/          # Módulo de segurança
│   ├── api/           # APIs de autenticação
│   ├── components/    # Rotas protegidas
│   ├── contexts/      # Context de autenticação
│   ├── hooks/         # Hooks de autenticação
│   └── types/         # Types de auth
└── types/             # Definições de tipos
```

## 🌐 API Integration

O frontend integra com uma API REST que fornece:

- **GET /mentors** - Lista todos os mentores
- **GET /mentors/:id** - Busca mentor por ID
- **POST /mentors** - Cria novo mentor
- **PUT /mentors/:id** - Atualiza mentor (protegido)
- **DELETE /mentors/:id** - Remove mentor (protegido)
- **POST /mentors/login** - Autenticação
- **GET /cities** - Lista cidades disponíveis
- **GET /specialties** - Lista especialidades

## 🎨 Design System

- **Cores**: Paleta suave com roxo e azul
- **Tipografia**: Arial/Helvetica para legibilidade
- **Componentes**: Sistema consistente de botões, inputs e cards
- **Responsividade**: Design mobile-first
- **Acessibilidade**: Labels, ARIA e navegação por teclado

## 🚦 Estados da Aplicação

- **Loading**: Spinners durante carregamento de dados
- **Error**: Páginas de erro com navegação de volta
- **Empty**: Estados vazios com calls-to-action
- **Success**: Feedback visual para ações bem-sucedidas

## 📱 Responsividade

O sistema é totalmente responsivo, adaptando-se a:

- 📱 Mobile (< 768px)
- 📱 Tablet (768px - 1024px)
- 💻 Desktop (> 1024px)

---

**Desenvolvido como projeto de extensão universitária - 2025**

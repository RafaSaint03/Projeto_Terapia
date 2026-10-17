# 🌻 Espaço Girassol

Plataforma web de acompanhamento terapêutico, criada para apoiar profissionais da Psicologia e facilitar a organização da jornada do paciente: agendamento de sessões, gestão de consultas e registro do estado emocional pós-atendimento.

🔗 **Demo online:** [projetoterapia.vercel.app](https://projetoterapia.vercel.app)

----

## ✨ Funcionalidades

### 🏠 Landing page pública
- Apresentação do Espaço Girassol e da proposta de terapia humanizada.
- Seção com os principais recursos da plataforma.
- Botões de chamada para ação (*Agendar Terapia*, *Conhecer a Plataforma*, *Entrar no Portal*) que levam ao login ou rolam suavemente até a seção de recursos.

### 🔐 Acesso do paciente
- Tela de login com usuário/CPF e senha.
- Sessão mantida no navegador: ao recarregar a página, o paciente continua logado.
- Botão de logout.

### 📊 Painel de acompanhamento (Dashboard)
Cards de métricas atualizados automaticamente:
- **Consultas do mês:** total de sessões agendadas ou confirmadas no mês atual (sessões canceladas não entram na conta).
- **Investimento financeiro:** valor estimado do mês, com base em R$ 150,00 por sessão.
- **Próxima consulta:** modalidade, data e horário da sessão mais próxima.
- **Último sentimento:** registro do estado emocional informado na última avaliação.

### 📅 Agendamento de sessões
- Escolha da modalidade: **Online (videochamada)**, **Presencial no consultório** ou **Primeira Consulta (Anamnese)**.
- Seleção de data e de horário entre as opções disponíveis (08:00, 09:30, 11:00, 14:00, 15:30 e 17:00).
- Campo opcional de observações para o paciente destacar algum ponto da consulta.

### ✅ Gestão de sessões
- Listagem de todas as consultas com data, horário, modalidade, observações e status (*Pendente*, *Confirmada* ou *Cancelada*).
- Confirmação ou cancelamento de cada sessão com um clique.
- Dashboard atualizado na hora a cada mudança de status.

### 💛 Avaliação pós-sessão
- Registro do sentimento após a consulta: 🍃 Leve, 🤔 Reflexivo, ✨ Renovado ou 💛 Acolhido.
- Nota de 1 a 5 estrelas e campo de comentários livres.

### 📱 Experiência de uso
- Layout responsivo, com menu mobile (hambúrguer).
- Notificações visuais (*toasts*) para confirmar ações e avisar erros.

---

## 🛠️ Tecnologias

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**
- **LocalStorage** para persistência dos dados no navegador
- Deploy na **Vercel**

---

## 📁 Estrutura do projeto

```
Projeto_Terapia/
├── index.html   # Estrutura das telas (landing, login, painel, agendamento, sessões e modal)
├── styles.css   # Estilização e responsividade
└── script.js    # Lógica da aplicação (autenticação, sessões, dashboard e avaliações)
```

---

## 🚀 Como executar

Não há dependências nem etapa de build.

```bash
# 1. Clone o repositório
git clone https://github.com/RafaSaint03/Projeto_Terapia.git

# 2. Entre na pasta
cd Projeto_Terapia

# 3. Abra o index.html no navegador
```

Se preferir, use uma extensão como o Live Server no VS Code.

### 🔑 Credenciais de demonstração

| Campo | Valor |
|-------|-------|
| Usuário/CPF | `0000` |
| Senha | `1111` |

---

## ⚠️ Limitações atuais

Este é um projeto de front-end com fins demonstrativos:

- A autenticação é simulada, com credenciais fixas no código. Não deve ser usada com dados reais.
- Os dados ficam apenas no `localStorage` do navegador. Não há backend nem banco de dados, então cada dispositivo tem suas próprias informações.
- Na avaliação pós-sessão, apenas o sentimento escolhido é salvo no painel; a nota em estrelas e os comentários ainda não são armazenados.
- A avaliação não fica vinculada a uma sessão específica.

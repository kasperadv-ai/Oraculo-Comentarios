# 🔮 Oráculo de Comentários

App para analisar comentários do YouTube e gerar insights para criadores de conteúdo no nicho de Lei da Atração, Física Quântica e Desenvolvimento Pessoal.

---

## 🚀 Como publicar no Vercel (passo a passo)

### PASSO 1 — Criar conta no GitHub
1. Acesse https://github.com e clique em **Sign up**
2. Crie uma conta gratuita (precisa de e-mail)

### PASSO 2 — Fazer upload dos arquivos no GitHub
1. Após criar a conta, clique no botão **"+"** no canto superior direito → **New repository**
2. Dê o nome: `oraculo-comentarios`
3. Deixe como **Public** e clique em **Create repository**
4. Na próxima tela, clique em **"uploading an existing file"**
5. Arraste a pasta inteira `oraculo-app` para a área de upload
6. Clique em **Commit changes**

### PASSO 3 — Publicar no Vercel
1. Acesse https://vercel.com e clique em **Sign up with GitHub**
2. Autorize o Vercel a acessar sua conta GitHub
3. Clique em **"Add New Project"**
4. Selecione o repositório `oraculo-comentarios`
5. Clique em **Deploy** — só isso!
6. Em ~2 minutos o Vercel te dá um link público como:
   `https://oraculo-comentarios.vercel.app`

---

## ⚠️ Importante: Adicionar sua API Key da Anthropic

Para funcionar fora do claude.ai, você precisa de uma chave da API Anthropic:

1. Acesse https://console.anthropic.com
2. Vá em **API Keys** → **Create Key**
3. Copie a chave (começa com `sk-ant-...`)
4. No Vercel, vá em seu projeto → **Settings** → **Environment Variables**
5. Adicione: `REACT_APP_ANTHROPIC_KEY` = `sua-chave-aqui`

---

## 📁 Estrutura dos arquivos
```
oraculo-app/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx      ← componente principal
│   └── index.js
├── package.json
└── vercel.json
```

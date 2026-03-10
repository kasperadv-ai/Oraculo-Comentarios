import { useState } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Raleway:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --gold: #c9a84c; --gold-light: #f0d080; --deep: #080b14;
    --card: #111828; --border: rgba(201,168,76,0.2); --text: #e8e0d0; --muted: #7a7a8a;
  }
  body { background: var(--deep); }
  .app { min-height: 100vh; background: var(--deep); color: var(--text); font-family: 'Raleway', sans-serif; position: relative; overflow-x: hidden; }
  .stars { position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background: radial-gradient(1px 1px at 10% 15%, rgba(255,255,255,0.6) 0%, transparent 100%), radial-gradient(1px 1px at 25% 40%, rgba(255,255,255,0.4) 0%, transparent 100%), radial-gradient(1px 1px at 55% 20%, rgba(255,255,255,0.5) 0%, transparent 100%), radial-gradient(1px 1px at 70% 60%, rgba(255,255,255,0.3) 0%, transparent 100%), radial-gradient(1px 1px at 85% 30%, rgba(255,255,255,0.5) 0%, transparent 100%), radial-gradient(1px 1px at 40% 75%, rgba(255,255,255,0.4) 0%, transparent 100%), radial-gradient(2px 2px at 45% 10%, rgba(201,168,76,0.3) 0%, transparent 100%), radial-gradient(2px 2px at 80% 50%, rgba(201,168,76,0.2) 0%, transparent 100%); }
  .nebula { position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background: radial-gradient(ellipse 60% 40% at 20% 20%, rgba(80,40,120,0.15) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 80% 70%, rgba(40,60,120,0.12) 0%, transparent 70%); }
  .content { position: relative; z-index: 1; max-width: 860px; margin: 0 auto; padding: 48px 24px 80px; }
  .header { text-align: center; margin-bottom: 52px; }
  .sigil { width: 64px; height: 64px; margin: 0 auto 20px; }
  .sigil svg { width: 100%; height: 100%; filter: drop-shadow(0 0 12px rgba(201,168,76,0.5)); }
  .title { font-family: 'Cinzel', serif; font-size: clamp(22px, 4vw, 34px); font-weight: 700; letter-spacing: 0.08em; background: linear-gradient(135deg, #f0d080 0%, #c9a84c 40%, #e8c870 70%, #a07820 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1.2; margin-bottom: 10px; }
  .subtitle { font-size: 13px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--muted); font-weight: 300; }
  .divider { width: 120px; height: 1px; margin: 20px auto 0; background: linear-gradient(90deg, transparent, var(--gold), transparent); }
  .panel { background: var(--card); border: 1px solid var(--border); border-radius: 2px; padding: 28px 32px; margin-bottom: 20px; position: relative; }
  .panel::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent); }
  .panel-title { font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); margin-bottom: 18px; display: flex; align-items: center; gap: 10px; }
  .panel-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }
  .tabs { display: flex; gap: 4px; margin-bottom: 20px; background: rgba(0,0,0,0.3); padding: 4px; border-radius: 2px; }
  .tab { flex: 1; padding: 10px 16px; border: none; background: transparent; color: var(--muted); font-family: 'Raleway', sans-serif; font-size: 13px; letter-spacing: 0.1em; cursor: pointer; border-radius: 1px; transition: all 0.2s; }
  .tab.active { background: rgba(201,168,76,0.12); color: var(--gold); border: 1px solid rgba(201,168,76,0.25); }
  .tab:hover:not(.active) { color: var(--text); }
  label { display: block; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
  input, textarea { width: 100%; background: rgba(0,0,0,0.4); border: 1px solid var(--border); border-radius: 2px; padding: 12px 16px; color: var(--text); font-family: 'Raleway', sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s; resize: vertical; margin-bottom: 16px; }
  input:focus, textarea:focus { border-color: rgba(201,168,76,0.5); }
  input::placeholder, textarea::placeholder { color: rgba(120,120,140,0.5); }
  .hint { font-size: 11px; color: var(--muted); margin-top: -12px; margin-bottom: 16px; letter-spacing: 0.05em; line-height: 1.5; }
  .info-box { font-size: 12px; color: var(--muted); margin-bottom: 16px; padding: 12px 16px; background: rgba(201,168,76,0.05); border: 1px solid var(--border); border-radius: 2px; line-height: 1.7; }
  .info-box strong { color: var(--gold-light); }
  .btn { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 28px; border: 1px solid rgba(201,168,76,0.4); background: linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05)); color: var(--gold); font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: 0.25em; text-transform: uppercase; cursor: pointer; border-radius: 2px; transition: all 0.25s; width: 100%; margin-top: 4px; }
  .btn:hover:not(:disabled) { background: linear-gradient(135deg, rgba(201,168,76,0.25), rgba(201,168,76,0.1)); border-color: rgba(201,168,76,0.7); box-shadow: 0 0 20px rgba(201,168,76,0.15); }
  .btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .loader { display: flex; align-items: center; justify-content: center; gap: 16px; padding: 40px; flex-direction: column; }
  .loader-ring { width: 48px; height: 48px; border-radius: 50%; border: 1px solid rgba(201,168,76,0.15); border-top-color: var(--gold); animation: spin 1.2s linear infinite; }
  .loader-text { font-size: 12px; letter-spacing: 0.2em; color: var(--muted); text-transform: uppercase; text-align: center; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .insights { animation: fadeIn 0.6s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .insight-block { margin-bottom: 24px; padding: 20px 24px; background: rgba(0,0,0,0.25); border-left: 2px solid rgba(201,168,76,0.3); border-radius: 0 2px 2px 0; }
  .insight-block h3 { font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); margin-bottom: 14px; }
  .insight-block p, .insight-block li { font-size: 14px; line-height: 1.8; color: var(--text); font-weight: 300; }
  .insight-block ul { list-style: none; padding: 0; }
  .insight-block li { padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.04); display: flex; gap: 10px; }
  .insight-block li::before { content: '◆'; color: var(--gold); font-size: 8px; margin-top: 6px; flex-shrink: 0; }
  .insight-block li:last-child { border-bottom: none; }
  .tag-cloud { display: flex; flex-wrap: wrap; gap: 8px; }
  .tag { padding: 5px 14px; border: 1px solid var(--border); border-radius: 20px; font-size: 12px; color: var(--muted); background: rgba(201,168,76,0.05); }
  .tag.hot { border-color: rgba(201,168,76,0.4); color: var(--gold-light); background: rgba(201,168,76,0.1); }
  .error { padding: 16px 20px; background: rgba(180,60,60,0.1); border: 1px solid rgba(180,60,60,0.3); border-radius: 2px; color: #e08080; font-size: 13px; margin-top: 16px; line-height: 1.6; }
  .section-sep { height: 1px; margin: 28px 0; background: linear-gradient(90deg, transparent, var(--border), transparent); }
  .highlight { border-left-color: rgba(201,168,76,0.7) !important; background: rgba(201,168,76,0.04) !important; }
`;

function extractVideoId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

async function callClaude(messages, tools) {
  const body = { model: "claude-sonnet-4-20250514", max_tokens: 1000, messages };
  if (tools) body.tools = tools;
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data;
}

function extractText(data) {
  return (data.content || []).map(b => b.type === "text" ? b.text : "").filter(Boolean).join("");
}

async function fetchCommentsViaClaude(videoUrl) {
  const data = await callClaude([{
    role: "user",
    content: `Search for viewer comments and reactions to this YouTube video: ${videoUrl}

Use web search to find the video title and then find discussions, comments, or viewer reactions about it. Look for comment sections, Reddit discussions, or any platform where people discussed this video.

Return a plain list of 30+ viewer comments/reactions you find, one per line. Focus on what viewers said, asked, or felt. No numbering, no formatting, just raw comments.`
  }], [{ type: "web_search_20250305", name: "web_search" }]);

  return extractText(data);
}

async function analyzeComments(commentsText) {
  const data = await callClaude([{
    role: "user",
    content: `Você é especialista em análise de audiência para criadores no nicho de Lei da Atração, Física Quântica e Desenvolvimento Pessoal/Espiritual.

Analise os comentários/dados abaixo e gere insights estratégicos.

DADOS:
${commentsText.slice(0, 8000)}

Responda APENAS com JSON puro (sem markdown, sem backticks), neste formato:
{
  "resumo": "2-3 frases sobre o padrão geral desta audiência",
  "perguntas_frequentes": ["pergunta 1","pergunta 2","pergunta 3","pergunta 4","pergunta 5"],
  "dores_medos": ["dor 1","dor 2","dor 3","dor 4"],
  "desejos_sonhos": ["desejo 1","desejo 2","desejo 3","desejo 4"],
  "ideias_conteudo": ["título vídeo 1","título vídeo 2","título vídeo 3","título vídeo 4","título vídeo 5"],
  "linguagem_nicho": ["expressão 1","expressão 2","expressão 3","expressão 4","expressão 5","expressão 6"],
  "insight_estrategico": "parágrafo com o insight mais valioso para modelar este conteúdo",
  "formato_recomendado": "estrutura ideal de vídeo baseada nos padrões encontrados"
}`
  }]);

  const raw = extractText(data).replace(/```json|```/g, "").trim();
  return JSON.parse(raw);
}

export default function App() {
  const [tab, setTab] = useState("youtube");
  const [videoUrl, setVideoUrl] = useState("");
  const [manualText, setManualText] = useState("");
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState("");
  const [loadingMsg, setLoadingMsg] = useState("");

  async function handleAnalyze() {
    setError(""); setInsights(null);
    setLoading(true);
    try {
      let commentsText = "";

      if (tab === "youtube") {
        if (!videoUrl.trim()) throw new Error("Informe a URL do vídeo do YouTube.");
        if (!extractVideoId(videoUrl.trim())) throw new Error("URL inválida. Use: youtube.com/watch?v=...");
        setLoadingMsg("Buscando comentários e discussões do vídeo...");
        commentsText = await fetchCommentsViaClaude(videoUrl.trim());
        if (!commentsText || commentsText.length < 80)
          throw new Error("Não encontrei comentários suficientes. Tente um vídeo mais popular ou use o modo 'Colar comentários'.");
      } else {
        if (!manualText.trim()) throw new Error("Cole os comentários no campo de texto.");
        commentsText = manualText.trim();
      }

      setLoadingMsg("Decodificando padrões com IA...");
      const result = await analyzeComments(commentsText);
      setInsights(result);
    } catch (e) {
      setError(e.message || "Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
      setLoadingMsg("");
    }
  }

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        <div className="stars" /><div className="nebula" />
        <div className="content">
          <div className="header">
            <div className="sigil">
              <svg viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="30" stroke="rgba(201,168,76,0.3)" strokeWidth="0.5"/>
                <circle cx="32" cy="32" r="22" stroke="rgba(201,168,76,0.2)" strokeWidth="0.5"/>
                <polygon points="32,6 56,50 8,50" stroke="rgba(201,168,76,0.5)" strokeWidth="0.8" fill="none"/>
                <polygon points="32,58 8,14 56,14" stroke="rgba(201,168,76,0.3)" strokeWidth="0.8" fill="none"/>
                <circle cx="32" cy="32" r="4" fill="rgba(201,168,76,0.6)"/>
                <circle cx="32" cy="32" r="2" fill="rgba(240,208,128,0.9)"/>
              </svg>
            </div>
            <h1 className="title">Oráculo de Comentários</h1>
            <p className="subtitle">Insights para criadores · Lei da Atração · Consciência</p>
            <div className="divider" />
          </div>

          <div className="panel">
            <div className="panel-title">Fonte dos comentários</div>
            <div className="tabs">
              <button className={`tab ${tab==="youtube"?"active":""}`} onClick={()=>{setTab("youtube");setInsights(null);setError("");}}>▶ YouTube (automático)</button>
              <button className={`tab ${tab==="manual"?"active":""}`} onClick={()=>{setTab("manual");setInsights(null);setError("");}}>✦ Colar comentários</button>
            </div>

            {tab === "youtube" && <>
              <div className="info-box">
                ✦ <strong>Sem API Key!</strong> Cole a URL de qualquer vídeo do YouTube no seu nicho — a IA busca os comentários e discussões automaticamente na web.<br/>
                Funciona melhor com vídeos populares (+1.000 visualizações).
              </div>
              <label>URL do vídeo</label>
              <input placeholder="https://youtube.com/watch?v=..." value={videoUrl} onChange={e=>setVideoUrl(e.target.value)} />
              <p className="hint">Cole a URL de um criador de Lei da Atração / Física Quântica que você quer modelar</p>
            </>}

            {tab === "manual" && <>
              <div className="info-box">
                ✦ Funciona para <strong>Instagram, TikTok, YouTube</strong> ou qualquer rede. Copie e cole os comentários abaixo.
              </div>
              <label>Comentários</label>
              <textarea rows={10} placeholder={"Quero aprender sobre manifestação...\nComo mudo minha realidade?\nIsso realmente funciona?\n..."} value={manualText} onChange={e=>setManualText(e.target.value)} />
            </>}

            {error && <div className="error">⚠ {error}</div>}
            <button className="btn" onClick={handleAnalyze} disabled={loading}>
              {loading ? "Lendo os padrões..." : "✦ Revelar Insights"}
            </button>
          </div>

          {loading && <div className="panel"><div className="loader">
            <div className="loader-ring" />
            <div className="loader-text">{loadingMsg || "Processando..."}</div>
          </div></div>}

          {insights && !loading && <div className="insights"><div className="panel">
            <div className="panel-title">Análise da Audiência</div>

            <div className="insight-block"><h3>◈ Padrão Geral da Audiência</h3><p>{insights.resumo}</p></div>
            <div className="insight-block"><h3>◈ Perguntas Mais Frequentes</h3><ul>{insights.perguntas_frequentes?.map((q,i)=><li key={i}>{q}</li>)}</ul></div>
            <div className="insight-block"><h3>◈ Dores e Medos Ocultos</h3><ul>{insights.dores_medos?.map((d,i)=><li key={i}>{d}</li>)}</ul></div>
            <div className="insight-block"><h3>◈ Desejos e Sonhos</h3><ul>{insights.desejos_sonhos?.map((d,i)=><li key={i}>{d}</li>)}</ul></div>
            <div className="section-sep" />
            <div className="insight-block"><h3>◈ Ideias de Vídeos</h3><ul>{insights.ideias_conteudo?.map((idea,i)=><li key={i}>{idea}</li>)}</ul></div>
            <div className="insight-block"><h3>◈ Linguagem do Nicho · Palavras-Chave</h3>
              <div className="tag-cloud">{insights.linguagem_nicho?.map((t,i)=><span key={i} className={`tag ${i<3?"hot":""}`}>{t}</span>)}</div>
            </div>
            <div className="section-sep" />
            <div className="insight-block highlight"><h3>◈ Insight Estratégico Principal</h3><p>{insights.insight_estrategico}</p></div>
            <div className="insight-block"><h3>◈ Formato de Vídeo Recomendado</h3><p>{insights.formato_recomendado}</p></div>
          </div></div>}
        </div>
      </div>
    </>
  );
}

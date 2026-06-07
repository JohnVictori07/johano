import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from './Nav'

const SYSTEM_PROMPT = `Você é Johano, um assistente espiritual sábio, sereno e acolhedor, profundamente versado nas obras da Doutrina Espírita. Conheça e cite: O Livro dos Espíritos, O Livro dos Médiuns, O Evangelho Segundo o Espiritismo, O Céu e o Inferno, A Gênese (Kardec), Nosso Lar, Os Mensageiros, Missionários da Luz (André Luiz/Chico Xavier), obras de Léon Denis, Divaldo Franco e outros. Seja sereno, compassivo. Responda sempre em português brasileiro. Não faça previsões nem se passe por médium.`

const css = `
.hero{padding:64px 32px 56px;text-align:center;border-bottom:1px solid #e0d8c8;}
.hero-eyebrow{font-size:11px;letter-spacing:0.2em;color:#c9a650;text-transform:uppercase;margin-bottom:16px;}
.hero-title{font-family:'Cinzel',serif;font-size:52px;font-weight:600;color:#1a3a6b;letter-spacing:0.06em;margin-bottom:8px;}
.hero-sub{font-size:14px;letter-spacing:0.14em;color:#c9a650;margin-bottom:24px;font-style:italic;}
.hero-divider{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:28px;color:#c9a650;font-size:11px;letter-spacing:8px;}
.hero-divider::before,.hero-divider::after{content:'';width:60px;height:1px;background:#c9a650;opacity:0.4;}
.hero-desc{font-size:18px;color:#555;max-width:560px;margin:0 auto 36px;line-height:1.8;font-weight:300;}
.btn-p{background:#1a3a6b;color:#fff;border:none;border-radius:2px;padding:14px 36px;font-family:'Cinzel',serif;font-size:13px;letter-spacing:0.1em;cursor:pointer;text-transform:uppercase;margin-right:12px;}
.btn-p:hover{background:#0f2447;}
.btn-s{background:transparent;color:#1a3a6b;border:1px solid #1a3a6b;border-radius:2px;padding:14px 36px;font-family:'Cinzel',serif;font-size:13px;letter-spacing:0.1em;cursor:pointer;text-transform:uppercase;}
.btn-s:hover{background:#1a3a6b;color:#fff;}
.section{padding:56px 32px;border-bottom:1px solid #e0d8c8;}
.section-label{font-size:10px;letter-spacing:0.22em;color:#c9a650;text-transform:uppercase;margin-bottom:8px;}
.section-title{font-family:'Cinzel',serif;font-size:26px;font-weight:500;color:#1a3a6b;letter-spacing:0.04em;}
.section-rule{width:40px;height:2px;background:#c9a650;margin:12px 0 24px;}
.spirit-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;}
.spirit-text p{font-size:16px;color:#555;line-height:1.9;font-weight:300;margin-bottom:16px;}
.obra-tag{display:inline-block;background:#f0f4f9;color:#1a3a6b;font-size:11px;padding:3px 10px;border-radius:2px;margin-top:8px;font-style:italic;}
.pillars{display:flex;flex-direction:column;gap:10px;}
.pillar{background:#f8f6f2;border-left:3px solid #1a3a6b;padding:12px 16px;border-radius:0 4px 4px 0;}
.pillar-title{font-family:'Cinzel',serif;font-size:13px;color:#1a3a6b;margin-bottom:3px;}
.pillar-desc{font-size:13px;color:#666;line-height:1.6;}
.chat-wrapper{background:#f8f6f2;border:1px solid #e0d8c8;border-radius:8px;overflow:hidden;}
.chat-hdr{background:#1a3a6b;padding:16px 20px;display:flex;align-items:center;gap:12px;}
.chat-av{width:38px;height:38px;border-radius:50%;background:rgba(201,166,80,0.2);border:1.5px solid #c9a650;display:flex;align-items:center;justify-content:center;color:#c9a650;font-size:16px;font-family:'Cinzel',serif;flex-shrink:0;}
.chat-hdr h3{font-family:'Cinzel',serif;font-size:15px;color:#fff;letter-spacing:0.08em;margin-bottom:2px;}
.chat-hdr p{font-size:12px;color:rgba(201,166,80,0.8);font-style:italic;}
.chat-notice{background:#fffbf0;border:1px solid #e8d5a0;border-radius:4px;padding:12px 16px;margin:16px;font-size:13.5px;line-height:1.7;color:#7a6830;font-style:italic;}
.chat-msgs{padding:16px;display:flex;flex-direction:column;gap:12px;min-height:120px;max-height:320px;overflow-y:auto;}
.msg{display:flex;gap:10px;align-items:flex-start;}
.msg-dot{width:28px;height:28px;border-radius:50%;background:#1a3a6b;display:flex;align-items:center;justify-content:center;color:#c9a650;font-size:11px;flex-shrink:0;margin-top:2px;font-family:'Cinzel',serif;}
.bubble{background:#fff;border:1px solid #e0d8c8;border-radius:0 8px 8px 8px;padding:10px 14px;font-size:15px;line-height:1.75;color:#333;max-width:85%;}
.msg-u{justify-content:flex-end;}
.msg-u .bubble{background:#1a3a6b;color:#fff;border-radius:8px 0 8px 8px;border-color:#1a3a6b;}
.chat-row{display:flex;gap:8px;padding:12px 16px 16px;border-top:1px solid #e0d8c8;}
.chat-inp{flex:1;border:1px solid #d0c8b8;border-radius:4px;padding:10px 14px;font-family:'Crimson Pro',Georgia,serif;font-size:15px;color:#333;background:#fff;outline:none;}
.chat-inp:focus{border-color:#1a3a6b;}
.chat-btn{width:36px;height:36px;background:#1a3a6b;border:none;border-radius:4px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#fff;}
.chat-btn:hover{background:#0f2447;}
.quote-sec{background:#1a3a6b;padding:48px 32px;text-align:center;}
.q-label{font-size:10px;letter-spacing:0.22em;color:rgba(201,166,80,0.7);text-transform:uppercase;margin-bottom:20px;}
.q-mark{font-family:'Cinzel',serif;font-size:56px;color:#c9a650;opacity:0.3;line-height:0.5;margin-bottom:16px;}
.q-text{font-size:20px;font-style:italic;color:#e8e0cc;max-width:600px;margin:0 auto 20px;line-height:1.8;font-weight:300;}
.q-src{font-size:12px;color:#c9a650;letter-spacing:0.08em;opacity:0.8;}
.footer{padding:28px 32px;display:flex;justify-content:space-between;align-items:center;background:#f8f6f2;flex-wrap:wrap;gap:12px;}
.f-logo{font-family:'Cinzel',serif;font-size:13px;color:#1a3a6b;letter-spacing:0.1em;}
.f-links{display:flex;gap:20px;list-style:none;}
.f-links span{font-size:12px;color:#888;cursor:pointer;}
.f-copy{font-size:11px;color:#aaa;font-style:italic;}
.typing{display:flex;gap:5px;align-items:center;padding:4px 0;}
.typing span{width:7px;height:7px;border-radius:50%;background:#c9a650;animation:bounce 1.2s ease-in-out infinite;}
.typing span:nth-child(2){animation-delay:0.2s;}
.typing span:nth-child(3){animation-delay:0.4s;}
@keyframes bounce{0%,80%,100%{transform:translateY(0);opacity:0.4}40%{transform:translateY(-6px);opacity:1}}
@media(max-width:768px){
  .hero{padding:40px 16px 32px;}
  .hero-title{font-size:36px;}
  .section{padding:36px 16px;}
  .spirit-grid{grid-template-columns:1fr;}
  .footer{padding:20px 16px;flex-direction:column;text-align:center;}
  .f-links{flex-wrap:wrap;justify-content:center;}
}
`

const pillars = [
  { title:'Deus', desc:'Inteligência suprema, causa primária de todas as coisas.' },
  { title:'Imortalidade da Alma', desc:'O espírito sobrevive à morte do corpo físico.' },
  { title:'Reencarnação', desc:'O espírito reencarna múltiplas vezes para evoluir.' },
  { title:'Caridade', desc:'"Fora da caridade não há salvação."' },
  { title:'Comunicação Espiritual', desc:'Os espíritos desencarnados podem se comunicar.' },
]

export default function Home() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([{ role:'assistant', content:'Paz e bem, viajante da luz. Sou Johano, seu guia nos estudos da Doutrina Espírita. O que traz ao seu coração hoje?' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [messages, loading])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    const newMsgs = [...messages, { role:'user', content:text }]
    setMessages(newMsgs)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:1000, system:SYSTEM_PROMPT, messages:newMsgs })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role:'assistant', content: data.content?.[0]?.text || 'Erro ao processar.' }])
    } catch { setMessages(prev => [...prev, { role:'assistant', content:'Erro de conexão.' }]) }
    finally { setLoading(false) }
  }

  return (
    <div style={{ fontFamily:"'Crimson Pro',Georgia,serif" }}>
      <style>{css}</style>
      <Nav />
      <section className="hero">
        <p className="hero-eyebrow">Portal de Estudos Espíritas</p>
        <h1 className="hero-title">JOHANO</h1>
        <p className="hero-sub">Saĝo · Amo · Lumo — Sabedoria · Amor · Luz</p>
        <div className="hero-divider">✦</div>
        <p className="hero-desc">Um espaço de estudo, reflexão e aprofundamento na Doutrina Espírita, aberto a todos que buscam compreender a vida com mais luz.</p>
        <button className="btn-p" onClick={() => document.getElementById('chat').scrollIntoView({behavior:'smooth'})}>Conversar com o Johano</button>
        <button className="btn-s" onClick={() => navigate('/estudos')}>Começar os Estudos</button>
      </section>

      <section className="section">
        <p className="section-label">Fundamentos</p>
        <h2 className="section-title">O que é o Espiritismo?</h2>
        <div className="section-rule"></div>
        <div className="spirit-grid">
          <div className="spirit-text">
            <p>O Espiritismo é uma doutrina que estuda a natureza, a origem e o destino dos espíritos, bem como suas relações com o mundo corporal. Foi codificada por Allan Kardec a partir de 1857 e repousa sobre três pilares: a ciência, a filosofia e a moral cristã.</p>
            <p>Não é uma religião no sentido tradicional, mas uma doutrina racional que busca compreender a vida além da matéria, a imortalidade da alma e a evolução contínua do ser através da reencarnação.</p>
            <p>No Brasil, o Espiritismo encontrou terreno fértil e cresceu profundamente, sendo Chico Xavier o maior nome da literatura espírita nacional.</p>
            <span className="obra-tag">Baseado em "O Que é o Espiritismo" — Allan Kardec (1859)</span>
          </div>
          <div className="pillars">
            {pillars.map((p,i) => (
              <div className="pillar" key={i}>
                <p className="pillar-title">{p.title}</p>
                <p className="pillar-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="chat">
        <p className="section-label">Assistente de Estudos</p>
        <h2 className="section-title">Johano Chat</h2>
        <div className="section-rule"></div>
        <div className="chat-wrapper">
          <div className="chat-hdr">
            <div className="chat-av">✦</div>
            <div><h3>JOHANO</h3><p>Assistente de estudos espíritas — em constante aprendizado</p></div>
          </div>
          <div className="chat-notice">O Johano é uma <strong>muleta para os estudos</strong> — assim como uma muleta não faz você andar, mas auxilia e apoia a caminhada, este assistente não substitui a leitura das obras originais, o convívio no centro espírita ou a orientação de um orientador experiente. Está em constante desenvolvimento e evolução — como todos nós.</div>
          <div className="chat-msgs">
            {messages.map((m,i) => (
              <div key={i} className={`msg${m.role==='user'?' msg-u':''}`}>
                {m.role==='assistant' && <div className="msg-dot">J</div>}
                <div className="bubble">{m.content}</div>
              </div>
            ))}
            {loading && <div className="msg"><div className="msg-dot">J</div><div className="bubble"><div className="typing"><span/><span/><span/></div></div></div>}
            <div ref={bottomRef}/>
          </div>
          <div className="chat-row">
            <input className="chat-inp" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&!e.shiftKey&&(e.preventDefault(),send())} placeholder="Faça sua pergunta sobre a Doutrina..." />
            <button className="chat-btn" onClick={send}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round"/><path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </section>

      <div className="quote-sec">
        <p className="q-label">Frase do Dia</p>
        <div className="q-mark">"</div>
        <p className="q-text">Sede perfeitos, dizia Jesus. Ora, a perfeição é o ideal que todos devemos atingir; mas é um ideal que se conquista progressivamente, e não por um golpe de varinha mágica.</p>
        <p className="q-src">— Allan Kardec · O Evangelho Segundo o Espiritismo</p>
      </div>

      <footer className="footer">
        <div className="f-logo">✦ JOHANO</div>
        <ul className="f-links">
          {[['Estudos','/estudos'],['Biblioteca','/biblioteca'],['Canais','/canais'],['Esperanto','/esperanto'],['Sobre','/sobre']].map(([l,p])=>(
            <li key={p}><span onClick={()=>navigate(p)}>{l}</span></li>
          ))}
        </ul>
        <p className="f-copy">johano.com.br · Luz, Amor e Verdade</p>
      </footer>
    </div>
  )
}

import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SYSTEM_PROMPT = `Vi estas Johano, amikema kaj pacienco instruisto de Esperanto. Via misio estas helpi la uzanton lerni kaj praktiki Esperanton.

Reguloj:
1. Respondu ĈIAM en Esperanto, sed aldonu tradukon en portugala inter krampoj [assim]
2. Estu pacienco kaj kuraĝiga — kiam la uzanto erras, korektu gentile
3. Adaptu vian nivelon al la uzanto — inicianto aŭ meza
4. Proponu ekzercojn, demandojn kaj konversaciojn
5. Foje citu frazojn de la spiritisma doktrino en Esperanto
6. Se la uzanto skribu en portugala, respondu en Esperanto kaj helpu ilin traduki

Ekzempla komenco: "Saluton! Mi estas Johano, via Esperanto-instruisto. Ĉu vi estas komencanto aŭ jam konas iom da Esperanto? [Olá! Sou Johano, seu professor de Esperanto. Você é iniciante ou já conhece um pouco de Esperanto?]"`

function renderMsg(text) {
  return text
    .replace(/\[(.*?)\]/g, '<span style="color:#888;font-style:italic;font-size:0.9em"> [$1]</span>')
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#1a3a6b">$1</strong>')
    .replace(/\n/g, '<br/>')
}

const TypingIndicator = () => (
  <div style={{ display:'flex', gap:'6px', alignItems:'center', padding:'6px 0' }}>
    {[0,1,2].map(i => <div key={i} style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#c9a650', animation:`jb 1.2s ease-in-out ${i*0.2}s infinite` }}/>)}
  </div>
)

export default function EsperantoChat() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([{
    role:'assistant',
    content:'Saluton! Mi estas Johano, via Esperanto-instruisto. 🌟\n\nĈu vi estas komencanto aŭ jam konas iom da Esperanto?\n\n[Olá! Sou Johano, seu professor de Esperanto. Você é iniciante ou já conhece um pouco de Esperanto?]'
  }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const [modo, setModo] = useState('normal') // normal | somenteEo
  const bottomRef = useRef(null)
  const textareaRef = useRef(null)
  const recognitionRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [messages, loading])

  const speak = (texto) => {
    if (!window.speechSynthesis) return
    const clean = texto.replace(/\[.*?\]/g, '').replace(/<[^>]+>/g, '')
    window.speechSynthesis.cancel()
    const utt = new SpeechSynthesisUtterance(clean)
    utt.lang = 'eo'
    utt.rate = 0.85
    window.speechSynthesis.speak(utt)
  }

  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) { alert('Seu navegador não suporta reconhecimento de voz. Use o Chrome!'); return }
    const recognition = new SR()
    recognition.lang = 'eo'
    recognition.continuous = false
    recognition.interimResults = false
    recognition.onstart = () => setListening(true)
    recognition.onresult = (e) => { setInput(e.results[0][0].transcript); setListening(false) }
    recognition.onerror = () => setListening(false)
    recognition.onend = () => setListening(false)
    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop()
    setListening(false)
  }

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    const newMsgs = [...messages, { role:'user', content:text }]
    setMessages(newMsgs)
    setInput('')
    setLoading(true)
    if (textareaRef.current) textareaRef.current.style.height = 'auto'

    const systemFinal = modo === 'somenteEo'
      ? SYSTEM_PROMPT + '\n\nATENTO: Modo avançado ativado. Responda APENAS em Esperanto, sem tradução em português. O usuário quer praticar sem apoio.'
      : SYSTEM_PROMPT

    try {
      const res = await fetch('/api/chat', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ model:'claude-opus-4-5', max_tokens:1000, system:systemFinal, messages:newMsgs })
      })
      const data = await res.json()
      const reply = data.content?.[0]?.text || 'Eraro. Bonvolu reprovi.'
      setMessages(prev => [...prev, { role:'assistant', content:reply }])
    } catch {
      setMessages(prev => [...prev, { role:'assistant', content:'Eraro de konekto. [Erro de conexão. Tente novamente.]' }])
    } finally { setLoading(false) }
  }

  const handleKey = (e) => {
    if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const handleTextarea = (e) => {
    setInput(e.target.value)
    const ta = textareaRef.current
    if (ta) { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 120) + 'px' }
  }

  return (
    <div style={{ display:'flex', height:'100vh', fontFamily:"'Crimson Pro',Georgia,serif", background:'#f8f6f2', flexDirection:'column', overflow:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Crimson+Pro:ital,wght@0,300;0,400;1,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes jb{0%,80%,100%{transform:translateY(0);opacity:0.4}40%{transform:translateY(-6px);opacity:1}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
        .ec-topbar{background:#1a3a6b;padding:12px 20px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
        .ec-msgs{flex:1;overflow-y:auto;padding:20px;scrollbar-width:thin;scrollbar-color:#e0d8c8 transparent;}
        .ec-msgs::-webkit-scrollbar{width:4px;}
        .ec-msgs::-webkit-scrollbar-thumb{background:#e0d8c8;border-radius:2px;}
        .ec-input{background:#fff;border-top:1px solid #e0d8c8;padding:12px 16px;flex-shrink:0;}
        .msg-row{display:flex;gap:10px;margin-bottom:16px;animation:fadeUp 0.3s ease-out;max-width:700px;margin-left:auto;margin-right:auto;width:100%;}
        .msg-row.user{flex-direction:row-reverse;}
        .msg-av{width:30px;height:30px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:12px;margin-top:2px;}
        .msg-av.j{background:rgba(255,255,255,0.15);color:#c9a650;font-family:'Cinzel',serif;border:1px solid rgba(201,166,80,0.3);}
        .msg-av.u{background:#c9a650;color:#fff;}
        .msg-bub{padding:10px 14px;font-size:15px;line-height:1.75;max-width:calc(100% - 42px);}
        .msg-bub.j{background:#fff;border:1px solid #e0d8c8;border-radius:4px 10px 10px 10px;color:#333;}
        .msg-bub.u{background:#1a3a6b;color:#fff;border-radius:10px 4px 10px 10px;}
        .msg-bub.typing{background:#fff;border:1px solid #e0d8c8;border-radius:4px 10px 10px 10px;}
        .msg-speak{background:transparent;border:none;cursor:pointer;color:#aaa;font-size:14px;padding:2px 4px;margin-top:4px;flex-shrink:0;}
        .msg-speak:hover{color:#1a3a6b;}
        .inp-wrap{display:flex;gap:8px;align-items:flex-end;background:#f8f6f2;border:1px solid #d0c8b8;border-radius:8px;padding:8px 12px;transition:border-color 0.2s;}
        .inp-wrap:focus-within{border-color:#1a3a6b;}
        .inp-wrap textarea{flex:1;background:transparent;border:none;outline:none;font-family:'Crimson Pro',Georgia,serif;font-size:16px;color:#333;resize:none;min-height:28px;max-height:120px;line-height:1.6;overflow-y:auto;scrollbar-width:none;}
        .inp-wrap textarea::-webkit-scrollbar{display:none;}
        .inp-wrap textarea::placeholder{color:#aaa;font-style:italic;}
        .mic-btn{width:36px;height:36px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;transition:all 0.2s;}
        .mic-btn.off{background:#f0f4f9;}
        .mic-btn.on{background:#c00;animation:pulse 1s ease-in-out infinite;}
        .send-btn{width:36px;height:36px;background:#1a3a6b;border:none;border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.2s;}
        .send-btn:hover:not(:disabled){background:#0f2447;}
        .send-btn:disabled{background:#ccc;cursor:not-allowed;}
        .modo-btn{font-size:11px;padding:4px 10px;border-radius:4px;border:1px solid rgba(255,255,255,0.3);background:transparent;color:rgba(255,255,255,0.7);cursor:pointer;font-family:'Cinzel',serif;letter-spacing:0.04em;transition:all 0.2s;}
        .modo-btn.active{background:rgba(201,166,80,0.3);border-color:#c9a650;color:#c9a650;}
        @media(max-width:768px){
          .ec-topbar{padding:10px 14px;}
          .ec-msgs{padding:14px 12px;}
          .ec-input{padding:10px 12px;}
          .msg-row{max-width:100%;}
        }
      `}</style>

      {/* TOPBAR */}
      <div className="ec-topbar">
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <button onClick={()=>navigate('/esperanto/aprender')} style={{ background:'rgba(255,255,255,0.15)', border:'none', borderRadius:'4px', padding:'6px 10px', color:'#fff', cursor:'pointer', fontSize:'12px' }}>←</button>
          <div style={{ width:'32px', height:'32px', borderRadius:'50%', background:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', color:'#c9a650', fontFamily:"'Cinzel',serif", fontSize:'14px', border:'1px solid rgba(201,166,80,0.3)' }}>✦</div>
          <div>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:'14px', color:'#fff', letterSpacing:'0.06em', fontWeight:600 }}>JOHANO — Esperanto</div>
            <div style={{ fontSize:'11px', color:'rgba(201,166,80,0.7)', fontStyle:'italic' }}>Babilejo por praktiki Esperanton</div>
          </div>
        </div>
        <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
          <button className={`modo-btn${modo==='somenteEo'?' active':''}`} onClick={()=>setModo(modo==='somenteEo'?'normal':'somenteEo')} title="Modo só Esperanto — sem tradução">🌍 Nur EO</button>
          <button onClick={()=>navigate('/chat')} style={{ background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:'4px', padding:'6px 12px', color:'rgba(255,255,255,0.7)', cursor:'pointer', fontSize:'11px', fontFamily:"'Cinzel',serif" }}>Chat Espírita</button>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="ec-msgs">
        {messages.map((m,i) => (
          <div key={i} className={`msg-row${m.role==='user'?' user':''}`}>
            <div className={`msg-av${m.role==='user'?' u':' j'}`}>{m.role==='user'?'✦':'J'}</div>
            <div className={`msg-bub${m.role==='user'?' u':' j'}`}>
              <div dangerouslySetInnerHTML={{ __html: renderMsg(m.content) }} />
            </div>
            {m.role==='assistant' && (
              <button className="msg-speak" onClick={()=>speak(m.content)} title="Ouvir em Esperanto">🔊</button>
            )}
          </div>
        ))}
        {loading && (
          <div className="msg-row">
            <div className="msg-av j">J</div>
            <div className="msg-bub typing"><TypingIndicator /></div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* INPUT */}
      <div className="ec-input">
        {listening && (
          <div style={{ display:'flex', alignItems:'center', gap:'8px', padding:'6px 0', marginBottom:'6px' }}>
            <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#c00', animation:'pulse 0.8s infinite' }}></div>
            <span style={{ fontSize:'13px', color:'#c00', fontStyle:'italic' }}>Ouvindo em Esperanto... Fale agora!</span>
          </div>
        )}
        <div className="inp-wrap">
          <button className={`mic-btn${listening?' on':' off'}`} onClick={listening?stopListening:startListening} title={listening?'Parar':'Falar em Esperanto'}>
            {listening ? '⏹' : '🎤'}
          </button>
          <textarea ref={textareaRef} value={input} onChange={handleTextarea} onKeyDown={handleKey} placeholder="Skribu en Esperanto... [Escreva em Esperanto...]" rows={1} />
          <button className="send-btn" onClick={send} disabled={!input.trim()||loading}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round"/><path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:'6px', flexWrap:'wrap', gap:'4px' }}>
          <span style={{ fontSize:'11px', color:'#aaa', fontStyle:'italic' }}>🎤 Microfone · 🔊 Ouça as respostas · 🌍 Nur EO = só Esperanto</span>
          <span style={{ fontSize:'11px', color:'#aaa' }}>Enter enviar</span>
        </div>
      </div>
    </div>
  )
}

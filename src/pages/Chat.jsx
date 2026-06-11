import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SYSTEM_PROMPT = `Você é Johano, um assistente espiritual profundamente sábio, sereno e acolhedor, versado nas obras da Doutrina Espírita. Você estuda e conhece com profundidade as seguintes obras e autores:

═══════════════════════════════════════
ALLAN KARDEC — O CODIFICADOR
═══════════════════════════════════════

O LIVRO DOS ESPÍRITOS (1857) — Obra fundamental. Contém 1019 perguntas e respostas sobre:
- Deus: "Deus é a inteligência suprema, causa primária de todas as coisas." (Q.1)
- Espírito: ser imaterial, imortal, criado simples e ignorante, que evolui progressivamente
- Reencarnação: o espírito retorna ao corpo para aprender, expiar e evoluir
- Leis morais: lei de adoração, trabalho, reprodução, conservação, destruição, sociedade, progresso, igualdade, liberdade, justiça, amor, caridade
- Escalas espirituais: impuros, atrasados, pseudossábios, sábios, benevolentes, elevados, puros
- "Fora da caridade não há salvação" — princípio central

O LIVRO DOS MÉDIUNS (1861) — Manual da mediunidade:
- Tipos de médiuns: auditivos, videntes, falantes, escreventes, psicógrafos, curandeiros
- Fenômenos físicos e intelectuais
- Discernimento espiritual
- A obsessão e seus tipos

O EVANGELHO SEGUNDO O ESPIRITISMO (1864) — Moral prática:
- Comentários espíritas aos ensinamentos de Jesus
- Caridade, perdão, oração, arrependimento

O CÉU E O INFERNO (1865) — Vida além da morte:
- Estados do espírito após a morte
- Penas e recompensas proporcionais e temporárias

A GÊNESE (1868) — Ciência e espiritismo:
- Milagres explicados pelas leis naturais
- Cura espiritual e perispírito

═══════════════════════════════════════
CHICO XAVIER — O GRANDE MÉDIUM
═══════════════════════════════════════

SÉRIE ANDRÉ LUIZ: Nosso Lar, Os Mensageiros, Missionários da Luz, Obreiros da Vida Eterna, No Mundo Maior, Libertação, Mecanismos da Mediunidade
SÉRIE EMMANUEL: Caminho Verdade e Vida, Pão Nosso, Fonte Viva
BRASIL CORAÇÃO DO MUNDO PÁTRIA DO EVANGELHO (1938): Missão espiritual do Brasil, história da FEB, papel de Bezerra de Menezes
PARNASO DE ALÉM-TÚMULO: Poesias psicografadas

═══════════════════════════════════════
OUTROS AUTORES
═══════════════════════════════════════
LÉON DENIS: Após a Morte, O Problema do Ser do Destino e da Dor, No Invisível
BEZERRA DE MENEZES: A Loucura Sob Novo Prisma — médico espírita, presidente da FEB
DIVALDO FRANCO: mais de 280 obras, Joanna de Ângelis, Mansão do Caminho

═══════════════════════════════════════
DIRETRIZES
═══════════════════════════════════════
- Seja sereno, compassivo, nunca dogmático
- Formate suas respostas com clareza usando parágrafos bem estruturados
- Use **negrito** para termos importantes, títulos de obras e conceitos centrais
- Use listas quando listar múltiplos itens
- Cite obras e autores com precisão
- Se não souber algo com precisão, seja honesto
- Não faça previsões do futuro nem se passe por médium
- Se o usuário compartilhar um PDF, analise-o com profundidade
- Responda SEMPRE em português brasileiro`

function renderMarkdown(text) {
  if (!text) return ''
  return text
    .replace(/### (.*?)(\n|$)/g, '<h3 style="font-family:\'Cinzel\',serif;font-size:16px;color:#1a3a6b;margin:16px 0 8px;letter-spacing:0.04em;">$1</h3>')
    .replace(/## (.*?)(\n|$)/g, '<h2 style="font-family:\'Cinzel\',serif;font-size:18px;color:#1a3a6b;margin:18px 0 10px;letter-spacing:0.04em;">$1</h2>')
    .replace(/# (.*?)(\n|$)/g, '<h1 style="font-family:\'Cinzel\',serif;font-size:20px;color:#1a3a6b;margin:20px 0 12px;letter-spacing:0.04em;">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#1a3a6b;font-weight:600;">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*?)(\n|$)/gm, '<li style="margin:4px 0 4px 16px;list-style:disc;">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, m => `<ul style="margin:8px 0;">${m}</ul>`)
    .replace(/---/g, '<hr style="border:none;border-top:1px solid #e0d8c8;margin:16px 0;"/>')
    .replace(/\n\n/g, '</p><p style="margin-bottom:14px;">')
    .replace(/\n/g, '<br/>')
    .replace(/^(.)/,'<p style="margin-bottom:14px;">$1')
    .replace(/(.)$/,'$1</p>')
}

const TypingIndicator = () => (
  <div style={{ display:'flex', gap:'6px', alignItems:'center', padding:'4px 0' }}>
    {[0,1,2].map(i => (
      <div key={i} style={{
        width:'8px', height:'8px', borderRadius:'50%', background:'#c9a650',
        animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite`
      }}/>
    ))}
  </div>
)

export default function Chat() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([{
    role:'assistant',
    content:'Paz e bem, viajante da luz. Sou Johano, seu guia nos estudos da Doutrina Espírita.\n\nEstou aqui para refletir contigo sobre as obras de **Kardec**, **Chico Xavier**, **André Luiz** e tantos outros mensageiros da verdade.\n\nPode me fazer perguntas sobre a doutrina, enviar trechos de livros para análise ou simplesmente compartilhar o que traz ao seu coração. O que deseja explorar hoje?'
  }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [pdfContent, setPdfContent] = useState(null)
  const [pdfName, setPdfName] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const bottomRef = useRef(null)
  const fileRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [messages, loading])

  const handlePDF = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPdfName(file.name)
    const reader = new FileReader()
    reader.onload = (ev) => setPdfContent(ev.target.result.split(',')[1])
    reader.readAsDataURL(file)
  }

  const send = async () => {
    const text = input.trim()
    if ((!text && !pdfContent) || loading) return

    let userContent
    if (pdfContent) {
      userContent = [
        { type:'document', source:{ type:'base64', media_type:'application/pdf', data:pdfContent } },
        { type:'text', text: text || 'Analise este documento à luz da Doutrina Espírita e me dê um resumo profundo do seu conteúdo e importância.' }
      ]
    } else {
      userContent = text
    }

    const displayMsg = pdfContent ? `📄 **${pdfName}**${text ? `\n\n${text}` : '\n\nAnalisar este documento'}` : text
    const newMsgs = [...messages, { role:'user', content: displayMsg }]
    setMessages(newMsgs)
    setInput('')
    setPdfContent(null)
    setPdfName(null)
    setLoading(true)

    if (textareaRef.current) { textareaRef.current.style.height = 'auto' }

    try {
      const apiMessages = messages.map(m => ({ role:m.role, content:m.content }))
      apiMessages.push({ role:'user', content: userContent })

      const res = await fetch('/api/chat', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ model:'claude-opus-4-5', max_tokens:2000, system:SYSTEM_PROMPT, messages:apiMessages })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role:'assistant', content: data.content?.[0]?.text || 'Erro ao processar.' }])
    } catch {
      setMessages(prev => [...prev, { role:'assistant', content:'Erro de conexão. Por favor, tente novamente.' }])
    } finally {
      setLoading(false) }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const handleTextarea = (e) => {
    setInput(e.target.value)
    const ta = textareaRef.current
    if (ta) { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 140) + 'px' }
  }

  const clearChat = () => {
    setMessages([{
      role:'assistant',
      content:'Paz e bem. Nova conversa iniciada. O que deseja explorar hoje?'
    }])
  }

  return (
    <div style={{ display:'flex', height:'100vh', fontFamily:"'Crimson Pro',Georgia,serif", background:'#f8f6f2', overflow:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes bounce { 0%,80%,100%{transform:translateY(0);opacity:0.4} 40%{transform:translateY(-6px);opacity:1} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .chat-sidebar { width:240px; background:#fff; border-right:1px solid #e0d8c8; display:flex; flex-direction:column; flex-shrink:0; }
        .chat-main { flex:1; display:flex; flex-direction:column; min-width:0; }
        .chat-topbar { background:#fff; border-bottom:1px solid #e0d8c8; padding:12px 20px; display:flex; align-items:center; justify-content:space-between; flex-shrink:0; }
        .chat-messages { flex:1; overflow-y:auto; padding:24px 20px; scrollbar-width:thin; scrollbar-color:#e0d8c8 transparent; }
        .chat-messages::-webkit-scrollbar { width:4px; }
        .chat-messages::-webkit-scrollbar-thumb { background:#e0d8c8; border-radius:2px; }
        .chat-inputarea { background:#fff; border-top:1px solid #e0d8c8; padding:14px 20px; flex-shrink:0; }
        .msg-row { display:flex; gap:12px; margin-bottom:20px; animation:fadeIn 0.3s ease-out; max-width:800px; margin-left:auto; margin-right:auto; }
        .msg-row.user { flex-direction:row-reverse; }
        .msg-avatar { width:32px; height:32px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-family:'Cinzel',serif; font-size:12px; margin-top:2px; }
        .msg-avatar.j { background:#1a3a6b; color:#c9a650; }
        .msg-avatar.u { background:#c9a650; color:#fff; }
        .msg-bubble { padding:12px 16px; border-radius:12px; font-size:15.5px; line-height:1.75; max-width:calc(100% - 44px); }
        .msg-bubble.j { background:#fff; border:1px solid #e0d8c8; border-radius:4px 12px 12px 12px; color:#333; }
        .msg-bubble.u { background:#1a3a6b; color:#fff; border-radius:12px 4px 12px 12px; }
        .msg-bubble.typing { background:#fff; border:1px solid #e0d8c8; border-radius:4px 12px 12px 12px; }
        .inp-wrap { display:flex; gap:10px; align-items:flex-end; background:#f8f6f2; border:1px solid #d0c8b8; border-radius:8px; padding:10px 14px; transition:border-color 0.2s; }
        .inp-wrap:focus-within { border-color:#1a3a6b; }
        .inp-wrap textarea { flex:1; background:transparent; border:none; outline:none; font-family:'Crimson Pro',Georgia,serif; font-size:16px; color:#333; resize:none; min-height:28px; max-height:140px; line-height:1.6; overflow-y:auto; scrollbar-width:none; }
        .inp-wrap textarea::-webkit-scrollbar { display:none; }
        .inp-wrap textarea::placeholder { color:#aaa; font-style:italic; }
        .send-btn { width:36px; height:36px; background:#1a3a6b; border:none; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all 0.2s; }
        .send-btn:hover:not(:disabled) { background:#0f2447; }
        .send-btn:disabled { background:#ccc; cursor:not-allowed; }
        .sidebar-btn { display:flex; align-items:center; gap:8px; padding:10px 14px; border-radius:6px; cursor:pointer; font-size:13.5px; color:#666; background:transparent; border:none; width:100%; text-align:left; font-family:'Crimson Pro',Georgia,serif; transition:all 0.15s; }
        .sidebar-btn:hover { background:#f8f6f2; color:#1a3a6b; }
        .sidebar-btn.active { background:#eef2f8; color:#1a3a6b; font-weight:500; }
        .pdf-tag { display:flex; align-items:center; gap:6px; padding:6px 10px; background:#eef2f8; border-radius:4px; margin-bottom:8px; }
        .pdf-tag span { font-size:12px; color:#1a3a6b; flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .pdf-tag button { background:transparent; border:none; cursor:pointer; color:#aaa; font-size:14px; }
        .mob-back { display:none; }
        @media(max-width:768px) {
          .chat-sidebar { display:none; }
          .mob-back { display:flex; }
          .chat-messages { padding:16px 12px; }
          .chat-inputarea { padding:10px 12px; }
          .msg-row { max-width:100%; }
          .msg-bubble { font-size:15px; }
          .inp-wrap textarea { font-size:16px; }
        }
      `}</style>

      {/* SIDEBAR */}
      <aside className="chat-sidebar">
        <div style={{ padding:'18px 16px 14px', borderBottom:'1px solid #e0d8c8' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px', cursor:'pointer' }} onClick={()=>navigate('/')}>
            <div style={{ width:'26px', height:'26px', background:'#1a3a6b', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#c9a650', fontSize:'12px' }}>✦</div>
            <span style={{ fontFamily:"'Cinzel',serif", fontSize:'15px', fontWeight:600, color:'#1a3a6b', letterSpacing:'0.1em' }}>JOHANO</span>
          </div>
        </div>

        <div style={{ padding:'12px 10px', flex:1 }}>
          <div style={{ fontSize:'9px', letterSpacing:'0.18em', color:'#aaa', textTransform:'uppercase', padding:'4px 6px 8px' }}>Ações</div>
          <button className="sidebar-btn active" onClick={()=>navigate('/chat')}>💬 Chat Espírita</button>
          <button className="sidebar-btn" onClick={clearChat}>✨ Nova conversa</button>
          <button className="sidebar-btn" onClick={()=>fileRef.current.click()}>📎 Enviar PDF</button>

          <div style={{ fontSize:'9px', letterSpacing:'0.18em', color:'#aaa', textTransform:'uppercase', padding:'16px 6px 8px' }}>Navegação</div>
          <button className="sidebar-btn" onClick={()=>navigate('/')}>🏠 Página inicial</button>
          <button className="sidebar-btn" onClick={()=>navigate('/estudos')}>📖 Estudos</button>
          <button className="sidebar-btn" onClick={()=>navigate('/biblioteca')}>📚 Biblioteca</button>
          <button className="sidebar-btn" onClick={()=>navigate('/glossario')}>📝 Glossário</button>
        </div>

        <div style={{ padding:'14px 16px', borderTop:'1px solid #e0d8c8' }}>
          <p style={{ fontSize:'11px', color:'#aaa', fontStyle:'italic', lineHeight:1.5 }}>O Johano é uma muleta para os estudos — não substitui as obras originais.</p>
        </div>
      </aside>

      {/* MAIN */}
      <div className="chat-main">
        {/* TOPBAR */}
        <div className="chat-topbar">
          <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
            <button className="mob-back" onClick={()=>navigate('/')} style={{ background:'transparent', border:'none', cursor:'pointer', color:'#1a3a6b', fontSize:'20px', padding:'0 4px' }}>←</button>
            <div style={{ width:'34px', height:'34px', borderRadius:'50%', background:'#1a3a6b', display:'flex', alignItems:'center', justifyContent:'center', color:'#c9a650', fontSize:'14px', fontFamily:"'Cinzel',serif" }}>✦</div>
            <div>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:'15px', color:'#1a3a6b', letterSpacing:'0.06em', fontWeight:600 }}>JOHANO</div>
              <div style={{ fontSize:'12px', color:'#aaa', fontStyle:'italic' }}>Guia nos estudos da Doutrina Espírita</div>
            </div>
          </div>
          <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
            <button onClick={clearChat} style={{ background:'transparent', border:'1px solid #e0d8c8', borderRadius:'4px', padding:'6px 12px', fontSize:'12px', color:'#666', cursor:'pointer', fontFamily:"'Crimson Pro',Georgia,serif" }}>Nova conversa</button>
            <button onClick={()=>navigate('/')} style={{ background:'#1a3a6b', border:'none', borderRadius:'4px', padding:'6px 14px', fontSize:'12px', color:'#fff', cursor:'pointer', fontFamily:"'Cinzel',serif", letterSpacing:'0.04em' }}>← Voltar ao site</button>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`msg-row${m.role==='user'?' user':''}`}>
              <div className={`msg-avatar${m.role==='user'?' u':' j'}`}>{m.role==='user' ? '✦' : 'J'}</div>
              <div className={`msg-bubble${m.role==='user'?' u':' j'}`}>
                {m.role==='assistant'
                  ? <div dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }} />
                  : <div dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }} />
                }
              </div>
            </div>
          ))}
          {loading && (
            <div className="msg-row">
              <div className="msg-avatar j">J</div>
              <div className="msg-bubble typing"><TypingIndicator /></div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <div className="chat-inputarea">
          {pdfName && (
            <div className="pdf-tag">
              <span>📄</span>
              <span>{pdfName}</span>
              <button onClick={()=>{setPdfContent(null);setPdfName(null)}}>✕</button>
            </div>
          )}
          <div className="inp-wrap">
            <input ref={fileRef} type="file" accept="application/pdf" style={{display:'none'}} onChange={handlePDF} />
            <button onClick={()=>fileRef.current.click()} style={{ background:'transparent', border:'none', cursor:'pointer', color:'#aaa', fontSize:'18px', padding:'0 4px', flexShrink:0, transition:'color 0.2s' }} title="Enviar PDF" onMouseOver={e=>e.target.style.color='#1a3a6b'} onMouseOut={e=>e.target.style.color='#aaa'}>📎</button>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextarea}
              onKeyDown={handleKey}
              placeholder="Faça sua pergunta sobre a Doutrina Espírita... (Enter para enviar, Shift+Enter para nova linha)"
              rows={1}
            />
            <button className="send-btn" onClick={send} disabled={(!input.trim() && !pdfContent) || loading}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:'6px' }}>
            <span style={{ fontSize:'11px', color:'#aaa', fontStyle:'italic' }}>📎 Clique no clipe para enviar um PDF para análise</span>
            <span style={{ fontSize:'11px', color:'#aaa' }}>Enter para enviar · Shift+Enter para nova linha</span>
          </div>
        </div>
      </div>
    </div>
  )
}
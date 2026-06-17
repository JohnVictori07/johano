import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SYSTEM_PROMPT = `Você é Johano, um assistente espiritual profundamente sábio, sereno e acolhedor, versado nas obras da Doutrina Espírita. Você estuda e conhece com profundidade as seguintes obras e autores:

ALLAN KARDEC — O CODIFICADOR:
O LIVRO DOS ESPÍRITOS (1857): 1019 perguntas e respostas. "Deus é a inteligência suprema, causa primária de todas as coisas." Espírito imortal, reencarnação, leis morais, escalas espirituais, "Fora da caridade não há salvação."
O LIVRO DOS MÉDIUNS (1861): Tipos de médiuns, fenômenos físicos e intelectuais, discernimento, obsessão e seus tipos.
O EVANGELHO SEGUNDO O ESPIRITISMO (1864): Comentários aos ensinamentos de Jesus, caridade, perdão, oração, arrependimento.
O CÉU E O INFERNO (1865): Estados do espírito após a morte, penas e recompensas proporcionais e temporárias.
A GÊNESE (1868): Milagres explicados pelas leis naturais, cura espiritual, perispírito.
O QUE É O ESPIRITISMO (1859): Introdução — ciência, filosofia e religião.

CHICO XAVIER — O GRANDE MÉDIUM:
SÉRIE ANDRÉ LUIZ: Nosso Lar (colônia espiritual, ministérios, vida no além), Os Mensageiros, Missionários da Luz (preparação para reencarnar), Obreiros da Vida Eterna, No Mundo Maior, Libertação (obsessão), Mecanismos da Mediunidade.
SÉRIE EMMANUEL: Caminho Verdade e Vida, Pão Nosso, Fonte Viva.
BRASIL CORAÇÃO DO MUNDO PÁTRIA DO EVANGELHO (1938): Missão espiritual do Brasil, história da FEB, Bezerra de Menezes. Ditado pelo espírito Humberto de Campos.
PARNASO DE ALÉM-TÚMULO: Poesias psicografadas.

LÉON DENIS: Após a Morte, O Problema do Ser do Destino e da Dor, No Invisível, Jesus e o Espiritismo.
BEZERRA DE MENEZES (1831-1900): A Loucura Sob Novo Prisma, médico espírita, presidente da FEB, "médico dos pobres."
DIVALDO FRANCO: Mais de 280 obras, Joanna de Ângelis, Mansão do Caminho em Salvador.

CONCEITOS FUNDAMENTAIS:
- Perispírito: envoltório semimaterial entre espírito e corpo
- Reencarnação: escolha do espírito, não punição
- Obsessão: simples, fascinação, subjugação. Tratamento: prece, desobsessão, reforma íntima
- Caridade: não apenas material — tolerância, perdão, compaixão
- Lei de Causa e Efeito: colhemos o que semeamos, não necessariamente na mesma vida
- Prece: elevação sincera do pensamento, não fórmula mágica

DIRETRIZES:
- Seja sereno, compassivo, nunca dogmático
- Formate respostas com clareza: use **negrito** para termos importantes, ## para títulos de seções quando necessário, - para listas
- Cite obras e autores com precisão
- Se não souber algo com precisão, seja honesto
- Não faça previsões do futuro nem se passe por médium
- Se o usuário compartilhar um PDF, analise-o com profundidade à luz da doutrina
- Responda SEMPRE em português brasileiro`

function renderMarkdown(text) {
  if (!text) return ''
  let html = text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/### (.*?)(\n|$)/g, '<h3 style="font-family:\'Cinzel\',serif;font-size:15px;color:#1a3a6b;margin:16px 0 8px;letter-spacing:0.04em;font-weight:600;">$1</h3>')
    .replace(/## (.*?)(\n|$)/g, '<h2 style="font-family:\'Cinzel\',serif;font-size:17px;color:#1a3a6b;margin:18px 0 10px;letter-spacing:0.04em;font-weight:600;">$1</h2>')
    .replace(/# (.*?)(\n|$)/g, '<h1 style="font-family:\'Cinzel\',serif;font-size:19px;color:#1a3a6b;margin:20px 0 12px;letter-spacing:0.04em;font-weight:600;">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#1a3a6b;font-weight:600;">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em style="color:#555;">$1</em>')
    .replace(/^- (.*?)$/gm, '<li style="margin:4px 0 4px 20px;list-style:disc;color:#444;">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, m => `<ul style="margin:10px 0;">${m}</ul>`)
    .replace(/---/g, '<hr style="border:none;border-top:1px solid #e0d8c8;margin:16px 0;"/>')
    .replace(/\n\n/g, '</p><p style="margin:12px 0;">')
    .replace(/\n/g, '<br/>')
  return `<p style="margin:0;">${html}</p>`
}

const TypingIndicator = () => (
  <div style={{ display:'flex', gap:'6px', alignItems:'center', padding:'6px 0' }}>
    {[0,1,2].map(i => (
      <div key={i} style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#c9a650', animation:`jbounce 1.2s ease-in-out ${i*0.2}s infinite` }}/>
    ))}
  </div>
)

function generateTitle(content) {
  const text = typeof content === 'string' ? content : 'Nova conversa'
  return text.length > 40 ? text.substring(0, 40) + '...' : text
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, '').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&nbsp;/g,' ')
}

function cleanMarkdown(text) {
  return text
    .replace(/#{1,3} /g, '')           // remove ## headers
    .replace(/\*\*(.*?)\*\*/g, '$1')   // remove **bold**
    .replace(/\*(.*?)\*/g, '$1')       // remove *italic*
    .replace(/^> /gm, '')              // remove blockquotes >
    .replace(/^- /gm, '• ')           // convert lists
    .replace(/---/g, '')               // remove separators
    .replace(/\n{3,}/g, '\n\n')        // max 2 newlines
    .trim()
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const paragraphs = text.split('\n')
  let currentY = y
  const allLines = []

  for (const para of paragraphs) {
    if (para.trim() === '') {
      allLines.push({ text: '', y: currentY, empty: true })
      currentY += lineHeight * 0.6
      continue
    }
    const words = para.split(' ')
    let line = ''
    for (const word of words) {
      const test = line ? line + ' ' + word : word
      if (ctx.measureText(test).width > maxWidth && line) {
        allLines.push({ text: line, y: currentY })
        currentY += lineHeight
        line = word
      } else {
        line = test
      }
    }
    if (line) {
      allLines.push({ text: line, y: currentY })
      currentY += lineHeight
    }
  }
  return { lines: allLines, totalHeight: currentY - y }
}

function generateShareImage(text, callback) {
  const clean = cleanMarkdown(text)

  // Calcular altura necessaria dinamicamente
  const canvas = document.createElement('canvas')
  canvas.width = 1080
  const ctx = canvas.getContext('2d')
  ctx.font = '30px Georgia, serif'

  const maxWidth = 860
  const lineHeight = 48
  const startY = 200
  const padding = 100
  const footerH = 140

  // Pre-calcular linhas para saber altura total
  const { lines, totalHeight } = wrapText(ctx, clean, 110, startY, maxWidth, lineHeight)
  const canvasH = Math.max(900, startY + totalHeight + footerH + padding)
  canvas.height = canvasH

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 0, canvasH)
  grad.addColorStop(0, '#0d1f3c')
  grad.addColorStop(1, '#1a3a6b')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 1080, canvasH)

  // Left accent line
  ctx.fillStyle = '#c9a650'
  ctx.fillRect(60, 0, 3, canvasH)

  // Header background
  ctx.fillStyle = 'rgba(0,0,0,0.2)'
  ctx.fillRect(0, 0, 1080, 130)

  // Star + Logo
  ctx.fillStyle = '#c9a650'
  ctx.font = 'bold 44px serif'
  ctx.fillText('✦', 90, 85)

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 38px Georgia, serif'
  ctx.fillText('JOHANO', 155, 85)

  ctx.fillStyle = 'rgba(201,166,80,0.5)'
  ctx.font = 'italic 20px Georgia, serif'
  ctx.fillText('Portal de Estudos Espíritas', 157, 112)

  // Header separator
  ctx.fillStyle = 'rgba(201,166,80,0.35)'
  ctx.fillRect(90, 135, 900, 1)

  // Quote decoration
  ctx.fillStyle = 'rgba(201,166,80,0.12)'
  ctx.font = 'bold 160px Georgia, serif'
  ctx.fillText('"', 70, 310)

  // Draw text lines
  ctx.font = '30px Georgia, serif'
  for (const line of lines) {
    if (line.empty) continue
    // Highlight lines that look like titles (short lines after empty)
    const isBullet = line.text.startsWith('•')
    if (isBullet) {
      ctx.fillStyle = '#c9a650'
      ctx.font = 'bold 30px Georgia, serif'
    } else {
      ctx.fillStyle = '#e8e0cc'
      ctx.font = '30px Georgia, serif'
    }
    ctx.fillText(line.text, 110, line.y)
  }

  // Footer
  const footerY = canvasH - footerH
  ctx.fillStyle = 'rgba(201,166,80,0.25)'
  ctx.fillRect(90, footerY, 900, 1)

  ctx.fillStyle = 'rgba(201,166,80,0.6)'
  ctx.font = 'italic 22px Georgia, serif'
  ctx.fillText('Saĝo · Amo · Lumo — Sabedoria · Amor · Luz', 90, footerY + 35)

  ctx.fillStyle = '#c9a650'
  ctx.font = 'bold 24px Georgia, serif'
  ctx.fillText('johano.com.br/chat', 90, footerY + 70)

  // Star watermark bottom right
  ctx.fillStyle = 'rgba(201,166,80,0.08)'
  ctx.font = 'bold 180px serif'
  ctx.fillText('✦', 830, canvasH - 20)

  callback(canvas.toDataURL('image/png'))
}

export default function Chat() {
  const navigate = useNavigate()
  const [conversations, setConversations] = useState(() => {
    try {
      const saved = localStorage.getItem('johano_conversations')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })
  const [currentId, setCurrentId] = useState(null)
  const [messages, setMessages] = useState([{
    role:'assistant',
    content:'Paz e bem, viajante da luz. Sou Johano, seu guia nos estudos da Doutrina Espírita.\n\nEstou aqui para refletir contigo sobre as obras de **Kardec**, **Chico Xavier**, **André Luiz** e tantos outros mensageiros da verdade.\n\nPode me fazer perguntas sobre a doutrina, enviar trechos de livros para análise ou simplesmente compartilhar o que traz ao seu coração. O que deseja explorar hoje?'
  }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [pdfContent, setPdfContent] = useState(null)
  const [pdfName, setPdfName] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [shareToast, setShareToast] = useState(false)
  const [shareModal, setShareModal] = useState(null)
  const [shareImg, setShareImg] = useState(null)
  const bottomRef = useRef(null)
  const fileRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [messages, loading])

  const saveConversation = (msgs, id) => {
    if (msgs.length <= 1) return
    const title = generateTitle(msgs.find(m => m.role === 'user')?.content || 'Conversa')
    const conv = { id, title, messages: msgs, updatedAt: Date.now() }
    setConversations(prev => {
      const filtered = prev.filter(c => c.id !== id)
      const updated = [conv, ...filtered].slice(0, 30)
      try { localStorage.setItem('johano_conversations', JSON.stringify(updated)) } catch {}
      return updated
    })
  }

  const handlePDF = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPdfName(file.name)
    const reader = new FileReader()
    reader.onload = (ev) => setPdfContent(ev.target.result.split(',')[1])
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const send = async () => {
    const text = input.trim()
    if ((!text && !pdfContent) || loading) return

    const id = currentId || Date.now().toString()
    if (!currentId) setCurrentId(id)

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
      const reply = data.content?.[0]?.text || 'Erro ao processar.'
      const finalMsgs = [...newMsgs, { role:'assistant', content: reply }]
      setMessages(finalMsgs)
      saveConversation(finalMsgs, id)
    } catch {
      setMessages(prev => [...prev, { role:'assistant', content:'Erro de conexão. Por favor, tente novamente.' }])
    } finally { setLoading(false) }
  }

  const newConversation = () => {
    if (messages.length > 1 && currentId) saveConversation(messages, currentId)
    setCurrentId(null)
    setMessages([{ role:'assistant', content:'Paz e bem. Nova conversa iniciada.\n\nO que deseja explorar hoje?' }])
    setDrawerOpen(false)
  }

  const loadConversation = (conv) => {
    if (messages.length > 1 && currentId) saveConversation(messages, currentId)
    setCurrentId(conv.id)
    setMessages(conv.messages)
    setDrawerOpen(false)
  }

  const deleteConversation = (e, id) => {
    e.stopPropagation()
    setConversations(prev => {
      const updated = prev.filter(c => c.id !== id)
      try { localStorage.setItem('johano_conversations', JSON.stringify(updated)) } catch {}
      return updated
    })
    if (currentId === id) newConversation()
  }

  const shareChat = () => {
    const url = 'https://www.johano.com.br/chat'
    if (navigator.share) {
      navigator.share({ title:'Johano — Chat Espírita', text:'Conheça o Johano, assistente de estudos da Doutrina Espírita!', url })
    } else {
      navigator.clipboard.writeText(url)
      setShareToast(true)
      setTimeout(() => setShareToast(false), 2500)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const handleTextarea = (e) => {
    setInput(e.target.value)
    const ta = textareaRef.current
    if (ta) { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 140) + 'px' }
  }

  const SidebarContent = () => (
    <>
      <div style={{ padding:'18px 16px 14px', borderBottom:'1px solid #e0d8c8', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px', cursor:'pointer' }} onClick={()=>{ navigate('/'); setDrawerOpen(false) }}>
          <div style={{ width:'26px', height:'26px', background:'#1a3a6b', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#c9a650', fontSize:'12px' }}>✦</div>
          <span style={{ fontFamily:"'Cinzel',serif", fontSize:'15px', fontWeight:600, color:'#1a3a6b', letterSpacing:'0.1em' }}>JOHANO</span>
        </div>
        <button onClick={()=>setDrawerOpen(false)} style={{ display:'none', background:'transparent', border:'none', cursor:'pointer', fontSize:'20px', color:'#aaa' }} className="drawer-close">✕</button>
      </div>

      <div style={{ padding:'10px 10px 0' }}>
        <div style={{ fontSize:'9px', letterSpacing:'0.18em', color:'#aaa', textTransform:'uppercase', padding:'4px 6px 6px' }}>Ações</div>
        <button className="sb-btn active" onClick={newConversation}>✨ Nova conversa</button>
        <button className="sb-btn" onClick={()=>{ fileRef.current.click(); setDrawerOpen(false) }}>📎 Enviar PDF</button>
        <button className="sb-btn" onClick={shareChat}>🔗 Compartilhar Johano</button>

        <div style={{ fontSize:'9px', letterSpacing:'0.18em', color:'#aaa', textTransform:'uppercase', padding:'14px 6px 6px' }}>Navegação</div>
        <button className="sb-btn" onClick={()=>{ navigate('/'); setDrawerOpen(false) }}>🏠 Página inicial</button>
        <button className="sb-btn" onClick={()=>{ navigate('/estudos'); setDrawerOpen(false) }}>📖 Estudos</button>
        <button className="sb-btn" onClick={()=>{ navigate('/biblioteca'); setDrawerOpen(false) }}>📚 Biblioteca</button>
        <button className="sb-btn" onClick={()=>{ navigate('/glossario'); setDrawerOpen(false) }}>📝 Glossário</button>

        {conversations.length > 0 && (
          <>
            <div style={{ fontSize:'9px', letterSpacing:'0.18em', color:'#aaa', textTransform:'uppercase', padding:'14px 6px 6px' }}>Histórico</div>
            <div style={{ maxHeight:'240px', overflowY:'auto', scrollbarWidth:'thin' }}>
              {conversations.map(conv => (
                <div key={conv.id} className={`sb-history-item${currentId===conv.id?' active':''}`} onClick={()=>loadConversation(conv)}>
                  <span style={{ flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontSize:'13px' }}>💬 {conv.title}</span>
                  <button onClick={e=>deleteConversation(e,conv.id)} style={{ background:'transparent', border:'none', cursor:'pointer', color:'#ccc', fontSize:'14px', padding:'0 2px', flexShrink:0 }} title="Excluir">🗑</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div style={{ marginTop:'auto', padding:'14px 16px', borderTop:'1px solid #e0d8c8' }}>
        <p style={{ fontSize:'11px', color:'#aaa', fontStyle:'italic', lineHeight:1.5 }}>💾 Histórico salvo neste navegador e dispositivo.</p>
        <p style={{ fontSize:'11px', color:'#aaa', fontStyle:'italic', lineHeight:1.5, marginTop:'4px' }}>O Johano não substitui as obras originais.</p>
      </div>
    </>
  )

  return (
    <div style={{ display:'flex', height:'100vh', fontFamily:"'Crimson Pro',Georgia,serif", background:'#f8f6f2', overflow:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes jbounce { 0%,80%,100%{transform:translateY(0);opacity:0.4} 40%{transform:translateY(-6px);opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn { from{transform:translateX(-100%)} to{transform:translateX(0)} }

        .chat-sidebar { width:240px; background:#fff; border-right:1px solid #e0d8c8; display:flex; flex-direction:column; flex-shrink:0; overflow-y:auto; }
        .chat-main { flex:1; display:flex; flex-direction:column; min-width:0; }
        .chat-topbar { background:#fff; border-bottom:1px solid #e0d8c8; padding:12px 20px; display:flex; align-items:center; justify-content:space-between; flex-shrink:0; gap:10px; }
        .chat-messages { flex:1; overflow-y:auto; padding:24px 20px; scrollbar-width:thin; scrollbar-color:#e0d8c8 transparent; }
        .chat-messages::-webkit-scrollbar { width:4px; }
        .chat-messages::-webkit-scrollbar-thumb { background:#e0d8c8; border-radius:2px; }
        .chat-inputarea { background:#fff; border-top:1px solid #e0d8c8; padding:14px 20px; flex-shrink:0; }

        .msg-row { display:flex; gap:12px; margin-bottom:20px; animation:fadeUp 0.3s ease-out; max-width:780px; margin-left:auto; margin-right:auto; width:100%; }
        .msg-row.user { flex-direction:row-reverse; }
        .msg-av { width:32px; height:32px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:12px; margin-top:2px; }
        .msg-av.j { background:#1a3a6b; color:#c9a650; font-family:'Cinzel',serif; }
        .msg-av.u { background:#c9a650; color:#fff; }
        .msg-bub { padding:12px 16px; font-size:15.5px; line-height:1.75; max-width:calc(100% - 44px); }
        .msg-bub.j { background:#fff; border:1px solid #e0d8c8; border-radius:4px 12px 12px 12px; color:#333; }
        .msg-bub.u { background:#1a3a6b; color:#fff; border-radius:12px 4px 12px 12px; }
        .msg-bub.typing { background:#fff; border:1px solid #e0d8c8; border-radius:4px 12px 12px 12px; }

        .inp-wrap { display:flex; gap:10px; align-items:flex-end; background:#f8f6f2; border:1px solid #d0c8b8; border-radius:8px; padding:10px 14px; transition:border-color 0.2s; }
        .inp-wrap:focus-within { border-color:#1a3a6b; }
        .inp-wrap textarea { flex:1; background:transparent; border:none; outline:none; font-family:'Crimson Pro',Georgia,serif; font-size:16px; color:#333; resize:none; min-height:28px; max-height:140px; line-height:1.6; overflow-y:auto; scrollbar-width:none; }
        .inp-wrap textarea::-webkit-scrollbar { display:none; }
        .inp-wrap textarea::placeholder { color:#aaa; font-style:italic; }
        .send-btn { width:36px; height:36px; background:#1a3a6b; border:none; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:background 0.2s; }
        .send-btn:hover:not(:disabled) { background:#0f2447; }
        .send-btn:disabled { background:#ccc; cursor:not-allowed; }

        .sb-btn { display:flex; align-items:center; gap:8px; padding:9px 12px; border-radius:6px; cursor:pointer; font-size:13.5px; color:#555; background:transparent; border:none; width:100%; text-align:left; font-family:'Crimson Pro',Georgia,serif; transition:all 0.15s; margin-bottom:1px; }
        .sb-btn:hover { background:#f8f6f2; color:#1a3a6b; }
        .sb-btn.active { background:#eef2f8; color:#1a3a6b; font-weight:500; }
        .sb-history-item { display:flex; align-items:center; gap:6px; padding:8px 10px; border-radius:6px; cursor:pointer; transition:all 0.15s; margin-bottom:1px; }
        .sb-history-item:hover { background:#f8f6f2; }
        .sb-history-item.active { background:#eef2f8; }

        .pdf-tag { display:flex; align-items:center; gap:6px; padding:7px 12px; background:#eef2f8; border-radius:6px; margin-bottom:8px; }
        .pdf-tag span { font-size:12px; color:#1a3a6b; flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .pdf-tag button { background:transparent; border:none; cursor:pointer; color:#aaa; font-size:16px; }

        .toast { position:fixed; bottom:80px; left:50%; transform:translateX(-50%); background:#1a3a6b; color:#fff; padding:10px 20px; border-radius:6px; font-size:13px; font-family:'Cinzel',serif; letter-spacing:0.04em; z-index:999; pointer-events:none; }

        /* MOBILE */
        .mob-menu-btn { display:none; background:transparent; border:none; cursor:pointer; padding:4px; flex-direction:column; gap:4px; }
        .mob-menu-btn span { display:block; width:20px; height:2px; background:#1a3a6b; border-radius:2px; }
        .drawer-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.4); z-index:300; }
        .drawer-panel { position:fixed; top:0; left:0; width:260px; height:100vh; background:#fff; z-index:301; display:flex; flex-direction:column; overflow-y:auto; animation:slideIn 0.25s ease-out; }
        .drawer-close-btn { display:flex !important; }

        @media(max-width:768px) {
          .chat-sidebar { display:none; }
          .mob-menu-btn { display:flex; }
          .chat-messages { padding:16px 12px; }
          .chat-inputarea { padding:10px 12px; }
          .msg-row { max-width:100%; }
          .msg-bub { font-size:15px; padding:10px 14px; }
          .inp-wrap textarea { font-size:16px; }
          .chat-topbar { padding:10px 14px; }
        }
      `}</style>

      {/* DESKTOP SIDEBAR */}
      <aside className="chat-sidebar">
        <SidebarContent />
      </aside>

      {/* MOBILE DRAWER */}
      {drawerOpen && (
        <>
          <div className="drawer-overlay" onClick={()=>setDrawerOpen(false)} />
          <div className="drawer-panel">
            <div style={{ padding:'18px 16px 14px', borderBottom:'1px solid #e0d8c8', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                <div style={{ width:'26px', height:'26px', background:'#1a3a6b', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#c9a650', fontSize:'12px' }}>✦</div>
                <span style={{ fontFamily:"'Cinzel',serif", fontSize:'15px', fontWeight:600, color:'#1a3a6b', letterSpacing:'0.1em' }}>JOHANO</span>
              </div>
              <button onClick={()=>setDrawerOpen(false)} style={{ background:'transparent', border:'none', cursor:'pointer', fontSize:'20px', color:'#aaa' }}>✕</button>
            </div>
            <div style={{ padding:'10px 10px 0', flex:1 }}>
              <div style={{ fontSize:'9px', letterSpacing:'0.18em', color:'#aaa', textTransform:'uppercase', padding:'4px 6px 6px' }}>Ações</div>
              <button className="sb-btn" onClick={newConversation}>✨ Nova conversa</button>
              <button className="sb-btn" onClick={()=>{ fileRef.current.click(); setDrawerOpen(false) }}>📎 Enviar PDF</button>
              <button className="sb-btn" onClick={()=>{ shareChat(); setDrawerOpen(false) }}>🔗 Compartilhar Johano</button>
              <div style={{ fontSize:'9px', letterSpacing:'0.18em', color:'#aaa', textTransform:'uppercase', padding:'14px 6px 6px' }}>Navegação</div>
              <button className="sb-btn" onClick={()=>{ navigate('/'); setDrawerOpen(false) }}>🏠 Página inicial</button>
              <button className="sb-btn" onClick={()=>{ navigate('/estudos'); setDrawerOpen(false) }}>📖 Estudos</button>
              <button className="sb-btn" onClick={()=>{ navigate('/biblioteca'); setDrawerOpen(false) }}>📚 Biblioteca</button>
              <button className="sb-btn" onClick={()=>{ navigate('/glossario'); setDrawerOpen(false) }}>📝 Glossário</button>
              {conversations.length > 0 && (
                <>
                  <div style={{ fontSize:'9px', letterSpacing:'0.18em', color:'#aaa', textTransform:'uppercase', padding:'14px 6px 6px' }}>Histórico</div>
                  {conversations.map(conv => (
                    <div key={conv.id} className={`sb-history-item${currentId===conv.id?' active':''}`} onClick={()=>loadConversation(conv)}>
                      <span style={{ flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontSize:'13px' }}>💬 {conv.title}</span>
                      <button onClick={e=>deleteConversation(e,conv.id)} style={{ background:'transparent', border:'none', cursor:'pointer', color:'#ccc', fontSize:'14px' }}>🗑</button>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div style={{ padding:'14px 16px', borderTop:'1px solid #e0d8c8' }}>
              <p style={{ fontSize:'11px', color:'#aaa', fontStyle:'italic', lineHeight:1.5 }}>💾 Histórico salvo neste navegador e dispositivo.</p>
            </div>
          </div>
        </>
      )}

      {/* MAIN */}
      <div className="chat-main">
        <div className="chat-topbar">
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <button className="mob-menu-btn" onClick={()=>setDrawerOpen(true)} aria-label="Menu">
              <span/><span/><span/>
            </button>
            <div style={{ width:'32px', height:'32px', borderRadius:'50%', background:'#1a3a6b', display:'flex', alignItems:'center', justifyContent:'center', color:'#c9a650', fontSize:'13px', fontFamily:"'Cinzel',serif", flexShrink:0 }}>✦</div>
            <div>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:'14px', color:'#1a3a6b', letterSpacing:'0.06em', fontWeight:600 }}>JOHANO</div>
              <div style={{ fontSize:'11px', color:'#aaa', fontStyle:'italic' }}>Guia nos estudos da Doutrina Espírita</div>
            </div>
          </div>
          <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
            <button onClick={newConversation} style={{ background:'transparent', border:'1px solid #e0d8c8', borderRadius:'4px', padding:'6px 12px', fontSize:'12px', color:'#666', cursor:'pointer', fontFamily:"'Crimson Pro',Georgia,serif", whiteSpace:'nowrap' }}>Nova conversa</button>
            <button onClick={()=>navigate('/')} style={{ background:'#1a3a6b', border:'none', borderRadius:'4px', padding:'6px 14px', fontSize:'12px', color:'#fff', cursor:'pointer', fontFamily:"'Cinzel',serif", letterSpacing:'0.04em', whiteSpace:'nowrap' }}>← Voltar ao site</button>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`msg-row${m.role==='user'?' user':''}`}>
              <div className={`msg-av${m.role==='user'?' u':' j'}`}>{m.role==='user' ? '✦' : 'J'}</div>
              <div style={{ maxWidth:'calc(100% - 44px)', display:'flex', flexDirection:'column', gap:'6px' }}>
                <div className={`msg-bub${m.role==='user'?' u':' j'}`}>
                  <div dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }} />
                </div>
                {m.role==='assistant' && i > 0 && (
                  <button
                    onClick={()=>{
                      setShareModal(m.content)
                      setShareImg(null)
                      generateShareImage(m.content, img => setShareImg(img))
                    }}
                    style={{ alignSelf:'flex-start', display:'flex', alignItems:'center', gap:'5px', background:'transparent', border:'1px solid #e0d8c8', borderRadius:'4px', padding:'4px 10px', fontSize:'11px', color:'#aaa', cursor:'pointer', fontFamily:"'Crimson Pro',Georgia,serif", transition:'all 0.2s' }}
                    onMouseOver={e=>{ e.currentTarget.style.borderColor='#c9a650'; e.currentTarget.style.color='#c9a650' }}
                    onMouseOut={e=>{ e.currentTarget.style.borderColor='#e0d8c8'; e.currentTarget.style.color='#aaa' }}
                  >
                    🖼️ Compartilhar
                  </button>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="msg-row">
              <div className="msg-av j">J</div>
              <div className="msg-bub typing"><TypingIndicator /></div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="chat-inputarea">
          {pdfName && (
            <div className="pdf-tag">
              <span>📄</span><span>{pdfName}</span>
              <button onClick={()=>{setPdfContent(null);setPdfName(null)}}>✕</button>
            </div>
          )}
          <div className="inp-wrap">
            <input ref={fileRef} type="file" accept="application/pdf" style={{display:'none'}} onChange={handlePDF} />
            <button onClick={()=>fileRef.current.click()} style={{ background:'transparent', border:'none', cursor:'pointer', color:'#bbb', fontSize:'20px', padding:'0 4px', flexShrink:0, transition:'color 0.2s', lineHeight:1 }} title="Enviar PDF" onMouseOver={e=>e.target.style.color='#1a3a6b'} onMouseOut={e=>e.target.style.color='#bbb'}>📎</button>
            <textarea ref={textareaRef} value={input} onChange={handleTextarea} onKeyDown={handleKey} placeholder={pdfName ? "Faça uma pergunta sobre o PDF ou envie para análise geral..." : "Faça sua pergunta sobre a Doutrina Espírita..."} rows={1} />
            <button className="send-btn" onClick={send} disabled={(!input.trim() && !pdfContent) || loading}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round"/><path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:'6px', flexWrap:'wrap', gap:'4px' }}>
            <span style={{ fontSize:'11px', color:'#bbb', fontStyle:'italic' }}>📎 PDF · 💾 Histórico salvo neste dispositivo</span>
            <span style={{ fontSize:'11px', color:'#bbb' }}>Enter enviar · Shift+Enter nova linha</span>
          </div>
        </div>
      </div>

      {shareModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', zIndex:500, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }} onClick={()=>setShareModal(null)}>
          <div style={{ background:'#fff', borderRadius:'12px', padding:'24px', maxWidth:'480px', width:'100%', maxHeight:'90vh', overflowY:'auto' }} onClick={e=>e.stopPropagation()}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
              <div>
                <p style={{ fontFamily:"'Cinzel',serif", fontSize:'15px', color:'#1a3a6b', marginBottom:'2px' }}>Compartilhar resposta</p>
                <p style={{ fontSize:'12px', color:'#aaa', fontStyle:'italic' }}>Imagem gerada para compartilhar nas redes</p>
              </div>
              <button onClick={()=>setShareModal(null)} style={{ background:'transparent', border:'none', cursor:'pointer', fontSize:'20px', color:'#aaa' }}>✕</button>
            </div>

            {!shareImg ? (
              <div style={{ height:'200px', display:'flex', alignItems:'center', justifyContent:'center', background:'#f8f6f2', borderRadius:'8px', marginBottom:'16px' }}>
                <p style={{ fontSize:'14px', color:'#aaa', fontStyle:'italic' }}>Gerando imagem...</p>
              </div>
            ) : (
              <img src={shareImg} alt="Compartilhar" style={{ width:'100%', borderRadius:'8px', marginBottom:'16px', boxShadow:'0 4px 20px rgba(0,0,0,0.15)' }} />
            )}

            <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
              {shareImg && (
                <>
                  <a
                    href={shareImg}
                    download="johano-resposta.png"
                    style={{ flex:1, background:'#1a3a6b', color:'#fff', border:'none', borderRadius:'6px', padding:'12px', fontFamily:"'Cinzel',serif", fontSize:'12px', letterSpacing:'0.06em', cursor:'pointer', textAlign:'center', textDecoration:'none', display:'block' }}
                  >⬇️ Baixar imagem</a>
                  <button
                    onClick={()=>{
                      if (navigator.share) {
                        fetch(shareImg).then(r=>r.blob()).then(blob=>{
                          const file = new File([blob], 'johano-resposta.png', {type:'image/png'})
                          navigator.share({ files:[file], title:'Johano — Estudos Espíritas', text:'Compartilhando uma resposta do Johano Chat', url:'https://www.johano.com.br/chat' })
                        })
                      } else {
                        navigator.clipboard.writeText('https://www.johano.com.br/chat')
                        setShareToast(true)
                        setTimeout(()=>setShareToast(false), 2500)
                      }
                    }}
                    style={{ flex:1, background:'#c9a650', color:'#1a3a6b', border:'none', borderRadius:'6px', padding:'12px', fontFamily:"'Cinzel',serif", fontSize:'12px', letterSpacing:'0.06em', cursor:'pointer', fontWeight:600 }}
                  >📤 Compartilhar</button>
                </>
              )}
            </div>
            <p style={{ fontSize:'11px', color:'#bbb', textAlign:'center', marginTop:'10px', fontStyle:'italic' }}>A imagem inclui o logo do Johano e o link johano.com.br</p>
          </div>
        </div>
      )}

      {shareToast && <div className="toast">🔗 Link copiado! Compartilhe o Johano.</div>}
    </div>
  )
}
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from './Nav'

const SYSTEM_PROMPT = `Você é Johano, um assistente espiritual profundamente sábio, sereno e acolhedor, versado nas obras da Doutrina Espírita. Você estuda e conhece com profundidade as seguintes obras e autores:

═══════════════════════════════════════
ALLAN KARDEC — O CODIFICADOR
═══════════════════════════════════════

O LIVRO DOS ESPÍRITOS (1857) — Obra fundamental. Contém 1019 perguntas e respostas sobre:
- Deus: "Deus é a inteligência suprema, causa primária de todas as coisas." (Q.1)
- Espírito: ser imaterial, imortal, criado simples e ignorante, que evolui progressivamente
- Reencarnação: o espírito retorna ao corpo para aprender, expiar e evoluir
- Leis morais: lei de adoração, trabalho, reprodução, conservação, destruição, sociedade, progresso, igualdade, liberdade, justiça, amor, caridade
- Mundos habitados: a Terra não é o único mundo habitado
- Escalas espirituais: impuros, atrasados, pseudossábios, sábios, benevolentes, elevados, puros
- "Fora da caridade não há salvação" — princípio central
- Livre-arbítrio: o espírito escolhe suas provações antes de reencarnar

O LIVRO DOS MÉDIUNS (1861) — Manual da mediunidade:
- Tipos de médiuns: auditivos, videntes, falantes, escreventes, psicógrafos, curandeiros, pneumatógrafos
- Fenômenos físicos: mesas girantes, apports, materializações
- Fenômenos intelectuais: psicografia, psicofonia, intuição
- Discernimento: como identificar comunicações genuínas de espíritos superiores
- Médiuns não são escolhidos por virtude, mas pela aptidão fluídica
- A obsessão: influência perturbadora de espíritos inferiores
- Centros espíritas: regras para boas reuniões mediúnicas

O EVANGELHO SEGUNDO O ESPIRITISMO (1864) — Moral prática:
- Comentários espíritas aos ensinamentos de Jesus
- Bem-aventuranças reinterpretadas: "Bem-aventurados os pobres de espírito" = os humildes
- Amar os inimigos: o perdão como lei espiritual
- A oração: não é fórmula mágica, mas elevação sincera do pensamento
- Caridade: "A verdadeira caridade é sempre bondosa e benevolente"
- Arrependimento e reparação: não basta pedir perdão, é preciso reparar
- Jesus como modelo de perfeição moral a ser seguido

O CÉU E O INFERNO (1865) — Vida além da morte:
- Refuta dogmas do céu e inferno eternos
- Penas e recompensas são proporcionais e temporárias
- Estados do espírito após a morte: perturbação, erraticidade, reencarnação
- O suicídio: consequências espirituais graves — perturbação prolongada
- A morte não transforma instantaneamente o espírito
- Exemplos de espíritos em diferentes estados após a morte

A GÊNESE (1868) — Ciência e espiritismo:
- Os milagres explicados pelas leis naturais
- A criação do universo conforme o Espiritismo
- A formação dos mundos e dos seres
- As profecias: fenômeno mediúnico de visão do futuro
- A cura espiritual: atuação do perispírito e dos fluidos
- Concilia ciência, filosofia e religião

O QUE É O ESPIRITISMO (1859) — Introdução:
- Definição: "O Espiritismo é ao mesmo tempo uma ciência de observação e uma doutrina filosófica"
- Tripla natureza: ciência, filosofia e religião
- Responde às perguntas: de onde viemos? Para onde vamos? Por que sofremos?

═══════════════════════════════════════
CHICO XAVIER — O GRANDE MÉDIUM
═══════════════════════════════════════

SÉRIE ANDRÉ LUIZ (ditada pelo espírito André Luiz):
- NOSSO LAR (1944): Descrição detalhada da colônia espiritual Nosso Lar. André Luiz acorda após a morte num hospital espiritual. Conhece a organização dos ministérios: Regeneração, Auxílio, Comunicação, Elevação, Esclarecimento. O Governador Aldéia. A vida social no além. As classes de espíritos.
- OS MENSAGEIROS (1944): Missões de socorro aos encarnados. Como os espíritos auxiliam nos sonhos. As equipes de trabalho espiritual.
- MISSIONÁRIOS DA LUZ (1945): A preparação para reencarnar. O processo de escolha das próximas experiências. Os mentores espirituais.
- OBREIROS DA VIDA ETERNA (1946): O trabalho mediúnico visto do plano espiritual. A responsabilidade dos médiuns.
- NO MUNDO MAIOR (1947): Planos espirituais mais elevados. A hierarquia espiritual.
- LIBERTAÇÃO (1949): A obsessão e seus mecanismos. Casos de desobsessão.
- MECANISMOS DA MEDIUNIDADE (1960): Explicação técnica dos fenômenos mediúnicos.

SÉRIE EMMANUEL (ditada pelo espírito Emmanuel, mentor de Chico):
- CAMINHO, VERDADE E VIDA (1938): Comentários evangélicos. Primeira obra de Chico com Emmanuel.
- PÃO NOSSO (1950): Meditações espíritas sobre o Evangelho.
- FONTE VIVA (1950): Reflexões doutrinárias.
- VINHO E ÁGUA (1955): Parábolas espíritas.

OUTRAS OBRAS DE CHICO:
- PARNASO DE ALÉM-TÚMULO (1932): Poesias psicografadas de poetas brasileiros já falecidos como Casimiro de Abreu, Castro Alves, Augusto dos Anjos.
- BRASIL, CORAÇÃO DO MUNDO, PÁTRIA DO EVANGELHO (1938): Ditado pelo espírito Humberto de Campos. Missão espiritual do Brasil. História do Espiritismo no Brasil. O papel da FEB. Bezerra de Menezes como grande líder espírita brasileiro.
- XAVIER, FRANCISCO CÂNDIDO: Nasceu em 02/04/1910 em Pedro Leopoldo/MG. Psicografou mais de 490 livros. Doou todos os direitos autorais. Faleceu em 30/06/2002, dia da Copa do Mundo.

═══════════════════════════════════════
LÉON DENIS — O GRANDE APÓSTOLO
═══════════════════════════════════════
- APÓS A MORTE: Demonstração filosófica da imortalidade da alma. A vida nos planos espirituais.
- O PROBLEMA DO SER, DO DESTINO E DA DOR: Por que existimos? O sentido do sofrimento.
- NO INVISÍVEL: Mediunidade e sua explicação racional.
- JESUS E O ESPIRITISMO: A figura de Jesus na perspectiva espírita.
- A GÊNESE DO ESPIRITISMO: História do movimento espírita na França.

═══════════════════════════════════════
BEZERRA DE MENEZES (1831-1900)
═══════════════════════════════════════
- Médico, político e espírita brasileiro
- A LOUCURA SOB NOVO PRISMA: Relação entre doenças mentais e obsessão espiritual. Pioneiro na psiquiatria espírita.
- Famoso pelas curas espirituais gratuitas
- Presidente da FEB (Federação Espírita Brasileira)
- Considerado o "médico dos pobres"

═══════════════════════════════════════
DIVALDO FRANCO
═══════════════════════════════════════
- Médium baiano, nascido em 05/05/1927 em Feira de Santana/BA
- Mais de 280 livros psicografados
- Fundou a Mansão do Caminho em Salvador
- Principais espíritos ditadores: Joanna de Ângelis, Manoel Philomeno de Miranda, Camilo
- AMANHECER ESPIRITUAL, CAMINHANDO COM JESUS, MESSE ABENÇOADA entre outros

═══════════════════════════════════════
CONCEITOS DOUTRINÁRIOS FUNDAMENTAIS
═══════════════════════════════════════

PERISPÍRITO: Envoltório semimaterial que une o espírito ao corpo. Sede das dores e sensações após a morte. Explica as curas espirituais, os fenômenos mediúnicos e a forma dos espíritos.

REENCARNAÇÃO: Não é punição mas oportunidade. O espírito escolhe suas provações. Explica as desigualdades sociais, os gênios precoces, as afinidades inexplicáveis.

OBSESSÃO: Influência perturbadora de espírito sobre encarnado. Tipos: simples (pensamentos negativos), fascinação (o médium acredita no obsessor), subjugação (perda do livre-arbítrio). Tratamento: prece, desobsessão, reforma íntima.

MEDIUNIDADE: Faculdade natural, não sobrenatural. Todo ser humano tem algum grau de sensibilidade. Não confere superioridade moral. Exige responsabilidade e desenvolvimento moral.

CARIDADE: Princípio máximo. Não apenas material mas moral: tolerância, perdão, compaixão, auxílio. "Fora da caridade não há salvação" (Kardec). "A caridade é o perfume que a flor derrama quando pisada" (frase atribuída a Chico Xavier).

LEI DE CAUSA E EFEITO: Tudo que semearmos colheremos — não necessariamente na mesma vida. Explica o sofrimento como consequência e oportunidade de crescimento.

PRECE: Não é magia nem barganha com Deus. É elevação do pensamento, fortalecimento moral, conexão com espíritos protetores. Deve ser simples, sincera e frequente.

ESPIRITISMO E CIÊNCIA: O Espiritismo não contraria a ciência — a complementa. Os fenômenos espíritas obedecem a leis naturais ainda não completamente conhecidas pela ciência material.

═══════════════════════════════════════
DIRETRIZES DE COMPORTAMENTO
═══════════════════════════════════════

1. Seja sempre sereno, compassivo e acolhedor — nunca dogmático ou autoritário
2. Cite obras e autores específicos quando relevante, com precisão
3. Se não souber algo com precisão, seja honesto — diga que não tem certeza
4. Para textos específicos de capítulos, peça ao usuário para compartilhar o trecho
5. Responda perguntas difíceis (morte, sofrimento, perdas) com profundidade e conforto genuíno
6. Não faça previsões do futuro, não consulte "qual espírito está comigo"
7. Respeite outras religiões mas apresente a perspectiva espírita com clareza
8. Use linguagem acessível mas não simplifique demais conceitos profundos
9. Se o usuário compartilhar um PDF ou texto, analise-o com profundidade à luz da doutrina
10. Responda SEMPRE em português brasileiro
11. Quando citar passagens, indique claramente a obra e o autor`

const css = `
.hero{padding:64px 32px 56px;text-align:center;border-bottom:1px solid #e0d8c8;}
.hero-eyebrow{font-size:11px;letter-spacing:0.2em;color:#c9a650;text-transform:uppercase;margin-bottom:16px;}
.hero-title{font-family:'Cinzel',serif;font-size:52px;font-weight:600;color:#1a3a6b;letter-spacing:0.06em;margin-bottom:8px;}
.hero-sub{font-size:14px;letter-spacing:0.14em;color:#c9a650;margin-bottom:24px;font-style:italic;}
.hero-divider{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:28px;color:#c9a650;font-size:11px;letter-spacing:8px;}
.hero-divider::before,.hero-divider::after{content:'';width:60px;height:1px;background:#c9a650;opacity:0.4;}
.hero-desc{font-size:18px;color:#555;max-width:560px;margin:0 auto 36px;line-height:1.8;font-weight:300;}
.btn-p{background:#1a3a6b;color:#fff;border:none;border-radius:2px;padding:14px 28px;font-family:'Cinzel',serif;font-size:13px;letter-spacing:0.1em;cursor:pointer;text-transform:uppercase;margin-right:8px;margin-bottom:8px;}
.btn-p:hover{background:#0f2447;}
.btn-s{background:transparent;color:#1a3a6b;border:1px solid #1a3a6b;border-radius:2px;padding:14px 28px;font-family:'Cinzel',serif;font-size:13px;letter-spacing:0.1em;cursor:pointer;text-transform:uppercase;margin-bottom:8px;}
.btn-s:hover{background:#1a3a6b;color:#fff;}
.section{padding:56px 32px;border-bottom:1px solid #e0d8c8;}
.section-label{font-size:10px;letter-spacing:0.22em;color:#c9a650;text-transform:uppercase;margin-bottom:8px;}
.section-title{font-family:'Cinzel',serif;font-size:26px;font-weight:500;color:#1a3a6b;letter-spacing:0.04em;}
.section-rule{width:40px;height:2px;background:#c9a650;margin:12px 0 24px;}
.spirit-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;}
        .eo-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;}
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
.chat-msgs{padding:16px;display:flex;flex-direction:column;gap:12px;min-height:120px;max-height:360px;overflow-y:auto;}
.msg{display:flex;gap:10px;align-items:flex-start;}
.msg-dot{width:28px;height:28px;border-radius:50%;background:#1a3a6b;display:flex;align-items:center;justify-content:center;color:#c9a650;font-size:11px;flex-shrink:0;margin-top:2px;font-family:'Cinzel',serif;}
.bubble{background:#fff;border:1px solid #e0d8c8;border-radius:0 8px 8px 8px;padding:10px 14px;font-size:15px;line-height:1.75;color:#333;max-width:85%;}
.msg-u{justify-content:flex-end;}
.msg-u .bubble{background:#1a3a6b;color:#fff;border-radius:8px 0 8px 8px;border-color:#1a3a6b;}
.chat-bottom{border-top:1px solid #e0d8c8;}
.pdf-bar{display:flex;align-items:center;gap:8px;padding:8px 16px;background:#f0f4f9;border-bottom:1px solid #e0d8c8;}
.pdf-btn{display:flex;align-items:center;gap:6px;font-size:12px;color:#1a3a6b;background:transparent;border:1px solid #1a3a6b;border-radius:4px;padding:5px 12px;cursor:pointer;font-family:'Crimson Pro',Georgia,serif;transition:all 0.2s;}
.pdf-btn:hover{background:#1a3a6b;color:#fff;}
.pdf-name{font-size:12px;color:#555;font-style:italic;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.pdf-clear{background:transparent;border:none;cursor:pointer;color:#aaa;font-size:16px;padding:0 4px;}
.pdf-clear:hover{color:#c00;}
.chat-row{display:flex;gap:8px;padding:12px 16px 16px;}
.chat-inp{flex:1;border:1px solid #d0c8b8;border-radius:4px;padding:10px 14px;font-family:'Crimson Pro',Georgia,serif;font-size:15px;color:#333;background:#fff;outline:none;resize:none;min-height:42px;max-height:120px;}
.chat-inp:focus{border-color:#1a3a6b;}
.chat-btn{width:36px;height:36px;background:#1a3a6b;border:none;border-radius:4px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#fff;flex-shrink:0;}
.chat-btn:hover{background:#0f2447;}
.chat-btn:disabled{background:#ccc;cursor:not-allowed;}
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
  .eo-grid{grid-template-columns:1fr !important;}
  .footer{padding:20px 16px;flex-direction:column;text-align:center;}
  .f-links{flex-wrap:wrap;justify-content:center;}
  .chat-msgs{max-height:50vh;}
  .chat-notice{font-size:12.5px;padding:10px 12px;margin:12px;}
  .chat-notice-toggle{display:flex;}
  .chat-inp{font-size:16px;}
  .pdf-btn{font-size:13px;}
}
.chat-notice-header{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;}
.chat-notice-toggle{background:transparent;border:1px solid #c9a650;border-radius:4px;padding:2px 8px;font-size:11px;color:#7a6830;cursor:pointer;white-space:nowrap;flex-shrink:0;}
.chat-notice-body{overflow:hidden;transition:max-height 0.3s ease;}
`

const pillars = [
  { title:'Deus', desc:'Inteligência suprema, causa primária de todas as coisas.' },
  { title:'Imortalidade da Alma', desc:'O espírito sobrevive à morte do corpo físico.' },
  { title:'Reencarnação', desc:'O espírito reencarna múltiplas vezes para evoluir.' },
  { title:'Caridade', desc:'"Fora da caridade não há salvação."' },
  { title:'Comunicação Espiritual', desc:'Os espíritos desencarnados podem se comunicar.' },
]

function CollapsibleNotice() {
  const [open, setOpen] = useState(true)
  return (
    <div className="chat-notice" style={{margin:'12px 16px'}}>
      <div className="chat-notice-header">
        <span style={{flex:1}}>
          {open ? (
            <>O Johano é uma <strong>muleta para os estudos</strong> — assim como uma muleta não faz você andar, mas auxilia e apoia a caminhada, este assistente não substitui a leitura das obras originais, o convívio no centro espírita ou a orientação de um orientador experiente. Está em constante desenvolvimento e evolução — como todos nós.</>
          ) : (
            <><strong>Johano é uma muleta para os estudos.</strong> Não substitui as obras originais.</>
          )}
        </span>
        <button className="chat-notice-toggle" onClick={()=>setOpen(!open)}>{open ? 'Recolher' : 'Ver mais'}</button>
      </div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([{ role:'assistant', content:'Paz e bem, viajante da luz. Sou Johano, seu guia nos estudos da Doutrina Espírita. Estou aqui para refletir contigo sobre as obras de Kardec, Chico Xavier, André Luiz e tantos outros mensageiros da verdade. O que traz ao seu coração hoje?' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [pdfContent, setPdfContent] = useState(null)
  const [pdfName, setPdfName] = useState(null)
  const bottomRef = useRef(null)
  const fileRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [messages, loading])

  const handlePDF = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPdfName(file.name)
    const reader = new FileReader()
    reader.onload = (ev) => {
      const base64 = ev.target.result.split(',')[1]
      setPdfContent(base64)
    }
    reader.readAsDataURL(file)
  }

  const send = async () => {
    const text = input.trim()
    if ((!text && !pdfContent) || loading) return

    let userContent
    if (pdfContent) {
      userContent = [
        { type:'document', source:{ type:'base64', media_type:'application/pdf', data:pdfContent } },
        { type:'text', text: text || `Analise este documento à luz da Doutrina Espírita e me dê um resumo profundo do seu conteúdo e importância.` }
      ]
    } else {
      userContent = text
    }

    const newMsgs = [...messages, { role:'user', content: pdfContent ? `[PDF: ${pdfName}] ${text || 'Analise este documento'}` : text }]
    setMessages(newMsgs)
    setInput('')
    setPdfContent(null)
    setPdfName(null)
    setLoading(true)

    try {
      const apiMessages = messages.map(m => ({ role:m.role, content:m.content }))
      apiMessages.push({ role:'user', content: userContent })

      const res = await fetch('/api/chat', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ model:'claude-opus-4-5', max_tokens:2000, system:SYSTEM_PROMPT, messages:apiMessages })
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
        <button className="btn-p" onClick={() => navigate('/chat')}>Conversar com o Johano</button>
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
          <CollapsibleNotice />
          <div className="chat-msgs">
            {messages.map((m,i) => (
              <div key={i} className={`msg${m.role==='user'?' msg-u':''}`}>
                {m.role==='assistant' && <div className="msg-dot">J</div>}
                <div className="bubble" dangerouslySetInnerHTML={{__html: m.role==='assistant' ? m.content.replace(/\*\*(.*?)\*\*/g,'<strong style="color:#1a3a6b">$1</strong>').replace(/\n\n/g,'</p><p style="margin:10px 0">').replace(/\n/g,'<br/>') : m.content}} />
              </div>
            ))}
            {loading && <div className="msg"><div className="msg-dot">J</div><div className="bubble"><div className="typing"><span/><span/><span/></div></div></div>}
            <div ref={bottomRef}/>
          </div>
          <div className="chat-bottom">
            {pdfName && (
              <div className="pdf-bar">
                <span style={{fontSize:'16px'}}>📄</span>
                <span className="pdf-name">{pdfName}</span>
                <button className="pdf-clear" onClick={()=>{setPdfContent(null);setPdfName(null)}}>✕</button>
              </div>
            )}
            <div style={{padding:'8px 16px 0'}}>
              <input ref={fileRef} type="file" accept="application/pdf" style={{display:'none'}} onChange={handlePDF} />
              <button className="pdf-btn" onClick={()=>fileRef.current.click()}>
                📎 Enviar PDF
              </button>
              <span style={{fontSize:'11px',color:'#aaa',marginLeft:'8px',fontStyle:'italic'}}>Envie um livro ou capítulo para o Johano analisar</span>
            </div>
            <div className="chat-row">
              <textarea className="chat-inp" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&!e.shiftKey&&(e.preventDefault(),send())} placeholder={pdfName ? "Faça uma pergunta sobre o PDF ou pressione enviar para análise geral..." : "Faça sua pergunta sobre a Doutrina..."} rows={2} />
              <button className="chat-btn" onClick={send} disabled={(!input.trim() && !pdfContent) || loading}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round"/><path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA CHAT */}
      <div style={{ background:'#1a3a6b', padding:'48px 32px', textAlign:'center', borderBottom:'1px solid #e0d8c8' }}>
        <p style={{ fontSize:'10px', letterSpacing:'0.22em', color:'rgba(201,166,80,0.7)', textTransform:'uppercase', marginBottom:'12px' }}>Experiência Completa</p>
        <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'26px', color:'#fff', letterSpacing:'0.04em', marginBottom:'12px', fontWeight:500 }}>Johano Chat</h2>
        <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.75)', maxWidth:'500px', margin:'0 auto 24px', lineHeight:1.8, fontWeight:300 }}>Acesse a versão completa do Johano — com histórico de conversas, envio de PDFs para análise e experiência de tela cheia.</p>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', flexWrap:'wrap' }}>
          <button onClick={()=>navigate('/chat')} style={{ background:'#c9a650', color:'#1a3a6b', border:'none', borderRadius:'2px', padding:'14px 36px', fontFamily:"'Cinzel',serif", fontSize:'13px', letterSpacing:'0.1em', cursor:'pointer', textTransform:'uppercase', fontWeight:600 }}>Abrir o Chat Completo</button>
          <button onClick={()=>{ navigator.clipboard&&navigator.clipboard.writeText('https://www.johano.com.br/chat') }} style={{ background:'transparent', color:'rgba(255,255,255,0.7)', border:'1px solid rgba(255,255,255,0.3)', borderRadius:'2px', padding:'14px 24px', fontFamily:"'Cinzel',serif", fontSize:'12px', letterSpacing:'0.08em', cursor:'pointer', textTransform:'uppercase' }}>🔗 Compartilhar</button>
        </div>
        <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginTop:'16px', fontStyle:'italic' }}>💾 As conversas ficam salvas apenas no navegador deste dispositivo</p>
      </div>

      <div className="quote-sec">
        <p className="q-label">Frase do Dia</p>
        <div className="q-mark">"</div>
        <p className="q-text">Sede perfeitos, dizia Jesus. Ora, a perfeição é o ideal que todos devemos atingir; mas é um ideal que se conquista progressivamente, e não por um golpe de varinha mágica.</p>
        <p className="q-src">— Allan Kardec · O Evangelho Segundo o Espiritismo</p>
      </div>

      {/* ESPERANTO CTA */}
      <section className="section" style={{ background:'#f8f6f2' }}>
        <div className="eo-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'32px', alignItems:'center' }}>
          <div>
            <p className="section-label">Novidade</p>
            <h2 className="section-title">Aprenda Esperanto</h2>
            <div className="section-rule"></div>
            <p style={{ fontSize:'16px', color:'#555', lineHeight:1.9, fontWeight:300, marginBottom:'20px' }}>O Johano tem um curso completo de Esperanto — a língua da fraternidade universal. 20 lições com áudio, microfone para praticar e chat de conversação. Tudo gratuito!</p>
            <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
              <button className="btn-p" onClick={()=>navigate('/esperanto/aprender')}>Começar o Curso</button>
              <button className="btn-s" onClick={()=>navigate('/esperanto')}>Saiba mais</button>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
            {[['20','Lições completas','📖'],['🔊','Áudio em Esperanto','Ouça a pronúncia'],['🎤','Microfone','Pratique falando'],['🤖','Chat com IA','Converse com o Johano']].map(([icon,title,desc]) => (
              <div key={title} style={{ background:'#fff', border:'1px solid #e0d8c8', borderRadius:'8px', padding:'16px', textAlign:'center' }}>
                <div style={{ fontSize:'28px', marginBottom:'6px' }}>{icon}</div>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', marginBottom:'3px' }}>{title}</div>
                <div style={{ fontSize:'12px', color:'#aaa', fontWeight:300 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
// mobile improvements marker
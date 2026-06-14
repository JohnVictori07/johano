import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from './Nav'

const licoes_iniciante = [
  { num:1, titulo:'Saluton!', subtitulo:'Cumprimentos básicos', desc:'Aprenda a cumprimentar, despedir e ser educado em Esperanto.', tempo:'10 min', icon:'👋' },
  { num:2, titulo:'Mi estas...', subtitulo:'Apresentação pessoal', desc:'Apresente-se, diga seu nome, de onde é e como está.', tempo:'12 min', icon:'🙋' },
  { num:3, titulo:'Nombroj', subtitulo:'Números 1 a 100', desc:'Aprenda a contar e usar números no cotidiano.', tempo:'10 min', icon:'🔢' },
  { num:4, titulo:'Koloroj', subtitulo:'Cores e adjetivos', desc:'Descreva objetos e pessoas usando cores e adjetivos.', tempo:'10 min', icon:'🎨' },
  { num:5, titulo:'Familio', subtitulo:'Família', desc:'Fale sobre sua família — pais, irmãos, filhos e parentes.', tempo:'12 min', icon:'👨‍👩‍👧' },
  { num:6, titulo:'Verboj', subtitulo:'Verbos no presente', desc:'Os verbos essenciais: ser, ter, ir, fazer, querer e poder.', tempo:'15 min', icon:'⚡' },
  { num:7, titulo:'Demandoj', subtitulo:'Fazendo perguntas', desc:'Aprenda a perguntar: Onde? Quem? Quando? O quê? Por quê?', tempo:'12 min', icon:'❓' },
  { num:8, titulo:'Manĝaĵoj', subtitulo:'Comida e cotidiano', desc:'Vocabulário do dia a dia — comida, casa, rotina.', tempo:'12 min', icon:'🍽️' },
  { num:9, titulo:'Tempo', subtitulo:'Tempo e clima', desc:'Fale sobre dias, horas, meses, estações e o clima.', tempo:'10 min', icon:'🌤️' },
  { num:10, titulo:'Revizio', subtitulo:'Revisão completa', desc:'Revise tudo que aprendeu e faça uma conversa livre com o Johano.', tempo:'20 min', icon:'🎓' },
]

const licoes_intermediario = [
  { num:11, titulo:'Pasinteco', subtitulo:'Verbos no passado', desc:'Conte o que aconteceu — verbos no passado e expressões temporais.', tempo:'15 min', icon:'⏮️' },
  { num:12, titulo:'Estonteco', subtitulo:'Verbos no futuro', desc:'Fale sobre planos e sonhos — verbos no futuro.', tempo:'15 min', icon:'⏩' },
  { num:13, titulo:'Sufiksoj', subtitulo:'Sufixos e prefixos', desc:'O segredo do Esperanto — como criar milhares de palavras com poucos elementos.', tempo:'20 min', icon:'🔧' },
  { num:14, titulo:'Akuzativo', subtitulo:'O acusativo -n', desc:'A lógica do -n — como indicar o objeto da frase em Esperanto.', tempo:'18 min', icon:'🎯' },
  { num:15, titulo:'Esprimoj', subtitulo:'Expressões do cotidiano', desc:'Frases feitas, expressões idiomáticas e como soar natural.', tempo:'15 min', icon:'💬' },
  { num:16, titulo:'Legado', subtitulo:'Leitura de textos', desc:'Leia e compreenda textos simples em Esperanto.', tempo:'20 min', icon:'📖' },
  { num:17, titulo:'Kulturo', subtitulo:'Cultura Esperantista', desc:'Conheça o movimento, os encontros mundiais e a história viva do Esperanto.', tempo:'15 min', icon:'🌍' },
  { num:18, titulo:'Skribo', subtitulo:'Escrita e redação', desc:'Escreva textos simples — e-mails, mensagens e apresentações.', tempo:'20 min', icon:'✍️' },
  { num:19, titulo:'Vortprovizo', subtitulo:'Vocabulário avançado', desc:'Amplie seu vocabulário com palavras e expressões mais sofisticadas.', tempo:'20 min', icon:'📚' },
  { num:20, titulo:'Libera Babilado', subtitulo:'Conversa livre', desc:'Converse livremente com o Johano em Esperanto — o teste final!', tempo:'30 min', icon:'🏆' },
]

export default function EsperantoAprender() {
  const navigate = useNavigate()
  const [nivel, setNivel] = useState('iniciante')
  const [progresso, setProgresso] = useState(() => {
    try { return JSON.parse(localStorage.getItem('johano_eo_progresso') || '{}') } catch { return {} }
  })

  const licoes = nivel === 'iniciante' ? licoes_iniciante : licoes_intermediario

  const getLicaoStatus = (num) => {
    if (progresso[num] === 'completo') return 'completo'
    const primeiraIncompleta = licoes.find(l => progresso[l.num] !== 'completo')
    if (primeiraIncompleta && primeiraIncompleta.num === num) return 'disponivel'
    if (progresso[num] === 'completo') return 'completo'
    const anterior = licoes.find(l => l.num === num - 1)
    if (!anterior || progresso[anterior.num] === 'completo') return 'disponivel'
    return 'bloqueado'
  }

  const totalCompletos = licoes.filter(l => progresso[l.num] === 'completo').length
  const pct = Math.round((totalCompletos / licoes.length) * 100)

  return (
    <div style={{ fontFamily:"'Crimson Pro',Georgia,serif", background:'#fff' }}>
      <style>{`
        .ea-hero{background:linear-gradient(135deg,#1a3a6b,#2a5aad);padding:48px 32px;color:#fff;}
        .ea-tabs{display:flex;border-bottom:1px solid #e0d8c8;padding:0 32px;}
        .ea-tab{padding:14px 24px;font-family:'Cinzel',serif;font-size:13px;letter-spacing:0.06em;cursor:pointer;border-bottom:2px solid transparent;background:transparent;border-top:none;border-left:none;border-right:none;color:#666;transition:all 0.2s;}
        .ea-tab.active{color:#1a3a6b;border-bottom-color:#1a3a6b;}
        .ea-tab:hover{color:#1a3a6b;}
        .ea-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;padding:28px 32px 48px;}
        .ea-card{border:1px solid #e0d8c8;border-radius:8px;padding:20px;cursor:pointer;transition:all 0.2s;position:relative;text-align:left;}
        .ea-card:hover:not(.bloqueado){transform:translateY(-2px);border-color:#1a3a6b;}
        .ea-card.completo{border-color:#3b6d11;background:#f4fbf0;}
        .ea-card.bloqueado{opacity:0.45;cursor:not-allowed;}
        .ea-card-num{font-size:11px;letter-spacing:0.14em;color:#aaa;text-transform:uppercase;margin-bottom:6px;}
        .ea-card-icon{font-size:28px;margin-bottom:8px;}
        .ea-card-title{font-family:'Cinzel',serif;font-size:15px;color:#1a3a6b;margin-bottom:2px;letter-spacing:0.04em;}
        .ea-card-sub{font-size:12px;color:#c9a650;font-style:italic;margin-bottom:8px;}
        .ea-card-desc{font-size:13.5px;color:#666;line-height:1.6;font-weight:300;margin-bottom:12px;}
        .ea-card-footer{display:flex;align-items:center;justify-content:space-between;}
        .ea-card-tempo{font-size:11px;color:#aaa;}
        .ea-card-status{font-size:11px;padding:3px 10px;border-radius:2px;}
        .ea-card-status.completo{background:#eaf3de;color:#3b6d11;}
        .ea-card-status.disponivel{background:#eef2f8;color:#1a3a6b;}
        .ea-card-status.bloqueado{background:#f5f5f5;color:#aaa;}
        .ea-progress{height:6px;background:#e0d8c8;border-radius:3px;overflow:hidden;margin-top:12px;}
        .ea-progress-bar{height:100%;background:#c9a650;border-radius:3px;transition:width 0.5s ease;}
        .ea-cta{background:#f8f6f2;border-radius:8px;padding:24px;margin:0 32px 32px;display:flex;align-items:center;gap:20px;border:1px solid #e0d8c8;}
        @media(max-width:768px){
          .ea-hero{padding:32px 16px;}
          .ea-tabs{padding:0 16px;}
          .ea-grid{grid-template-columns:1fr;padding:16px 16px 36px;}
          .ea-cta{margin:0 16px 24px;flex-direction:column;gap:12px;text-align:center;}
        }
      `}</style>

      <Nav />

      <div className="ea-hero">
        <div style={{ maxWidth:'700px' }}>
          <p style={{ fontSize:'10px', letterSpacing:'0.22em', color:'rgba(201,166,80,0.7)', textTransform:'uppercase', marginBottom:'10px' }}>Kurso de Esperanto</p>
          <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:'32px', fontWeight:600, letterSpacing:'0.06em', marginBottom:'8px' }}>Aprenda Esperanto</h1>
          <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.75)', lineHeight:1.8, fontWeight:300, marginBottom:'20px' }}>20 lições completas — do zero à conversação fluente. Com áudio, exercícios e prática com microfone.</p>
          <div style={{ display:'flex', gap:'24px', flexWrap:'wrap' }}>
            {[['20','Lições'],['2','Níveis'],['🎵','Áudio'],['🎤','Microfone']].map(([v,l]) => (
              <div key={l} style={{ textAlign:'center' }}>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:'22px', color:'#c9a650' }}>{v}</div>
                <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.6)' }}>{l}</div>
              </div>
            ))}
          </div>
          <div className="ea-progress" style={{ marginTop:'20px', maxWidth:'400px' }}>
            <div className="ea-progress-bar" style={{ width:`${pct}%` }}></div>
          </div>
          <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginTop:'6px' }}>{totalCompletos} de {licoes.length} lições concluídas ({pct}%)</p>
        </div>
      </div>

      <div className="ea-tabs">
        <button className={`ea-tab${nivel==='iniciante'?' active':''}`} onClick={()=>setNivel('iniciante')}>🟢 Iniciante</button>
        <button className={`ea-tab${nivel==='intermediario'?' active':''}`} onClick={()=>setNivel('intermediario')}>🔵 Intermediário</button>
      </div>

      <div className="ea-cta">
        <div style={{ fontSize:'32px', flexShrink:0 }}>🤖</div>
        <div style={{ flex:1 }}>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'14px', color:'#1a3a6b', marginBottom:'4px' }}>Prefere conversar livremente?</p>
          <p style={{ fontSize:'14px', color:'#666', fontWeight:300 }}>Acesse o Chat de Esperanto e pratique com o Johano sem estrutura de lições — do seu jeito.</p>
        </div>
        <button onClick={()=>navigate('/esperanto/chat')} style={{ background:'#1a3a6b', color:'#fff', border:'none', borderRadius:'4px', padding:'10px 20px', fontFamily:"'Cinzel',serif", fontSize:'12px', letterSpacing:'0.08em', cursor:'pointer', whiteSpace:'nowrap' }}>Ir para o Chat →</button>
      </div>

      <div className="ea-grid">
        {licoes.map(l => {
          const status = getLicaoStatus(l.num)
          return (
            <div key={l.num} className={`ea-card ${status}`} onClick={()=>{ if(status!=='bloqueado') navigate(`/esperanto/licao/${l.num}`) }}>
              <p className="ea-card-num">Lição {l.num}</p>
              <div className="ea-card-icon">{l.icon}</div>
              <p className="ea-card-title">{l.titulo}</p>
              <p className="ea-card-sub">{l.subtitulo}</p>
              <p className="ea-card-desc">{l.desc}</p>
              <div className="ea-card-footer">
                <span className="ea-card-tempo">⏱ {l.tempo}</span>
                <span className={`ea-card-status ${status}`}>
                  {status==='completo' ? '✅ Concluída' : status==='disponivel' ? '▶ Iniciar' : '🔒 Bloqueada'}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <footer style={{ padding:'28px 32px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid #e0d8c8', background:'#f8f6f2', flexWrap:'wrap', gap:'12px' }}>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', letterSpacing:'0.1em' }}>✦ JOHANO</div>
        <p style={{ fontSize:'11px', color:'#aaa', fontStyle:'italic' }}>johano.com.br · Lumo, Amo kaj Vero</p>
      </footer>
    </div>
  )
}

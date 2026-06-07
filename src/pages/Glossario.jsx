import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from './Nav'

const terms = [
  { term:'Alma', tag:'fundamental', eo:'Animo', def:'Na doutrina espírita, alma é sinônimo de espírito — o ser imaterial, imortal e pensante que anima o corpo físico. Somos espíritos que possuem um corpo, não o contrário.', source:'O Livro dos Espíritos — Allan Kardec' },
  { term:'Caridade', tag:'moral', eo:'Karitato', def:'"Fora da caridade não há salvação", ensina Kardec. A caridade não é apenas a esmola material, mas o amor ao próximo em sua forma mais ampla: tolerância, compaixão, perdão e auxílio desinteressado ao semelhante.', source:'O Evangelho Segundo o Espiritismo — Allan Kardec' },
  { term:'Causa e Efeito', tag:'fundamental', eo:'Kaŭzo kaj Efiko', def:'Lei universal que rege o universo moral. Todo ato, pensamento ou intenção gera consequências que acompanham o espírito ao longo de suas encarnações. É a expressão da justiça divina: perfeita, impessoal e inevitável.', source:'O Livro dos Espíritos — Allan Kardec' },
  { term:'Desobsessão', tag:'mediunidade', eo:'Malhelpado', def:'Trabalho espiritual e fraterno que visa libertar um espírito encarnado ou desencarnado da influência perturbadora de espíritos inferiores. Baseia-se na prece, na orientação moral e na caridade.', source:'O Livro dos Médiuns — Allan Kardec' },
  { term:'Erraticidade', tag:'alem-vida', eo:'Erara stato', def:'Estado do espírito desencarnado que ainda não reencarna, vivendo no mundo espiritual entre duas encarnações. Durante a erraticidade, o espírito pode evoluir e se preparar para uma nova vida.', source:'O Livro dos Espíritos — Allan Kardec' },
  { term:'Espírito', tag:'fundamental', eo:'Spirito', def:'Ser imaterial, inteligente e imortal criado por Deus em estado simples e ignorante. Evolui progressivamente através de múltiplas encarnações até atingir a perfeição.', source:'O Livro dos Espíritos — Allan Kardec' },
  { term:'Espiritismo', tag:'fundamental', eo:'Spiritismo', def:'Doutrina fundada sobre a existência, as manifestações e o ensino dos espíritos. É ao mesmo tempo ciência, filosofia e moral religiosa. Codificada por Allan Kardec a partir de 1857.', source:'O Que é o Espiritismo — Allan Kardec' },
  { term:'Expiação', tag:'moral', eo:'Expiacío', def:'Sofrimento vivenciado pelo espírito como consequência de suas faltas passadas. Não é punição arbitrária, mas resultado natural das próprias ações. Tem propósito evolutivo: ensina, purifica e fortalece.', source:'O Céu e o Inferno — Allan Kardec' },
  { term:'Fluido Vital', tag:'ciencia', eo:'Viva fluido', def:'Princípio de vida que anima os seres vivos. Transmitido pelo perispírito, mantém a ligação entre o espírito e o corpo físico durante a vida encarnada.', source:'O Livro dos Espíritos — Allan Kardec' },
  { term:'Mediunidade', tag:'mediunidade', eo:'Mediumeco', def:'Faculdade que alguns espíritos encarnados possuem de perceber e comunicar as manifestações de espíritos desencarnados. Implica responsabilidade e necessidade de desenvolvimento moral.', source:'O Livro dos Médiuns — Allan Kardec' },
  { term:'Nosso Lar', tag:'alem-vida', eo:'Nia Hejmo', def:'Colônia espiritual descrita por André Luiz, através de Chico Xavier, como um dos planos espirituais que abriga espíritos em processo de recuperação e aprendizado.', source:'Nosso Lar — André Luiz / Chico Xavier' },
  { term:'Obsessão', tag:'mediunidade', eo:'Obsedo', def:'Influência perturbadora exercida por espíritos inferiores sobre um espírito encarnado. Pode se manifestar como pensamentos negativos ou comportamentos compulsivos. O tratamento envolve prece e orientação moral.', source:'O Livro dos Médiuns — Allan Kardec' },
  { term:'Perispírito', tag:'ciencia', eo:'Perispirito', def:'Envoltório semimaterial e fluídico que une o espírito ao corpo físico. Funciona como intermediário entre o espírito (imaterial) e o corpo (material). Após a morte, permanece unido ao espírito.', source:'O Livro dos Espíritos — Allan Kardec' },
  { term:'Prece', tag:'moral', eo:'Preĝo', def:'Ato de elevar o pensamento a Deus ou aos espíritos superiores. Não é uma fórmula mágica, mas a expressão sincera do sentimento. Tem poder real quando emanada com fé e pureza de intenção.', source:'O Evangelho Segundo o Espiritismo — Allan Kardec' },
  { term:'Psicografia', tag:'mediunidade', eo:'Psikografio', def:'Fenômeno mediúnico pelo qual o espírito encarnado (médium) escreve sob influência de um espírito desencarnado. Chico Xavier foi o maior exemplo, psicografando mais de 400 obras.', source:'O Livro dos Médiuns — Allan Kardec' },
  { term:'Reencarnação', tag:'fundamental', eo:'Reenkarnado', def:'Retorno do espírito a uma nova existência corporal após a morte. Não é punição, mas oportunidade de progresso. Cada encarnação traz novos aprendizados e experiências evolutivas.', source:'O Livro dos Espíritos — Allan Kardec' },
  { term:'Umbral', tag:'alem-vida', eo:'Umbro', def:'Região do mundo espiritual habitada por espíritos ainda presos a paixões materiais. Não é um inferno eterno, mas um estado transitório que impulsiona o espírito a buscar a evolução.', source:'Nosso Lar — André Luiz / Chico Xavier' },
  { term:'Vidência', tag:'mediunidade', eo:'Vidanteco', def:'Faculdade mediúnica de perceber espíritos, auras e manifestações do mundo espiritual de forma visual. Os videntes podem ver espíritos com os olhos físicos ou em visão mental.', source:'O Livro dos Médiuns — Allan Kardec' },
].sort((a,b) => a.term.localeCompare(b.term,'pt'))

const tagColors = { fundamental:'#eef2f8|#1a3a6b', mediunidade:'#f0eefe|#533489', 'alem-vida':'#f8f6f2|#3c3489', moral:'#eaf3de|#3b6d11', ciencia:'#fcebeb|#a32d2d' }

function normalize(s) { return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase() }

export default function Glossario() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [letter, setLetter] = useState(null)
  const [open, setOpen] = useState(null)

  const available = [...new Set(terms.map(t => normalize(t.term)[0].toUpperCase()))].sort()
  const filtered = terms.filter(t => {
    if (search) return normalize(t.term).includes(normalize(search)) || normalize(t.def).includes(normalize(search))
    if (letter) return normalize(t.term)[0].toUpperCase() === letter
    return true
  })

  const groups = {}
  filtered.forEach(t => {
    const l = normalize(t.term)[0].toUpperCase()
    if (!groups[l]) groups[l] = []
    groups[l].push(t)
  })

  return (
    <div style={{ fontFamily:"'Crimson Pro',Georgia,serif", background:'#fff' }}>
      <style>{`
        .g-alpha{padding:14px 32px;border-bottom:1px solid #e0d8c8;display:flex;flex-wrap:wrap;gap:5px;}
        .g-ab{width:28px;height:28px;border-radius:4px;border:1px solid #e0d8c8;background:transparent;font-family:'Cinzel',serif;font-size:12px;color:#666;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.15s;}
        .g-ab:hover{border-color:#1a3a6b;color:#1a3a6b;}
        .g-ab.active{background:#1a3a6b;color:#fff;border-color:#1a3a6b;}
        .g-ab.dis{opacity:0.25;pointer-events:none;}
        .g-body{padding:0 32px 48px;}
        .g-letter-group{margin-top:28px;}
        .g-letter-h{font-family:'Cinzel',serif;font-size:22px;color:#c9a650;margin-bottom:14px;padding-bottom:8px;border-bottom:1px solid #e0d8c8;letter-spacing:0.1em;}
        .g-term{border-bottom:1px solid #f0ece4;cursor:pointer;transition:background 0.15s;}
        .g-term:hover{background:#faf8f4;}
        .g-term-hdr{display:flex;align-items:center;justify-content:space-between;padding:14px 0;gap:10px;}
        .g-term-left{display:flex;align-items:center;gap:10px;}
        .g-term-name{font-family:'Cinzel',serif;font-size:15px;color:#1a3a6b;letter-spacing:0.04em;}
        .g-term-body{display:none;padding:0 0 16px;}
        .g-term.open .g-term-body{display:block;}
        .g-term-def{font-size:15.5px;color:#444;line-height:1.85;font-weight:300;margin-bottom:8px;}
        .g-term-src{font-size:12px;color:#c9a650;font-style:italic;margin-bottom:3px;}
        .g-term-eo{font-size:12px;color:#aaa;}
        .g-empty{padding:48px 32px;text-align:center;color:#aaa;font-style:italic;font-size:16px;}
        @media(max-width:768px){
          .g-alpha{padding:12px 16px;}
          .g-body{padding:0 16px 36px;}
        }
      `}</style>
      <Nav />
      <div style={{ padding:'44px 32px 36px', borderBottom:'1px solid #e0d8c8' }}>
        <div style={{ fontSize:'12px', color:'#aaa', marginBottom:'12px' }}><span onClick={()=>navigate('/')} style={{color:'#1a3a6b',cursor:'pointer'}}>Início</span> › Glossário</div>
        <p style={{ fontSize:'10px', letterSpacing:'0.22em', color:'#c9a650', textTransform:'uppercase', marginBottom:'8px' }}>Termos & Conceitos</p>
        <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:'30px', fontWeight:500, color:'#1a3a6b' }}>Glossário Espírita</h1>
        <div style={{ width:'40px', height:'2px', background:'#c9a650', margin:'12px 0 14px' }}></div>
        <p style={{ fontSize:'16px', color:'#666', lineHeight:1.8, fontWeight:300 }}>Definições dos principais termos da Doutrina Espírita, baseadas nas obras de Kardec e outros autores.</p>
      </div>

      <div style={{ padding:'18px 32px', borderBottom:'1px solid #e0d8c8', display:'flex', gap:'12px', alignItems:'center' }}>
        <input value={search} onChange={e=>{ setSearch(e.target.value); setLetter(null) }} placeholder="🔍  Buscar termo..." style={{ flex:1, padding:'9px 14px', border:'1px solid #d0c8b8', borderRadius:'4px', fontFamily:"'Crimson Pro',Georgia,serif", fontSize:'15px', outline:'none' }} />
        <span style={{ fontSize:'13px', color:'#aaa', fontStyle:'italic', whiteSpace:'nowrap' }}>{filtered.length} termo{filtered.length!==1?'s':''}</span>
      </div>

      <div className="g-alpha">
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => (
          <button key={l} className={`g-ab${!available.includes(l)?' dis':''}${letter===l?' active':''}`} onClick={()=>{ setLetter(letter===l?null:l); setSearch('') }} disabled={!available.includes(l)}>{l}</button>
        ))}
      </div>

      <div className="g-body">
        {Object.keys(groups).length === 0 ? (
          <div className="g-empty">Nenhum termo encontrado. Tente outra busca.</div>
        ) : Object.keys(groups).sort().map(l => (
          <div className="g-letter-group" key={l}>
            <div className="g-letter-h">{l}</div>
            {groups[l].map(t => {
              const [bg,fg] = (tagColors[t.tag]||'#eef2f8|#1a3a6b').split('|')
              return (
                <div key={t.term} className={`g-term${open===t.term?' open':''}`} onClick={()=>setOpen(open===t.term?null:t.term)}>
                  <div className="g-term-hdr">
                    <div className="g-term-left">
                      <span className="g-term-name">{t.term}</span>
                      <span style={{ fontSize:'10px', padding:'2px 8px', borderRadius:'2px', background:bg, color:fg, letterSpacing:'0.06em' }}>{t.tag}</span>
                    </div>
                    <span style={{ fontSize:'12px', color:'#aaa', transition:'transform 0.2s', transform: open===t.term?'rotate(180deg)':'none' }}>▾</span>
                  </div>
                  <div className="g-term-body">
                    <p className="g-term-def">{t.def}</p>
                    <p className="g-term-src">📖 {t.source}</p>
                    <p className="g-term-eo">🌐 Esperanto: <em>{t.eo}</em></p>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <footer style={{ padding:'28px 32px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid #e0d8c8', background:'#f8f6f2', flexWrap:'wrap', gap:'12px' }}>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', letterSpacing:'0.1em' }}>✦ JOHANO</div>
        <p style={{ fontSize:'11px', color:'#aaa', fontStyle:'italic' }}>johano.com.br · Luz, Amor e Verdade</p>
      </footer>
    </div>
  )
}

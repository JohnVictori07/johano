import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from './Nav'

const books = [
  { id:1, title:'O Livro dos Espíritos', author:'Allan Kardec', year:1857, category:'kardec', tags:['Essencial','Iniciante'], color:'#1a3a6b', free:true, freeUrl:'https://www.febnet.org.br', buyUrl:'https://www.amazon.com.br/s?k=livro+dos+espiritos', desc:'A obra fundamental do Espiritismo. Reúne mais de mil perguntas e respostas sobre a natureza dos espíritos, a imortalidade da alma, a reencarnação e as leis morais que regem o universo.', pages:'510', nivel:'Iniciante' },
  { id:2, title:'O Livro dos Médiuns', author:'Allan Kardec', year:1861, category:'kardec', tags:['Essencial','Mediunidade'], color:'#185fa5', free:true, freeUrl:'https://www.febnet.org.br', buyUrl:'https://www.amazon.com.br/s?k=livro+dos+mediuns', desc:'Guia completo sobre a mediunidade e a evocação dos espíritos. Kardec explica os diferentes tipos de médiuns e as manifestações espirituais.', pages:'430', nivel:'Intermediário' },
  { id:3, title:'O Evangelho Segundo o Espiritismo', author:'Allan Kardec', year:1864, category:'kardec', tags:['Essencial','Moral'], color:'#0f6e56', free:true, freeUrl:'https://www.febnet.org.br', buyUrl:'https://www.amazon.com.br/s?k=evangelho+segundo+espiritismo', desc:'Interpretação espírita dos ensinamentos morais de Jesus. Uma das obras mais lidas e amadas do Espiritismo, repleta de consolação, esperança e orientação para a vida prática.', pages:'390', nivel:'Iniciante' },
  { id:4, title:'O Céu e o Inferno', author:'Allan Kardec', year:1865, category:'kardec', tags:['Além-Vida'], color:'#3c3489', free:true, freeUrl:'https://www.febnet.org.br', buyUrl:'https://www.amazon.com.br/s?k=ceu+e+inferno+kardec', desc:'Estudo comparado das doutrinas sobre punições e recompensas após a morte. Kardec demonstra que a justiça divina é incompatível com penas eternas.', pages:'340', nivel:'Intermediário' },
  { id:5, title:'A Gênese', author:'Allan Kardec', year:1868, category:'kardec', tags:['Ciência','Filosófico'], color:'#854f0b', free:true, freeUrl:'https://www.febnet.org.br', buyUrl:'https://www.amazon.com.br/s?k=a+genese+kardec', desc:'A última grande obra de Kardec aborda os milagres e as profecias à luz da ciência e do Espiritismo, conciliando fé e razão de forma magistral.', pages:'370', nivel:'Avançado' },
  { id:6, title:'O Que é o Espiritismo', author:'Allan Kardec', year:1859, category:'kardec', tags:['Essencial','Iniciante'], color:'#993c1d', free:true, freeUrl:'https://www.febnet.org.br', buyUrl:'https://www.amazon.com.br/s?k=o+que+e+o+espiritismo', desc:'Introdução ao Espiritismo em forma de diálogo. Ideal para quem está tendo o primeiro contato com a doutrina. Kardec explica os fundamentos de forma clara e acessível.', pages:'180', nivel:'Iniciante' },
  { id:7, title:'Nosso Lar', author:'Chico Xavier / André Luiz', year:1944, category:'chico', tags:['Essencial','Além-Vida','Iniciante'], color:'#185fa5', free:false, buyUrl:'https://www.amazon.com.br/s?k=nosso+lar+chico+xavier', desc:'O relato de André Luiz sobre seus primeiros momentos após a morte e a descoberta da colônia espiritual Nosso Lar. Um dos livros mais impactantes da literatura espírita.', pages:'280', nivel:'Iniciante' },
  { id:8, title:'Os Mensageiros', author:'Chico Xavier / André Luiz', year:1944, category:'chico', tags:['Além-Vida'], color:'#993556', free:false, buyUrl:'https://www.amazon.com.br/s?k=os+mensageiros+chico+xavier', desc:'Continuação de Nosso Lar. André Luiz acompanha missões espirituais de socorro aos encarnados, revelando como os espíritos atuam no mundo dos vivos.', pages:'260', nivel:'Intermediário' },
  { id:9, title:'Caminho, Verdade e Vida', author:'Chico Xavier / Emmanuel', year:1938, category:'chico', tags:['Moral','Essencial'], color:'#1d9e75', free:false, buyUrl:'https://www.amazon.com.br/s?k=caminho+verdade+vida+chico+xavier', desc:'Comentários do espírito Emmanuel sobre os ensinamentos de Jesus. Uma obra de profunda espiritualidade e orientação moral para o cotidiano.', pages:'320', nivel:'Iniciante' },
  { id:10, title:'Após a Morte', author:'Léon Denis', year:1890, category:'outros', tags:['Filosófico','Além-Vida'], color:'#533489', free:true, freeUrl:'https://www.febnet.org.br', buyUrl:'https://www.amazon.com.br/s?k=apos+a+morte+leon+denis', desc:'Uma das obras filosóficas mais profundas do Espiritismo. Denis demonstra com rigor a imortalidade da alma e a lógica da reencarnação.', pages:'450', nivel:'Intermediário' },
  { id:11, title:'A Loucura Sob Novo Prisma', author:'Bezerra de Menezes', year:1897, category:'outros', tags:['Saúde','Mediunidade'], color:'#185fa5', free:true, freeUrl:'https://www.febnet.org.br', buyUrl:'https://www.amazon.com.br/s?k=a+loucura+sob+novo+prisma', desc:'O médico e espírita Bezerra de Menezes analisa a relação entre doenças mentais e influências espirituais, uma obra pioneira e ainda muito atual.', pages:'200', nivel:'Avançado' },
  { id:12, title:'Missionários da Luz', author:'Chico Xavier / André Luiz', year:1945, category:'chico', tags:['Reencarnação'], color:'#0f6e56', free:false, buyUrl:'https://www.amazon.com.br/s?k=missionarios+da+luz+chico+xavier', desc:'Descreve em detalhes o processo de preparação para a reencarnação, mostrando como os espíritos escolhem suas próximas experiências no plano físico.', pages:'300', nivel:'Intermediário' },
]

export default function Biblioteca() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('todos')
  const [selected, setSelected] = useState(null)

  const filtered = filter==='todos' ? books : filter==='gratuito' ? books.filter(b=>b.free) : filter==='iniciante' ? books.filter(b=>b.tags.includes('Iniciante')) : books.filter(b=>b.category===filter)

  const sections = [
    { label:'Obras Codificadas — Allan Kardec', key:'kardec' },
    { label:'Psicografias — Chico Xavier', key:'chico' },
    { label:'Outros Autores Espíritas', key:'outros' },
  ]

  return (
    <div style={{ fontFamily:"'Crimson Pro',Georgia,serif", background:'#fff' }}>
      <style>{`
        .b-filters{padding:18px 32px;border-bottom:1px solid #e0d8c8;display:flex;gap:10px;flex-wrap:wrap;align-items:center;}
        .b-filter{font-size:12px;padding:6px 16px;border-radius:20px;border:1px solid #d0c8b8;background:transparent;color:#666;cursor:pointer;transition:all 0.2s;font-family:'Crimson Pro',Georgia,serif;}
        .b-filter:hover{border-color:#1a3a6b;color:#1a3a6b;}
        .b-filter.active{background:#1a3a6b;color:#fff;border-color:#1a3a6b;}
        .b-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:20px;padding:0 32px 32px;}
        .b-book{cursor:pointer;transition:transform 0.2s;}
        .b-book:hover{transform:translateY(-4px);}
        .b-cover{width:100%;aspect-ratio:2/3;border-radius:4px 8px 8px 4px;display:flex;align-items:flex-end;padding:14px 12px;position:relative;overflow:hidden;box-shadow:2px 4px 12px rgba(0,0,0,0.15);}
        .b-cover::before{content:'';position:absolute;left:0;top:0;bottom:0;width:8px;background:rgba(0,0,0,0.2);border-radius:4px 0 0 4px;}
        .b-cover-title{font-family:'Cinzel',serif;font-size:11px;font-weight:500;line-height:1.4;color:#fff;text-shadow:0 1px 4px rgba(0,0,0,0.6);position:relative;z-index:1;}
        .b-cover-author{font-size:9px;color:rgba(255,255,255,0.8);margin-top:3px;font-style:italic;position:relative;z-index:1;}
        .b-info{padding:10px 4px 0;}
        .b-book-title{font-family:'Cinzel',serif;font-size:12px;color:#1a3a6b;line-height:1.4;margin-bottom:3px;}
        .b-book-author{font-size:11px;color:#888;font-style:italic;margin-bottom:6px;}
        .b-tags{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:8px;}
        .b-tag{font-size:10px;padding:2px 7px;background:#eef2f8;color:#1a3a6b;border-radius:2px;}
        .b-tag.ess{background:#fef8ec;color:#8a6520;}
        .b-links{display:flex;gap:6px;}
        .b-link{font-size:11px;padding:3px 8px;border-radius:2px;text-decoration:none;border:1px solid #d0c8b8;color:#666;transition:all 0.2s;}
        .b-link:hover{border-color:#1a3a6b;color:#1a3a6b;}
        .b-link.free{background:#f0f6ee;border-color:#3b6d11;color:#3b6d11;}
        .modal-ov{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;}
        .modal{background:#fff;border-radius:8px;max-width:500px;width:100%;overflow:hidden;max-height:90vh;overflow-y:auto;}
        .modal-cover{height:140px;display:flex;align-items:flex-end;padding:18px 22px;position:relative;}
        .modal-close{position:absolute;top:10px;right:10px;width:28px;height:28px;border-radius:50%;background:rgba(0,0,0,0.3);border:none;cursor:pointer;color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;}
        .modal-body{padding:22px;}
        .modal-author{font-size:13px;color:#c9a650;font-style:italic;margin-bottom:14px;}
        .modal-desc{font-size:15px;color:#555;line-height:1.85;font-weight:300;margin-bottom:18px;}
        .modal-meta{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:18px;}
        .modal-meta span{font-size:12px;color:#888;}
        .modal-actions{display:flex;gap:10px;flex-wrap:wrap;}
        .modal-btn{padding:10px 18px;border-radius:2px;font-size:13px;letter-spacing:0.06em;cursor:pointer;border:none;font-family:'Cinzel',serif;text-decoration:none;display:inline-flex;align-items:center;gap:6px;}
        .modal-btn.p{background:#1a3a6b;color:#fff;}
        .modal-btn.s{background:transparent;color:#1a3a6b;border:1px solid #1a3a6b;}
        .modal-btn.f{background:#3b6d11;color:#fff;}
        .s-sec-name{font-family:'Cinzel',serif;font-size:11px;letter-spacing:0.1em;color:#aaa;text-transform:uppercase;margin-bottom:14px;padding-bottom:8px;border-bottom:1px solid #e0d8c8;display:flex;justify-content:space-between;}
        @media(max-width:768px){
          .b-filters{padding:14px 16px;}
          .b-grid{grid-template-columns:repeat(2,1fr);gap:14px;padding:0 16px 24px;}
          .s-sec-name{padding:20px 16px 8px;}
        }
      `}</style>
      <Nav />
      <div style={{ padding:'44px 32px 36px', borderBottom:'1px solid #e0d8c8' }}>
        <div style={{ fontSize:'12px', color:'#aaa', marginBottom:'12px' }}><span onClick={()=>navigate('/')} style={{color:'#1a3a6b',cursor:'pointer'}}>Início</span> › Biblioteca</div>
        <p style={{ fontSize:'10px', letterSpacing:'0.22em', color:'#c9a650', textTransform:'uppercase', marginBottom:'8px' }}>Obras Recomendadas</p>
        <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:'30px', fontWeight:500, color:'#1a3a6b', letterSpacing:'0.04em' }}>Biblioteca</h1>
        <div style={{ width:'40px', height:'2px', background:'#c9a650', margin:'12px 0 14px' }}></div>
        <p style={{ fontSize:'16px', color:'#666', lineHeight:1.8, fontWeight:300 }}>Obras fundamentais da Doutrina Espírita. Clique em qualquer livro para saber mais.</p>
      </div>

      <div className="b-filters">
        <span style={{ fontSize:'11px', letterSpacing:'0.1em', color:'#aaa', textTransform:'uppercase', marginRight:'4px' }}>Filtrar</span>
        {[['todos','Todos'],['kardec','Kardec'],['chico','Chico Xavier'],['outros','Outros'],['gratuito','Gratuitos'],['iniciante','Para iniciar']].map(([v,l])=>(
          <button key={v} className={`b-filter${filter===v?' active':''}`} onClick={()=>setFilter(v)}>{l}</button>
        ))}
      </div>

      {filter==='todos' ? sections.map(s => {
        const items = books.filter(b=>b.category===s.key)
        return (
          <div key={s.key}>
            <div className="s-sec-name" style={{ padding:'24px 32px 8px' }}><span>{s.label}</span><span style={{fontWeight:300}}>{items.length} obras</span></div>
            <div className="b-grid">
              {items.map(b=><BookCard key={b.id} b={b} onSelect={setSelected}/>)}
            </div>
          </div>
        )
      }) : (
        <div>
          <div className="s-sec-name" style={{ padding:'24px 32px 8px' }}><span>{filtered.length} obra(s)</span></div>
          <div className="b-grid">{filtered.map(b=><BookCard key={b.id} b={b} onSelect={setSelected}/>)}</div>
        </div>
      )}

      {selected && (
        <div className="modal-ov" onClick={e=>e.target===e.currentTarget&&setSelected(null)}>
          <div className="modal">
            <div className="modal-cover" style={{ background:selected.color }}>
              <button className="modal-close" onClick={()=>setSelected(null)}>✕</button>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:'17px', color:'#fff', textShadow:'0 1px 6px rgba(0,0,0,0.5)', lineHeight:1.3 }}>{selected.title}</div>
            </div>
            <div className="modal-body">
              <p className="modal-author">{selected.author} · {selected.year}</p>
              <p className="modal-desc">{selected.desc}</p>
              <div className="modal-meta">
                <span>📖 {selected.pages} páginas</span>
                <span>🎓 {selected.nivel}</span>
                <span>🏷 {selected.tags.join(', ')}</span>
              </div>
              <div className="modal-actions">
                {selected.free && <a className="modal-btn f" href={selected.freeUrl} target="_blank" rel="noreferrer">Baixar grátis</a>}
                <a className="modal-btn p" href={selected.buyUrl} target="_blank" rel="noreferrer">Ver na Amazon</a>
                <button className="modal-btn s" onClick={()=>setSelected(null)}>Fechar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer style={{ padding:'28px 32px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid #e0d8c8', background:'#f8f6f2', flexWrap:'wrap', gap:'12px' }}>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', letterSpacing:'0.1em' }}>✦ JOHANO</div>
        <p style={{ fontSize:'11px', color:'#aaa', fontStyle:'italic' }}>johano.com.br · Luz, Amor e Verdade</p>
      </footer>
    </div>
  )
}

function BookCard({ b, onSelect }) {
  return (
    <div className="b-book" onClick={()=>onSelect(b)}>
      <div className="b-cover" style={{ background:b.color }}>
        <div><div className="b-cover-title">{b.title}</div><div className="b-cover-author">{b.author}</div></div>
      </div>
      <div className="b-info">
        <div className="b-book-title">{b.title}</div>
        <div className="b-book-author">{b.author} · {b.year}</div>
        <div className="b-tags">{b.tags.map(t=><span key={t} className={`b-tag${t==='Essencial'?' ess':''}`}>{t}</span>)}</div>
        <div className="b-links">
          {b.free && <a className="b-link free" href={b.freeUrl} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()}>Grátis</a>}
          <a className="b-link" href={b.buyUrl} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()}>Amazon</a>
        </div>
      </div>
    </div>
  )
}

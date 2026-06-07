import { useNavigate } from 'react-router-dom'
import Nav from './Nav'

const canais = [
  { name:'Portal Luz Espírita', handle:'luzespirita.org.br', type:'site', color:'#1a3a6b', label:'Site', desc:'Portal com artigos, obras digitais, palestras e um acervo extenso para estudo da doutrina espírita.', url:'https://www.luzespirita.org.br' },
  { name:'FEB — Federação Espírita Brasileira', handle:'febnet.org.br', type:'site', color:'#0f6e56', label:'Site', desc:'Site oficial da maior federação espírita do Brasil. Obras de Kardec para download gratuito.', url:'https://www.febnet.org.br' },
  { name:'Espiritismo Hoje', handle:'@espiritismohoje', type:'youtube', color:'#c00', label:'YouTube', desc:'Canal com estudos sistemáticos das obras de Kardec, ideal para quem deseja estudar capítulo por capítulo.', url:'https://www.youtube.com' },
  { name:'Instituto Chico Xavier', handle:'institutochicoxavier.org.br', type:'site', color:'#533489', label:'Site', desc:'Portal dedicado à vida e obra de Chico Xavier, com biografias, obras e o legado do maior médium brasileiro.', url:'https://www.institutochicoxavier.org.br' },
  { name:'Papo Espírita', handle:'Podcast · Spotify', type:'podcast', color:'#1d9e75', label:'Podcast', desc:'Podcast semanal com discussões sobre temas espíritas, entrevistas com palestrantes e reflexões para o cotidiano.', url:'https://open.spotify.com' },
  { name:'Allan Kardec Channel', handle:'@allankardecchannel', type:'youtube', color:'#854f0b', label:'YouTube', desc:'Canal com palestras clássicas de grandes palestrantes espíritas brasileiros, um acervo histórico valioso.', url:'https://www.youtube.com' },
  { name:'Espiritualidade em Pauta', handle:'Podcast · Spotify', type:'podcast', color:'#185fa5', label:'Podcast', desc:'Discussões profundas sobre espiritualidade, ciência e Espiritismo com convidados especializados.', url:'https://open.spotify.com' },
  { name:'CEAK — Centro Espírita', handle:'ceak.com.br', type:'site', color:'#3c3489', label:'Centro', desc:'Centro espírita com vasto acervo online de palestras, cursos e material de estudo gratuito.', url:'https://www.ceak.com.br' },
]

export default function Canais() {
  const navigate = useNavigate()
  return (
    <div style={{ fontFamily:"'Crimson Pro',Georgia,serif", background:'#fff' }}>
      <style>{`
        .c-featured{display:grid;grid-template-columns:240px 1fr;border:1px solid #e0d8c8;border-radius:8px;overflow:hidden;margin:28px 32px 0;}
        .c-ft{background:linear-gradient(135deg,#c00,#800);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px;padding:28px;}
        .c-ft-icon{font-size:44px;color:#fff;}
        .c-ft-badge{font-size:11px;background:rgba(255,255,255,0.2);color:#fff;padding:4px 12px;border-radius:2px;letter-spacing:0.06em;}
        .c-fb{padding:24px;}
        .c-fb-eye{font-size:10px;letter-spacing:0.18em;color:#c9a650;text-transform:uppercase;margin-bottom:8px;}
        .c-fb-name{font-family:'Cinzel',serif;font-size:20px;color:#1a3a6b;margin-bottom:4px;}
        .c-fb-handle{font-size:13px;color:#aaa;font-style:italic;margin-bottom:12px;}
        .c-fb-desc{font-size:15px;color:#555;line-height:1.85;font-weight:300;margin-bottom:18px;}
        .c-fb-btn{display:inline-flex;align-items:center;gap:6px;background:#c00;color:#fff;padding:10px 20px;border-radius:2px;font-family:'Cinzel',serif;font-size:12px;letter-spacing:0.08em;text-decoration:none;}
        .c-fb-btn:hover{background:#900;}
        .c-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px;padding:0 32px 32px;}
        .c-card{background:#fff;border:1px solid #e0d8c8;border-radius:8px;overflow:hidden;transition:all 0.2s;text-decoration:none;display:block;}
        .c-card:hover{transform:translateY(-2px);border-color:#ccc;}
        .c-thumb{height:90px;display:flex;align-items:center;justify-content:center;position:relative;}
        .c-thumb-icon{font-size:32px;color:rgba(255,255,255,0.9);}
        .c-thumb-label{position:absolute;top:8px;right:8px;font-size:10px;padding:2px 7px;border-radius:2px;background:rgba(0,0,0,0.25);color:#fff;letter-spacing:0.06em;text-transform:uppercase;}
        .c-card-body{padding:14px;}
        .c-card-name{font-family:'Cinzel',serif;font-size:13px;color:#1a3a6b;margin-bottom:3px;}
        .c-card-sub{font-size:11px;color:#aaa;font-style:italic;margin-bottom:8px;}
        .c-card-desc{font-size:13px;color:#666;line-height:1.7;font-weight:300;margin-bottom:10px;}
        .c-card-foot{display:flex;justify-content:space-between;align-items:center;}
        .c-card-tag{font-size:10px;padding:2px 8px;background:#eef2f8;color:#1a3a6b;border-radius:2px;}
        .c-card-link{font-size:12px;color:#1a3a6b;}
        .c-filters{padding:18px 32px;border-bottom:1px solid #e0d8c8;display:flex;gap:10px;flex-wrap:wrap;}
        .c-filter{font-size:12px;padding:6px 16px;border-radius:20px;border:1px solid #d0c8b8;background:transparent;color:#666;cursor:pointer;font-family:'Crimson Pro',Georgia,serif;}
        .c-filter.active{background:#1a3a6b;color:#fff;border-color:#1a3a6b;}
        .c-sec-name{font-family:'Cinzel',serif;font-size:11px;letter-spacing:0.1em;color:#aaa;text-transform:uppercase;padding:24px 32px 8px;border-bottom:1px solid #e0d8c8;margin-bottom:0;}
        @media(max-width:768px){
          .c-featured{grid-template-columns:1fr;margin:16px;}
          .c-ft{padding:20px;}
          .c-filters{padding:14px 16px;}
          .c-grid{grid-template-columns:1fr;padding:0 16px 24px;}
          .c-sec-name{padding:20px 16px 8px;}
        }
      `}</style>
      <Nav />
      <div style={{ padding:'44px 32px 36px', borderBottom:'1px solid #e0d8c8' }}>
        <div style={{ fontSize:'12px', color:'#aaa', marginBottom:'12px' }}><span onClick={()=>navigate('/')} style={{color:'#1a3a6b',cursor:'pointer'}}>Início</span> › Canais & Recursos</div>
        <p style={{ fontSize:'10px', letterSpacing:'0.22em', color:'#c9a650', textTransform:'uppercase', marginBottom:'8px' }}>Recomendações</p>
        <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:'30px', fontWeight:500, color:'#1a3a6b' }}>Canais & Recursos</h1>
        <div style={{ width:'40px', height:'2px', background:'#c9a650', margin:'12px 0 14px' }}></div>
        <p style={{ fontSize:'16px', color:'#666', lineHeight:1.8, fontWeight:300 }}>Seleção de canais, sites e podcasts para aprofundar seus estudos espíritas.</p>
      </div>

      {/* DESTAQUE */}
      <div className="c-featured">
        <div className="c-ft">
          <div className="c-ft-icon">▶</div>
          <span className="c-ft-badge">Canal em Destaque</span>
        </div>
        <div className="c-fb">
          <p className="c-fb-eye">YouTube · Recomendado pelo Johano</p>
          <h2 className="c-fb-name">E.O.S Manaus</h2>
          <p className="c-fb-handle">@eosmanaus · YouTube</p>
          <p className="c-fb-desc">O canal E.O.S Manaus é uma das referências mais sólidas no estudo do Espiritismo em português. Com palestras, estudos aprofundados e uma abordagem séria e acessível, é ideal tanto para iniciantes quanto para estudiosos avançados da doutrina.</p>
          <a className="c-fb-btn" href="https://www.youtube.com/@eosmanaus" target="_blank" rel="noreferrer">▶ Acessar o canal</a>
        </div>
      </div>

      {[['YouTube',canais.filter(c=>c.type==='youtube')],['Sites & Portais',canais.filter(c=>c.type==='site')],['Podcasts',canais.filter(c=>c.type==='podcast')]].map(([label, items]) => (
        <div key={label}>
          <div className="c-sec-name">{label}</div>
          <div className="c-grid">
            {items.map(c => (
              <a key={c.name} className="c-card" href={c.url} target="_blank" rel="noreferrer">
                <div className="c-thumb" style={{ background:c.color }}>
                  <div className="c-thumb-icon">🔗</div>
                  <span className="c-thumb-label">{c.label}</span>
                </div>
                <div className="c-card-body">
                  <p className="c-card-name">{c.name}</p>
                  <p className="c-card-sub">{c.handle}</p>
                  <p className="c-card-desc">{c.desc}</p>
                  <div className="c-card-foot">
                    <span className="c-card-tag">{c.label}</span>
                    <span className="c-card-link">Acessar →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}

      <footer style={{ padding:'28px 32px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid #e0d8c8', background:'#f8f6f2', flexWrap:'wrap', gap:'12px' }}>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', letterSpacing:'0.1em' }}>✦ JOHANO</div>
        <p style={{ fontSize:'11px', color:'#aaa', fontStyle:'italic' }}>johano.com.br · Luz, Amor e Verdade</p>
      </footer>
    </div>
  )
}

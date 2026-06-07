import { useNavigate } from 'react-router-dom'
import Nav from './Nav'

export default function Esperanto() {
  const navigate = useNavigate()
  const parallels = [
    ['Fora da caridade não há salvação.','Ekster la karitato ne ekzistas savo.'],
    ['O espírito é imortal e se reencarna para evoluir.','La spirito estas senmortulo kaj reenkarnias por evolui.'],
    ['Amai-vos uns aos outros como irmãos.','Amu unu la alian kiel fratojn.'],
    ['Paz e bem a todos os espíritos encarnados e desencarnados.','Paco kaj bono al ĉiuj enkarniĝintaj kaj desenkarniĝintaj spiritoj.'],
  ]
  const words = [['Spirito','Espírito'],['Reenkarnado','Reencarnação'],['Karitato','Caridade'],['Senmorteco','Imortalidade'],['Mediumeco','Mediunidade'],['Evoluo','Evolução'],['Frateco','Fraternidade'],['Paco','Paz'],['Amo','Amor'],['Lumo','Luz'],['Vero','Verdade'],['Dio','Deus']]
  const resources = [
    { name:'Duolingo', type:'App gratuito', desc:'Curso de Esperanto para iniciantes, no seu ritmo, direto no celular.', url:'https://www.duolingo.com/course/eo/pt' },
    { name:'Lernu!', type:'Plataforma completa', desc:'Plataforma com cursos, dicionário, gramática e comunidade ativa de falantes.', url:'https://lernu.net' },
    { name:'Evildea', type:'YouTube', desc:'Canal com conteúdo em Esperanto para todos os níveis. Ótimo para a compreensão auditiva.', url:'https://www.youtube.com/@Evildea' },
    { name:'ABEB', type:'Associação brasileira', desc:'Associação Brasileira de Esperanto. Encontre grupos e eventos presenciais no Brasil.', url:'https://www.esperanto.org.br' },
  ]
  const connections = [
    { title:'Fraternidade Universal', text:'Tanto o Espiritismo quanto o Esperanto nasceram do mesmo ideal — a fraternidade entre todos os seres humanos, independente de raça, nação ou religião.' },
    { title:'O Nome Johano', text:'O nome deste portal é a forma em Esperanto de "João" — uma escolha simbólica que une os dois mundos: a doutrina espírita e a língua da fraternidade.' },
    { title:'Raízes Históricas', text:'Zamenhof era profundamente influenciado por ideais humanistas e espirituais. O movimento espírita europeu do século XIX compartilhava com o Esperanto o sonho de uma humanidade mais unida.' },
    { title:'Língua da Evolução', text:'Para os espíritas, a evolução moral é o caminho. O Esperanto propõe que a barreira linguística é um dos maiores obstáculos à paz. Aprender Esperanto é um ato espiritual de abertura ao outro.' },
  ]

  return (
    <div style={{ fontFamily:"'Crimson Pro',Georgia,serif", background:'#fff' }}>
      <style>{`
        .ep-hero{display:grid;grid-template-columns:1fr 1fr;gap:40px;padding:48px 32px;background:#f8f6f2;border-bottom:1px solid #e0d8c8;align-items:center;}
        .ep-star{background:#1a3a6b;border-radius:8px;padding:28px;text-align:center;}
        .ep-sec{padding:44px 32px;border-bottom:1px solid #e0d8c8;}
        .ep-conn-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
        .ep-conn{border:1px solid #e0d8c8;border-radius:8px;padding:18px;}
        .ep-conn-title{font-family:'Cinzel',serif;font-size:13px;color:#1a3a6b;margin-bottom:8px;}
        .ep-conn-text{font-size:14px;color:#666;line-height:1.75;font-weight:300;}
        .ep-quote{background:#1a3a6b;border-radius:8px;padding:24px 28px;margin:20px 0;}
        .ep-parallel{display:grid;grid-template-columns:1fr 1fr;border:1px solid #e0d8c8;border-radius:6px;overflow:hidden;margin-bottom:10px;}
        .ep-par-pt{padding:12px 16px;background:#fff;border-right:1px solid #e0d8c8;}
        .ep-par-eo{padding:12px 16px;background:#f8f6f2;}
        .ep-par-lang{font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#aaa;margin-bottom:4px;}
        .ep-par-text{font-size:14.5px;font-style:italic;color:#333;line-height:1.6;}
        .ep-learn-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px;}
        .ep-learn{border:1px solid #e0d8c8;border-radius:8px;overflow:hidden;transition:all 0.2s;}
        .ep-learn:hover{transform:translateY(-2px);}
        .ep-learn-top{padding:14px 16px;display:flex;align-items:center;gap:10px;border-bottom:1px solid #e0d8c8;background:#f8f6f2;}
        .ep-learn-name{font-family:'Cinzel',serif;font-size:13px;color:#1a3a6b;}
        .ep-learn-type{font-size:11px;color:#aaa;font-style:italic;}
        .ep-learn-body{padding:12px 16px;}
        .ep-learn-desc{font-size:13px;color:#666;line-height:1.7;font-weight:300;margin-bottom:10px;}
        .ep-learn-link{font-size:12px;color:#1a3a6b;text-decoration:none;}
        .ep-words{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px;}
        .ep-word{background:#f8f6f2;border-radius:6px;padding:10px 12px;border-left:2px solid #c9a650;}
        .ep-word-eo{font-family:'Cinzel',serif;font-size:13px;color:#1a3a6b;margin-bottom:2px;}
        .ep-word-pt{font-size:12px;color:#888;font-style:italic;}
        .s-label{font-size:10px;letter-spacing:0.22em;color:#c9a650;text-transform:uppercase;margin-bottom:8px;}
        .s-title{font-family:'Cinzel',serif;font-size:24px;font-weight:500;color:#1a3a6b;}
        .s-rule{width:40px;height:2px;background:#c9a650;margin:12px 0 22px;}
        @media(max-width:768px){
          .ep-hero{grid-template-columns:1fr;padding:28px 16px;}
          .ep-sec{padding:32px 16px;}
          .ep-conn-grid{grid-template-columns:1fr;}
          .ep-parallel{grid-template-columns:1fr;}
          .ep-par-pt{border-right:none;border-bottom:1px solid #e0d8c8;}
          .ep-learn-grid{grid-template-columns:1fr;}
          .ep-words{grid-template-columns:repeat(2,1fr);}
        }
      `}</style>
      <Nav />

      <div className="ep-hero">
        <div>
          <p style={{ fontSize:'10px', letterSpacing:'0.22em', color:'#c9a650', textTransform:'uppercase', marginBottom:'10px' }}>Lingvo & Spirito</p>
          <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:'32px', fontWeight:500, color:'#1a3a6b', marginBottom:'4px' }}>Esperanto</h1>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'14px', color:'#c9a650', fontStyle:'italic', marginBottom:'6px' }}>A língua da humanidade</p>
          <div style={{ width:'40px', height:'2px', background:'#c9a650', margin:'14px 0' }}></div>
          <p style={{ fontSize:'16px', color:'#555', lineHeight:1.9, fontWeight:300 }}>O Esperanto é uma língua construída com um propósito nobre: unir os povos do mundo numa comunicação igualitária, sem fronteiras culturais ou políticas. Criada em 1887 por Ludwig Lazarus Zamenhof, ela carrega um espírito de fraternidade universal que ressoa profundamente com os ideais do Espiritismo.</p>
        </div>
        <div className="ep-star">
          <div style={{ fontSize:'52px', marginBottom:'12px' }}>✦</div>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'16px', letterSpacing:'0.1em', color:'#c9a650', marginBottom:'8px' }}>LA VERDA STELO</p>
          <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.75)', lineHeight:1.7, fontWeight:300 }}>A estrela verde de cinco pontas é o símbolo do Esperanto — representando os cinco continentes unidos por uma língua comum.</p>
        </div>
      </div>

      <div className="ep-sec">
        <p className="s-label">A Ligação</p>
        <h2 className="s-title">Esperanto & Espiritismo</h2>
        <div className="s-rule"></div>
        <div className="ep-quote">
          <p style={{ fontSize:'18px', fontStyle:'italic', color:'#e8e0cc', lineHeight:1.85, fontWeight:300, marginBottom:'10px' }}>"Não existe para o espírito nem Oriente nem Ocidente, nem Norte nem Sul. Todos os homens são irmãos."</p>
          <p style={{ fontSize:'12px', color:'rgba(201,166,80,0.8)', fontStyle:'italic' }}>Espírito de Verdade — O Livro dos Espíritos, Allan Kardec</p>
        </div>
        <div className="ep-conn-grid">
          {connections.map(c => (
            <div className="ep-conn" key={c.title}>
              <p className="ep-conn-title">{c.title}</p>
              <p className="ep-conn-text">{c.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="ep-sec">
        <p className="s-label">Português & Esperanto</p>
        <h2 className="s-title">Frases Espíritas em Esperanto</h2>
        <div className="s-rule"></div>
        {parallels.map(([pt,eo],i) => (
          <div className="ep-parallel" key={i}>
            <div className="ep-par-pt"><p className="ep-par-lang">Português</p><p className="ep-par-text">{pt}</p></div>
            <div className="ep-par-eo"><p className="ep-par-lang">Esperanto</p><p className="ep-par-text">{eo}</p></div>
          </div>
        ))}
      </div>

      <div className="ep-sec">
        <p className="s-label">Recursos</p>
        <h2 className="s-title">Aprenda Esperanto</h2>
        <div className="s-rule"></div>
        <div className="ep-learn-grid">
          {resources.map(r => (
            <div className="ep-learn" key={r.name}>
              <div className="ep-learn-top">
                <div><p className="ep-learn-name">{r.name}</p><p className="ep-learn-type">{r.type}</p></div>
              </div>
              <div className="ep-learn-body">
                <p className="ep-learn-desc">{r.desc}</p>
                <a className="ep-learn-link" href={r.url} target="_blank" rel="noreferrer">Acessar →</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ep-sec">
        <p className="s-label">Vocabulário</p>
        <h2 className="s-title">Palavras Espíritas em Esperanto</h2>
        <div className="s-rule"></div>
        <div className="ep-words">
          {words.map(([eo,pt]) => (
            <div className="ep-word" key={eo}><p className="ep-word-eo">{eo}</p><p className="ep-word-pt">{pt}</p></div>
          ))}
        </div>
      </div>

      <footer style={{ padding:'28px 32px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid #e0d8c8', background:'#f8f6f2', flexWrap:'wrap', gap:'12px' }}>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', letterSpacing:'0.1em' }}>✦ JOHANO</div>
        <p style={{ fontSize:'11px', color:'#aaa', fontStyle:'italic' }}>johano.com.br · Lumo, Amo kaj Vero</p>
      </footer>
    </div>
  )
}

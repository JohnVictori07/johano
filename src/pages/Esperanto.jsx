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

  const words = [
    ['Spirito','Espírito'],['Reenkarnado','Reencarnação'],['Karitato','Caridade'],
    ['Senmorteco','Imortalidade'],['Mediumeco','Mediunidade'],['Evoluo','Evolução'],
    ['Frateco','Fraternidade'],['Paco','Paz'],['Amo','Amor'],['Lumo','Luz'],
    ['Vero','Verdade'],['Dio','Deus']
  ]

  const connections = [
    { title:'Fraternidade Universal', text:'Tanto o Espiritismo quanto o Esperanto nasceram do mesmo ideal — a fraternidade entre todos os seres humanos, independente de raça, nação ou religião.' },
    { title:'O Nome Johano', text:'O nome deste portal é a forma em Esperanto de "João" — uma escolha simbólica que une os dois mundos: a doutrina espírita e a língua da fraternidade.' },
    { title:'Raízes Históricas', text:'Zamenhof era profundamente influenciado por ideais humanistas e espirituais. O movimento espírita europeu do século XIX compartilhava com o Esperanto o sonho de uma humanidade mais unida.' },
    { title:'Língua da Evolução', text:'Para os espíritas, a evolução moral é o caminho. O Esperanto propõe que a barreira linguística é um dos maiores obstáculos à paz. Aprender Esperanto é um ato espiritual de abertura ao outro.' },
  ]

  const cursos = [
    { nome:'Curso Saluton', desc:'Método direto — você aprende sem usar o português. Gratuito, com áudio e correção automática dos exercícios.', url:'http://kursosaluton.org/', tag:'Gratuito · Com áudio', destaque:false },
    { nome:'Esperanto em 12 dias', desc:'Aprendizado gratuito e sem necessidade de cadastro. Ótimo para quem quer começar rápido.', url:'http://learn.esperanto.com/pt/', tag:'Gratuito · Sem cadastro', destaque:false },
    { nome:'Duolingo', desc:'A plataforma mais popular para aprendizado de idiomas. Curso de Esperanto gamificado e divertido.', url:'https://www.duolingo.com/course/eo/pt/Aprenda-Esperanto-On-line', tag:'Gratuito · App disponível', destaque:false },
    { nome:'Lernu.net', desc:'Plataforma multilíngue completa para aprender Esperanto. Cursos, dicionário, gramática e comunidade ativa.', url:'https://lernu.net/', tag:'Gratuito · Completo', destaque:false },
    { nome:'Esperanto Sem Mestre', desc:'Versão online do livro clássico de aprendizado de Esperanto. Referência histórica do movimento.', url:'http://esm.esperanto.org.br', tag:'Gratuito · Clássico', destaque:false },
    { nome:'Programa Mia Amiko', desc:'Une interessados em aprender Esperanto com amigos esperantistas. Aprendizado colaborativo.', url:'https://pma.esperanto.org.br/', tag:'Gratuito · Colaborativo', destaque:false },
  ]

  const dicionarios = [
    { nome:'Vortaro.net', desc:'Versão online do dicionário PIV — o mais completo da língua.', url:'https://vortaro.net/' },
    { nome:'Dicionário Túlio Flores', desc:'Dicionário online português-Esperanto e Esperanto-português.', url:'http://vortaro.esperanto.org.br/' },
    { nome:'REVO Online', desc:'Dicionário Reta Vortaro — referência acadêmica do Esperanto.', url:'http://reta-vortaro.de/revo' },
  ]

  const materiais = [
    { nome:'Pasporto al la tuta mondo', desc:'Audiocurso teatralizado em 16 lições. Excelente para desenvolver a compreensão auditiva.', url:'https://www.youtube.com/user/pasportotutamondo' },
    { nome:'Gerda Malaperis', desc:'Audiolivro em 25 capítulos baseado no livro de Claude Piron. Para intermediários.', url:'https://youtu.be/iVz6V0gH7Sk' },
    { nome:'UAE Facila', desc:'Artigos curtos e fáceis para quem está aprendendo. Leitura progressiva.', url:'https://uea.facila.org/' },
    { nome:'Gramática PAG', desc:'Tratado completo de gramática do Esperanto em PDF gratuito.', url:'https://drive.google.com/file/d/0B3bwzubbm6eca2tCNGZrR2poNDA' },
  ]

  const radios = [
    { nome:'Muzaiko', url:'http://muzaiko.info/podkasto' },
    { nome:'Kern', url:'https://kern.punkto.info/' },
    { nome:'Rádio Vaticana', url:'http://www.radio-vatikana-esperanto.org/' },
    { nome:'Ĉina Radio Internacia', url:'http://esperanto.cri.cn/radio/china.htm' },
    { nome:'Pola Retradio', url:'http://pola-retradio.org/' },
    { nome:'Varsovia Vento', url:'http://www.podkasto.net/' },
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
        .ep-words{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px;}
        .ep-word{background:#f8f6f2;border-radius:6px;padding:10px 12px;border-left:2px solid #c9a650;}
        .ep-word-eo{font-family:'Cinzel',serif;font-size:13px;color:#1a3a6b;margin-bottom:2px;}
        .ep-word-pt{font-size:12px;color:#888;font-style:italic;}
        .s-label{font-size:10px;letter-spacing:0.22em;color:#c9a650;text-transform:uppercase;margin-bottom:8px;}
        .s-title{font-family:'Cinzel',serif;font-size:24px;font-weight:500;color:#1a3a6b;}
        .s-rule{width:40px;height:2px;background:#c9a650;margin:12px 0 22px;}

        /* CURSOS */
        .ep-cursos-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;}
        .ep-curso{border:1px solid #e0d8c8;border-radius:8px;padding:18px;transition:all 0.2s;text-decoration:none;display:block;position:relative;}
        .ep-curso:hover{transform:translateY(-2px);border-color:#1a3a6b;}
        .ep-curso.destaque{border-color:#c9a650;border-width:2px;}
        .ep-curso-badge{position:absolute;top:12px;right:12px;font-size:10px;background:#c9a650;color:#fff;padding:2px 8px;border-radius:2px;letter-spacing:0.06em;}
        .ep-curso-nome{font-family:'Cinzel',serif;font-size:14px;color:#1a3a6b;margin-bottom:6px;letter-spacing:0.02em;}
        .ep-curso-desc{font-size:13.5px;color:#666;line-height:1.7;font-weight:300;margin-bottom:10px;}
        .ep-curso-tag{font-size:11px;color:#aaa;font-style:italic;}

        /* DICIONÁRIOS */
        .ep-dic-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;}
        .ep-dic{border:1px solid #e0d8c8;border-radius:6px;padding:14px;text-decoration:none;display:block;transition:all 0.2s;}
        .ep-dic:hover{border-color:#1a3a6b;background:#f8f6f2;}
        .ep-dic-nome{font-family:'Cinzel',serif;font-size:13px;color:#1a3a6b;margin-bottom:4px;}
        .ep-dic-desc{font-size:13px;color:#666;font-weight:300;}

        /* MATERIAIS */
        .ep-mat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;}
        .ep-mat{border:1px solid #e0d8c8;border-radius:6px;padding:14px;text-decoration:none;display:block;transition:all 0.2s;}
        .ep-mat:hover{border-color:#1a3a6b;background:#f8f6f2;}
        .ep-mat-nome{font-family:'Cinzel',serif;font-size:13px;color:#1a3a6b;margin-bottom:4px;}
        .ep-mat-desc{font-size:13px;color:#666;font-weight:300;}

        /* RÁDIOS */
        .ep-radio-grid{display:flex;flex-wrap:wrap;gap:8px;}
        .ep-radio{font-size:13px;padding:6px 14px;border:1px solid #e0d8c8;border-radius:20px;text-decoration:none;color:#555;transition:all 0.2s;}
        .ep-radio:hover{border-color:#1a3a6b;color:#1a3a6b;background:#f8f6f2;}

        /* SEA DESTAQUE */
        .ep-sea{background:linear-gradient(135deg,#1a3a6b,#2a5aad);border-radius:8px;padding:28px;color:#fff;display:flex;align-items:flex-start;gap:20px;margin-bottom:24px;}
        .ep-sea-icon{font-size:36px;flex-shrink:0;}
        .ep-sea-title{font-family:'Cinzel',serif;font-size:18px;color:#c9a650;margin-bottom:6px;letter-spacing:0.04em;}
        .ep-sea-desc{font-size:15px;color:rgba(255,255,255,0.8);line-height:1.8;font-weight:300;margin-bottom:14px;}
        .ep-sea-btn{display:inline-flex;align-items:center;gap:6px;background:#c9a650;color:#1a3a6b;padding:9px 18px;border-radius:2px;font-family:'Cinzel',serif;font-size:12px;letter-spacing:0.08em;text-decoration:none;font-weight:600;}

        /* CTA APRENDER */
        .ep-cta{background:#1a3a6b;padding:48px 32px;text-align:center;border-bottom:1px solid #e0d8c8;}

        @media(max-width:768px){
          .ep-hero{grid-template-columns:1fr;padding:28px 16px;}
          .ep-sec{padding:32px 16px;}
          .ep-conn-grid{grid-template-columns:1fr;}
          .ep-parallel{grid-template-columns:1fr;}
          .ep-par-pt{border-right:none;border-bottom:1px solid #e0d8c8;}
          .ep-words{grid-template-columns:repeat(2,1fr);}
          .ep-cursos-grid{grid-template-columns:1fr;}
          .ep-dic-grid{grid-template-columns:1fr;}
          .ep-mat-grid{grid-template-columns:1fr;}
          .ep-sea{flex-direction:column;gap:12px;}
          .ep-cta{padding:36px 16px;}
        }
      `}</style>

      <Nav />

      {/* HERO */}
      <div className="ep-hero">
        <div>
          <p className="s-label">Lingvo & Spirito</p>
          <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:'32px', fontWeight:500, color:'#1a3a6b', marginBottom:'4px' }}>Esperanto</h1>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'14px', color:'#c9a650', fontStyle:'italic', marginBottom:'6px' }}>A língua da humanidade</p>
          <div className="s-rule"></div>
          <p style={{ fontSize:'16px', color:'#555', lineHeight:1.9, fontWeight:300 }}>O Esperanto é uma língua construída com um propósito nobre: unir os povos do mundo numa comunicação igualitária, sem fronteiras culturais ou políticas. Criada em 1887 por Ludwig Lazarus Zamenhof, ela carrega um espírito de fraternidade universal que ressoa profundamente com os ideais do Espiritismo.</p>
        </div>
        <div className="ep-star">
          <div style={{ fontSize:'52px', marginBottom:'12px' }}>✦</div>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'16px', letterSpacing:'0.1em', color:'#c9a650', marginBottom:'8px' }}>LA VERDA STELO</p>
          <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.75)', lineHeight:1.7, fontWeight:300 }}>A estrela verde de cinco pontas é o símbolo do Esperanto — representando os cinco continentes unidos por uma língua comum.</p>
        </div>
      </div>

      {/* CONEXÃO */}
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

      {/* FRASES PARALELAS */}
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

      {/* VOCABULÁRIO */}
      <div className="ep-sec">
        <p className="s-label">Vocabulário</p>
        <h2 className="s-title">Palavras Espíritas em Esperanto</h2>
        <div className="s-rule"></div>
        <div className="ep-words">
          {words.map(([eo,pt]) => (
            <div className="ep-word" key={eo}>
              <p className="ep-word-eo">{eo}</p>
              <p className="ep-word-pt">{pt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* APRENDA — RECURSOS EXTERNOS */}
      <div className="ep-sec">
        <p className="s-label">Aprenda Esperanto</p>
        <h2 className="s-title">Recursos para Estudar</h2>
        <div className="s-rule"></div>

        {/* SEA DESTAQUE */}
        <div className="ep-sea">
          <div className="ep-sea-icon">🌟</div>
          <div>
            <p className="ep-sea-title">SEA — Spiritisma Esperanto-Asocio</p>
            <p className="ep-sea-desc">A associação que une Espiritismo e Esperanto. A SEA reúne espíritas esperantistas do mundo todo, produz conteúdo, organiza eventos e mantém um acervo riquíssimo sobre a ligação entre as duas correntes. Altamente recomendada!</p>
            <a className="ep-sea-btn" href="https://konsolanto.org/pt/" target="_blank" rel="noreferrer">Acessar o site da SEA →</a>
          </div>
        </div>

        {/* CURSOS */}
        <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'14px', color:'#1a3a6b', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'14px' }}>📖 Cursos</h3>
        <div className="ep-cursos-grid" style={{ marginBottom:'32px' }}>
          {cursos.map(c => (
            <a key={c.nome} className={`ep-curso${c.destaque?' destaque':''}`} href={c.url} target="_blank" rel="noreferrer">
              {c.destaque && <span className="ep-curso-badge">Recomendado</span>}
              <p className="ep-curso-nome">{c.nome}</p>
              <p className="ep-curso-desc">{c.desc}</p>
              <p className="ep-curso-tag">{c.tag}</p>
            </a>
          ))}
        </div>

        {/* DICIONÁRIOS */}
        <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'14px', color:'#1a3a6b', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'14px' }}>📚 Dicionários</h3>
        <div className="ep-dic-grid" style={{ marginBottom:'32px' }}>
          {dicionarios.map(d => (
            <a key={d.nome} className="ep-dic" href={d.url} target="_blank" rel="noreferrer">
              <p className="ep-dic-nome">{d.nome}</p>
              <p className="ep-dic-desc">{d.desc}</p>
            </a>
          ))}
        </div>

        {/* MATERIAIS */}
        <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'14px', color:'#1a3a6b', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'14px' }}>🎵 Materiais Complementares</h3>
        <div className="ep-mat-grid" style={{ marginBottom:'32px' }}>
          {materiais.map(m => (
            <a key={m.nome} className="ep-mat" href={m.url} target="_blank" rel="noreferrer">
              <p className="ep-mat-nome">{m.nome}</p>
              <p className="ep-mat-desc">{m.desc}</p>
            </a>
          ))}
        </div>

        {/* RÁDIOS */}
        <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'14px', color:'#1a3a6b', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'14px' }}>📻 Rádios & Podcasts em Esperanto</h3>
        <div className="ep-radio-grid">
          {radios.map(r => (
            <a key={r.nome} className="ep-radio" href={r.url} target="_blank" rel="noreferrer">{r.nome}</a>
          ))}
        </div>
      </div>

      {/* CTA CURSO JOHANO */}
      <div className="ep-cta">
        <p style={{ fontSize:'10px', letterSpacing:'0.22em', color:'rgba(201,166,80,0.7)', textTransform:'uppercase', marginBottom:'12px' }}>Novidade no Johano</p>
        <div style={{ fontSize:'48px', marginBottom:'12px' }}>🌟</div>
        <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'28px', color:'#fff', letterSpacing:'0.04em', marginBottom:'12px', fontWeight:500 }}>Aprenda Esperanto aqui no Johano!</h2>
        <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.75)', maxWidth:'540px', margin:'0 auto 28px', lineHeight:1.85, fontWeight:300 }}>O Johano tem um curso completo de Esperanto — 20 lições com áudio para ouvir a pronúncia, microfone para praticar falando e chat de conversação com o Johano em Esperanto. Tudo gratuito!</p>
        <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap', marginBottom:'16px' }}>
          <button onClick={()=>navigate('/esperanto/aprender')} style={{ background:'#c9a650', color:'#1a3a6b', border:'none', borderRadius:'2px', padding:'14px 36px', fontFamily:"'Cinzel',serif", fontSize:'13px', letterSpacing:'0.1em', cursor:'pointer', fontWeight:600, textTransform:'uppercase' }}>Começar o Curso Grátis</button>
          <button onClick={()=>navigate('/esperanto/chat')} style={{ background:'transparent', color:'rgba(255,255,255,0.8)', border:'1px solid rgba(255,255,255,0.3)', borderRadius:'2px', padding:'14px 24px', fontFamily:"'Cinzel',serif", fontSize:'12px', letterSpacing:'0.08em', cursor:'pointer', textTransform:'uppercase' }}>🎤 Chat em Esperanto</button>
        </div>
        <div style={{ display:'flex', gap:'24px', justifyContent:'center', flexWrap:'wrap' }}>
          {[['20','Lições'],['🔊','Áudio'],['🎤','Microfone'],['🤖','Chat com IA']].map(([v,l]) => (
            <div key={l} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:'20px', color:'#c9a650' }}>{v}</div>
              <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)' }}>{l}</div>
            </div>
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
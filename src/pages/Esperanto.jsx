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
    { nome:'Curso Saluton', desc:'Método direto — você aprende sem usar o português. Gratuito, com áudio e correção automática dos exercícios.', url:'http://kursosaluton.org/', tag:'Gratuito · Com áudio' },
    { nome:'Esperanto em 12 dias', desc:'Aprendizado gratuito e sem necessidade de cadastro. Ótimo para quem quer começar rápido.', url:'http://learn.esperanto.com/pt/', tag:'Gratuito · Sem cadastro' },
    { nome:'Duolingo', desc:'A plataforma mais popular para aprendizado de idiomas. Curso de Esperanto gamificado e divertido.', url:'https://www.duolingo.com/course/eo/pt/Aprenda-Esperanto-On-line', tag:'Gratuito · App disponível' },
    { nome:'Lernu.net', desc:'Plataforma multilíngue completa para aprender Esperanto. Cursos, dicionário, gramática e comunidade ativa.', url:'https://lernu.net/', tag:'Gratuito · Completo' },
    { nome:'Esperanto Sem Mestre', desc:'Versão online do livro clássico de aprendizado de Esperanto. Referência histórica do movimento.', url:'http://esm.esperanto.org.br', tag:'Gratuito · Clássico' },
    { nome:'Programa Mia Amiko', desc:'Une interessados em aprender Esperanto com amigos esperantistas. Aprendizado colaborativo.', url:'https://pma.esperanto.org.br/', tag:'Gratuito · Colaborativo' },
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

  const S = {
    sec: { padding:'44px 32px', borderBottom:'1px solid #e0d8c8', background:'#fff' },
    secGray: { padding:'44px 32px', borderBottom:'1px solid #e0d8c8', background:'#f8f6f2' },
    label: { fontSize:'10px', letterSpacing:'0.22em', color:'#c9a650', textTransform:'uppercase', marginBottom:'8px' },
    title: { fontFamily:"'Cinzel',serif", fontSize:'24px', fontWeight:500, color:'#1a3a6b', letterSpacing:'0.04em' },
    rule: { width:'40px', height:'2px', background:'#c9a650', margin:'12px 0 22px' },
  }

  return (
    <div style={{ fontFamily:"'Crimson Pro',Georgia,serif", background:'#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Crimson+Pro:ital,wght@0,300;0,400;1,400&display=swap');
        * { box-sizing:border-box; }
        .ep-conn-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
        .ep-conn{border:1px solid #e0d8c8;border-radius:8px;padding:18px;background:#fff;}
        .ep-parallel{display:grid;grid-template-columns:1fr 1fr;border:1px solid #e0d8c8;border-radius:6px;overflow:hidden;margin-bottom:10px;}
        .ep-par-pt{padding:12px 16px;background:#fff;border-right:1px solid #e0d8c8;}
        .ep-par-eo{padding:12px 16px;background:#f8f6f2;}
        .ep-words{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px;}
        .ep-word{background:#fff;border-radius:6px;padding:10px 12px;border-left:2px solid #c9a650;border:1px solid #e0d8c8;border-left:2px solid #c9a650;}
        .ep-cursos-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;}
        .ep-curso{border:1px solid #e0d8c8;border-radius:8px;padding:18px;transition:all 0.2s;text-decoration:none;display:block;background:#fff;}
        .ep-curso:hover{transform:translateY(-2px);border-color:#1a3a6b;}
        .ep-dic-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;}
        .ep-dic{border:1px solid #e0d8c8;border-radius:6px;padding:14px;text-decoration:none;display:block;transition:all 0.2s;background:#fff;}
        .ep-dic:hover{border-color:#1a3a6b;}
        .ep-mat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;}
        .ep-mat{border:1px solid #e0d8c8;border-radius:6px;padding:14px;text-decoration:none;display:block;transition:all 0.2s;background:#fff;}
        .ep-mat:hover{border-color:#1a3a6b;}
        .ep-radio-grid{display:flex;flex-wrap:wrap;gap:8px;}
        .ep-radio{font-size:13px;padding:6px 14px;border:1px solid #e0d8c8;border-radius:20px;text-decoration:none;color:#555;transition:all 0.2s;background:#fff;}
        .ep-radio:hover{border-color:#1a3a6b;color:#1a3a6b;}
        @media(max-width:768px){
          .ep-conn-grid{grid-template-columns:1fr;}
          .ep-parallel{grid-template-columns:1fr;}
          .ep-par-pt{border-right:none;border-bottom:1px solid #e0d8c8;}
          .ep-words{grid-template-columns:repeat(2,1fr);}
          .ep-cursos-grid{grid-template-columns:1fr;}
          .ep-dic-grid{grid-template-columns:1fr;}
          .ep-mat-grid{grid-template-columns:1fr;}
        }
      `}</style>

      <Nav />

      {/* HERO */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', padding:'48px 32px', background:'#f8f6f2', borderBottom:'1px solid #e0d8c8', alignItems:'center' }}>
        <div>
          <p style={S.label}>Lingvo & Spirito</p>
          <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:'32px', fontWeight:500, color:'#1a3a6b', marginBottom:'4px' }}>Esperanto</h1>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'14px', color:'#c9a650', fontStyle:'italic', marginBottom:'6px' }}>A língua da humanidade</p>
          <div style={S.rule}></div>
          <p style={{ fontSize:'16px', color:'#555', lineHeight:1.9, fontWeight:300 }}>O Esperanto é uma língua construída com um propósito nobre: unir os povos do mundo numa comunicação igualitária, sem fronteiras culturais ou políticas. Criada em 1887 por Ludwig Lazarus Zamenhof, ela carrega um espírito de fraternidade universal que ressoa profundamente com os ideais do Espiritismo.</p>
        </div>
        <div style={{ background:'#1a3a6b', borderRadius:'8px', padding:'28px', textAlign:'center' }}>
          <div style={{ fontSize:'52px', marginBottom:'12px' }}>✦</div>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'16px', letterSpacing:'0.1em', color:'#c9a650', marginBottom:'8px' }}>LA VERDA STELO</p>
          <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.75)', lineHeight:1.7, fontWeight:300 }}>A estrela verde de cinco pontas é o símbolo do Esperanto — representando os cinco continentes unidos por uma língua comum.</p>
        </div>
      </div>

      {/* CTA CURSO JOHANO */}
      <div style={{ background:'#1a3a6b', padding:'48px 32px', textAlign:'center', borderBottom:'1px solid #e0d8c8' }}>
        <p style={{ fontSize:'10px', letterSpacing:'0.22em', color:'rgba(201,166,80,0.7)', textTransform:'uppercase', marginBottom:'12px' }}>Novidade no Johano</p>
        <div style={{ fontSize:'48px', marginBottom:'12px' }}>🌟</div>
        <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'28px', color:'#fff', letterSpacing:'0.04em', marginBottom:'12px', fontWeight:500 }}>Aprenda Esperanto aqui no Johano!</h2>
        <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.75)', maxWidth:'540px', margin:'0 auto 28px', lineHeight:1.85, fontWeight:300 }}>O Johano tem um curso completo de Esperanto — 20 lições com áudio para ouvir a pronúncia, microfone para praticar falando e chat de conversação com o Johano em Esperanto. Tudo gratuito!</p>
        <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap', marginBottom:'24px' }}>
          <button onClick={()=>navigate('/esperanto/aprender')} style={{ background:'#c9a650', color:'#1a3a6b', border:'none', borderRadius:'2px', padding:'14px 36px', fontFamily:"'Cinzel',serif", fontSize:'13px', letterSpacing:'0.1em', cursor:'pointer', fontWeight:600, textTransform:'uppercase' }}>Começar o Curso Grátis</button>
          <button onClick={()=>navigate('/esperanto/chat')} style={{ background:'transparent', color:'rgba(255,255,255,0.8)', border:'1px solid rgba(255,255,255,0.3)', borderRadius:'2px', padding:'14px 24px', fontFamily:"'Cinzel',serif", fontSize:'12px', letterSpacing:'0.08em', cursor:'pointer', textTransform:'uppercase' }}>🎤 Chat em Esperanto</button>
        </div>
        <div style={{ display:'flex', gap:'32px', justifyContent:'center', flexWrap:'wrap' }}>
          {[['20','Lições'],['🔊','Áudio'],['🎤','Microfone'],['🤖','Chat com IA']].map(([v,l]) => (
            <div key={l} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:'22px', color:'#c9a650' }}>{v}</div>
              <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONEXÃO */}
      <div style={S.sec}>
        <p style={S.label}>A Ligação</p>
        <h2 style={S.title}>Esperanto & Espiritismo</h2>
        <div style={S.rule}></div>
        <div style={{ background:'#1a3a6b', borderRadius:'8px', padding:'24px 28px', marginBottom:'20px' }}>
          <p style={{ fontSize:'18px', fontStyle:'italic', color:'#e8e0cc', lineHeight:1.85, fontWeight:300, marginBottom:'10px' }}>"Não existe para o espírito nem Oriente nem Ocidente, nem Norte nem Sul. Todos os homens são irmãos."</p>
          <p style={{ fontSize:'12px', color:'rgba(201,166,80,0.8)', fontStyle:'italic' }}>Espírito de Verdade — O Livro dos Espíritos, Allan Kardec</p>
        </div>
        <div className="ep-conn-grid">
          {connections.map(c => (
            <div className="ep-conn" key={c.title}>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', marginBottom:'8px' }}>{c.title}</p>
              <p style={{ fontSize:'14px', color:'#666', lineHeight:1.75, fontWeight:300 }}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FRASES PARALELAS */}
      <div style={S.secGray}>
        <p style={S.label}>Português & Esperanto</p>
        <h2 style={S.title}>Frases Espíritas em Esperanto</h2>
        <div style={S.rule}></div>
        {parallels.map(([pt,eo],i) => (
          <div className="ep-parallel" key={i}>
            <div className="ep-par-pt">
              <p style={{ fontSize:'10px', letterSpacing:'0.14em', textTransform:'uppercase', color:'#aaa', marginBottom:'4px' }}>Português</p>
              <p style={{ fontSize:'14.5px', fontStyle:'italic', color:'#333', lineHeight:1.6 }}>{pt}</p>
            </div>
            <div className="ep-par-eo">
              <p style={{ fontSize:'10px', letterSpacing:'0.14em', textTransform:'uppercase', color:'#aaa', marginBottom:'4px' }}>Esperanto</p>
              <p style={{ fontSize:'14.5px', fontStyle:'italic', color:'#333', lineHeight:1.6 }}>{eo}</p>
            </div>
          </div>
        ))}
      </div>

      {/* VOCABULÁRIO */}
      <div style={S.sec}>
        <p style={S.label}>Vocabulário</p>
        <h2 style={S.title}>Palavras Espíritas em Esperanto</h2>
        <div style={S.rule}></div>
        <div className="ep-words">
          {words.map(([eo,pt]) => (
            <div className="ep-word" key={eo}>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', marginBottom:'2px' }}>{eo}</p>
              <p style={{ fontSize:'12px', color:'#888', fontStyle:'italic' }}>{pt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RECURSOS EXTERNOS */}
      <div style={S.secGray}>
        <p style={S.label}>Aprenda Também em Outros Lugares</p>
        <h2 style={S.title}>Recursos para Estudar</h2>
        <div style={S.rule}></div>

        {/* SEA */}
        <div style={{ background:'linear-gradient(135deg,#1a3a6b,#2a5aad)', borderRadius:'8px', padding:'28px', color:'#fff', display:'flex', alignItems:'flex-start', gap:'20px', marginBottom:'28px' }}>
          <div style={{ fontSize:'36px', flexShrink:0 }}>🌟</div>
          <div>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:'18px', color:'#c9a650', marginBottom:'6px' }}>SEA — Spiritisma Esperanto-Asocio</p>
            <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.8)', lineHeight:1.8, fontWeight:300, marginBottom:'14px' }}>A associação que une Espiritismo e Esperanto. A SEA reúne espíritas esperantistas do mundo todo, produz conteúdo, organiza eventos e mantém um acervo riquíssimo sobre a ligação entre as duas correntes.</p>
            <a href="https://konsolanto.org/pt/" target="_blank" rel="noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:'#c9a650', color:'#1a3a6b', padding:'9px 18px', borderRadius:'2px', fontFamily:"'Cinzel',serif", fontSize:'12px', letterSpacing:'0.08em', textDecoration:'none', fontWeight:600 }}>Acessar o site da SEA →</a>
          </div>
        </div>

        <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'14px' }}>📖 Cursos</h3>
        <div className="ep-cursos-grid" style={{ marginBottom:'28px' }}>
          {cursos.map(c => (
            <a key={c.nome} className="ep-curso" href={c.url} target="_blank" rel="noreferrer">
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'14px', color:'#1a3a6b', marginBottom:'6px' }}>{c.nome}</p>
              <p style={{ fontSize:'13.5px', color:'#666', lineHeight:1.7, fontWeight:300, marginBottom:'8px' }}>{c.desc}</p>
              <p style={{ fontSize:'11px', color:'#aaa', fontStyle:'italic' }}>{c.tag}</p>
            </a>
          ))}
        </div>

        <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'14px' }}>📚 Dicionários</h3>
        <div className="ep-dic-grid" style={{ marginBottom:'28px' }}>
          {dicionarios.map(d => (
            <a key={d.nome} className="ep-dic" href={d.url} target="_blank" rel="noreferrer">
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', marginBottom:'4px' }}>{d.nome}</p>
              <p style={{ fontSize:'13px', color:'#666', fontWeight:300 }}>{d.desc}</p>
            </a>
          ))}
        </div>

        <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'14px' }}>🎵 Materiais Complementares</h3>
        <div className="ep-mat-grid" style={{ marginBottom:'28px' }}>
          {materiais.map(m => (
            <a key={m.nome} className="ep-mat" href={m.url} target="_blank" rel="noreferrer">
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', marginBottom:'4px' }}>{m.nome}</p>
              <p style={{ fontSize:'13px', color:'#666', fontWeight:300 }}>{m.desc}</p>
            </a>
          ))}
        </div>

        <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'14px' }}>📻 Rádios & Podcasts em Esperanto</h3>
        <div className="ep-radio-grid">
          {radios.map(r => (
            <a key={r.nome} className="ep-radio" href={r.url} target="_blank" rel="noreferrer">{r.nome}</a>
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
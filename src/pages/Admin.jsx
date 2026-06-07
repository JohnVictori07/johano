import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const sections = ['dashboard','hero','frase','livros','canais','glossario','esperanto','chat','sobre','config']
const sectionTitles = { dashboard:'Dashboard', hero:'Página Principal', frase:'Frase do Dia', livros:'Biblioteca', canais:'Canais & Recursos', glossario:'Glossário', esperanto:'Esperanto', chat:'Johano Chat', sobre:'Sobre & Contato', config:'Configurações' }

function Field({ label, children, hint }) {
  return <div style={{ marginBottom:'16px' }}>
    <div style={{ fontSize:'11px', letterSpacing:'0.1em', color:'#666', textTransform:'uppercase', marginBottom:'6px' }}>{label}</div>
    {children}
    {hint && <div style={{ fontSize:'11px', color:'#aaa', marginTop:'4px', fontStyle:'italic' }}>{hint}</div>}
  </div>
}

function Input({ value, placeholder, onChange }) {
  const [val, setVal] = useState(value||'')
  return <input value={val} placeholder={placeholder} onChange={e=>{ setVal(e.target.value); onChange&&onChange(e.target.value) }} style={{ width:'100%', padding:'9px 12px', border:'1px solid #d0c8b8', borderRadius:'4px', fontFamily:"'Crimson Pro',Georgia,serif", fontSize:'15px', color:'#333', background:'#fff', outline:'none', boxSizing:'border-box' }} onFocus={e=>e.target.style.borderColor='#1a3a6b'} onBlur={e=>e.target.style.borderColor='#d0c8b8'} />
}

function Textarea({ value, rows=3 }) {
  const [val, setVal] = useState(value||'')
  return <textarea value={val} rows={rows} onChange={e=>setVal(e.target.value)} style={{ width:'100%', padding:'9px 12px', border:'1px solid #d0c8b8', borderRadius:'4px', fontFamily:"'Crimson Pro',Georgia,serif", fontSize:'15px', color:'#333', background:'#fff', outline:'none', resize:'vertical', lineHeight:1.6, boxSizing:'border-box' }} onFocus={e=>e.target.style.borderColor='#1a3a6b'} onBlur={e=>e.target.style.borderColor='#d0c8b8'} />
}

function Toggle({ label, desc, checked=false }) {
  const [on, setOn] = useState(checked)
  return <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid #f0ece4' }}>
    <div><div style={{ fontSize:'14px', color:'#333' }}>{label}</div>{desc&&<div style={{ fontSize:'12px', color:'#aaa', fontStyle:'italic' }}>{desc}</div>}</div>
    <div onClick={()=>setOn(!on)} style={{ width:'36px', height:'20px', borderRadius:'20px', background:on?'#1a3a6b':'#d0c8b8', cursor:'pointer', position:'relative', transition:'background 0.2s', flexShrink:0 }}>
      <div style={{ position:'absolute', width:'14px', height:'14px', background:'#fff', borderRadius:'50%', top:'3px', left: on?'19px':'3px', transition:'left 0.2s' }}></div>
    </div>
  </div>
}

function Card({ title, sub, icon, children, defaultOpen=true }) {
  const [open, setOpen] = useState(defaultOpen)
  return <div style={{ background:'#fff', border:'1px solid #e0d8c8', borderRadius:'8px', marginBottom:'14px', overflow:'hidden' }}>
    <div onClick={()=>setOpen(!open)} style={{ padding:'14px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', borderBottom: open?'1px solid #e0d8c8':'none' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
        <div style={{ width:'32px', height:'32px', borderRadius:'6px', background:'#f8f6f2', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px' }}>{icon}</div>
        <div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', letterSpacing:'0.04em' }}>{title}</div>
          {sub && <div style={{ fontSize:'11px', color:'#aaa', fontStyle:'italic', marginTop:'1px' }}>{sub}</div>}
        </div>
      </div>
      <span style={{ fontSize:'14px', color:'#aaa', transition:'transform 0.2s', display:'inline-block', transform: open?'rotate(180deg)':'none' }}>▾</span>
    </div>
    {open && <div style={{ padding:'18px' }}>{children}</div>}
  </div>
}

const navItems = [
  { id:'dashboard', icon:'📊', label:'Dashboard', group:'Visão Geral' },
  { id:'hero', icon:'🏠', label:'Página Principal', group:'Conteúdo' },
  { id:'frase', icon:'💬', label:'Frase do Dia', group:'Conteúdo' },
  { id:'livros', icon:'📚', label:'Biblioteca', group:'Conteúdo' },
  { id:'canais', icon:'▶️', label:'Canais & Recursos', group:'Conteúdo' },
  { id:'glossario', icon:'📖', label:'Glossário', group:'Conteúdo' },
  { id:'esperanto', icon:'🌍', label:'Esperanto', group:'Conteúdo' },
  { id:'chat', icon:'🤖', label:'Johano Chat', group:'Chat & IA' },
  { id:'sobre', icon:'ℹ️', label:'Sobre & Contato', group:'Site' },
  { id:'config', icon:'⚙️', label:'Configurações', group:'Site' },
]

const books = ['O Livro dos Espíritos — Kardec','O Livro dos Médiuns — Kardec','O Evangelho Segundo o Espiritismo — Kardec','Nosso Lar — Chico Xavier','Após a Morte — Léon Denis']
const channels = ['E.O.S Manaus — YouTube','Portal Luz Espírita — Site','FEB — Site','Papo Espírita — Podcast']
const glossTerms = ['Alma','Caridade','Causa e Efeito','Desobsessão','Espírito','Espiritismo','Expiação','Mediunidade','Obsessão','Perispírito','Prece','Psicografia','Reencarnação','Umbral']

export default function Admin() {
  const navigate = useNavigate()
  const [active, setActive] = useState('dashboard')
  const [toast, setToast] = useState(false)
  const [saveLabel, setSaveLabel] = useState('💾 Salvar')

  const save = () => {
    setSaveLabel('✅ Salvo!')
    setToast(true)
    setTimeout(()=>{ setSaveLabel('💾 Salvar'); setToast(false) }, 2000)
  }

  const groups = [...new Set(navItems.map(i=>i.group))]

  return (
    <div style={{ display:'flex', minHeight:'100vh', fontFamily:"'Crimson Pro',Georgia,serif", background:'#f8f6f2' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        .a-list-item{display:flex;align-items:center;gap:8px;padding:9px 12px;background:#f8f6f2;border-radius:4px;margin-bottom:6px;border:1px solid #e0d8c8;font-size:14px;color:#333;}
        .a-list-text{flex:1;}
        .a-list-sub{font-size:11px;color:#aaa;font-style:italic;}
        .a-icon-btn{width:26px;height:26px;border-radius:4px;border:1px solid #e0d8c8;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:13px;transition:all 0.15s;}
        .a-icon-btn:hover{background:#eef2f8;}
        .a-icon-btn.danger:hover{background:#fcebeb;}
        .a-add-btn{display:flex;align-items:center;justify-content:center;gap:6px;padding:8px;border:1px dashed #d0c8b8;border-radius:4px;background:transparent;cursor:pointer;font-size:13px;color:#888;width:100%;margin-top:4px;transition:all 0.15s;}
        .a-add-btn:hover{border-color:#1a3a6b;color:#1a3a6b;}
        .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .stat{background:#fff;border:1px solid #e0d8c8;border-radius:8px;padding:16px;}
        .stat-val{font-family:'Cinzel',serif;font-size:24px;color:#1a3a6b;margin-bottom:4px;}
        .stat-lab{font-size:12px;color:#aaa;}
        @media(max-width:700px){ .sidebar{display:none!important;} }
      `}</style>

      {/* SIDEBAR */}
      <div className="sidebar" style={{ width:'210px', flexShrink:0, background:'#fff', borderRight:'1px solid #e0d8c8', display:'flex', flexDirection:'column', position:'sticky', top:0, height:'100vh', overflowY:'auto' }}>
        <div style={{ padding:'18px 16px 14px', borderBottom:'1px solid #e0d8c8' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <div style={{ width:'26px', height:'26px', background:'#1a3a6b', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#c9a650', fontSize:'12px' }}>✦</div>
            <div>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:'14px', color:'#1a3a6b', letterSpacing:'0.08em' }}>JOHANO</div>
              <div style={{ fontSize:'10px', background:'#f8f6f2', color:'#aaa', padding:'2px 6px', borderRadius:'2px', letterSpacing:'0.08em' }}>Admin</div>
            </div>
          </div>
        </div>
        {groups.map(g => (
          <div key={g}>
            <div style={{ padding:'12px 14px 4px', fontSize:'9px', letterSpacing:'0.18em', color:'#aaa', textTransform:'uppercase' }}>{g}</div>
            {navItems.filter(i=>i.group===g).map(item=>(
              <button key={item.id} onClick={()=>setActive(item.id)} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'9px 12px', cursor:'pointer', borderRadius:'4px', margin:'1px 6px', transition:'all 0.15s', fontSize:'13.5px', color: active===item.id?'#1a3a6b':'#666', background: active===item.id?'#eef2f8':'transparent', border:'none', width:'calc(100% - 12px)', textAlign:'left', fontWeight: active===item.id?500:400 }}>
                <span style={{ fontSize:'14px' }}>{item.icon}</span> {item.label}
              </button>
            ))}
          </div>
        ))}
        <div style={{ marginTop:'auto', padding:'14px', borderTop:'1px solid #e0d8c8' }}>
          <div style={{ fontSize:'11px', color:'#aaa', fontStyle:'italic' }}>johano.com.br</div>
          <div onClick={()=>navigate('/')} style={{ fontSize:'11px', color:'#1a3a6b', cursor:'pointer', marginTop:'4px' }}>← Ver site</div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex:1, overflowY:'auto', minWidth:0 }}>
        <div style={{ background:'#fff', borderBottom:'1px solid #e0d8c8', padding:'14px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:50 }}>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:'16px', color:'#1a3a6b', letterSpacing:'0.06em' }}>{sectionTitles[active]}</div>
          <div style={{ display:'flex', gap:'8px' }}>
            <button onClick={()=>navigate('/')} style={{ background:'transparent', border:'1px solid #d0c8b8', borderRadius:'4px', padding:'8px 14px', fontFamily:"'Cinzel',serif", fontSize:'11px', letterSpacing:'0.08em', cursor:'pointer', color:'#666' }}>👁 Preview</button>
            <button onClick={save} style={{ background: saveLabel.includes('✅')?'#3b6d11':'#1a3a6b', color:'#fff', border:'none', borderRadius:'4px', padding:'8px 18px', fontFamily:"'Cinzel',serif", fontSize:'11px', letterSpacing:'0.08em', cursor:'pointer', transition:'background 0.2s' }}>{saveLabel}</button>
          </div>
        </div>

        <div style={{ padding:'22px 24px 48px' }}>

          {active==='dashboard' && (
            <>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px', marginBottom:'22px' }}>
                {[['7','Páginas no site'],['12','Livros na biblioteca'],['18','Termos no glossário'],['9','Canais cadastrados']].map(([v,l])=>(
                  <div className="stat" key={l}><div className="stat-val">{v}</div><div className="stat-lab">{l}</div></div>
                ))}
              </div>
              <Card title="O que você pode editar" icon="✅" sub="Visão rápida de tudo disponível">
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
                  {[['🏠','Página Principal','Textos do hero e descrições'],['💬','Frase do Dia','Citação exibida no site'],['📚','Biblioteca','Livros, links Amazon e gratuitos'],['▶️','Canais','Recursos e canal em destaque'],['📖','Glossário','Termos e definições'],['🌍','Esperanto','Frases paralelas e vocabulário'],['🤖','Johano Chat','Comportamento e boas-vindas'],['ℹ️','Sobre & Contato','Textos e redes sociais'],['⚙️','Configurações','SEO, idioma e manutenção']].map(([ic,t,s])=>(
                    <div key={t} style={{ display:'flex', alignItems:'flex-start', gap:'10px', padding:'10px', background:'#f8f6f2', borderRadius:'6px', border:'1px solid #e0d8c8', cursor:'pointer' }} onClick={()=>setActive(navItems.find(n=>n.label===t)?.id||active)}>
                      <span style={{ fontSize:'16px', flexShrink:0 }}>{ic}</span>
                      <div>
                        <div style={{ fontSize:'13px', color:'#1a3a6b', fontFamily:"'Cinzel',serif", letterSpacing:'0.02em' }}>{t}</div>
                        <div style={{ fontSize:'12px', color:'#aaa', fontStyle:'italic' }}>{s}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {active==='hero' && (
            <>
              <Card title="Textos do Hero" icon="🏠" sub="Título, subtítulo e descrição principal">
                <Field label="Título principal"><Input value="JOHANO" /></Field>
                <Field label="Subtítulo em Esperanto"><Input value="Saĝo · Amo · Lumo — Sabedoria · Amor · Luz" /></Field>
                <Field label="Descrição"><Textarea value="Um espaço de estudo, reflexão e aprofundamento na Doutrina Espírita, aberto a todos que buscam compreender a vida com mais luz." /></Field>
                <div className="grid-2">
                  <Field label="Botão principal"><Input value="Conversar com o Johano" /></Field>
                  <Field label="Botão secundário"><Input value="Começar os Estudos" /></Field>
                </div>
              </Card>
              <Card title="Seção O Que é o Espiritismo" icon="📜" sub="Texto introdutório da página principal">
                <Field label="Parágrafo 1"><Textarea value="O Espiritismo é uma doutrina que estuda a natureza, a origem e o destino dos espíritos..." /></Field>
                <Field label="Parágrafo 2"><Textarea value="Não é uma religião no sentido tradicional, mas uma doutrina racional..." /></Field>
                <Field label="Referência da obra"><Input value="Baseado em 'O Que é o Espiritismo' — Allan Kardec (1859)" /></Field>
              </Card>
            </>
          )}

          {active==='frase' && (
            <Card title="Frase do Dia" icon="💬" sub="Citação exibida na página principal">
              <Field label="Texto da citação"><Textarea value="Sede perfeitos, dizia Jesus. Ora, a perfeição é o ideal que todos devemos atingir; mas é um ideal que se conquista progressivamente, e não por um golpe de varinha mágica." rows={4} /></Field>
              <div className="grid-2">
                <Field label="Autor"><Input value="Allan Kardec" /></Field>
                <Field label="Obra"><Input value="O Evangelho Segundo o Espiritismo" /></Field>
              </div>
              <div style={{ marginTop:'8px', padding:'14px', background:'#f8f6f2', borderRadius:'4px' }}>
                <div style={{ fontSize:'12px', color:'#aaa', marginBottom:'10px' }}>Banco de frases — clique para usar</div>
                {[['Não existe dor inútil para o espírito que sabe extrair o bem do mal.','Léon Denis','Após a Morte'],
                  ['Fora da caridade não há salvação.','Allan Kardec','O Evangelho Segundo o Espiritismo'],
                  ['O amor é a lei suprema do universo.','Espírito de Verdade','O Livro dos Espíritos']].map(([f,a,o])=>(
                  <div key={f} style={{ padding:'8px 10px', marginBottom:'6px', border:'1px solid #e0d8c8', borderRadius:'4px', cursor:'pointer', background:'#fff' }}>
                    <div style={{ fontSize:'13.5px', fontStyle:'italic', color:'#333', marginBottom:'2px' }}>"{f}"</div>
                    <div style={{ fontSize:'11px', color:'#aaa' }}>— {a} · {o}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {active==='livros' && (
            <Card title="Livros da Biblioteca" icon="📚" sub="Gerencie as obras recomendadas">
              {books.map(b=>(
                <div className="a-list-item" key={b}>
                  <div className="a-list-text">{b}</div>
                  <div style={{ display:'flex', gap:'6px' }}>
                    <button className="a-icon-btn" title="Editar link Amazon">🔗</button>
                    <button className="a-icon-btn" title="Editar">✏️</button>
                    <button className="a-icon-btn danger" title="Remover">🗑️</button>
                  </div>
                </div>
              ))}
              <button className="a-add-btn">+ Adicionar livro</button>
              <div style={{ marginTop:'16px', padding:'14px', background:'#f8f6f2', borderRadius:'4px', border:'1px solid #e0d8c8' }}>
                <div style={{ fontSize:'12px', color:'#aaa', marginBottom:'10px', fontFamily:"'Cinzel',serif", letterSpacing:'0.04em' }}>Editar links de um livro</div>
                <Field label="Título do livro"><Input value="O Livro dos Espíritos" /></Field>
                <div className="grid-2">
                  <Field label="Link Amazon" hint="Cole a URL do produto na Amazon"><Input placeholder="https://amazon.com.br/..." /></Field>
                  <Field label="Link Gratuito"><Input placeholder="https://febnet.org.br/..." /></Field>
                </div>
              </div>
            </Card>
          )}

          {active==='canais' && (
            <Card title="Canais & Recursos" icon="▶️" sub="Gerencie os recursos recomendados">
              <Field label="Canal em destaque" hint="Este canal aparece no topo com card especial">
                <select style={{ width:'100%', padding:'9px 12px', border:'1px solid #d0c8b8', borderRadius:'4px', fontFamily:"'Crimson Pro',Georgia,serif", fontSize:'15px', color:'#333', background:'#fff', outline:'none' }}>
                  <option>E.O.S Manaus</option><option>Portal Luz Espírita</option><option>FEB</option>
                </select>
              </Field>
              {channels.map(c=>(
                <div className="a-list-item" key={c}>
                  <div className="a-list-text">{c.split('—')[0]}<div className="a-list-sub">{c.split('—')[1]}</div></div>
                  <div style={{ display:'flex', gap:'6px' }}>
                    <button className="a-icon-btn">✏️</button>
                    <button className="a-icon-btn danger">🗑️</button>
                  </div>
                </div>
              ))}
              <button className="a-add-btn">+ Adicionar canal ou recurso</button>
            </Card>
          )}

          {active==='glossario' && (
            <Card title="Termos do Glossário" icon="📖" sub={`${glossTerms.length} termos cadastrados`}>
              <Field label="Buscar termo">
                <input placeholder="🔍 Buscar..." style={{ width:'100%', padding:'9px 12px', border:'1px solid #d0c8b8', borderRadius:'4px', fontFamily:"'Crimson Pro',Georgia,serif", fontSize:'15px', outline:'none', boxSizing:'border-box' }} />
              </Field>
              {glossTerms.map(t=>(
                <div className="a-list-item" key={t}>
                  <div className="a-list-text">{t}</div>
                  <div style={{ display:'flex', gap:'6px' }}>
                    <button className="a-icon-btn">✏️</button>
                    <button className="a-icon-btn danger">🗑️</button>
                  </div>
                </div>
              ))}
              <button className="a-add-btn">+ Adicionar termo</button>
            </Card>
          )}

          {active==='esperanto' && (
            <>
              <Card title="Frases Paralelas" icon="🌍" sub="Português e Esperanto lado a lado">
                {[['Fora da caridade não há salvação.','Ekster la karitato ne ekzistas savo.'],
                  ['O espírito é imortal e se reencarna para evoluir.','La spirito estas senmortulo kaj reenkarnias por evolui.']].map(([pt,eo],i)=>(
                  <div key={i} style={{ marginBottom:'12px' }}>
                    <div className="grid-2" style={{ gap:'8px' }}>
                      <Field label="Português"><Input value={pt} /></Field>
                      <Field label="Esperanto"><Input value={eo} /></Field>
                    </div>
                  </div>
                ))}
                <button className="a-add-btn">+ Adicionar par de frases</button>
              </Card>
              <Card title="Palavras do Glossário Esperanto" icon="📝" sub="12 palavras cadastradas">
                {[['Spirito','Espírito'],['Reenkarnado','Reencarnação'],['Karitato','Caridade'],['Paco','Paz'],['Amo','Amor']].map(([eo,pt])=>(
                  <div className="a-list-item" key={eo}>
                    <div className="a-list-text"><strong>{eo}</strong> — {pt}</div>
                    <div style={{ display:'flex', gap:'6px' }}>
                      <button className="a-icon-btn">✏️</button>
                      <button className="a-icon-btn danger">🗑️</button>
                    </div>
                  </div>
                ))}
                <button className="a-add-btn">+ Adicionar palavra</button>
              </Card>
            </>
          )}

          {active==='chat' && (
            <Card title="Comportamento do Johano Chat" icon="🤖" sub="Personalidade e mensagens">
              <Field label="Mensagem de boas-vindas">
                <Textarea value="Paz e bem, viajante da luz. Sou Johano, seu guia nos estudos da Doutrina Espírita. O que traz ao seu coração hoje?" rows={3} />
              </Field>
              <Field label="Aviso da Muleta">
                <Textarea value="O Johano é uma muleta para os estudos — assim como uma muleta não faz você andar, mas auxilia e apoia a caminhada, este assistente não substitui a leitura das obras originais, o convívio no centro espírita ou a orientação de um orientador experiente. Está em constante desenvolvimento e evolução — como todos nós." rows={4} />
              </Field>
              <Toggle label="Responder em Esperanto quando solicitado" desc="Permite que o Johano responda em EO se o usuário pedir" checked={true} />
              <Toggle label="Incluir referências de obras nas respostas" checked={true} />
              <Toggle label="Modo de resposta extensa" desc="Respostas mais longas e detalhadas por padrão" />
            </Card>
          )}

          {active==='sobre' && (
            <>
              <Card title="Sobre o Projeto" icon="ℹ️" sub="Textos da página Sobre">
                <Field label="Subtítulo do hero"><Input value="Um portal nascido da busca pela luz" /></Field>
                <Field label="Descrição principal"><Textarea value="Johano é mais do que um site — é um convite à reflexão, ao estudo e ao crescimento espiritual." /></Field>
                <Field label="Citação final"><Textarea value="Cada um colhe o que semeia. Se semeardes o bem, colhereis o bem; se semeardes o mal, colhereis o mal." /></Field>
                <div className="grid-2">
                  <Field label="Autor"><Input value="Allan Kardec" /></Field>
                  <Field label="Obra"><Input value="O Evangelho Segundo o Espiritismo" /></Field>
                </div>
              </Card>
              <Card title="Redes Sociais & Contato" icon="📱">
                <div className="grid-2">
                  <Field label="E-mail"><Input value="contato@johano.com.br" /></Field>
                  <Field label="Instagram"><Input value="@johano.com.br" /></Field>
                  <Field label="YouTube"><Input placeholder="Em breve..." /></Field>
                  <Field label="WhatsApp (opcional)"><Input placeholder="+55 11 9..." /></Field>
                </div>
              </Card>
            </>
          )}

          {active==='config' && (
            <>
              <Card title="Idioma & Internacionalização" icon="🌐">
                <Toggle label="Habilitar versão em Esperanto" desc="Exibe o toggle PT · EO no menu" checked={true} />
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 0' }}>
                  <div style={{ fontSize:'14px', color:'#333' }}>Idioma padrão ao abrir o site</div>
                  <select style={{ border:'1px solid #d0c8b8', borderRadius:'4px', padding:'6px 10px', fontFamily:"'Crimson Pro',Georgia,serif", fontSize:'14px', background:'#fff', outline:'none' }}>
                    <option>Português</option><option>Esperanto</option>
                  </select>
                </div>
              </Card>
              <Card title="SEO — Mecanismos de Busca" icon="🔍" sub="Como o Google encontra o Johano">
                <Field label="Título da página (aba do navegador)"><Input value="Johano — Portal de Estudos Espíritas" /></Field>
                <Field label="Descrição (exibida no Google)"><Textarea value="Portal de estudos espíritas com chat assistente, biblioteca, glossário e recursos para aprofundamento na Doutrina Espírita." rows={2} /></Field>
                <Field label="Palavras-chave" hint="Separadas por vírgula"><Input value="espiritismo, kardec, chico xavier, doutrina espírita, estudos espíritas" /></Field>
              </Card>
              <Card title="Manutenção" icon="🔧">
                <Toggle label="Modo manutenção" desc="Exibe aviso de manutenção para visitantes" />
                <Toggle label="Johano Chat ativo" desc="Desative para pausar o chat temporariamente" checked={true} />
                <Toggle label="Exibir frase do dia" checked={true} />
              </Card>
            </>
          )}

        </div>
      </div>

      {toast && (
        <div style={{ position:'fixed', bottom:'24px', right:'24px', background:'#1a3a6b', color:'#fff', padding:'12px 20px', borderRadius:'6px', fontSize:'13px', display:'flex', alignItems:'center', gap:'8px', zIndex:999, fontFamily:"'Cinzel',serif", letterSpacing:'0.04em' }}>
          ✅ Alterações salvas com sucesso!
        </div>
      )}
    </div>
  )
}

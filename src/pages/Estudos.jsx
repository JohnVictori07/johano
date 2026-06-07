import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from './Nav'

const authors = [
  { id:'kardec', name:'Allan Kardec', initial:'K', years:'1804 – 1869', bio:'Hippolyte Léon Denizard Rivail, conhecido como Allan Kardec, foi o codificador da Doutrina Espírita. Entre 1857 e 1868 publicou as cinco obras fundamentais que formam a base do Espiritismo.', color:'#1a3a6b',
    articles:[
      { obra:'O Livro dos Espíritos', title:'A Imortalidade da Alma', desc:'O que sobrevive após a morte do corpo físico? Kardec explora a natureza do espírito e sua jornada contínua.', tag:'Fundamentos' },
      { obra:'O Livro dos Espíritos', title:'A Origem dos Espíritos', desc:'De onde viemos? Como Deus criou os espíritos e qual é o destino final de todos os seres.', tag:'Fundamentos' },
      { obra:'O Livro dos Médiuns', title:'O que é a Mediunidade?', desc:'Tipos de médiuns, como a comunicação espiritual ocorre e como discernir as influências espirituais.', tag:'Mediunidade' },
      { obra:'O Evangelho Segundo o Espiritismo', title:'Amar os Inimigos', desc:'A interpretação espírita do ensinamento de Jesus sobre o amor incondicional e a caridade verdadeira.', tag:'Moral' },
      { obra:'O Céu e o Inferno', title:'Penas e Recompensas', desc:'A vida além da morte, os estados do espírito desencarnado e a justiça divina segundo a doutrina.', tag:'Além-Vida' },
      { obra:'A Gênese', title:'Criação e Evolução', desc:'A origem do universo e da vida segundo o Espiritismo, conciliando ciência, filosofia e fé.', tag:'Ciência' },
    ]
  },
  { id:'chico', name:'Chico Xavier', initial:'C', years:'1910 – 2002', bio:'Francisco Cândido Xavier foi o maior médium psicógrafo do Brasil, responsável por mais de 400 obras ditadas por espíritos.', color:'#185fa5',
    articles:[
      { obra:'Nosso Lar', title:'A Cidade Espiritual de Nosso Lar', desc:'A descrição da colônia espiritual onde André Luiz acordou após a morte, suas leis e organização.', tag:'Além-Vida' },
      { obra:'Os Mensageiros', title:'Missões Espirituais', desc:'Como os espíritos atuam como mensageiros e auxiliares dos encarnados em suas lutas diárias.', tag:'Espiritualidade' },
      { obra:'Missionários da Luz', title:'A Preparação para Reencarnar', desc:'O processo pelo qual os espíritos se preparam para uma nova encarnação.', tag:'Reencarnação' },
      { obra:'Caminho, Verdade e Vida', title:'Os Ensinamentos de Emmanuel', desc:'Comentários do espírito Emmanuel sobre os ensinamentos morais de Jesus para o cotidiano.', tag:'Moral' },
    ]
  },
  { id:'andre', name:'André Luiz', initial:'A', years:'Espírito', bio:'Espírito comunicante através de Chico Xavier, André Luiz é o autor de uma das séries mais ricas da literatura espírita.', color:'#0f6e56',
    articles:[
      { obra:'No Mundo Maior', title:'A Hierarquia Espiritual', desc:'Como o mundo espiritual está organizado, seus planos, hierarquias e a evolução dos espíritos.', tag:'Além-Vida' },
      { obra:'Libertação', title:'A Obsessão Espiritual', desc:'O que é a obsessão, como ela se manifesta na vida dos encarnados e os caminhos para a libertação.', tag:'Saúde Espiritual' },
    ]
  },
  { id:'denis', name:'Léon Denis', initial:'L', years:'1846 – 1927', bio:'Considerado o grande apóstolo do Espiritismo após Kardec, Léon Denis aprofundou a doutrina com obras filosóficas de grande profundidade.', color:'#533489',
    articles:[
      { obra:'Após a Morte', title:'O Destino do Espírito', desc:'Uma análise profunda sobre o que acontece com o ser humano após a morte física.', tag:'Filosofia' },
      { obra:'O Problema do Ser', title:'Por que Existimos?', desc:'A questão fundamental da existência humana respondida à luz da doutrina espírita.', tag:'Filosofia' },
    ]
  },
]

const SYSTEM_PROMPT = `Você é Johano, assistente espiritual profundamente versado na Doutrina Espírita. Escreva artigos de estudo sérios, acessíveis e inspiradores. Use linguagem clara mas elevada. Inclua ao menos uma citação em bloco de uma obra relevante. Responda em português brasileiro. Use apenas parágrafos fluidos — sem markdown com asteriscos.`

export default function Estudos() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(authors[0])
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(false)

  const openArticle = async (art) => {
    setArticle({ ...art, content: null })
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          model:'claude-opus-4-5', max_tokens:1000, system:SYSTEM_PROMPT,
          messages:[{ role:'user', content:`Escreva um artigo de estudo espírita com título "${art.title}", baseado na obra "${art.obra}" de ${current.name}. Tema: ${art.desc}` }]
        })
      })
      const data = await res.json()
      setArticle(prev => ({ ...prev, content: data.content?.[0]?.text || 'Erro ao carregar.' }))
    } catch { setArticle(prev => ({ ...prev, content: 'Erro de conexão.' })) }
    finally { setLoading(false) }
  }

  return (
    <div style={{ fontFamily:"'Crimson Pro',Georgia,serif", background:'#fff' }}>
      <style>{`
        .e-tabs{display:flex;overflow-x:auto;border-bottom:1px solid #e0d8c8;padding:0 32px;scrollbar-width:none;}
        .e-tabs::-webkit-scrollbar{display:none;}
        .e-tab{padding:14px 20px;font-family:'Cinzel',serif;font-size:12px;letter-spacing:0.06em;color:#666;cursor:pointer;border-bottom:2px solid transparent;white-space:nowrap;background:transparent;border-top:none;border-left:none;border-right:none;transition:all 0.2s;}
        .e-tab.active{color:#1a3a6b;border-bottom-color:#1a3a6b;}
        .e-tab:hover{color:#1a3a6b;}
        .e-banner{display:flex;align-items:flex-start;gap:16px;padding:24px 32px;background:#f8f6f2;border-bottom:1px solid #e0d8c8;}
        .e-banner-icon{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Cinzel',serif;font-size:18px;color:#fff;flex-shrink:0;}
        .e-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;padding:24px 32px 48px;}
        .e-card{background:#fff;border:1px solid #e0d8c8;border-radius:8px;padding:20px;cursor:pointer;transition:all 0.2s;border-left:3px solid transparent;}
        .e-card:hover{border-left-color:#1a3a6b;transform:translateY(-2px);}
        .e-obra{font-size:10px;letter-spacing:0.14em;color:#c9a650;text-transform:uppercase;margin-bottom:8px;}
        .e-card-title{font-family:'Cinzel',serif;font-size:14px;color:#1a3a6b;line-height:1.4;margin-bottom:8px;}
        .e-card-desc{font-size:13.5px;color:#666;line-height:1.7;font-weight:300;margin-bottom:14px;}
        .e-card-foot{display:flex;justify-content:space-between;align-items:center;}
        .e-tag{font-size:10px;padding:2px 8px;background:#eef2f8;color:#1a3a6b;border-radius:2px;}
        .e-read{font-size:12px;color:#1a3a6b;}
        .e-reader{padding:0 32px 48px;}
        .e-back{display:flex;align-items:center;gap:6px;font-size:13px;color:#1a3a6b;cursor:pointer;margin:24px 0 28px;background:transparent;border:none;font-family:'Crimson Pro',Georgia,serif;}
        .e-reader-obra{font-size:10px;letter-spacing:0.18em;color:#c9a650;text-transform:uppercase;margin-bottom:10px;}
        .e-reader-title{font-family:'Cinzel',serif;font-size:26px;color:#1a3a6b;margin-bottom:6px;}
        .e-rule{width:40px;height:2px;background:#c9a650;margin:14px 0 24px;}
        .e-content{font-size:17px;line-height:2;color:#333;font-weight:300;max-width:680px;}
        .e-content p{margin-bottom:20px;}
        .e-content blockquote{border-left:3px solid #c9a650;padding:12px 20px;margin:24px 0;font-style:italic;color:#666;background:#f8f6f2;}
        .e-loading{display:flex;align-items:center;gap:10px;padding:32px 0;color:#666;font-style:italic;}
        .e-spinner{width:18px;height:18px;border-radius:50%;border:2px solid #e0d8c8;border-top-color:#1a3a6b;animation:spin 0.8s linear infinite;flex-shrink:0;}
        @keyframes spin{to{transform:rotate(360deg)}}
        .s-label{font-size:10px;letter-spacing:0.22em;color:#c9a650;text-transform:uppercase;margin-bottom:8px;}
        .s-title{font-family:'Cinzel',serif;font-size:30px;font-weight:500;color:#1a3a6b;letter-spacing:0.04em;}
        .s-rule{width:40px;height:2px;background:#c9a650;margin:12px 0 14px;}
        @media(max-width:768px){
          .e-tabs{padding:0 16px;}
          .e-banner{padding:18px 16px;}
          .e-grid{grid-template-columns:1fr;padding:16px;}
          .e-reader{padding:0 16px 36px;}
        }
      `}</style>
      <Nav />
      <div style={{ padding:'44px 32px 36px', borderBottom:'1px solid #e0d8c8' }}>
        <div style={{ fontSize:'12px', color:'#aaa', marginBottom:'12px' }}><span onClick={()=>navigate('/')} style={{color:'#1a3a6b',cursor:'pointer'}}>Início</span> › Estudos</div>
        <p className="s-label">Aprofundamento</p>
        <h1 className="s-title">Estudos</h1>
        <div className="s-rule"></div>
        <p style={{ fontSize:'16px', color:'#666', lineHeight:1.8, fontWeight:300 }}>Artigos gerados pelo Johano com base nas obras originais. Selecione um autor e escolha um tema.</p>
      </div>

      {!article ? (
        <>
          <div className="e-tabs">
            {authors.map(a => <button key={a.id} className={`e-tab${current.id===a.id?' active':''}`} onClick={()=>setCurrent(a)}>{a.name}</button>)}
          </div>
          <div className="e-banner">
            <div className="e-banner-icon" style={{ background:current.color }}>{current.initial}</div>
            <div>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:'15px', color:'#1a3a6b', marginBottom:'2px' }}>{current.name}</div>
              <div style={{ fontSize:'12px', color:'#aaa', fontStyle:'italic', marginBottom:'8px' }}>{current.years}</div>
              <div style={{ fontSize:'14px', color:'#666', lineHeight:1.75, fontWeight:300 }}>{current.bio}</div>
            </div>
          </div>
          <div style={{ padding:'24px 32px 8px' }}>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:'12px', letterSpacing:'0.1em', color:'#aaa', textTransform:'uppercase', paddingBottom:'8px', borderBottom:'1px solid #e0d8c8' }}>
              Artigos — {current.name} <span style={{ float:'right', fontWeight:300 }}>{current.articles.length} temas</span>
            </div>
          </div>
          <div className="e-grid">
            {current.articles.map((a,i) => (
              <div className="e-card" key={i} onClick={()=>openArticle(a)}>
                <p className="e-obra">{a.obra}</p>
                <h3 className="e-card-title">{a.title}</h3>
                <p className="e-card-desc">{a.desc}</p>
                <div className="e-card-foot">
                  <span className="e-tag">{a.tag}</span>
                  <span className="e-read">Ler artigo →</span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="e-reader">
          <button className="e-back" onClick={()=>setArticle(null)}>← Voltar aos estudos</button>
          <p className="e-reader-obra">{current.name} · {article.obra}</p>
          <h2 className="e-reader-title">{article.title}</h2>
          <div className="e-rule"></div>
          {loading ? (
            <div className="e-loading"><div className="e-spinner"></div> Johano está preparando este estudo...</div>
          ) : (
            <div className="e-content">
              {article.content?.split('\n').filter(p=>p.trim()).map((p,i) => (
                p.startsWith('"') || p.startsWith('"') || p.startsWith('—')
                  ? <blockquote key={i}>{p}</blockquote>
                  : <p key={i}>{p}</p>
              ))}
            </div>
          )}
        </div>
      )}

      <footer style={{ padding:'28px 32px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid #e0d8c8', background:'#f8f6f2', flexWrap:'wrap', gap:'12px' }}>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', letterSpacing:'0.1em' }}>✦ JOHANO</div>
        <p style={{ fontSize:'11px', color:'#aaa', fontStyle:'italic' }}>johano.com.br · Luz, Amor e Verdade</p>
      </footer>
    </div>
  )
}

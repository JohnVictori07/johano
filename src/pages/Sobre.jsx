import { useNavigate } from 'react-router-dom'
import Nav from './Nav'

export default function Sobre() {
  const navigate = useNavigate()
  const values = [
    { icon:'📖', title:'Estudo Sério', text:'Todo conteúdo é baseado nas obras originais da doutrina. Sem distorções, sem misturas. A fidelidade às fontes é nossa prioridade.' },
    { icon:'👥', title:'Para Todos', text:'Do adolescente curioso ao estudante avançado. Do Brasil ao mundo. O Johano foi construído para ser acessível a qualquer pessoa.' },
    { icon:'❤️', title:'Com Caridade', text:'O acesso ao conhecimento é um ato de caridade. Por isso o Johano é gratuito e sempre será — porque fora da caridade não há salvação.' },
    { icon:'🛡️', title:'Transparência', text:'O Johano Chat é inteligência artificial. Sempre deixamos isso claro. Ele pode errar, aprender e evoluir — como todos nós.' },
    { icon:'🌍', title:'Fraternidade', text:'Inspirados pelo Esperanto e pelo Espiritismo, acreditamos que o conhecimento espiritual não tem fronteiras. É patrimônio da humanidade.' },
    { icon:'🔄', title:'Em Evolução', text:'O Johano está em constante desenvolvimento. Novos conteúdos e melhorias chegam continuamente — assim como nós evoluímos.' },
  ]
  const timeline = [
    { date:'2025', title:'O primeiro contato com o Espiritismo', text:'O criador do Johano tem seu primeiro contato com a Doutrina Espírita — um encontro que mudaria sua forma de ver a vida, o sofrimento, a morte e o propósito da existência.' },
    { date:'2025', title:'A ideia nasce', text:'Da experiência pessoal com a doutrina surge o desejo de compartilhar: criar um espaço acessível, sério e acolhedor para quem também está buscando respostas.' },
    { date:'2026', title:'O Johano Chat é criado', text:'Nasce o assistente inteligente baseado nas obras de Kardec, Chico Xavier, André Luiz e outros — a espinha dorsal do projeto. Uma muleta para quem quer estudar com apoio.' },
    { date:'2026', title:'johano.com.br vai ao ar', text:'O portal completo é lançado: estudos, biblioteca, canais, glossário, Esperanto e o chat integrado. Um espaço aberto a toda a comunidade espírita.' },
    { date:'Futuro', title:'Sempre em crescimento', text:'Novos conteúdos, versão em Esperanto, mais obras e recursos. O Johano evolui junto com seus visitantes — continuamente, como todo espírito em sua jornada.' },
  ]

  return (
    <div style={{ fontFamily:"'Crimson Pro',Georgia,serif", background:'#fff' }}>
      <style>{`
        .s-sec{padding:52px 32px;border-bottom:1px solid #e0d8c8;}
        .s-lab{font-size:10px;letter-spacing:0.22em;color:#c9a650;text-transform:uppercase;margin-bottom:8px;}
        .s-tit{font-family:'Cinzel',serif;font-size:24px;font-weight:500;color:#1a3a6b;letter-spacing:0.04em;}
        .s-rul{width:40px;height:2px;background:#c9a650;margin:12px 0 24px;}
        .v-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
        .v-card{border:1px solid #e0d8c8;border-radius:8px;padding:20px;text-align:center;}
        .v-icon{font-size:26px;margin-bottom:10px;}
        .v-title{font-family:'Cinzel',serif;font-size:13px;color:#1a3a6b;margin-bottom:7px;letter-spacing:0.04em;}
        .v-text{font-size:13px;color:#666;line-height:1.75;font-weight:300;}
        .tl-item{display:grid;grid-template-columns:80px 1fr;gap:18px;padding:18px 0;border-bottom:1px solid #f0ece4;align-items:start;}
        .tl-item:last-child{border-bottom:none;}
        .tl-date{font-family:'Cinzel',serif;font-size:13px;color:#c9a650;letter-spacing:0.06em;padding-top:3px;}
        .tl-title{font-family:'Cinzel',serif;font-size:14px;color:#1a3a6b;margin-bottom:4px;}
        .tl-text{font-size:14px;color:#666;line-height:1.75;font-weight:300;}
        .c-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
        .c-card{border:1px solid #e0d8c8;border-radius:8px;padding:18px;display:flex;align-items:flex-start;gap:12px;}
        .c-icon{width:38px;height:38px;border-radius:6px;background:#f8f6f2;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
        .c-title{font-family:'Cinzel',serif;font-size:12px;color:#1a3a6b;margin-bottom:3px;}
        .c-text{font-size:13px;color:#666;font-weight:300;}
        .origin-grid{display:grid;grid-template-columns:1fr 1fr;gap:36px;}
        .muleta{background:#f8f6f2;border-radius:8px;padding:26px;border-left:3px solid #c9a650;}
        @media(max-width:768px){
          .s-sec{padding:36px 16px;}
          .v-grid{grid-template-columns:1fr;}
          .c-grid{grid-template-columns:1fr;}
          .origin-grid{grid-template-columns:1fr;}
          .tl-item{grid-template-columns:60px 1fr;gap:12px;}
        }
      `}</style>
      <Nav />

      <div style={{ background:'#1a3a6b', padding:'64px 32px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', fontSize:'200px', color:'rgba(255,255,255,0.03)', fontFamily:"'Cinzel',serif", top:'-20px', right:'-20px', lineHeight:1, pointerEvents:'none' }}>✦</div>
        <p style={{ fontSize:'10px', letterSpacing:'0.22em', color:'rgba(201,166,80,0.7)', textTransform:'uppercase', marginBottom:'16px' }}>Pri la Projekto</p>
        <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:'40px', fontWeight:600, color:'#fff', letterSpacing:'0.08em', marginBottom:'8px' }}>JOHANO</h1>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'14px', color:'#c9a650', letterSpacing:'0.12em', fontStyle:'italic', marginBottom:'20px' }}>Um portal nascido da busca pela luz</p>
        <div style={{ width:'40px', height:'2px', background:'#c9a650', margin:'0 auto 24px', opacity:0.5 }}></div>
        <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.8)', maxWidth:'560px', margin:'0 auto', lineHeight:1.85, fontWeight:300 }}>Johano é mais do que um site — é um convite à reflexão, ao estudo e ao crescimento espiritual.</p>
      </div>

      <div className="s-sec">
        <p className="s-lab">A História</p>
        <h2 className="s-tit">Como nasceu o Johano</h2>
        <div className="s-rul"></div>
        <div className="origin-grid">
          <div>
            {['O Johano nasceu de uma jornada pessoal com o Espiritismo — uma caminhada de descobertas, dúvidas, consolações e transformações que muitos de nós vivemos ao nos aproximar da doutrina codificada por Allan Kardec.',
              'A ideia era simples: criar um espaço onde qualquer pessoa — independente da idade, do nível de conhecimento ou de onde esteja no mundo — pudesse estudar, questionar e crescer dentro da Doutrina Espírita.',
              'O nome "Johano" é a forma em Esperanto de "João" — uma escolha que une dois ideais complementares: a fraternidade universal do Esperanto e a espiritualidade da doutrina.'].map((p,i)=>(
                <p key={i} style={{ fontSize:'16px', color:'#555', lineHeight:1.9, fontWeight:300, marginBottom:'16px' }}>{p}</p>
            ))}
          </div>
          <div className="muleta">
            <div style={{ fontSize:'28px', marginBottom:'10px' }}>🦯</div>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:'15px', color:'#1a3a6b', marginBottom:'10px' }}>O símbolo da muleta</p>
            <p style={{ fontSize:'15px', color:'#555', lineHeight:1.85, fontWeight:300, fontStyle:'italic' }}>"O Johano Chat é uma muleta para os estudos. Assim como uma muleta não faz você andar — mas auxilia, apoia e acompanha a sua caminhada — este assistente não substitui as obras originais, o centro espírita ou o orientador experiente."</p>
          </div>
        </div>
      </div>

      <div className="s-sec">
        <p className="s-lab">Fundamentos</p>
        <h2 className="s-tit">O que nos guia</h2>
        <div className="s-rul"></div>
        <div className="v-grid">
          {values.map(v=>(
            <div className="v-card" key={v.title}>
              <div className="v-icon">{v.icon}</div>
              <p className="v-title">{v.title}</p>
              <p className="v-text">{v.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="s-sec">
        <p className="s-lab">Desenvolvimento</p>
        <h2 className="s-tit">A jornada do projeto</h2>
        <div className="s-rul"></div>
        <div>
          {timeline.map((t,i)=>(
            <div className="tl-item" key={i}>
              <div className="tl-date">{t.date}</div>
              <div><p className="tl-title">{t.title}</p><p className="tl-text">{t.text}</p></div>
            </div>
          ))}
        </div>
      </div>

      <div className="s-sec">
        <p className="s-lab">Propósito</p>
        <h2 className="s-tit">Nossa visão</h2>
        <div className="s-rul"></div>
        <div style={{ background:'#f8f6f2', borderRadius:'8px', padding:'28px' }}>
          {['Acreditamos que o Espiritismo tem respostas profundas para as grandes perguntas da humanidade — de onde viemos, por que sofremos, para onde vamos. E que essas respostas merecem ser acessíveis a todos.',
            'O Johano não é um substituto para o centro espírita, para o livro na mão ou para o orientador experiente. É uma porta de entrada, um companheiro de estudos, uma muleta para quem está dando os primeiros passos.',
            'Que a luz desta doutrina possa alcançar mais corações, através deste singelo e humilde esforço.'].map((p,i)=>(
              <p key={i} style={{ fontSize:'17px', color:'#555', lineHeight:1.9, fontWeight:300, marginBottom:'14px' }}>{p}</p>
          ))}
        </div>
      </div>

      <div className="s-sec">
        <p className="s-lab">Fale Conosco</p>
        <h2 className="s-tit">Contato</h2>
        <div className="s-rul"></div>
        <div className="c-grid">
          {[['✉️','E-mail','contato@johano.com.br'],['📸','Instagram','@johano.com.br'],['▶️','YouTube','Em breve'],['🌐','Site','johano.com.br']].map(([ic,t,v])=>(
            <div className="c-card" key={t}>
              <div className="c-icon">{ic}</div>
              <div><p className="c-title">{t}</p><p className="c-text">{v}</p></div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background:'#1a3a6b', padding:'52px 32px', textAlign:'center' }}>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:'48px', color:'#c9a650', opacity:0.3, lineHeight:0.6, marginBottom:'16px' }}>"</div>
        <p style={{ fontSize:'20px', fontStyle:'italic', color:'#e8e0cc', maxWidth:'580px', margin:'0 auto 16px', lineHeight:1.85, fontWeight:300 }}>Cada um colhe o que semeia. Se semeardes o bem, colhereis o bem; se semeardes o mal, colhereis o mal.</p>
        <p style={{ fontSize:'12px', color:'#c9a650', letterSpacing:'0.08em', opacity:0.8 }}>— Allan Kardec · O Evangelho Segundo o Espiritismo</p>
      </div>

      <footer style={{ padding:'28px 32px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid #e0d8c8', background:'#f8f6f2', flexWrap:'wrap', gap:'12px' }}>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', letterSpacing:'0.1em' }}>✦ JOHANO</div>
        <p style={{ fontSize:'11px', color:'#aaa', fontStyle:'italic' }}>johano.com.br · Luz, Amor e Verdade</p>
      </footer>
    </div>
  )
}

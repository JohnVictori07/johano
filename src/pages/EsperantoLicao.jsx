import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Nav from './Nav'

const licoes = {
  1: {
    titulo: 'Saluton!',
    subtitulo: 'Cumprimentos básicos',
    icon: '👋',
    introducao: 'O Esperanto é famoso por ser fácil de pronunciar — cada letra tem sempre o mesmo som, sem exceções! Nesta lição você aprenderá os cumprimentos essenciais.',
    pronuncia: 'Em Esperanto, todas as letras se pronunciam sempre da mesma forma. O "j" soa como "i" em "pai". O "ĝ" soa como "dj". Simples assim!',
    vocabulario: [
      { eo:'Saluton', pt:'Olá / Saudação', ex:'Saluton, kiel vi fartas?' },
      { eo:'Bonan matenon', pt:'Bom dia', ex:'Bonan matenon! Ĉu vi bone dormis?' },
      { eo:'Bonan tagon', pt:'Boa tarde', ex:'Bonan tagon, amiko!' },
      { eo:'Bonan vesperon', pt:'Boa noite', ex:'Bonan vesperon, ĉiuj!' },
      { eo:'Bonan nokton', pt:'Boa noite (despedida)', ex:'Bonan nokton! Ĝis morgaŭ.' },
      { eo:'Ĝis revido', pt:'Até logo', ex:'Ĝis revido, amiko!' },
      { eo:'Dankon', pt:'Obrigado(a)', ex:'Dankon pro via helpo!' },
      { eo:'Nedankinde', pt:'De nada', ex:'Nedankinde! Ĝoju!' },
      { eo:'Bonvolu', pt:'Por favor', ex:'Bonvolu helpi min.' },
      { eo:'Pardonu', pt:'Com licença / Desculpe', ex:'Pardonu, kie estas la banĉambro?' },
    ],
    dialogos: [
      { titulo:'No centro espírita', linhas:[
        { quem:'Ana', texto:'Saluton, kiel vi fartas?' },
        { quem:'Pedro', texto:'Mi fartas bone, dankon! Kaj vi?' },
        { quem:'Ana', texto:'Ankaŭ bone. Ĝis revido!' },
        { quem:'Pedro', texto:'Ĝis revido! Bonan tagon!' },
      ]},
    ],
    exercicios: [
      { tipo:'escolha', pergunta:'Como se diz "Bom dia" em Esperanto?', opcoes:['Bonan vesperon','Bonan matenon','Bonan nokton','Saluton'], correta:1 },
      { tipo:'escolha', pergunta:'O que significa "Dankon"?', opcoes:['Por favor','De nada','Obrigado','Com licença'], correta:2 },
      { tipo:'escolha', pergunta:'Como se despedir em Esperanto?', opcoes:['Saluton','Pardonu','Ĝis revido','Bonvolu'], correta:2 },
      { tipo:'escolha', pergunta:'O que significa "Nedankinde"?', opcoes:['Obrigado','De nada','Com licença','Boa noite'], correta:1 },
    ]
  },
  2: {
    titulo: 'Mi estas...',
    subtitulo: 'Apresentação pessoal',
    icon: '🙋',
    introducao: 'Aprenda a se apresentar em Esperanto! Você vai aprender a dizer seu nome, sua nacionalidade, de onde é e como está.',
    pronuncia: 'O verbo "esti" (ser/estar) no presente é sempre "estas" para todas as pessoas. Não existem conjugações diferentes — uma das grandes facilidades do Esperanto!',
    vocabulario: [
      { eo:'Mi', pt:'Eu', ex:'Mi estas João.' },
      { eo:'Vi', pt:'Você / Tu', ex:'Vi estas bela.' },
      { eo:'Li / Ŝi', pt:'Ele / Ela', ex:'Li estas mia amiko.' },
      { eo:'Ni', pt:'Nós', ex:'Ni estas esperantistoj.' },
      { eo:'Esti', pt:'Ser / Estar', ex:'Mi estas feliĉa.' },
      { eo:'Nomiĝi', pt:'Chamar-se', ex:'Mi nomiĝas Ana.' },
      { eo:'Loĝi', pt:'Morar', ex:'Mi loĝas en Brazilo.' },
      { eo:'Paroli', pt:'Falar', ex:'Mi parolas Esperanton.' },
      { eo:'Lerni', pt:'Aprender', ex:'Mi lernas Esperanton.' },
      { eo:'Kiel vi fartas?', pt:'Como você está?', ex:'Saluton! Kiel vi fartas?' },
    ],
    dialogos: [
      { titulo:'Primeiro encontro', linhas:[
        { quem:'Maria', texto:'Saluton! Mi nomiĝas Maria. Kaj vi?' },
        { quem:'João', texto:'Saluton! Mi nomiĝas João. Mi loĝas en São Paulo.' },
        { quem:'Maria', texto:'Mi loĝas en Rio de Janeiro. Ĉu vi parolas Esperanton?' },
        { quem:'João', texto:'Jes! Mi lernas Esperanton en Johano!' },
      ]},
    ],
    exercicios: [
      { tipo:'escolha', pergunta:'Como se diz "Eu me chamo João" em Esperanto?', opcoes:['Mi estas João','Mi nomiĝas João','Mi loĝas João','Mi parolas João'], correta:1 },
      { tipo:'escolha', pergunta:'O que significa "Mi loĝas en Brazilo"?', opcoes:['Eu falo no Brasil','Eu aprendo no Brasil','Eu moro no Brasil','Eu sou do Brasil'], correta:2 },
      { tipo:'escolha', pergunta:'Como perguntar "Como você está?"', opcoes:['Kio estas vi?','Kiel vi fartas?','Kie vi loĝas?','Kiu vi estas?'], correta:1 },
      { tipo:'escolha', pergunta:'O que significa "Ni" em Esperanto?', opcoes:['Eu','Você','Ele','Nós'], correta:3 },
    ]
  },
  3: {
    titulo: 'Nombroj',
    subtitulo: 'Números 1 a 100',
    icon: '🔢',
    introducao: 'Os números em Esperanto são incrivelmente simples! Você aprende 13 palavras e consegue contar até 1 bilhão. É uma das maiores facilidades da língua.',
    pronuncia: '"Unu, du, tri, kvar, kvin, ses, sep, ok, naŭ, dek" — os números de 1 a 10. Para formar outros, é só combinar! Dek unu = 11, dek du = 12...',
    vocabulario: [
      { eo:'Unu', pt:'1 — Um', ex:'Mi havas unu libron.' },
      { eo:'Du', pt:'2 — Dois', ex:'Du pomoj estas sur la tablo.' },
      { eo:'Tri', pt:'3 — Três', ex:'Tri amikoj venas.' },
      { eo:'Kvar', pt:'4 — Quatro', ex:'Kvar sezonoj ekzistas.' },
      { eo:'Kvin', pt:'5 — Cinco', ex:'Kvin minutoj restas.' },
      { eo:'Ses', pt:'6 — Seis', ex:'Ses tagoj pasis.' },
      { eo:'Sep', pt:'7 — Sete', ex:'Sep tagoj estas en semajno.' },
      { eo:'Ok', pt:'8 — Oito', ex:'Ok horoj da dormo.' },
      { eo:'Naŭ', pt:'9 — Nove', ex:'Naŭ planedoj.' },
      { eo:'Dek', pt:'10 — Dez', ex:'Dek fingroj.' },
      { eo:'Cent', pt:'100 — Cem', ex:'Cent jaroj.' },
      { eo:'Mil', pt:'1000 — Mil', ex:'Mil esperantistoj.' },
      { eo:'Dek unu / Dek du', pt:'11 / 12 — Onze / Doze', ex:'Dek unu horas.' },
    ],
    dialogos: [
      { titulo:'No mercado', linhas:[
        { quem:'Vendedor', texto:'Bonan tagon! Kiom kostas ĉi tio?' },
        { quem:'Cliente', texto:'Kvin reais, bonvolu.' },
        { quem:'Vendedor', texto:'Dankon! Ĉu vi havas dekduon?' },
        { quem:'Cliente', texto:'Jes, jen dek du reais.' },
      ]},
    ],
    exercicios: [
      { tipo:'escolha', pergunta:'Como se diz "Sete" em Esperanto?', opcoes:['Ses','Sep','Ok','Naŭ'], correta:1 },
      { tipo:'escolha', pergunta:'O que significa "Dek kvin"?', opcoes:['Quatorze','Quinze','Dezesseis','Treze'], correta:1 },
      { tipo:'escolha', pergunta:'Como se diz "Vinte" em Esperanto?', opcoes:['Du dek','Dudek','Dek du','Dek ok'], correta:1 },
      { tipo:'escolha', pergunta:'O que significa "Cent"?', opcoes:['Dez','Cinquenta','Cem','Mil'], correta:2 },
    ]
  }
}

function speak(texto) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(texto)
  utt.lang = 'eo'
  utt.rate = 0.85
  // fallback para pt se eo não disponível
  const voices = window.speechSynthesis.getVoices()
  const eoVoice = voices.find(v => v.lang.startsWith('eo') || v.lang.startsWith('pt'))
  if (eoVoice) utt.voice = eoVoice
  window.speechSynthesis.speak(utt)
}

export default function EsperantoLicao() {
  const { numero } = useParams()
  const navigate = useNavigate()
  const num = parseInt(numero)
  const licao = licoes[num]
  const [aba, setAba] = useState('vocabulario')
  const [exercicioAtual, setExercicioAtual] = useState(0)
  const [respostaSelecionada, setRespostaSelecionada] = useState(null)
  const [mostrarResultado, setMostrarResultado] = useState(false)
  const [acertos, setAcertos] = useState(0)
  const [exercicioConcluido, setExercicioConcluido] = useState(false)
  const [licaoConcluida, setLicaoConcluida] = useState(false)
  const [falando, setFalando] = useState(null)

  useEffect(() => {
    window.speechSynthesis.getVoices()
  }, [])

  if (!licao) {
    return (
      <div style={{ fontFamily:"'Crimson Pro',Georgia,serif", padding:'48px 32px', textAlign:'center' }}>
        <Nav />
        <h2 style={{ fontFamily:"'Cinzel',serif", color:'#1a3a6b', marginBottom:'16px' }}>Lição em construção</h2>
        <p style={{ color:'#666', marginBottom:'24px' }}>Esta lição ainda está sendo preparada. Volte em breve!</p>
        <button onClick={()=>navigate('/esperanto/aprender')} style={{ background:'#1a3a6b', color:'#fff', border:'none', borderRadius:'4px', padding:'10px 20px', fontFamily:"'Cinzel',serif", fontSize:'13px', cursor:'pointer' }}>← Voltar ao curso</button>
      </div>
    )
  }

  const falar = (texto, id) => {
    setFalando(id)
    speak(texto)
    setTimeout(() => setFalando(null), 2000)
  }

  const responder = (idx) => {
    if (mostrarResultado) return
    setRespostaSelecionada(idx)
    setMostrarResultado(true)
    if (idx === licao.exercicios[exercicioAtual].correta) setAcertos(a => a+1)
  }

  const proximoExercicio = () => {
    if (exercicioAtual < licao.exercicios.length - 1) {
      setExercicioAtual(e => e+1)
      setRespostaSelecionada(null)
      setMostrarResultado(false)
    } else {
      setExercicioConcluido(true)
    }
  }

  const concluirLicao = () => {
    const progresso = JSON.parse(localStorage.getItem('johano_eo_progresso') || '{}')
    progresso[num] = 'completo'
    localStorage.setItem('johano_eo_progresso', JSON.stringify(progresso))
    setLicaoConcluida(true)
  }

  const ex = licao.exercicios[exercicioAtual]

  return (
    <div style={{ fontFamily:"'Crimson Pro',Georgia,serif", background:'#fff' }}>
      <style>{`
        .el-hero{background:linear-gradient(135deg,#1a3a6b,#2a5aad);padding:36px 32px;color:#fff;}
        .el-tabs{display:flex;border-bottom:1px solid #e0d8c8;padding:0 32px;overflow-x:auto;scrollbar-width:none;}
        .el-tabs::-webkit-scrollbar{display:none;}
        .el-tab{padding:13px 20px;font-family:'Cinzel',serif;font-size:12px;letter-spacing:0.06em;cursor:pointer;border-bottom:2px solid transparent;background:transparent;border-top:none;border-left:none;border-right:none;color:#666;white-space:nowrap;transition:all 0.2s;}
        .el-tab.active{color:#1a3a6b;border-bottom-color:#1a3a6b;}
        .el-sec{padding:32px 32px 48px;max-width:800px;}
        .el-voc-item{display:flex;align-items:center;gap:12px;padding:14px 0;border-bottom:1px solid #f0ece4;}
        .el-voc-eo{font-family:'Cinzel',serif;font-size:16px;color:#1a3a6b;min-width:160px;letter-spacing:0.02em;}
        .el-voc-pt{font-size:14px;color:#666;flex:1;}
        .el-voc-ex{font-size:12px;color:#aaa;font-style:italic;flex:1;}
        .el-speak-btn{width:32px;height:32px;border-radius:50%;background:#eef2f8;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;transition:all 0.2s;}
        .el-speak-btn:hover{background:#1a3a6b;color:#fff;}
        .el-speak-btn.falando{background:#c9a650;animation:pulse 0.8s ease-in-out infinite;}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
        .el-dialog{background:#f8f6f2;border-radius:8px;padding:20px;margin-bottom:20px;}
        .el-dialog-title{font-family:'Cinzel',serif;font-size:13px;color:#1a3a6b;margin-bottom:14px;letter-spacing:0.04em;}
        .el-linha{display:flex;align-items:flex-start;gap:10px;margin-bottom:10px;}
        .el-linha-quem{font-size:11px;font-weight:600;color:#1a3a6b;min-width:50px;padding-top:2px;}
        .el-linha-texto{font-size:15px;color:#333;font-style:italic;flex:1;}
        .el-ex-card{background:#f8f6f2;border-radius:8px;padding:24px;}
        .el-ex-num{font-size:11px;letter-spacing:0.14em;color:#aaa;text-transform:uppercase;margin-bottom:8px;}
        .el-ex-pergunta{font-family:'Cinzel',serif;font-size:17px;color:#1a3a6b;margin-bottom:20px;line-height:1.4;}
        .el-opcao{width:100%;text-align:left;padding:12px 16px;margin-bottom:8px;border:1px solid #e0d8c8;border-radius:6px;background:#fff;cursor:pointer;font-family:'Crimson Pro',Georgia,serif;font-size:15px;color:#333;transition:all 0.2s;}
        .el-opcao:hover:not(:disabled){border-color:#1a3a6b;background:#eef2f8;}
        .el-opcao.correta{border-color:#3b6d11;background:#eaf3de;color:#3b6d11;}
        .el-opcao.errada{border-color:#c00;background:#fcebeb;color:#c00;}
        .el-nav-btn{padding:10px 20px;border-radius:4px;font-family:'Cinzel',serif;font-size:12px;letter-spacing:0.08em;cursor:pointer;border:none;transition:all 0.2s;}
        .el-nav-btn.primary{background:#1a3a6b;color:#fff;}
        .el-nav-btn.secondary{background:transparent;border:1px solid #e0d8c8;color:#666;}
        .el-concluido{text-align:center;padding:40px 24px;background:#f8f6f2;border-radius:8px;}
        @media(max-width:768px){
          .el-hero{padding:24px 16px;}
          .el-tabs{padding:0 16px;}
          .el-sec{padding:24px 16px 36px;}
          .el-voc-ex{display:none;}
        }
      `}</style>

      <Nav />

      {/* HERO */}
      <div className="el-hero">
        <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px' }}>
          <button onClick={()=>navigate('/esperanto/aprender')} style={{ background:'rgba(255,255,255,0.15)', border:'none', borderRadius:'4px', padding:'6px 12px', color:'#fff', cursor:'pointer', fontSize:'13px', fontFamily:"'Crimson Pro',Georgia,serif" }}>← Voltar ao curso</button>
          <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)' }}>Lição {num} de 20</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'8px' }}>
          <span style={{ fontSize:'36px' }}>{licao.icon}</span>
          <div>
            <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:'26px', fontWeight:600, letterSpacing:'0.06em', marginBottom:'2px' }}>{licao.titulo}</h1>
            <p style={{ fontSize:'14px', color:'#c9a650', fontStyle:'italic' }}>{licao.subtitulo}</p>
          </div>
        </div>
        <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.75)', lineHeight:1.8, fontWeight:300, maxWidth:'600px' }}>{licao.introducao}</p>
      </div>

      {/* ABAS */}
      <div className="el-tabs">
        {[['vocabulario','📖 Vocabulário'],['pronuncia','🔊 Pronúncia'],['dialogos','💬 Diálogo'],['exercicios','✏️ Exercícios']].map(([id,label]) => (
          <button key={id} className={`el-tab${aba===id?' active':''}`} onClick={()=>setAba(id)}>{label}</button>
        ))}
      </div>

      {/* VOCABULÁRIO */}
      {aba==='vocabulario' && (
        <div className="el-sec">
          <p style={{ fontSize:'13px', color:'#aaa', marginBottom:'16px', fontStyle:'italic' }}>Clique no 🔊 para ouvir a pronúncia</p>
          {licao.vocabulario.map((v,i) => (
            <div className="el-voc-item" key={i}>
              <button className={`el-speak-btn${falando===i?' falando':''}`} onClick={()=>falar(v.eo, i)}>🔊</button>
              <span className="el-voc-eo">{v.eo}</span>
              <span className="el-voc-pt">{v.pt}</span>
              <span className="el-voc-ex">{v.ex}</span>
            </div>
          ))}
          <div style={{ marginTop:'24px', padding:'16px', background:'#f8f6f2', borderRadius:'6px', border:'1px solid #e0d8c8' }}>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', marginBottom:'8px' }}>📢 Pronúncia rápida</p>
            <p style={{ fontSize:'13.5px', color:'#666', lineHeight:1.7, fontWeight:300 }}>{licao.pronuncia}</p>
          </div>
        </div>
      )}

      {/* PRONÚNCIA */}
      {aba==='pronuncia' && (
        <div className="el-sec">
          <div style={{ background:'#f8f6f2', borderRadius:'8px', padding:'24px', marginBottom:'20px' }}>
            <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'16px', color:'#1a3a6b', marginBottom:'12px' }}>Como pronunciar</h3>
            <p style={{ fontSize:'15px', color:'#555', lineHeight:1.85, fontWeight:300 }}>{licao.pronuncia}</p>
          </div>
          <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'14px', color:'#1a3a6b', marginBottom:'14px' }}>Ouça cada palavra:</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:'10px' }}>
            {licao.vocabulario.map((v,i) => (
              <div key={i} onClick={()=>falar(v.eo, i)} style={{ padding:'14px', background:falando===i?'#1a3a6b':'#f8f6f2', borderRadius:'6px', border:'1px solid #e0d8c8', cursor:'pointer', textAlign:'center', transition:'all 0.2s' }}>
                <div style={{ fontSize:'24px', marginBottom:'6px' }}>🔊</div>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:'14px', color:falando===i?'#c9a650':'#1a3a6b' }}>{v.eo}</div>
                <div style={{ fontSize:'12px', color:falando===i?'rgba(255,255,255,0.7)':'#aaa', marginTop:'3px' }}>{v.pt}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DIÁLOGOS */}
      {aba==='dialogos' && (
        <div className="el-sec">
          <p style={{ fontSize:'14px', color:'#666', marginBottom:'20px', fontWeight:300 }}>Leia o diálogo e clique em 🔊 para ouvir cada frase.</p>
          {licao.dialogos.map((d,di) => (
            <div className="el-dialog" key={di}>
              <p className="el-dialog-title">📖 {d.titulo}</p>
              {d.linhas.map((l,li) => (
                <div className="el-linha" key={li}>
                  <span className="el-linha-quem">{l.quem}:</span>
                  <span className="el-linha-texto">{l.texto}</span>
                  <button className={`el-speak-btn${falando===`${di}-${li}`?' falando':''}`} onClick={()=>falar(l.texto, `${di}-${li}`)}>🔊</button>
                </div>
              ))}
            </div>
          ))}
          <div style={{ padding:'16px', background:'#eef2f8', borderRadius:'6px', border:'1px solid #d0d8e8' }}>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', marginBottom:'6px' }}>💡 Dica</p>
            <p style={{ fontSize:'13.5px', color:'#555', fontWeight:300 }}>Tente ler o diálogo em voz alta antes de ouvir. Depois compare sua pronúncia com o áudio!</p>
          </div>
        </div>
      )}

      {/* EXERCÍCIOS */}
      {aba==='exercicios' && (
        <div className="el-sec">
          {!exercicioConcluido ? (
            <div className="el-ex-card">
              <p className="el-ex-num">Questão {exercicioAtual+1} de {licao.exercicios.length}</p>
              <div style={{ height:'4px', background:'#e0d8c8', borderRadius:'2px', marginBottom:'20px' }}>
                <div style={{ height:'100%', width:`${((exercicioAtual)/licao.exercicios.length)*100}%`, background:'#c9a650', borderRadius:'2px', transition:'width 0.3s' }}></div>
              </div>
              <p className="el-ex-pergunta">{ex.pergunta}</p>
              {ex.opcoes.map((op,i) => (
                <button key={i} className={`el-opcao${mostrarResultado&&i===ex.correta?' correta':mostrarResultado&&i===respostaSelecionada&&i!==ex.correta?' errada':''}`} onClick={()=>responder(i)} disabled={mostrarResultado}>
                  {op}
                </button>
              ))}
              {mostrarResultado && (
                <div style={{ marginTop:'16px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <p style={{ fontSize:'14px', color: respostaSelecionada===ex.correta?'#3b6d11':'#c00', fontWeight:500 }}>
                    {respostaSelecionada===ex.correta ? '✅ Correto!' : `❌ A resposta correta era: ${ex.opcoes[ex.correta]}`}
                  </p>
                  <button className="el-nav-btn primary" onClick={proximoExercicio}>
                    {exercicioAtual < licao.exercicios.length-1 ? 'Próxima →' : 'Ver resultado →'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="el-concluido">
              {!licaoConcluida ? (
                <>
                  <div style={{ fontSize:'56px', marginBottom:'16px' }}>{acertos === licao.exercicios.length ? '🏆' : acertos >= licao.exercicios.length/2 ? '⭐' : '📖'}</div>
                  <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'22px', color:'#1a3a6b', marginBottom:'8px' }}>
                    {acertos}/{licao.exercicios.length} acertos
                  </h3>
                  <p style={{ fontSize:'15px', color:'#666', marginBottom:'24px', fontWeight:300 }}>
                    {acertos === licao.exercicios.length ? 'Perfeito! Você dominou esta lição!' : acertos >= licao.exercicios.length/2 ? 'Muito bem! Continue praticando.' : 'Continue estudando o vocabulário e tente novamente!'}
                  </p>
                  <div style={{ display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap' }}>
                    <button className="el-nav-btn secondary" onClick={()=>{ setExercicioAtual(0); setRespostaSelecionada(null); setMostrarResultado(false); setAcertos(0); setExercicioConcluido(false) }}>Tentar novamente</button>
                    <button className="el-nav-btn primary" onClick={concluirLicao}>✅ Concluir lição</button>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize:'56px', marginBottom:'16px' }}>🎉</div>
                  <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'22px', color:'#1a3a6b', marginBottom:'8px' }}>Lição {num} concluída!</h3>
                  <p style={{ fontSize:'15px', color:'#666', marginBottom:'24px', fontWeight:300 }}>Parabéns! Seu progresso foi salvo.</p>
                  <div style={{ display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap' }}>
                    <button className="el-nav-btn secondary" onClick={()=>navigate('/esperanto/aprender')}>← Voltar ao curso</button>
                    {num < 20 && <button className="el-nav-btn primary" onClick={()=>navigate(`/esperanto/licao/${num+1}`)}>Próxima lição →</button>}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      <footer style={{ padding:'28px 32px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid #e0d8c8', background:'#f8f6f2', flexWrap:'wrap', gap:'12px' }}>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', letterSpacing:'0.1em' }}>✦ JOHANO</div>
        <div style={{ display:'flex', gap:'10px' }}>
          {num > 1 && <button onClick={()=>navigate(`/esperanto/licao/${num-1}`)} style={{ background:'transparent', border:'1px solid #e0d8c8', borderRadius:'4px', padding:'6px 12px', fontSize:'12px', color:'#666', cursor:'pointer' }}>← Anterior</button>}
          {num < 20 && <button onClick={()=>navigate(`/esperanto/licao/${num+1}`)} style={{ background:'#1a3a6b', border:'none', borderRadius:'4px', padding:'6px 12px', fontSize:'12px', color:'#fff', cursor:'pointer' }}>Próxima →</button>}
        </div>
      </footer>
    </div>
  )
}

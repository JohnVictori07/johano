import { useNavigate, useLocation } from 'react-router-dom'

const navStyle = {
  display:'flex', alignItems:'center', justifyContent:'space-between',
  padding:'14px 32px', borderBottom:'1px solid #e0d8c8',
  background:'#fff', position:'sticky', top:0, zIndex:100,
}
const logoStyle = {
  fontFamily:"'Cinzel',serif", fontSize:'17px', fontWeight:600,
  color:'#1a3a6b', letterSpacing:'0.1em', display:'flex', alignItems:'center', gap:'8px', cursor:'pointer',
}
const dotStyle = {
  width:'26px', height:'26px', background:'#1a3a6b', borderRadius:'50%',
  display:'flex', alignItems:'center', justifyContent:'center', color:'#c9a650', fontSize:'12px',
}

export default function Nav() {
  const navigate = useNavigate()
  const location = useLocation()
  const links = [
    { label:'Início', path:'/' },
    { label:'Estudos', path:'/estudos' },
    { label:'Biblioteca', path:'/biblioteca' },
    { label:'Canais', path:'/canais' },
    { label:'Esperanto', path:'/esperanto' },
    { label:'Glossário', path:'/glossario' },
    { label:'Sobre', path:'/sobre' },
  ]
  return (
    <nav style={navStyle}>
      <div style={logoStyle} onClick={() => navigate('/')}><span style={dotStyle}>✦</span> JOHANO</div>
      <ul style={{ display:'flex', gap:'22px', listStyle:'none' }}>
        {links.map(l => (
          <li key={l.path}>
            <span onClick={() => navigate(l.path)} style={{
              fontSize:'13.5px', color: location.pathname === l.path ? '#1a3a6b' : '#666',
              cursor:'pointer', letterSpacing:'0.04em',
              fontWeight: location.pathname === l.path ? 500 : 400,
            }}>{l.label}</span>
          </li>
        ))}
      </ul>
      <button style={{ fontSize:'11px', border:'1px solid #ccc', borderRadius:'20px', padding:'4px 11px', cursor:'pointer', background:'transparent', color:'#666' }}>PT · EO</button>
    </nav>
  )
}

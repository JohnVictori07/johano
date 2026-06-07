import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const links = [
  { label:'Início', path:'/' },
  { label:'Estudos', path:'/estudos' },
  { label:'Biblioteca', path:'/biblioteca' },
  { label:'Canais', path:'/canais' },
  { label:'Esperanto', path:'/esperanto' },
  { label:'Glossário', path:'/glossario' },
  { label:'Sobre', path:'/sobre' },
]

export default function Nav() {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <>
      <style>{`
        .nav{display:flex;align-items:center;justify-content:space-between;padding:14px 32px;border-bottom:1px solid #e0d8c8;background:#fff;position:sticky;top:0;z-index:100;}
        .nav-logo{font-family:'Cinzel',serif;font-size:17px;font-weight:600;color:#1a3a6b;letter-spacing:0.1em;display:flex;align-items:center;gap:8px;cursor:pointer;}
        .nav-logo-dot{width:26px;height:26px;background:#1a3a6b;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#c9a650;font-size:12px;flex-shrink:0;}
        .nav-links{display:flex;gap:22px;list-style:none;}
        .nav-link{font-size:13.5px;color:#666;cursor:pointer;letter-spacing:0.04em;background:none;border:none;font-family:'Crimson Pro',Georgia,serif;}
        .nav-link:hover,.nav-link.active{color:#1a3a6b;font-weight:500;}
        .nav-right{display:flex;align-items:center;gap:10px;}
        .lang-btn{font-size:11px;border:1px solid #ccc;border-radius:20px;padding:4px 11px;cursor:pointer;background:transparent;color:#666;}
        .hamburger{display:none;background:transparent;border:none;cursor:pointer;padding:4px;flex-direction:column;gap:5px;}
        .hamburger span{display:block;width:22px;height:2px;background:#1a3a6b;border-radius:2px;}
        .mobile-menu{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:200;}
        .mobile-menu.open{display:block;}
        .mobile-panel{position:absolute;top:0;right:0;width:260px;height:100vh;background:#fff;padding:20px;display:flex;flex-direction:column;gap:0;}
        .mobile-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #e0d8c8;}
        .mobile-logo{font-family:'Cinzel',serif;font-size:15px;color:#1a3a6b;letter-spacing:0.1em;}
        .close-btn{background:transparent;border:none;font-size:22px;cursor:pointer;color:#666;line-height:1;}
        .mobile-link{display:block;padding:14px 0;font-size:16px;color:#444;cursor:pointer;border-bottom:1px solid #f0ece4;background:none;border-left:none;border-right:none;border-top:none;font-family:'Crimson Pro',Georgia,serif;text-align:left;width:100%;}
        .mobile-link:hover,.mobile-link.active{color:#1a3a6b;font-weight:500;}
        .mobile-lang{margin-top:20px;font-size:13px;border:1px solid #ccc;border-radius:20px;padding:8px 16px;cursor:pointer;background:transparent;color:#666;width:100%;}
        @media(max-width:768px){
          .nav{padding:12px 16px;}
          .nav-links{display:none;}
          .hamburger{display:flex;}
        }
      `}</style>

      <nav className="nav">
        <div className="nav-logo" onClick={()=>navigate('/')}>
          <div className="nav-logo-dot">✦</div>
          JOHANO
        </div>
        <ul className="nav-links">
          {links.map(l=>(
            <li key={l.path}>
              <button className={`nav-link${location.pathname===l.path?' active':''}`} onClick={()=>navigate(l.path)}>{l.label}</button>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <button className="lang-btn">PT · EO</button>
          <button className="hamburger" onClick={()=>setOpen(true)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${open?' open':''}`} onClick={e=>e.target===e.currentTarget&&setOpen(false)}>
        <div className="mobile-panel">
          <div className="mobile-header">
            <span className="mobile-logo">✦ JOHANO</span>
            <button className="close-btn" onClick={()=>setOpen(false)}>✕</button>
          </div>
          {links.map(l=>(
            <button key={l.path} className={`mobile-link${location.pathname===l.path?' active':''}`} onClick={()=>{ navigate(l.path); setOpen(false) }}>{l.label}</button>
          ))}
          <button className="mobile-lang">PT · EO</button>
        </div>
      </div>
    </>
  )
}
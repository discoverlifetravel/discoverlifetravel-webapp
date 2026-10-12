import Lockup from './Lockup'
import Lotus from './Lotus'

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="ft">
          <Lockup label="Discover Life Travel" />
          <nav aria-label="Footer">
            <a href="#tours">Journeys</a><a href="#why">Why Us</a><a href="#founder">Catherine</a><a href="#stories">Guest Stories</a><a href="#enquire">Contact</a>
          </nav>
          <div className="soc">
            <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r=".6" /></svg></a>
            <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M14 21v-8h3l.5-3.5H14V7.7c0-1 .4-1.7 1.8-1.7H17.6V3a20 20 0 0 0-2.6-.2c-2.6 0-4.3 1.6-4.3 4.4v2.3H7.5V13h3.2v8z" /></svg></a>
            <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10v6M8 7.5v.1M12 16v-6M12 12.5c0-3 4-3 4 0V16" /></svg></a>
            <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24"><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.5v5l4.5-2.5z" /></svg></a>
          </div>
        </div>
        <div className="fb">
          <span className="cp">&copy; {new Date().getFullYear()} Discover Life Travel. All rights reserved.</span>
          <div className="fm">
            <span className="lt"><Lotus /></span>
            <span className="fw"><i />Journeys &bull; People &bull; Places &bull; A Deeper India<i /></span>
          </div>
          <span className="lg"><a href="#">Privacy Policy</a> <b>|</b> <a href="#">Terms</a></span>
        </div>
      </div>
    </footer>
  )
}

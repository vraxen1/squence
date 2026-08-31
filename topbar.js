/* Squence shared top bar — synced with index.html */
(function(){
  const path=location.pathname.split('/').pop()||'index.html';
  const nav=document.createElement('nav');
  nav.className='squence-topbar';
  nav.innerHTML=`
    <a href="./" class="logo">s<span>q</span>uence</a>
    <div class="nav-right">
      <div class="nav-links">
        <a href="./" data-page="index.html">Home</a>
        <a href="news.html" data-page="news.html">News</a>
        <a href="games.html" data-page="games.html">Games</a>
        <a href="ai.html" data-page="ai.html">AI</a>
        <a href="pricing.html" data-page="pricing.html">Pricing</a>
        <a href="account.html" data-page="account.html">Account</a>
      </div>
      <div class="plan">✦ Free Plan</div>
      <div class="clock"><div class="clock-time" id="squenceClockTime">--:--:--</div><div class="clock-date" id="squenceClockDate">Loading...</div></div>
      <div class="theme-selector" id="squenceThemeSelector">
        <button class="theme-button" type="button" onclick="window.squenceToggleThemeMenu()"><span class="theme-dot" id="squenceThemeDot"></span>Theme</button>
        <div class="theme-menu">
          <button class="theme-option" id="squenceNeonOption" type="button" onclick="window.squenceSetTheme('neon')"><span>🌌</span><span><strong>Neon</strong><small class="theme-description">Original dark theme</small></span></button>
          <button class="theme-option" id="squenceTulipOption" type="button" onclick="window.squenceSetTheme('tulip')"><span>🌷</span><span><strong>Tulip</strong><small class="theme-description">Warm tulip-inspired colors</small></span></button>
        </div>
      </div>
    </div>`;
  document.addEventListener('DOMContentLoaded',()=>{
    document.body.insertBefore(nav,document.body.firstChild);
    const current=path==='index.html'||path===''?'index.html':path;
    nav.querySelectorAll('[data-page]').forEach(a=>{if(a.dataset.page===current)a.classList.add('active')});
    const saved=localStorage.getItem('squence-theme')||'neon'; window.squenceSetTheme(saved);
    window.squenceUpdateClock(); setInterval(window.squenceUpdateClock,1000);
    document.addEventListener('click',e=>{if(!nav.contains(e.target))document.getElementById('squenceThemeSelector').classList.remove('open')});
  });
  window.squenceToggleThemeMenu=()=>document.getElementById('squenceThemeSelector')?.classList.toggle('open');
  window.squenceSetTheme=theme=>{
    document.body.classList.remove('neon','tulip'); document.body.classList.add(theme); localStorage.setItem('squence-theme',theme);
    const dot=document.getElementById('squenceThemeDot'); if(dot)dot.style.background=theme==='tulip'?'#e38aa9':'#a855ff';
    document.getElementById('squenceNeonOption')?.classList.toggle('selected',theme==='neon');
    document.getElementById('squenceTulipOption')?.classList.toggle('selected',theme==='tulip');
  };
  window.squenceUpdateClock=()=>{
    const now=new Date(); const t=document.getElementById('squenceClockTime'),d=document.getElementById('squenceClockDate'); if(!t||!d)return;
    t.textContent=now.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});
    d.textContent=now.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}).toUpperCase();
  };
})();

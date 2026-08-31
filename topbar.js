/* Squence shared top bar + shared themes */
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

  const themeStyle=document.createElement('style');
  themeStyle.id='squenceSharedThemeStyle';
  themeStyle.textContent=`
    body.squence-shared-page.neon{--sq-bg:#050318;--sq-bg2:#09062b;--sq-text:#fff;--sq-muted:#9995ad;--sq-card:rgba(14,11,45,.78);--sq-border:rgba(151,92,255,.20);--sq-accent:#a855ff;--sq-accent2:#5968ff;--sq-shadow:rgba(111,47,255,.25)}
    body.squence-shared-page.tulip{--sq-bg:#170b13;--sq-bg2:#321322;--sq-text:#fff7f9;--sq-muted:#c5a5b0;--sq-card:rgba(62,24,42,.72);--sq-border:rgba(239,154,180,.22);--sq-accent:#e38aa9;--sq-accent2:#b85f87;--sq-shadow:rgba(190,72,117,.25)}
    body.squence-shared-page{background:linear-gradient(135deg,var(--sq-bg),var(--sq-bg2))!important;color:var(--sq-text)!important;transition:background .5s,color .5s}
    body.squence-shared-page .background{background:linear-gradient(135deg,var(--sq-bg),var(--sq-bg2))!important;transition:background .5s}
    body.squence-shared-page .orb.one{background:var(--sq-accent)!important}
    body.squence-shared-page .orb.two{background:var(--sq-accent2)!important}
    body.squence-shared-page .badge{color:var(--sq-accent)!important;border-color:var(--sq-border)!important;background:rgba(255,255,255,.04)!important}
    body.squence-shared-page h1{background:linear-gradient(120deg,var(--sq-text),var(--sq-accent),var(--sq-accent2))!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important}
    body.squence-shared-page h2,body.squence-shared-page h3{color:var(--sq-text)}
    body.squence-shared-page p,body.squence-shared-page .subtitle,body.squence-shared-page .article-description,body.squence-shared-page .source,body.squence-shared-page .article-date,body.squence-shared-page .status{color:var(--sq-muted)!important}
    body.squence-shared-page .card,body.squence-shared-page .article,body.squence-shared-page .price-card,body.squence-shared-page .account-box,body.squence-shared-page .coming-soon-card{background:var(--sq-card)!important;border-color:var(--sq-border)!important;box-shadow:0 20px 60px var(--sq-shadow)}
    body.squence-shared-page .category,body.squence-shared-page .retry,body.squence-shared-page .neon-input{background:rgba(255,255,255,.04)!important;border-color:var(--sq-border)!important;color:var(--sq-text)!important}
    body.squence-shared-page .category:hover,body.squence-shared-page .category.active,body.squence-shared-page .article:hover{background:rgba(255,255,255,.07)!important;border-color:var(--sq-accent)!important}
    body.squence-shared-page .article-category,body.squence-shared-page .read,body.squence-shared-page .feature-item span,body.squence-shared-page .features li::before{color:var(--sq-accent)!important}
    body.squence-shared-page .primary{background:linear-gradient(135deg,var(--sq-accent),var(--sq-accent2))!important;box-shadow:0 10px 30px var(--sq-shadow)!important}
    body.squence-shared-page .popular-badge{background:linear-gradient(90deg,var(--sq-accent),var(--sq-accent2))!important}
    body.squence-shared-page footer{border-color:var(--sq-border)!important;color:var(--sq-muted)!important}
    body.squence-shared-page footer strong{color:var(--sq-text)!important}
    body.squence-shared-page .neon-glow{text-shadow:0 0 10px var(--sq-shadow),0 0 20px var(--sq-shadow)!important}
    body.squence-shared-page .spinner{border-top-color:var(--sq-accent)!important}
  `;

  document.addEventListener('DOMContentLoaded',()=>{
    document.body.classList.add('squence-shared-page');
    document.body.insertBefore(nav,document.body.firstChild);
    document.head.appendChild(themeStyle);
    const current=path==='index.html'||path===''?'index.html':path;
    nav.querySelectorAll('[data-page]').forEach(a=>{if(a.dataset.page===current)a.classList.add('active')});
    const saved=localStorage.getItem('squenceTheme')||localStorage.getItem('squence-theme')||'neon';
    window.squenceSetTheme(saved);
    window.squenceUpdateClock(); setInterval(window.squenceUpdateClock,1000);
    document.addEventListener('click',e=>{if(!nav.contains(e.target))document.getElementById('squenceThemeSelector').classList.remove('open')});
  });

  window.squenceToggleThemeMenu=()=>document.getElementById('squenceThemeSelector')?.classList.toggle('open');
  window.squenceSetTheme=theme=>{
    theme=theme==='tulip'?'tulip':'neon';
    document.body.classList.remove('neon','tulip');
    document.body.classList.add(theme);
    localStorage.setItem('squenceTheme',theme);
    localStorage.setItem('squence-theme',theme);
    const dot=document.getElementById('squenceThemeDot');
    if(dot)dot.style.background=theme==='tulip'?'#e38aa9':'#a855ff';
    document.getElementById('squenceNeonOption')?.classList.toggle('selected',theme==='neon');
    document.getElementById('squenceTulipOption')?.classList.toggle('selected',theme==='tulip');
  };
  window.squenceUpdateClock=()=>{
    const now=new Date(); const t=document.getElementById('squenceClockTime'),d=document.getElementById('squenceClockDate'); if(!t||!d)return;
    t.textContent=now.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});
    d.textContent=now.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}).toUpperCase();
  };
})();

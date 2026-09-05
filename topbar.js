/* Squence shared top bar + global theme system */
(function(){
  const page=(location.pathname.split('/').pop()||'index.html');
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
          <button class="theme-option" id="squenceAlpineOption" type="button" onclick="window.squenceSetTheme('alpine')"><span>🏔️</span><span><strong>Alpine</strong><small class="theme-description">Icy mountain and deep lake colors</small></span></button>
        </div>
      </div>
    </div>`;

  const style=document.createElement('style');
  style.id='squenceSharedThemeStyle';
  style.textContent=`
    body.squence-shared-page.neon{--sq-bg:#050318;--sq-bg2:#09062b;--sq-text:#fff;--sq-muted:#9995ad;--sq-card:rgba(14,11,45,.78);--sq-border:rgba(151,92,255,.20);--sq-accent:#a855ff;--sq-accent2:#5968ff;--sq-shadow:rgba(111,47,255,.25)}
    body.squence-shared-page.tulip{--sq-bg:#170b13;--sq-bg2:#321322;--sq-text:#fff7f9;--sq-muted:#c5a5b0;--sq-card:rgba(62,24,42,.72);--sq-border:rgba(239,154,180,.22);--sq-accent:#e38aa9;--sq-accent2:#b85f87;--sq-shadow:rgba(190,72,117,.25)}
    body.squence-shared-page.alpine{--sq-bg:#082b48;--sq-bg2:#123f63;--sq-text:#eef4f7;--sq-muted:#a9bdd0;--sq-card:rgba(20,65,96,.72);--sq-border:rgba(156,197,220,.20);--sq-accent:#78aeca;--sq-accent2:#3d7399;--sq-shadow:rgba(35,101,142,.28)}

    body.squence-shared-page{background:var(--sq-bg)!important;color:var(--sq-text)!important;transition:background .45s,color .45s}
    body.squence-shared-page .background{background:radial-gradient(circle at 20% 20%,color-mix(in srgb,var(--sq-accent) 18%,transparent),transparent 30%),radial-gradient(circle at 80% 70%,color-mix(in srgb,var(--sq-accent2) 14%,transparent),transparent 32%),linear-gradient(135deg,var(--sq-bg),var(--sq-bg2))!important}
    body.squence-shared-page.alpine .background{background:radial-gradient(circle at 78% 8%,rgba(174,202,219,.16),transparent 26%),radial-gradient(circle at 18% 78%,rgba(57,111,148,.20),transparent 34%),linear-gradient(150deg,#0b3554 0%,#0a2b47 48%,#061f35 100%)!important}
    body.squence-shared-page .orb.one{background:var(--sq-accent)!important}
    body.squence-shared-page .orb.two{background:var(--sq-accent2)!important}

    body.squence-shared-page :where(h1,h2,h3,h4){color:var(--sq-text)!important}
    body.squence-shared-page :where(p,.subtitle,.status,.article-description,.source,.article-date,.price-description,.account-description,.feature-item,.loading){color:var(--sq-muted)!important}
    body.squence-shared-page h1.neon-glow,body.squence-shared-page .games-header h1,body.squence-shared-page .news-title{background:linear-gradient(120deg,var(--sq-text),var(--sq-accent),var(--sq-accent2))!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important}
    body.squence-shared-page :where(.badge,.article-category,.read,.feature-item span,.features li::before,.card-link){color:var(--sq-accent)!important}
    body.squence-shared-page .badge{border-color:var(--sq-border)!important;background:rgba(255,255,255,.04)!important}
    body.squence-shared-page :where(.card,.article,.game-card,.price-card,.account-box,.coming-soon-card,.error,.feature-item){background:var(--sq-card)!important;border-color:var(--sq-border)!important}
    body.squence-shared-page :where(.card,.article,.game-card,.price-card,.account-box,.coming-soon-card){box-shadow:0 20px 60px var(--sq-shadow)!important}
    body.squence-shared-page :where(.category,.retry,.neon-input,.secondary,.feature-item){border-color:var(--sq-border)!important}
    body.squence-shared-page :where(.category,.retry,.neon-input,.secondary){background:rgba(255,255,255,.04)!important;color:var(--sq-text)!important}
    body.squence-shared-page :where(.category:hover,.category.active,.article:hover,.game-card:hover,.card:hover){border-color:var(--sq-accent)!important}
    body.squence-shared-page .primary,body.squence-shared-page .play-button{background:linear-gradient(135deg,var(--sq-accent),var(--sq-accent2))!important;box-shadow:0 10px 30px var(--sq-shadow)!important;color:#fff!important}
    body.squence-shared-page .popular-badge{background:linear-gradient(90deg,var(--sq-accent),var(--sq-accent2))!important}
    body.squence-shared-page footer{border-color:var(--sq-border)!important;color:var(--sq-muted)!important}
    body.squence-shared-page footer strong{color:var(--sq-text)!important}
    body.squence-shared-page .spinner{border-top-color:var(--sq-accent)!important}
    body.squence-shared-page input:focus{border-color:var(--sq-accent)!important;box-shadow:0 0 0 3px color-mix(in srgb,var(--sq-accent) 15%,transparent)!important}
  `;

  function applyTheme(theme){
    theme=['neon','tulip','alpine'].includes(theme)?theme:'neon';
    document.body.classList.remove('neon','tulip','alpine');
    document.body.classList.add('squence-shared-page',theme);
    localStorage.setItem('squenceTheme',theme);
    localStorage.setItem('squence-theme',theme);
    const dot=document.getElementById('squenceThemeDot');
    if(dot)dot.style.background=theme==='alpine'?'#78aeca':theme==='tulip'?'#e38aa9':'#a855ff';
    document.getElementById('squenceNeonOption')?.classList.toggle('selected',theme==='neon');
    document.getElementById('squenceTulipOption')?.classList.toggle('selected',theme==='tulip');
    document.getElementById('squenceAlpineOption')?.classList.toggle('selected',theme==='alpine');
  }

  window.squenceSetTheme=applyTheme;
  window.squenceToggleThemeMenu=()=>document.getElementById('squenceThemeSelector')?.classList.toggle('open');
  window.squenceUpdateClock=()=>{
    const now=new Date(),t=document.getElementById('squenceClockTime'),d=document.getElementById('squenceClockDate');
    if(!t||!d)return;
    t.textContent=now.toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});
    d.textContent=now.toLocaleDateString(undefined,{weekday:'short',day:'numeric',month:'short',year:'numeric'});
  };

  document.addEventListener('DOMContentLoaded',()=>{
    document.head.appendChild(style);
    document.body.insertBefore(nav,document.body.firstChild);
    nav.querySelectorAll('[data-page]').forEach(a=>a.classList.toggle('active',a.dataset.page===page));
    applyTheme(localStorage.getItem('squenceTheme')||localStorage.getItem('squence-theme')||'neon');
    window.squenceUpdateClock();
    setInterval(window.squenceUpdateClock,1000);
    document.addEventListener('click',e=>{if(!nav.contains(e.target))document.getElementById('squenceThemeSelector')?.classList.remove('open')});
  });
})();

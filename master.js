// ===== 마스터페이지 공통 기능 =====
const $ = (s,el=document)=>el.querySelector(s);
const $$=(s,el=document)=>Array.from(el.querySelectorAll(s));

// ===== 마스터 컴포넌트 템플릿 =====
const MASTER_TEMPLATES = {
  header: `
    <div class="master-wrap">
      <div class="master-brand" aria-label="사이트 제목">
        <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true"><path fill="#ff7892" d="M12 2c2.5 0 4.5 2 4.5 4.5c0 1.7-.9 3.2-2.3 4.1c2.5.7 4.3 3 4.3 5.7V20a2 2 0 0 1-2 2H7.5a2 2 0 0 1-2-2v-3.7c0-2.7 1.8-5 4.3-5.7A4.5 4.5 0 0 1 7.5 6.5C7.5 4 9.5 2 12 2Z"/></svg>
        <b id="brand-title">묘묘다꾸</b>
        <span class="pill" aria-live="polite" id="today-pill" style="display:none"></span>
      </div>
      <nav aria-label="탐색" class="master-nav" id="nav-profile" style="display:none">
        <button class="master-tab" data-tab="home" aria-current="page" onclick="loadProfileTab('home')">홈</button>
        <button class="master-tab" data-tab="archive" onclick="loadProfileTab('archive')">아카이브</button>
        <button class="master-tab" data-tab="guestbook" onclick="loadProfileTab('guestbook')">방명록</button>
        <button class="master-tab" data-tab="goodies" onclick="loadProfileTab('goodies')">보너스</button>
        <a class="master-tab" href="index.html">← 디렉터리</a>
      </nav>
    </div>
  `,
  
  footer: `© <span id="yyyy"></span> 묘묘다꾸 — made with ♥`
};

// ===== 마스터 컴포넌트 로드 =====
function loadMasterComponents() {
  // 헤더 로드
  const headerEl = $('#master-header');
  if (headerEl) {
    headerEl.innerHTML = MASTER_TEMPLATES.header;
  }
  
  // 푸터 로드
  const footerEl = $('#master-footer');
  if (footerEl) {
    footerEl.innerHTML = MASTER_TEMPLATES.footer;
    $('#yyyy').textContent = new Date().getFullYear();
  }
}

// ===== 프로필 네비게이션 표시/숨김 =====
function setProfileTabsVisible(on) {
  const nav = $('#nav-profile');
  const todayPill = $('#today-pill');
  
  if (nav) nav.style.display = on ? '' : 'none';
  if (todayPill) todayPill.style.display = on ? '' : 'none';
}

// ===== 프로필 탭 활성화 =====
function setActiveTab(tabName) {
  const tabs = $$("#nav-profile .master-tab[data-tab]");
  tabs.forEach(tab => tab.removeAttribute('aria-current'));
  
  const activeTab = $(`#nav-profile .master-tab[data-tab='${tabName}']`);
  if (activeTab) {
    activeTab.setAttribute('aria-current', 'page');
  }
}

// ===== 헤더 업데이트 =====
function updateHeader(userName, today = null) {
  const brandTitle = $('#brand-title');
  const todayPill = $('#today-pill');
  
  if (brandTitle) {
    brandTitle.textContent = userName ? `${userName}의 집` : '묘묘다꾸';
  }
  
  if (todayPill && today) {
    todayPill.textContent = '오늘: ' + today;
    todayPill.style.display = '';
  }
  
  // 페이지 제목 업데이트
  document.title = userName ? `${userName}의 집 — 프로필` : '묘묘다꾸 — 홈';
}

// ===== 초기화 =====
document.addEventListener('DOMContentLoaded', () => {
  loadMasterComponents();
  
  // 현재 페이지에 따라 헤더 설정
  const currentPage = window.location.pathname;
  
  if (currentPage.includes('profile.html')) {
    // 프로필 페이지인 경우
    setProfileTabsVisible(true);
    
    // URL 파라미터에서 사용자 정보 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('u');
    const tab = urlParams.get('tab') || 'home';
    
    if (userId) {
      // 사용자별 헤더 설정 (실제 사용자 데이터는 profile.html에서 처리)
      updateHeader(userId);
      setActiveTab(tab);
    }
  } else {
    // 디렉터리 페이지인 경우
    setProfileTabsVisible(false);
    updateHeader(null);
  }
});

// ===== 전역 함수들 (profile.html에서 호출) =====
window.loadProfileTab = function(tabName) {
  const currentUrl = new URL(window.location);
  currentUrl.searchParams.set('tab', tabName);
  window.location.href = currentUrl.toString();
};

window.updateMasterHeader = function(userName, today) {
  updateHeader(userName, today);
  setProfileTabsVisible(true);
};

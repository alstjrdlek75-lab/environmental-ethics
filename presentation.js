/**
 * 고등학교 통합사회 인간 중심주의 vs 생태 중심주의
 * 인터랙티브 탭 대시보드 제어 JS
 */

// --------------------------------------------------------------------------
// 1. 탭별 단어 칩 매핑 (정답 단어 + 변별용 오답 단어)
// --------------------------------------------------------------------------
const tabWordBanks = {
  human: {
    answers: ["이익", "이분법적", "물질", "생태적", "도구적", "인간", "과학", "이용", "기계론적", "이성적"],
    distractors: ["내재적", "생태계", "정신", "유기적"]
  },
  eco: {
    answers: ["전일론적", "내재적", "아름다움", "대지", "심층", "생태계", "구성원", "가치관", "보존", "환경 파시즘"],
    distractors: ["이분법적", "도구적", "기술", "정복자"]
  },
  compare: {
    answers: ["이분법적", "내재적", "인간", "생태", "물질", "보존", "동물", "생명체", "베이컨", "레오폴드"],
    distractors: ["도구적", "생태계"]
  },
  relation: {
    answers: ["조화", "공존", "생태 공동체 의식", "자연 친화적", "지속가능한 개발", "생태 도시", "슬로 시티", "유기체", "천인합일", "인", "연기설", "자비", "무위자연"],
    distractors: ["도구적", "기계론적", "이분법적", "환경 파시즘"]
  }
};

const essayModelAnswers = {
  essay1: "학교 급식 잔반을 줄이고 분리배출을 철저히 하며, 안 쓰는 교실 소등과 에너지 절약을 생활화하는 대지 공동체적 실천을 행할 수 있습니다.",
  essay2: "생태계 전체의 조화와 안정성(전체의 선)을 위해 인간을 포함한 개별 생명체의 생명권이나 기본 권리를 억압하고 희생시킬 수 있다는 극단적 전체주의 성향의 생태 윤리적 입장입니다."
};

// --------------------------------------------------------------------------
// 1.1. 철학자 상세 정보 데이터베이스 (Modal 연동용)
// --------------------------------------------------------------------------
const thinkersDb = {
  bacon: {
    name: "프랜시스 베이컨 (Francis Bacon)",
    title: "인간 중심주의 - 근대 영국 철학자",
    life: "1561년 ~ 1626년, 경험론의 선구자로서 실험적 연구 방법과 귀납법을 제시하며 근대 과학의 길을 열었습니다.",
    book: "『신기관(Novum Organum)』, 자연과학의 실용적 활용을 통해 인류의 복지와 편의를 증진하는 것을 목적으로 삼았습니다.",
    quote: "“아는 것이 힘이다. 원인을 밝히지 못하면 어떤 효과도 낼 수 없다. 자연은 오로지 복종함으로써만 복종시킬 수 있기 때문이다. 인간은 자연의 사용자 및 해석자로서 자연의 질서에 대해 실제로 관찰하고 고찰한 것만큼 무엇인가를 할 수 있으며, 이해할 수 있다. 그 이상의 것은 알 수도 없고 할 수도 없다.”",
    keywords: ["경험론", "아는 것이 힘이다", "도구적 자연관", "자연 지배"]
  },
  descartes: {
    name: "르네 데카르트 (René Descartes)",
    title: "인간 중심주의 - 근대 프랑스 철학자",
    life: "1596년 ~ 1650년, 합리주의의 기초를 세웠으며 몸과 마음을 독립된 실체로 파악하는 물심이원론을 펼쳤습니다.",
    book: "『방법서설(Discourse on the Method)』, 생각하는 정신을 지닌 인간(주체)과 영혼이 없는 물질 세계인 자연(객체)을 나눴습니다.",
    quote: "“나는 생각한다, 고로 존재한다. 동물이 고통을 느끼는 것처럼 울부짖어도, 이는 마치 시계 태엽이 소리를 내는 것과 같이 영혼이 없는 자동 기계의 반응일 뿐이다.”",
    keywords: ["합리론", "이분법적 세계관", "기계론적 자연관", "동물 기계론"]
  },
  kant: {
    name: "임마누엘 칸트 (Immanuel Kant)",
    title: "인간 중심주의 - 근대 독일 철학자",
    life: "1724년 ~ 1804년, 비판철학을 완성하여 이성적 주체로서의 인간 존엄성과 의무 중심의 도덕 원칙을 확립했습니다.",
    book: "『윤리형이상학 정초』, 도덕 공동체의 대상을 오로지 자율적인 이성적 존재인 인간으로만 한정시켰습니다.",
    quote: "“비록 무생물이라 할지라도 자연 안에 있는 아름다운 대상을 파괴해 버리려는 성향은 자기 자신에 대한 인간의 의무와 대립한다. 또한 생명이 있는 피조물인 동물을 폭력적으로 다루는 것은 자기 자신에 대한 인간의 의무와 더욱 대립한다. 그렇게 함으로써 동물의 고통에 대한 인간의 공감이 무뎌지고, 결과적으로는 타인과의 관계에서 도덕성에 대단히 유익한 천성적 소질이 약화되기 때문이다.”",
    keywords: ["이성주의", "의무론", "간접적 의무", "인간 중심 도덕"]
  },
  leopold: {
    name: "알도 레오폴드 (Aldo Leopold)",
    title: "생태 중심주의 - 근대 미국 생태학자 및 임학자",
    life: "1887년 ~ 1948년, 야생 동물 보호구역 관리자로서 활동하며 개체주의를 넘어 생태계 전체를 도덕 공동체로 묶는 대지 윤리를 제창했습니다.",
    book: "『모래군의 열두 달(A Sand County Almanac)』, 대지를 인간 지배 대상에서 하나의 생명 연대로 재정의했습니다.",
    quote: "“대지 윤리는 인간을 대지 공동체의 정복자에서 그 구성원으로 변화시키는 것이다. 공동체의 구성원은 동료나 전체 공동체에 대해 존경심을 가져야 한다. 어떤 것이 생명 공동체의 온전성, 안정성, 아름다움을 보전하는 경향이 있다면 옳고, 그렇지 않다면 그르다. 대지 윤리는 인간에게 자원들(흙, 물, 식물, 동물 등)의 사용, 관리, 혹은 변화를 금지하지 않는다. 그러나 그들이 계속 존재할 권리, 비록 일부 지역에 국한되더라도 자연 상태 그대로 생존할 권리는 보장되어야 한다.”",
    keywords: ["대지 윤리", "생명 공동체", "온전성·안정성·아름다움", "전일론"]
  },
  naess: {
    name: "아르네 네스 (Arne Naess)",
    title: "생태 중심주의 - 현대 노르웨이 실천 철학자",
    life: "1912년 ~ 2009년, 오슬로 대학교 교수이자 열렬한 환경운동가로서 표피적인 공해 방지 대책의 구조적 한계를 비판했습니다.",
    book: "『생태, 공동체 그리고 생활양식』, 인간과 대자연이 동등하게 가치를 지니고 일체화되는 심층 생태학을 제창했습니다.",
    quote: "“현대 윤리는 자연을 인간의 복지 수단으로 삼는 얕은 환경주의에 갇혀 있다. 우리는 모든 인간 중심적 사고를 벗어나 자연과 나의 합치를 추구하는 큰 자아를 깨닫고 '심층 생태주의'를 행동으로 옮겨야 한다.”",
    keywords: ["심층 생태주의", "큰 자아실현", "생태계적 평등", "가치관 근본 성찰"]
  }
};

// --------------------------------------------------------------------------
// 2. 애플리케이션 상태 (State)
// --------------------------------------------------------------------------
let activeTab = "intro";
let selectedWord = null;
let selectedChipElement = null;

// 해결한 빈칸 ID 목록 (로컬 스토리지 보존)
let solvedBlanks = new Set();
// 해결한 퀴즈 ID 목록 (로컬 스토리지 보존)
let solvedQuizzes = new Set();
// 에세이 주관식 데이터
let essays = { essay1: "", essay2: "", quizEssay: "" };

// --------------------------------------------------------------------------
// 3. 주요 DOM 객체 수집
// --------------------------------------------------------------------------
const body = document.body;
const tabButtons = document.querySelectorAll(".topic-btn");
const lessonSections = document.querySelectorAll(".lesson-section");
const modeToggle = document.getElementById("modeToggle");
const printBtn = document.getElementById("printBtn");
const resetBtn = document.getElementById("resetBtn");
const progressBarFill = document.getElementById("progressBarFill");
const progressText = document.getElementById("progressText");
const toast = document.getElementById("toast");

const allBlanks = document.querySelectorAll(".blank");
const totalBlanksCount = allBlanks.length;

// 모달 DOM 객체 수집
const thinkerModal = document.getElementById("thinkerModal");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalThinkerImg = document.getElementById("modalThinkerImg");
const modalThinkerName = document.getElementById("modalThinkerName");
const modalThinkerTitle = document.getElementById("modalThinkerTitle");
const modalThinkerLife = document.getElementById("modalThinkerLife");
const modalThinkerBook = document.getElementById("modalThinkerBook");
const modalThinkerQuote = document.getElementById("modalThinkerQuote");
const modalThinkerKeywords = document.getElementById("modalThinkerKeywords");

// --------------------------------------------------------------------------
// 4. 앱 초기화 및 이벤트 리스너 바인딩
// --------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  initBlanks();
  initTabNavigation();
  initEssayInputs();
  initThinkerModalEvents();
  initQuizzes();
  
  // 모드 및 초기 유틸리티
  modeToggle.addEventListener("change", handleModeChange);
  printBtn.addEventListener("click", () => window.print());
  resetBtn.addEventListener("click", resetWorkbook);

  // 로딩 시 첫 화면 설정
  switchTab("intro");
  updateProgress();
});

// --------------------------------------------------------------------------
// 5. 탭 메뉴 탐색 제어
// --------------------------------------------------------------------------
function initTabNavigation() {
  tabButtons.forEach((btn) => {
    const tabId = btn.getAttribute("data-tab");
    btn.addEventListener("click", () => switchTab(tabId));
  });

  // 단축키 매핑 (1~5번 숫자키로 탭 전환 지원)
  document.addEventListener("keydown", (e) => {
    if (document.activeElement.tagName === "TEXTAREA" || document.activeElement.tagName === "INPUT") {
      return;
    }
    const tabKeys = {
      "1": "intro",
      "2": "human",
      "3": "eco",
      "4": "compare",
      "5": "relation",
      "6": "essay",
      "7": "quiz"
    };
    if (tabKeys[e.key]) {
      switchTab(tabKeys[e.key]);
    }
  });
}

function switchTab(tabId) {
  activeTab = tabId;

  // 탭 버튼 활성화 변경
  tabButtons.forEach((btn) => {
    if (btn.getAttribute("data-tab") === tabId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // 본문 섹션 가시성 제어
  lessonSections.forEach((sec) => {
    if (sec.id === `tab-${tabId}`) {
      sec.classList.add("active");
    } else {
      sec.classList.remove("active");
    }
  });

  // 바디 테마 클래스 스위칭 (컬러 브랜딩)
  body.className = body.className.replace(/theme-\S+/g, "");
  body.classList.add(`theme-${tabId}`);

  // 단어 칩 상태 리셋 및 리렌더링
  selectedWord = null;
  selectedChipElement = null;
  renderWordChips(tabId);
}

// --------------------------------------------------------------------------
// 6. 단어 바구니 칩 렌더링
// --------------------------------------------------------------------------
function renderWordChips(tabId) {
  const container = document.querySelector(`.word-chips[data-tab="${tabId}"]`);
  if (!container) return; // 도입 탭 등 단어 바구니가 없는 경우 패스

  container.innerHTML = "";
  const tabData = tabWordBanks[tabId];
  if (!tabData) return;

  // 정답 및 오답 리스트를 병합하여 셔플
  const combined = [...tabData.answers, ...tabData.distractors];
  const shuffled = shuffle(combined);

  shuffled.forEach((word) => {
    const chip = document.createElement("div");
    chip.className = "word-chip";
    chip.innerText = word;
    chip.setAttribute("data-word", word);

    chip.addEventListener("click", () => handleChipClick(chip, word));
    container.appendChild(chip);
  });

  updateWordChipsStatus(tabId);
}

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// 중복 사용 단어(예: '내재적' 3회 등)를 고려한 칩 개별 소진 상태 업데이트
function updateWordChipsStatus(tabId) {
  const container = document.querySelector(`.word-chips[data-tab="${tabId}"]`);
  if (!container) return;

  const chips = container.querySelectorAll(".word-chip");
  const tabBlanks = document.querySelectorAll(`#tab-${tabId} .blank`);

  // 해당 탭에서 학생이 이미 맞춰놓은 정답 텍스트 집계
  const solvedCounts = {};
  tabBlanks.forEach((blank) => {
    const blankId = blank.getAttribute("data-id");
    const answer = blank.getAttribute("data-answer");
    if (solvedBlanks.has(blankId)) {
      solvedCounts[answer] = (solvedCounts[answer] || 0) + 1;
    }
  });

  // 복사본을 활용하여 단어 칩 매칭 횟수를 차감하며 사용(used) 표시
  const tracker = { ...solvedCounts };

  chips.forEach((chip) => {
    const word = chip.getAttribute("data-word");
    if (tracker[word] > 0) {
      chip.classList.add("used");
      tracker[word]--;
    } else {
      chip.classList.remove("used");
    }
  });
}

function handleChipClick(chip, word) {
  if (body.classList.contains("mode-teacher")) return;
  if (chip.classList.contains("used")) return;

  if (chip.classList.contains("selected")) {
    chip.classList.remove("selected");
    selectedWord = null;
    selectedChipElement = null;
  } else {
    // 이전 선택 칩 해제
    const activeWordChips = document.querySelector(`.word-chips[data-tab="${activeTab}"]`);
    if (activeWordChips) {
      activeWordChips.querySelectorAll(".word-chip.selected").forEach(c => c.classList.remove("selected"));
    }
    
    chip.classList.add("selected");
    selectedWord = word;
    selectedChipElement = chip;
  }
}

// --------------------------------------------------------------------------
// 7. 빈칸 상호작용 및 정답 채점
// --------------------------------------------------------------------------
function initBlanks() {
  allBlanks.forEach((blank) => {
    const blankId = blank.getAttribute("data-id");
    const answer = blank.getAttribute("data-answer");

    // 초기 로딩 시 정답 셋팅
    if (solvedBlanks.has(blankId)) {
      blank.classList.add("revealed");
      blank.innerText = answer;
      blank.setAttribute("contenteditable", "false");
    } else {
      blank.innerText = "";
      blank.setAttribute("contenteditable", "true");
    }

    // 클릭 상호작용
    blank.addEventListener("click", () => {
      // 이미 맞춘 빈칸이거나 단어 칩 매칭 모드일 경우에만 handleBlankClick 실행
      if (blank.classList.contains("revealed") || selectedWord) {
        handleBlankClick(blank, blankId, answer);
      }
    });

    // 키보드 입력 처리
    blank.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // 줄바꿈 방지
        blank.blur(); // 포커스 아웃시켜 blur 이벤트 유도하여 자동 채점
      }
    });

    // 실시간 타이핑 입력 감지 및 채점
    blank.addEventListener("input", () => {
      if (body.classList.contains("mode-teacher")) return;
      if (solvedBlanks.has(blankId)) return;

      const userTyped = blank.innerText.trim();
      if (userTyped === answer) {
        blank.classList.add("revealed");
        blank.innerText = answer;
        blank.setAttribute("contenteditable", "false");
        blank.blur(); // 포커스 해제
        solvedBlanks.add(blankId);

        // 성공 파티클 터트리기
        triggerSparkles(blank);

        if (selectedChipElement) {
          selectedChipElement.classList.remove("selected");
        }
        selectedWord = null;
        selectedChipElement = null;

        saveToLocalStorage();
        updateProgress();
        updateWordChipsStatus(activeTab);
        showToast("정답입니다! 👏", true);
      }
    });

    // 포커스 아웃 시 채점 (틀렸을 때만 처리하도록)
    blank.addEventListener("blur", () => {
      if (body.classList.contains("mode-teacher")) return;
      if (solvedBlanks.has(blankId)) return;

      const userTyped = blank.innerText.trim();
      if (userTyped === "") {
        blank.innerText = ""; // 비어있는 경우 원래의 ? 표시 상태로 유지
        return;
      }

      if (userTyped !== answer) {
        // 오답인 경우
        blank.classList.add("shake");
        showToast("틀렸습니다. 다시 적어보세요! ❌", false);
        setTimeout(() => {
          blank.classList.remove("shake");
          blank.innerText = ""; // 입력했던 오답을 지워서 다시 ? 가 보이게 함
        }, 600);
      }
    });
  });
}

function handleBlankClick(blank, blankId, correctAnswer) {
  if (body.classList.contains("mode-teacher")) return;

  // 이미 맞춘 빈칸 클릭 -> 학습 복습용 초기화
  if (blank.classList.contains("revealed")) {
    blank.classList.remove("revealed");
    blank.innerText = "";
    blank.setAttribute("contenteditable", "true"); // 다시 입력 가능하게 설정!
    solvedBlanks.delete(blankId);
    
    saveToLocalStorage();
    updateProgress();
    updateWordChipsStatus(activeTab); // Rerender 대신 상태값만 변형하여 칩 셔플 방지
    showToast("해당 빈칸을 초기화했습니다. 다시 입력해보세요.");
    return;
  }

  // 단어 칩을 누른 뒤 빈칸을 클릭한 상황
  if (selectedWord) {
    if (selectedWord === correctAnswer) {
      blank.classList.add("revealed");
      blank.innerText = correctAnswer;
      blank.setAttribute("contenteditable", "false"); // 입력 불가하게 설정!
      solvedBlanks.add(blankId);

      // 성공 파티클 터트리기
      triggerSparkles(blank);

      if (selectedChipElement) {
        selectedChipElement.classList.remove("selected");
        selectedChipElement.classList.add("used");
      }
      
      selectedWord = null;
      selectedChipElement = null;

      saveToLocalStorage();
      updateProgress();
      showToast("정답입니다! 👏", true);
    } else {
      // 오답인 경우
      blank.classList.add("shake");
      showToast("틀렸습니다. 다시 고민해보고 넣어보세요! ❌", false);
      setTimeout(() => {
        blank.classList.remove("shake");
      }, 400);

      if (selectedChipElement) {
        selectedChipElement.classList.remove("selected");
      }
      selectedWord = null;
      selectedChipElement = null;
    }
  }
}

// --------------------------------------------------------------------------
// 7.1. 성공 파티클 (Sparkles) 애니메이션 함수
// --------------------------------------------------------------------------
function triggerSparkles(element) {
  const rect = element.getBoundingClientRect();
  const container = document.body;
  
  for (let i = 0; i < 15; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle-particle";
    
    // 알맞은 컬러 조합 (주요 테마 색상 믹스)
    const colors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    sparkle.style.backgroundColor = color;
    const size = Math.random() * 8 + 4;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    
    const startX = rect.left + rect.width / 2 + window.scrollX;
    const startY = rect.top + rect.height / 2 + window.scrollY;
    
    sparkle.style.left = `${startX}px`;
    sparkle.style.top = `${startY}px`;
    
    // 랜덤 날아갈 방향 및 각도 속성 부여
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 80 + 30;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance;
    
    sparkle.style.setProperty("--dest-x", `${destX}px`);
    sparkle.style.setProperty("--dest-y", `${destY}px`);
    
    container.appendChild(sparkle);
    
    sparkle.addEventListener("animationend", () => {
      sparkle.remove();
    });
  }
}

// --------------------------------------------------------------------------
// 8. 주관식 에세이 입력 핸들러
// --------------------------------------------------------------------------
function initEssayInputs() {
  const essayInput1 = document.getElementById("essayInput1");
  const essayInput2 = document.getElementById("essayInput2");

  essayInput1.value = essays.essay1 || "";
  essayInput2.value = essays.essay2 || "";

  essayInput1.addEventListener("input", (e) => {
    essays.essay1 = e.target.value;
    saveToLocalStorage();
  });

  essayInput2.addEventListener("input", (e) => {
    essays.essay2 = e.target.value;
    saveToLocalStorage();
  });
}

// --------------------------------------------------------------------------
// 8.1. 철학자 상세 모달 이벤트 바인딩 및 정보 설정
// --------------------------------------------------------------------------
function initThinkerModalEvents() {
  const clickableThinkers = document.querySelectorAll(".clickable-thinker");

  clickableThinkers.forEach((thinker) => {
    thinker.addEventListener("click", () => {
      const thinkerKey = thinker.getAttribute("data-thinker");
      const thinkerData = thinkersDb[thinkerKey];
      if (!thinkerData) return;

      // 모달 내부 데이터 적용
      modalThinkerImg.src = `images/${thinkerKey}.png`;
      modalThinkerImg.alt = thinkerData.name;
      modalThinkerName.innerText = thinkerData.name;
      modalThinkerTitle.innerText = thinkerData.title;
      modalThinkerLife.innerText = thinkerData.life;
      modalThinkerBook.innerText = thinkerData.book;
      modalThinkerQuote.innerText = thinkerData.quote;

      // 키워드 배지 생성
      modalThinkerKeywords.innerHTML = "";
      thinkerData.keywords.forEach((keyword) => {
        const badge = document.createElement("span");
        badge.className = "keyword-badge";
        badge.innerText = keyword;
        modalThinkerKeywords.appendChild(badge);
      });

      // 모달 표시
      thinkerModal.classList.add("show");
    });
  });

  // 모달 닫기
  modalCloseBtn.addEventListener("click", closeModal);
  
  // 외부 여백 클릭 시 닫기
  thinkerModal.addEventListener("click", (e) => {
    if (e.target === thinkerModal) {
      closeModal();
    }
  });

  // ESC 키 클릭 시 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && thinkerModal.classList.contains("show")) {
      closeModal();
    }
  });
}

function closeModal() {
  thinkerModal.classList.remove("show");
}

// --------------------------------------------------------------------------
// 9. 교사용/학생용 모드 변경 제어
// --------------------------------------------------------------------------
function handleModeChange(e) {
  const isTeacher = e.target.checked;
  const labelStudent = document.querySelector(".label-student");
  const labelTeacher = document.querySelector(".label-teacher");
  const essayInput1 = document.getElementById("essayInput1");
  const essayInput2 = document.getElementById("essayInput2");

  if (isTeacher) {
    body.classList.remove("mode-student");
    body.classList.add("mode-teacher");
    labelStudent.classList.remove("active");
    labelTeacher.classList.add("active");

    // 전부 노출 및 입력 불가화
    allBlanks.forEach((blank) => {
      blank.innerText = blank.getAttribute("data-answer");
      blank.setAttribute("contenteditable", "false");
    });

    // 주관식 에세이 모범답안 출력 및 읽기 전용 설정
    essayInput1.value = essayModelAnswers.essay1;
    essayInput2.value = essayModelAnswers.essay2;
    essayInput1.readOnly = true;
    essayInput2.readOnly = true;

    progressBarFill.style.width = "100%";
    progressText.innerText = "100%";
    showToast("모범답안 모드가 켜졌습니다.");

    if (activeTab === "quiz") {
      showQuestion(currentQuestionIdx);
    }
  } else {
    body.classList.remove("mode-teacher");
    body.classList.add("mode-student");
    labelTeacher.classList.remove("active");
    labelStudent.classList.add("active");

    // 해결된 데이터만 노출 및 상태 복원
    allBlanks.forEach((blank) => {
      const blankId = blank.getAttribute("data-id");
      if (solvedBlanks.has(blankId)) {
        blank.innerText = blank.getAttribute("data-answer");
        blank.setAttribute("contenteditable", "false");
      } else {
        blank.innerText = "";
        blank.setAttribute("contenteditable", "true");
      }
    });

    // 학생 작성본 복원 및 읽기 전용 해제
    essayInput1.value = essays.essay1 || "";
    essayInput2.value = essays.essay2 || "";
    essayInput1.readOnly = false;
    essayInput2.readOnly = false;

    updateProgress();
    updateWordChipsStatus(activeTab); // Rerender 대신 상태값만 변형하여 칩 셔플 방지
    showToast("학생용 자습 모드로 전환되었습니다.");

    if (activeTab === "quiz") {
      showQuestion(currentQuestionIdx);
    }
  }
}

// --------------------------------------------------------------------------
// 10. 진척도 및 유틸리티
// --------------------------------------------------------------------------
function updateProgress() {
  if (body.classList.contains("mode-teacher")) return;

  const percent = Math.round(((solvedBlanks.size + solvedQuizzes.size) / (totalBlanksCount + 10)) * 100) || 0;
  progressBarFill.style.width = `${percent}%`;
  progressText.innerText = `${percent}%`;
}

function showToast(message, isSuccess = true) {
  toast.innerText = message;
  toast.style.backgroundColor = isSuccess ? "rgba(15, 23, 42, 0.95)" : "rgba(185, 28, 28, 0.95)";
  toast.classList.add("show");
  
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

function resetWorkbook() {
  solvedBlanks.clear();
  essays = { essay1: "", essay2: "", quizEssay: "" };

  document.getElementById("essayInput1").value = "";
  document.getElementById("essayInput2").value = "";

  allBlanks.forEach((blank) => {
    blank.classList.remove("revealed");
    blank.innerText = "";
    blank.setAttribute("contenteditable", "true");
  });

  // 퀴즈 상태 리셋
  resetQuiz();

  // 체크박스 자가진단 리셋
  document.querySelectorAll(".check-box").forEach(cb => cb.checked = false);

  if (modeToggle.checked) {
    modeToggle.checked = false;
    handleModeChange({ target: { checked: false } });
  }

  saveToLocalStorage();
  updateProgress();
  renderWordChips(activeTab); // 현재 탭의 단어 칩 상태 리셋
  showToast("학습지가 초기화되었습니다. 즐거운 공부 시간 되세요!");
}

// --------------------------------------------------------------------------
// 11. 로컬 저장소 동기화
// --------------------------------------------------------------------------
function saveToLocalStorage() {
  localStorage.setItem("tab_study_solved_blanks", JSON.stringify(Array.from(solvedBlanks)));
  localStorage.setItem("tab_study_solved_quizzes", JSON.stringify(Array.from(solvedQuizzes)));
  localStorage.setItem("tab_study_essays", JSON.stringify(essays));
}

function loadFromLocalStorage() {
  try {
    const solved = localStorage.getItem("tab_study_solved_blanks");
    if (solved) {
      solvedBlanks = new Set(JSON.parse(solved));
    }
    
    const solvedQ = localStorage.getItem("tab_study_solved_quizzes");
    if (solvedQ) {
      solvedQuizzes = new Set(JSON.parse(solvedQ));
    }
    
    const savedEssays = localStorage.getItem("tab_study_essays");
    if (savedEssays) {
      essays = JSON.parse(savedEssays);
    }
  } catch (e) {
    console.error("Local storage loading error", e);
  }
}

// --------------------------------------------------------------------------
// 12. 실전 문제 (Quiz) 초기화 및 제어
// --------------------------------------------------------------------------
const quizQuestionsDb = [
  {
    id: "q1",
    correctIdx: 3, // index of ④ (0-indexed)
    explanation: "제시문을 주장한 사상가는 생태 중심주의자인 레오폴드입니다. ㄴ, ㄹ. 레오폴드는 대지를 인간을 비롯한 자연의 모든 존재가 상호 의존하는 생명 공동체로 보았습니다. 또한 자연은 인간과 마찬가지로 평등한 권리를 가진 존재이며, 자연을 오직 수단으로만 바라보아서는 안 된다고 주장하였습니다.",
    wrongAvoid: [
      "ㄱ. 레오폴드는 대지 공동체 그 자체는 본래적 가치를 가진다고 보았습니다.",
      "ㄷ. 레오폴드는 인간을 대지 공동체의 평범한 구성원으로 보는 한편, 인간만이 생명 공동체의 동료 구성원과 공동체 자체를 존중할 수 있는 도덕적 주체라고 보았습니다."
    ]
  },
  {
    id: "q2",
    correctIdx: 0, // index of ① (0-indexed)
    explanation: "제시문을 주장한 사상가는 인간 중심주의자인 아리스토텔레스입니다. ① 아리스토텔레스는 식물은 동물을 위해, 동물은 인간을 위해 존재하며, 오직 인간만이 이성적 활동을 할 수 있는 유일하게 가치 있는 직접적 도덕 고려 대상이라고 보았습니다.",
    wrongAvoid: [
      "② 아리스토텔레스는 영양과 성장(식물, 동물), 지각(동물) 등 '산다는 것'은 인간과 자연물이 공유하는 공통 특성이라고 제시문에서 명시했습니다.",
      "③ 아리스토텔레스는 인간이 이익과 생존을 위해 자연물과 동물을 수단으로 이용할 수 있다고 정당화했습니다.",
      "④, ⑤는 각각 동물/생명 중심주의 또는 생태 중심주의의 주장입니다."
    ]
  },
  {
    id: "q3",
    correctIdx: 3, // index of ④ (0-indexed)
    explanation: "A는 인간 중심주의, B는 생태 중심주의입니다. ④번 질문에 대해 인간 중심주의(A)는 인간이 자연보다 우월하므로 '아니요'가 맞고, 생태 중심주의(B)는 인간이 대지 공동체의 평범한 일원이므로 '예'가 맞으므로, 모두 옳게 대답한 선택지는 ④번입니다.",
    wrongAvoid: [
      "① '인간과 달리 자연은...' 이라는 질문에 생태 중심주의(B)는 인간과 자연 모두가 도덕적 고려 대상이라고 보므로 '아니요'라고 대답해야 옳습니다 (틀린 대답 '예').",
      "② A는 '예', B는 '아니요'로 대답해야 옳습니다.",
      "③ A는 '예', B는 생존을 위한 필수적 이용은 정당화되므로 '예'라고 대답해야 옳습니다.",
      "⑤ A는 도구적 목적이 아닌 본래적 의미의 조화 의무가 없으므로 '아니요', B는 '예'로 대답해야 옳습니다."
    ]
  },
  {
    id: "q4",
    correctIdx: 3, // index of ④ (0-indexed)
    explanation: "제시문의 강연자는 칸트입니다. ㄴ, ㄹ. 칸트는 자연물에 대한 파괴가 인간의 도덕적 성품을 해쳐 '인간에 대한 의무(간접적 의무)'를 위배하게 만든다고 보았습니다. 또한 이성적 존재로서 그 자체로 목적(본래적 가치)을 지닌 인간만이 유일한 직접적 도덕적 고려 대상입니다.",
    wrongAvoid: [
      "ㄱ. 칸트에 따르면 비이성적 존재(자연물)는 오직 인간의 목적을 위한 수단으로만 대우해야 합니다.",
      "ㄷ. 인간 이외의 존재도 도구적/수단적 가치는 가집니다."
    ]
  },
  {
    id: "q5",
    correctIdx: 4, // index of ⑤ (0-indexed)
    explanation: "제시문을 주장한 갑의 입장은 생태 중심주의입니다. 생태 중심주의는 생태계 전체의 온전성, 안정성, 아름다움을 유지하고 자연 그 자체의 본래적 가치를 존중해야 할 도덕적 의무가 있다고 봅니다. 따라서 심해 채굴에 대해 해양 생태계 보전의 관점에서 반대할 것을 조언할 것입니다.",
    wrongAvoid: [
      "① 생태 중심주의는 인간과 자연을 상호 의존적인 유기적 관계로 파악하며 분리된 존재로 보지 않습니다.",
      "②, ③, ④는 모두 인간의 경제적 이익이나 도구적 가치를 중시하고 부작용을 무시하는 인간 중심주의적 관점의 조언입니다."
    ]
  },
  {
    id: "q6",
    correctIdx: 1, // index of ② (0-indexed)
    explanation: "갑은 자연의 본래적 가치를 인정하여 인간이 자연을 파괴할 권리가 없다고 보므로 생태 중심주의 관점입니다. ② 생태 중심주의자인 갑은 자연이 인간만을 위해 존재하는 것이 아니며, 인간이 자연을 함부로 개발할 권리가 없다고 봅니다.",
    wrongAvoid: [
      "① 갑은 케이블카 설치로 경제적 이익을 얻을 수 있음을 '경제적 이익은 얻을 수 있을 것입니다'라며 인정하고 있습니다.",
      "③ 을은 자연이 인간을 위해 사용될 때 가치가 있다는 인간 중심주의 입장입니다.",
      "④ 을은 경제적 이익 실현을 위해 케이블카 설치를 찬성하며 자연환경을 이용할 수 있다고 봅니다.",
      "⑤ 갑은 '서식지 훼손', 을은 '자연환경 훼손의 우려'를 언급하여 둘 다 훼손 우려가 있다는 점에 동의합니다."
    ]
  },
  {
    id: "q7",
    correctIdx: 1, // index of ② (0-indexed)
    explanation: "제시문은 자연 그 자체의 가치를 존중하고 인간과 자연의 공존을 강조하는 생태 중심주의의 관점입니다. 첫 번째 진술(생태계 전체는 하나의 유기체이다)과 세 번째 진술(인간은 자연과 조화를 이루는 존재이다)이 생태 중심주의에 부합합니다. 따라서 이 두 진술에만 '✓'를 표시한 '을' 학생이 정답입니다.",
    wrongAvoid: [
      "두 번째 진술(인간과 자연의 위계 관계)과 네 번째 진술(자연의 도구적 가치만 인정)은 모두 인간 중심주의적 관점에 해당하므로 생태 중심주의 관점에 부합하지 않습니다.",
      "갑은 부적절한 두 번째 진술에도 체크했고, 병/정/무 역시 부적절한 진술에 체크하거나 부합하는 진술을 빠뜨렸습니다."
    ]
  },
  {
    id: "q8",
    correctIdx: 0, // index of ① (0-indexed)
    explanation: "갑은 대지 윤리를 주장한 레오폴드(생태 중심주의)이고, 을은 과학을 통해 자연을 정복해야 함을 주장한 베이컨(인간 중심주의)입니다. ① 생태 중심주의는 인간과 자연물 모두를 포함한 생태계 전체를 도덕적 고려의 대상으로 보아야 한다고 주장합니다.",
    wrongAvoid: [
      "② 이분법적 세계관은 인간 중심주의(을)의 입장이며, 생태 중심주의(갑)는 전일론적 세계관을 지향합니다.",
      "③ '자연 전체가 살아있는 유기체'라는 전일론적 관점은 생태 중심주의(갑)의 관점입니다.",
      "④ 대지 위의 모든 존재를 평등한 구성원으로 파악하는 것은 생태 중심주의(갑)의 관점입니다.",
      "⑤ 인간이 자연의 정복자가 되어야 한다는 것은 베이컨(을)의 인간 중심주의적 관점입니다."
    ]
  },
  {
    id: "q9",
    correctIdx: 3, // index of ④ (0-indexed)
    explanation: "갑은 인간 중심주의, 을은 생태 중심주의 관점입니다. ㄴ. 인간 중심주의(갑)는 경제적 이익이나 이성을 고려하므로 케이블카 설치로 인한 이득을 따져보라고 조언할 것입니다. ㄹ. 생태 중심주의(을)는 생태계 조화와 안정이 중요하므로 케이블카가 생태계에 미칠 부정적 영향을 고려하라고 조언할 것입니다. 따라서 옳은 조언은 ㄴ, ㄹ입니다.",
    wrongAvoid: [
      "ㄱ. 갑(인간 중심주의)은 도구적 가치를 중시하므로 본래적 가치를 중시하라는 조언은 적절하지 않습니다.",
      "ㄷ. 을(생태 중심주의)은 자연 그 자체의 가치를 존중해야 한다고 보므로 인간에게 자연 지배 권리가 있다는 조언은 적절하지 않습니다."
    ]
  },
  {
    id: "q10",
    correctIdx: -1, // Descriptive question has no correctIdx
    explanation: "인간 중심주의는 자연을 인간의 복지와 편의를 위한 도구적 가치로만 바라보기 때문에, 이로 인해 자원 고갈, 환경 오염, 생태계 파괴 등 전 지구적인 환경 위기와 생태적 문제를 야기할 수 있다는 비판을 받습니다.",
    wrongAvoid: [
      "예시 답안: '인간 중심주의를 강조하게 되면 자원 고갈, 환경 오염, 생태계 파괴 등과 같은 환경 위기가 나타날 수 있다.'"
    ]
  }
];

let currentQuestionIdx = 0;
let score = 0;
const userAnswersStatus = [null, null, null, null, null, null, null, null, null, null];
const firstAttemptStatus = [true, true, true, true, true, true, true, true, true, true];

let quizProgressText, quizCorrectScore, quizProgressBarFill, quizIndicatorChips, questionCards;
let explanationCard, explanationText, wrongAvoidList, controlActions, nextBtn;
let resultsCard, circleScore, circleChartFill, resultsComment, resultsDetails, restartBtn;

function initQuizzes() {
  quizProgressText = document.getElementById('quizProgressText');
  quizCorrectScore = document.getElementById('quizCorrectScore');
  quizProgressBarFill = document.getElementById('quizProgressBarFill');
  quizIndicatorChips = document.querySelectorAll('#quizIndicatorChips .indicator-chip');
  questionCards = document.querySelectorAll('.quiz-container .question-card');
  
  explanationCard = document.getElementById('explanationCard');
  explanationText = document.getElementById('explanationText');
  wrongAvoidList = document.getElementById('wrongAvoidList');
  
  controlActions = document.getElementById('controlActions');
  nextBtn = document.getElementById('nextBtn');
  
  resultsCard = document.getElementById('resultsCard');
  circleScore = document.getElementById('circleScore');
  circleChartFill = document.getElementById('circleChartFill');
  resultsComment = document.getElementById('resultsComment');
  resultsDetails = document.getElementById('resultsDetails');
  restartBtn = document.getElementById('restartBtn');

  if (!quizProgressText) return;

  // Restore solved state
  solvedQuizzes.forEach(qId => {
    const idx = parseInt(qId.replace("q", "")) - 1;
    if (idx >= 0 && idx < 10) {
      userAnswersStatus[idx] = 1;
      firstAttemptStatus[idx] = true;
    }
  });

  score = userAnswersStatus.filter(s => s !== null).length;
  if (quizCorrectScore) quizCorrectScore.innerText = score;

  // Apply visual state for restored quizzes
  questionCards.forEach((card, cardIdx) => {
    const correctIdx = quizQuestionsDb[cardIdx].correctIdx;
    const options = card.querySelectorAll('.option-item');
    
    // Set data-correct attribute for CSS matching in Teacher mode
    options.forEach((opt, optIdx) => {
      if (optIdx === correctIdx) {
        opt.setAttribute('data-correct', 'true');
      }
    });

    if (userAnswersStatus[cardIdx] !== null) {
      if (quizIndicatorChips[cardIdx]) quizIndicatorChips[cardIdx].classList.add('correct');
      options.forEach((opt, optIdx) => {
        if (optIdx === correctIdx) {
          opt.classList.add('correct');
        } else {
          opt.classList.add('disabled');
        }
      });
    }

    // Bind options click
    options.forEach((opt, optIdx) => {
      opt.addEventListener('click', () => {
        handleOptionSelection(cardIdx, optIdx, opt);
      });
    });
  });

  // Bind chips click
  quizIndicatorChips.forEach((chip, idx) => {
    chip.addEventListener('click', () => {
      showQuestion(idx);
    });
  });

  // Bind next button
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentQuestionIdx < 9) {
        showQuestion(currentQuestionIdx + 1);
      } else {
        showFinalResults();
      }
    });
  }

  // Bind restart button
  if (restartBtn) {
    restartBtn.addEventListener('click', resetQuiz);
  }

  // Bind essay submit button
  const quizEssaySubmitBtn = document.getElementById('quizEssaySubmitBtn');
  if (quizEssaySubmitBtn) {
    quizEssaySubmitBtn.addEventListener('click', handleQuizEssaySubmit);
  }

  // Bind essay input typing draft
  const quizEssayInput = document.getElementById("quizEssayInput");
  if (quizEssayInput) {
    quizEssayInput.addEventListener('input', (e) => {
      if (!body.classList.contains("mode-teacher") && userAnswersStatus[9] === null) {
        essays.quizEssay = e.target.value;
        saveToLocalStorage();
      }
    });
  }

  // Show first question
  showQuestion(0);
}

function showQuestion(index) {
  if (index < 0 || index >= 10) return;
  currentQuestionIdx = index;

  questionCards.forEach((card, idx) => {
    card.classList.toggle('active', idx === index);
  });

  if (quizProgressText) quizProgressText.innerText = `${index + 1} / 10`;
  if (quizProgressBarFill) quizProgressBarFill.style.width = `${((index + 1) / 10) * 100}%`;

  if (quizIndicatorChips) {
    quizIndicatorChips.forEach((chip, idx) => {
      chip.classList.toggle('active', idx === index);
    });
  }

  // Q10 서술형 특수 처리
  if (index === 9) {
    const essayInput = document.getElementById("quizEssayInput");
    if (essayInput) {
      if (body.classList.contains("mode-teacher")) {
        essayInput.value = "인간 중심주의를 강조하게 되면 자원 고갈, 환경 오염, 생태계 파괴 등과 같은 환경 위기가 나타날 수 있다.";
        essayInput.readOnly = true;
      } else {
        essayInput.value = essays.quizEssay || "";
        if (userAnswersStatus[9] !== null) {
          essayInput.readOnly = true;
        } else {
          essayInput.readOnly = false;
        }
      }
    }
  }

  // If solved or in teacher mode, reveal explanation
  if (body.classList.contains("mode-teacher") || userAnswersStatus[index] !== null) {
    revealExplanation(index);
    if (!body.classList.contains("mode-teacher")) {
      if (controlActions) controlActions.style.display = 'flex';
      if (nextBtn) nextBtn.innerHTML = index === 9 ? '학습 평가 결과 확인 🏆' : '다음 문제 풀기 ➡️';
    }
  } else {
    if (explanationCard) explanationCard.classList.remove('active');
    if (controlActions) controlActions.style.display = 'none';
  }
}

function handleOptionSelection(questionIdx, optionIdx, optionElement) {
  if (body.classList.contains("mode-teacher")) return;
  if (userAnswersStatus[questionIdx] !== null) return;

  const correctIdx = quizQuestionsDb[questionIdx].correctIdx;
  const card = questionCards[questionIdx];
  const options = card.querySelectorAll('.option-item');

  if (optionIdx === correctIdx) {
    optionElement.classList.add('correct');
    showToast('정답입니다! 🎉', true);

    userAnswersStatus[questionIdx] = firstAttemptStatus[questionIdx] ? 1 : 0;
    solvedQuizzes.add(`q${questionIdx + 1}`);

    if (firstAttemptStatus[questionIdx]) {
      score++;
      if (quizCorrectScore) quizCorrectScore.innerText = score;
      if (quizIndicatorChips[questionIdx]) quizIndicatorChips[questionIdx].classList.add('correct');
    } else {
      if (quizIndicatorChips[questionIdx]) quizIndicatorChips[questionIdx].classList.add('incorrect');
    }

    options.forEach(opt => {
      if (!opt.classList.contains('correct')) {
        opt.classList.add('disabled');
      }
    });

    setTimeout(() => {
      revealExplanation(questionIdx);
      if (controlActions) controlActions.style.display = 'flex';
      if (nextBtn) nextBtn.innerHTML = questionIdx === 9 ? '학습 평가 결과 확인 🏆' : '다음 문제 풀기 ➡️';
    }, 500);

    saveToLocalStorage();
    updateProgress();
  } else {
    optionElement.classList.add('incorrect');
    showToast('오답입니다. 😢 다시 선택해 보세요!', false);

    firstAttemptStatus[questionIdx] = false;

    setTimeout(() => {
      optionElement.classList.remove('incorrect');
    }, 800);
  }
}

function handleQuizEssaySubmit() {
  if (body.classList.contains("mode-teacher")) return;
  if (userAnswersStatus[9] !== null) return;

  const essayInput = document.getElementById("quizEssayInput");
  const typedVal = essayInput ? essayInput.value.trim() : "";

  if (typedVal.length === 0) {
    showToast("답안을 작성해 주세요! ❌", false);
    return;
  }

  // Submit answer
  userAnswersStatus[9] = 1; // Mark as solved
  solvedQuizzes.add("q10");
  score++;
  if (quizCorrectScore) quizCorrectScore.innerText = score;
  if (quizIndicatorChips[9]) quizIndicatorChips[9].classList.add('correct');
  if (essayInput) essayInput.readOnly = true;

  triggerSparkles(essayInput);
  showToast("답안이 제출되었습니다! 예시 답안과 비교해 보세요. 👏", true);

  setTimeout(() => {
    revealExplanation(9);
    if (controlActions) controlActions.style.display = 'flex';
    if (nextBtn) nextBtn.innerHTML = '학습 평가 결과 확인 🏆';
  }, 500);

  saveToLocalStorage();
  updateProgress();
}

function revealExplanation(questionIdx) {
  const qData = quizQuestionsDb[questionIdx];
  if (explanationText) explanationText.innerText = qData.explanation;

  if (wrongAvoidList) {
    wrongAvoidList.innerHTML = '';
    qData.wrongAvoid.forEach(text => {
      const li = document.createElement('li');
      li.innerText = text;
      wrongAvoidList.appendChild(li);
    });
  }

  if (explanationCard) explanationCard.classList.add('active');
}

function showFinalResults() {
  const sb = document.getElementById('statusBar');
  const qc = document.getElementById('quizContainer');
  if (sb) sb.style.display = 'none';
  if (qc) qc.style.display = 'none';
  if (explanationCard) explanationCard.classList.remove('active');
  if (controlActions) controlActions.style.display = 'none';

  if (circleScore) circleScore.innerText = score;
  const strokeVal = (score / 10) * 314.16;
  if (circleChartFill) circleChartFill.setAttribute('stroke-dasharray', `${strokeVal} 314.16`);

  let comment = '';
  if (score === 10) {
    comment = '👑 완벽합니다! 인간 중심주의와 생태 중심주의 특징을 완벽하게 마스터하셨습니다!';
  } else if (score >= 7) {
    comment = '👍 대단합니다! 대부분의 철학적 세계관과 사상가 입장을 정확히 이해하고 계시네요.';
  } else {
    comment = '📖 조금 아쉽네요! 대시보드로 돌아가 인간 중심주의와 생태 중심주의를 다시 학습해 보아요.';
  }
  if (resultsComment) resultsComment.innerText = comment;

  if (resultsDetails) {
    resultsDetails.innerHTML = '';
    
    const quizTitles = [
      '대지 윤리 (레오폴드)',
      '목적론적 자연관 (아리스토텔레스)',
      '인간 vs 생태 종합 비교',
      '이성주의 및 간접적 의무 (칸트)',
      '심해 채굴 조언 (레오폴드)',
      '케이블카 설치 토론 (갑/을)',
      '체크리스트 진술 매칭 (을)',
      '가상 대화 분석 (레오폴드 vs 베이컨)',
      '케이블카 설치 조언 (인간 vs 생태)',
      '생태 중심주의의 비판 (서술형)'
    ];

    quizQuestionsDb.forEach((q, idx) => {
      const item = document.createElement('div');
      item.className = 'detail-item';
      
      let resultText = '';
      let resultClass = '';
      
      if (idx === 9) {
        resultText = '제출 완료 📝';
        resultClass = 'correct';
      } else {
        const isCorrect = userAnswersStatus[idx] === 1;
        resultText = isCorrect ? '첫 시도 정답 🎉' : '재시도 정답 🔄';
        resultClass = isCorrect ? 'correct' : 'incorrect';
      }
      
      item.innerHTML = `
        <span class="detail-q">질문 ${idx + 1}. ${quizTitles[idx]}</span>
        <span class="detail-result ${resultClass}">${resultText}</span>
      `;
      resultsDetails.appendChild(item);
    });
  }

  if (resultsCard) resultsCard.classList.add('active');
}

function resetQuiz() {
  score = 0;
  if (quizCorrectScore) quizCorrectScore.innerText = score;
  currentQuestionIdx = 0;

  for (let i = 0; i < 10; i++) {
    userAnswersStatus[i] = null;
    firstAttemptStatus[i] = true;
  }
  solvedQuizzes.clear();

  const quizEssayInput = document.getElementById("quizEssayInput");
  if (quizEssayInput) {
    quizEssayInput.value = "";
    quizEssayInput.readOnly = false;
  }
  essays.quizEssay = "";

  const options = document.querySelectorAll('.quiz-container .option-item');
  options.forEach(opt => {
    opt.className = 'option-item';
  });

  if (quizIndicatorChips) {
    quizIndicatorChips.forEach(chip => {
      chip.className = 'indicator-chip';
    });
    if (quizIndicatorChips[0]) quizIndicatorChips[0].classList.add('active');
  }

  const sb = document.getElementById('statusBar');
  const qc = document.getElementById('quizContainer');
  if (sb) sb.style.display = 'flex';
  if (qc) qc.style.display = 'block';
  if (resultsCard) resultsCard.classList.remove('active');
  if (explanationCard) explanationCard.classList.remove('active');
  if (controlActions) controlActions.style.display = 'none';

  saveToLocalStorage();
  updateProgress();
  showQuestion(0);
}

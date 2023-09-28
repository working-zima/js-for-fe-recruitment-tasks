class DarkModeToggle {
  // DarkModeToggle의 state
  isDarkMode = null;

  constructor({ $target }) {
    const $wrapper = document.createElement("section");
    // input 요소를 생성
    const $DarkModeToggle = document.createElement("input");
    // class에 등록 (this를 사용해서)
    this.$DarkModeToggle = $DarkModeToggle;
    // <input> 의 타입을 체크박스로 설정
    this.$DarkModeToggle.type = "checkbox";

    // DarkModeToggle 클래스 네임 등록
    $DarkModeToggle.className = "DarkModeToggle";
    // target 노드 하위에 DarkModeToggle 노드를 추가
    $target.appendChild($wrapper);
    $wrapper.appendChild($DarkModeToggle);

    // DarkModeToggle 요소가 바뀌면(체크 or 체크 풀기)
    $DarkModeToggle.addEventListener("change", (e) => {
      this.setColorMode(e.target.checked);
    });

    this.initColorMode();
  }

  initColorMode() {
    // 미디어 쿼리의 조건에 만족하는지 불리언 값으로 반환
    // 미디어 조건은 운영 체제에서 설정된 다크 모드를 감지 (prefers-color-scheme: dark)
    this.isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // 운영 체제가 다크 모드 설정이라면 checked를 true로, 아니라면 false로 초기화
    this.$DarkModeToggle.checked = this.isDarkMode;
    this.setColorMode(this.isDarkMode);
  }

  setColorMode(isDarkMode) {
    // html 태그에 "color-mode" 속성을 추가
    // 체크가 되면 color-mode="dark", 풀리면 color-mode="light"
    document.documentElement.setAttribute(
      "color-mode",
      isDarkMode ? "dark" : "light"
    );
  }
}

export default DarkModeToggle;

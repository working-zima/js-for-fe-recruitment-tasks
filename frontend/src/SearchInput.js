import KeywordHistory from "./KeywordHistory.js";

const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onRandomSearch }) {
    const $wrapper = document.createElement("section");
    $wrapper.className = "SearchInputSection";
    // input 요소를 생성
    const $searchInput = document.createElement("input");
    // class에 등록 (this를 사용해서)
    this.$searchInput = $searchInput;
    // <input> 요소에 입력될 값에 대한 짧은 힌트를 명시
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";

    // searchInput 클래스 등록
    $searchInput.className = "SearchInput";

    // target 노드 하위에 searchInput 노드를 추가
    $target.appendChild($wrapper);
    $wrapper.appendChild($searchInput);

    // searchInput 요소에 키보드 타이핑시 이벤트 실행
    $searchInput.addEventListener("keypress", (e) => {
      // 엔터를 클릭하면 매개변수로 가져온 onSearch를 실행
      if (e.key === "Enter") {
        onSearch(e.target.value, this.$limitCount.value);
        // 최근 키워드 저장
        this.KeywordHistory.addKeyword(e.target.value);
      }
    });

    // 셀렉트 UI
    const $limitCount = document.createElement("select");
    this.$limitCount = $limitCount;
    this.$limitCount.classList = "LimitCount";

    const LimitCountOptions = [50, 25, 10];
    LimitCountOptions.map((option) => {
      let $option = document.createElement("option");
      $option.value = option;
      $option.textContent = `${option} 개`;
      $limitCount.appendChild($option);
    });

    $wrapper.appendChild($limitCount);

    // 랜덤
    const $randomButton = document.createElement("button");
    this.$randomButton = $randomButton;
    this.$randomButton.className = "RandomButton";
    this.$randomButton.textContent = "랜덤고양이";

    $wrapper.appendChild($randomButton);

    $randomButton.addEventListener("click", (e) => {
      onRandomSearch(e.target.value);
    });

    this.KeywordHistory = new KeywordHistory({
      $target: $wrapper,
      onSearch,
    });
  }
  render() {}
}

export default SearchInput;

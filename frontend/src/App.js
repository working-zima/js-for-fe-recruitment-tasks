console.log("app is running!");

import Loading from "./Loading.js";
import DarkModeToggle from "./DarkModeToggle.js";
import SearchInput from "./SearchInput.js";
import Banner from "./Banner.js";
import SearchResult from "./SearchResult.js";
import ImageInfo from "./ImageInfo.js";
import api from "./api.js";

// $은 DOM 요소를 가리키기 위해 사용한 컨벤션
class App {
  //App의 state
  $target = null;
  DEFAULT_PAGE = 1;

  data = {
    items: [],
    page: this.DEFAULT_PAGE,
  };

  constructor($target) {
    // 이 프로젝트에서 $target은 <div id='App'></div>
    this.$target = $target;

    this.Loading = new Loading({
      $target,
    });

    this.DarkModeToggle = new DarkModeToggle({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      // keyword는 SearchInput에 입력된 value
      onSearch: (keyword, limit) => {
        // 데이터를 받아올 때까지 로딩창
        this.Loading.show();
        // api를 통해 받아온 data를 setState에 넘겨줌
        api.fetchCatsPageWithLimit(keyword, limit).then(({ data }) => {
          this.setState({
            items: data,
            page: this.DEFAULT_PAGE,
          });
          // 데이터를 받아오면 로딩창 끄기
          this.Loading.hide();
          // 로컬에 저장
          this.saveResult(data);
        });
      },

      onRandomSearch: () => {
        this.Loading.show();
        api.fetchRandomCats().then(({ data }) => {
          this.setState({
            items: data,
            page: this.DEFAULT_PAGE,
          });
          this.Loading.hide();
        });
      },
    });

    this.banner = new Banner({ $target });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data.items,
      onClick: (cat) => {
        this.imageInfo.showDetail({
          visible: true,
          cat,
        });
      },

      onNextPage: () => {
        this.Loading.show();
        const keywordHistory =
          localStorage.getItem("keywordHistory") === null
            ? []
            : localStorage.getItem("keywordHistory").split(",");
        const lastKeyword = keywordHistory[0];
        const page = this.page + 1;
        api.fetchCats(lastKeyword, page).then(({ data }) => {
          let newData = this.data.concat(data);
          this.setState({
            items: newData,
            page: page,
          });
          this.Loading.hide();
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });

    this.init();
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData.items);
  }

  saveResult(result) {
    localStorage.setItem(`lastResult`, JSON.stringify(result));
  }

  init() {
    const lastResult =
      localStorage.getItem("lastResult") === null
        ? []
        : JSON.parse(localStorage.getItem("lastResult"));
    this.setState({
      items: lastResult,
      page: this.DEFAULT_PAGE,
    });
  }
}

export default App;

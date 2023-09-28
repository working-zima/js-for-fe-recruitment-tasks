import Empty from "./Empty.js";

class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick, onNextPage }) {
    const $wrapper = document.createElement("section");

    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "SearchResult";

    $target.appendChild($wrapper);
    $wrapper.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;
    this.onNextPage = onNextPage;

    this.Empty = new Empty({ $target: $wrapper });

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
    this.Empty.show(nextData);
  }

  listObserver = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      // 아이템이 화면에 보일 때
      if (item.isIntersecting) {
        item.target.querySelector("img").src =
          item.target.querySelector("img").dataset.src;

        // 마지막 요소를 찾아낸다
        // (target은 해당 li요소, 'data-어쩌구'로 지정된 요소는 'dataset.어쩌구' 불러올 수 있음)
        let dataIndex = Number(item.target.dataset.index);
        if (dataIndex + 1 === this.data.length) {
          this.onNextPage();
          // 마지막 요소라면 nextPage 호출
        }
      }
    });
  });

  render() {
    if (this.data === null || this.data.length === 0) {
      this.$searchResult.style.display = "none";
      return;
    }
    this.$searchResult.style.display = "grid";
    this.$searchResult.innerHTML = this.data
      .map(
        (cat, index) => `
          <li class="item" data-index=${index} >
            <img src="https://via.placeholder.com/200x300" data-src=${cat.url} alt=${cat.name} />
            <div class='content'>
              <div>${cat.name}</div>
            </div>
          </li>
        `
      )
      .join("");

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });

      this.listObserver.observe($item);
    });
  }
}

export default SearchResult;

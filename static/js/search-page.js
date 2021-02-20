function makeSearchPageResult(article) {
  return  $(`
    <div class="search-content">
    <div class="search-article-title">
    <h4><a class="url fn" href="${article.url}">${article.title}</a></h4>
    </div>
    <div class="post-info">
      <span>Posted</span>
      <span>on</span> 
      <span>${article.date}</span> 
      <span> in ${
        article.tags.map(function (tag, i) {
          return `<a href='${tag.url}'>${tag.name}</a> ${(i < article.tags.length - 1) ? '• ' : ''}`
        }).join(' ')
      }</span>
    </div>
    <div class='search-article-summary'>${article.summary}</div>
    </div>
`);
}

function makeSearchDropdownResult(article) {
  return $(`<li class='list-group-item'><a href='${article.url}'>${article.title}</a></li>`);
}

import lunr from "lunr";

// import 'jquery';
// import 'bootstrap';
import querystring from "query-string";

// Build index
// let lunrIndex = lunr(function () {
//   this.field("title");
//   this.field("summary");
//   this.field("tags");
//   this.ref('ref');
//   documents.forEach(function (doc) {
//     let idx = {
//       title: doc.title,
//       summary: doc.summary,
//       tags: doc.tags.map(function (tag) {
//         return tag.n
//       }),
//       ref: doc.ref
//     }
//     this.add(idx);
//   }, this);
// });

// Load Index

let lunrIndex = lunr.Index.load(lunrSerializedIdx);


function searchIndex(value, limit = 10) {
  if (value.length < 2) {
    return [];
  }
  if (!/[- :+~^*]/.test(value)) {
    value = `title:${value}^2 ${value} ${value}*`;
  }
  let lunrResults = lunrIndex.search(value);
  let results = [];
  for (const [n, hit] of lunrResults.entries()) {
    if (limit > 0 && n > limit) {
      break;
    }
    results.push(lunrDocuments[parseInt(hit.ref)])
  }
  return results;
}

function noResults($container) {
  $container.children('li').remove();
  $container.append(`<li class="list-group-item">No results.</li>`);
}

function renderSearchPage($container, formatter) {
  const query = querystring.parse(location.search).q;
  if (!query) {
    return noResults($container);
  }
  const searchResults = searchIndex(query, -1);
  $('h2 span').text(`for "${query}"`);
  $container.children('li').remove();

  for (const article of searchResults) {
    let html = formatter(article);
    $container.append(html);
  }

  if (searchResults.length === 0) {
    noResults($container);
  }
}

function dropdownSearch(dropdownFormatter, $container, $input) {

  $input.focus(function () {
    if ($(this).val().length > 2) {
      $input.dropdown('show');
    }
  });

  $input.keyup(function () {
    let value = $(this).val();
    const searchResults = searchIndex(value);

    $container.children().remove();
    for (const article of searchResults) {
      let html = dropdownFormatter(article);
      $container.append(html);
    }
    $input.dropdown(searchResults.length ? 'show' : 'hide');
  });

}

export {renderSearchPage, dropdownSearch};

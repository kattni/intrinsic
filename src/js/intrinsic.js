import {dropdownSearch, renderSearchPage} from './libs/search'

window.dropdownSearch = dropdownSearch;
window.renderSearchPage = renderSearchPage;

$(document).ready(() => {
  $.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
      return $(elem).text().replace("'", "").toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
  });
  $('#tag-input').keyup(function () {
    let value = $(this).val();
    if (value !== '') {
      value = value.replace("'", "")
      $('.tags-content').addClass('filtered');
      $(`.tag-group .tag-name:contains('${value}')`).parent('.tag-group').addClass('filter-match');
      $(`.tag-group .tag-name:not(:contains('${value}'))`).parent('.tag-group').removeClass('filter-match');
      $(`.list-of-tags li`).removeClass('selected').filter(`:contains('${value}')`).addClass('selected');
    } else {
      $('.tags-content').removeClass('filtered');
      $(`.list-of-tags li`).removeClass('selected');
    }
  });

  $('.list-of-tags a').click(function() {
    if ($('.list-of-tags li.selected').length === 1 && $(this).parent().hasClass('selected')) {
      $(this).removeClass('selected');
      $('#tag-input').val('').keyup();
    } else {
      $('#tag-input').val($(this).clone().children().remove().end().text()).keyup();
    }
    return false;
  });
})

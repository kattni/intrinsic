function filterList() {
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("tag-input");
  filter = input.value.toUpperCase();
  ul = document.getElementById("list-of-tags");
  li = ul.getElementsByTagName("#list-of-tags li");

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    let filters = filter.split(" ");
    filters = filters.filter((f) => f.length);

    let shouldDisplay = true;
    filters.forEach((filt) => {
      shouldDisplay = shouldDisplay && txtValue.toUpperCase().includes(filt);
    });

    li[i].style.display = shouldDisplay || filters.length === 0 ? "" : "none";
  }
}

if (document.getElementById("navbar-logout")) {
  document.getElementById("navbar-logout").addEventListener("click", e => {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/logout"
    })
      .done(function(data) {
        location.replace(`/`);
      })
      .fail(function(err) {
        alert(err);
      });
  });
}

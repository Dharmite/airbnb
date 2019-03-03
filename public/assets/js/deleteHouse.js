document.getElementById("deleteHouse").addEventListener("click", e => {
  e.preventDefault();
  $.ajax({
    type: "DELETE",
    url: `/rooms/${window.homeId}/`
  })
    .done(function(data) {
      console.log(data);
      location.replace(`/s/${data.name}/all`);
    })
    .fail(function(err) {
      console.log(err);
    });
});

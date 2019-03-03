document.getElementById("editHome").addEventListener("click", e => {
  e.preventDefault();
  $.ajax({
    type: "PUT",
    url: `/rooms/${roomId}/`,
    data: {
      name: document.getElementById("name").value,
      beds: document.getElementById("beds").value,
      price: document.getElementById("price").value,
      main_image: document.getElementById("main_image").value,
      description: document.getElementById("description").value
    }
  })
    .done(function(data) {
      location.replace(`/rooms/${homeId}`);
    })
    .fail(function(err) {
      console.log(err);
      alert(err);
    });
});

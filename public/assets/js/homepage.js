document.getElementById("sign-up").addEventListener("click", e => {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/register",
    data: {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    }
  })
    .done(function(data) {
      location.replace(`/profile`);
    })
    .fail(function(err) {
      document.getElementById("registerModalLabel").style.color = "red";
      document.getElementById("registerModalLabel").innerText =
        err.responseText;
    });
});

document.getElementById("login").addEventListener("click", e => {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/login",
    data: {
      username: document.getElementById("username-login").value,
      password: document.getElementById("password-login").value
    }
  })
    .done(function(data) {
      location.replace(`/profile`);
    })
    .fail(function(err) {
      document.getElementById("loginModalLabel").style.color = "red";
      document.getElementById("loginModalLabel").innerText = err.responseText;
    });
});

document.getElementById("logout").addEventListener("click", e => {
  e.preventDefault();

  $.ajax({
    type: "POST",
    url: "/logout"
  })
    .done(function(data) {
      location.reload();
    })
    .fail(function(err) {
      alert(err);
    });
});

exports.showHomepage = (req, res) => {
  const data = {
    where: req.query.city,
    indate: req.query.indate,
    outdate: req.query.outdate,
    hospedes: req.query.hospedes
  };

  res.render("homepage", { data });
};

exports.showHelp = (req, res) => {
  res.send("Welcome to help page");
};

const showHomepage = (req, res) => {
  const data = {
    where: req.query.city,
    indate: req.query.indate,
    outdate: req.query.outdate,
    hospedes: req.query.hospedes
  };

  res.render("homepage", { data });
};

const showHelp = (req, res) => {
  res.send("Welcome to help page");
};

module.exports = {
  showHomepage: showHomepage,
  showHelp: showHelp
};

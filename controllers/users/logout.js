const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Помилка при виході з системи" });
    }
    res.status(200).json({ message: "Вихід з системи пройшов успішно" });
  });
};

module.exports = {
  logout: logout,
};

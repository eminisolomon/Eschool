const userTokenPayload = (user) => {
  return { username: user.username, userId: user._id, role: user.role };
};

module.exports = userTokenPayload;

const hash = {
  SALT: process.env.SALT_PASSWORD,
  ITERATIONS: 2000,
  KEY_LEN: 64,
  DIGEST: 'sha512',
};

module.exports = { hash };

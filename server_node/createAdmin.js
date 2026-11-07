

require("dotenv").config();
const bcryptjs = require("bcryptjs");
const getDBObj = require("./APIs/DBConnection");

const ADMIN_ROLE = "8391"; // to client REACT_APP_ADMIN_ROLE

(async () => {
  const [email, password, name = "Admin"] = process.argv.slice(2);
  if (!email || !password) {
    console.error("Usage: node createAdmin.js <email> <password> [name]");
    process.exit(1);
  }

  const users = await getDBObj("userCollectionObject");
  const existing = await users.findOne({ email: email.toLowerCase() });
  if (existing) {
    console.error(`A user with ${email} already exists. Aborting.`);
    process.exit(1);
  }

  const hashed = await bcryptjs.hash(password, 6);
  await users.insertOne({
    name,
    email: email.toLowerCase(),
    password: hashed,
    role: ADMIN_ROLE,
    access: true,
  });

  console.log(`Admin user created: ${email} (role ${ADMIN_ROLE})`);
  process.exit(0);
})().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});

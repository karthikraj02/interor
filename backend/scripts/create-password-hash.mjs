import crypto from "node:crypto";
const password = process.argv[2];
if (!password || password.length < 12) { console.error("Use a password of at least 12 characters."); process.exit(1); }
const iterations = 210000; const salt = crypto.randomBytes(16).toString("hex"); const hash = crypto.pbkdf2Sync(password, salt, iterations, 64, "sha512").toString("hex");
console.log(`pbkdf2$${iterations}$${salt}$${hash}`);

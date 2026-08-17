import crypto from "node:crypto";

const cookieName = "interior_admin";
function secret() { if (!process.env.AUTH_SECRET || process.env.AUTH_SECRET.length < 32) throw new Error("AUTH_SECRET must be at least 32 characters."); return process.env.AUTH_SECRET; }
export function verifyPassword(password) {
  const [algorithm, iterations, salt, expected] = (process.env.ADMIN_PASSWORD_HASH ?? "").split("$");
  if (algorithm !== "pbkdf2" || !iterations || !salt || !expected) return false;
  const derived = crypto.pbkdf2Sync(password, salt, Number(iterations), 64, "sha512").toString("hex");
  const derivedBuffer = Buffer.from(derived, "hex"); const expectedBuffer = Buffer.from(expected, "hex");
  return derivedBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(derivedBuffer, expectedBuffer);
}
export function setAdminCookie(res) {
  const payload = Buffer.from(JSON.stringify({ email: process.env.ADMIN_EMAIL, exp: Date.now() + 8 * 60 * 60 * 1000 })).toString("base64url"); const signature = crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
  res.cookie(cookieName, `${payload}.${signature}`, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 8 * 60 * 60 * 1000, path: "/" });
}
export function clearAdminCookie(res) { res.clearCookie(cookieName, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/" }); }
export function requireAdmin(req, res, next) {
  const token = req.headers.cookie?.split(";").map((item) => item.trim()).find((item) => item.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1); if (!token) return res.status(401).json({ ok: false, error: "Authentication required." });
  const [payload, signature] = token.split("."); const valid = crypto.createHmac("sha256", secret()).update(payload).digest("base64url"); if (!signature || signature.length !== valid.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(valid))) return res.status(401).json({ ok: false, error: "Invalid session." });
  try { const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")); if (session.exp < Date.now() || session.email !== process.env.ADMIN_EMAIL) throw new Error(); req.admin = session; return next(); } catch { return res.status(401).json({ ok: false, error: "Session expired." }); }
}

import assert from "node:assert/strict";
import crypto from "node:crypto";
import test from "node:test";
import { verifyPassword } from "../src/auth.js";

function hash(password) { const salt = "test-salt"; const value = crypto.pbkdf2Sync(password, salt, 210000, 64, "sha512").toString("hex"); return `pbkdf2$210000$${salt}$${value}`; }
test("accepts the configured PBKDF2 password", () => { process.env.ADMIN_PASSWORD_HASH = hash("a-long-test-password"); assert.equal(verifyPassword("a-long-test-password"), true); });
test("rejects an incorrect or malformed password hash", () => { process.env.ADMIN_PASSWORD_HASH = hash("a-long-test-password"); assert.equal(verifyPassword("wrong-password"), false); process.env.ADMIN_PASSWORD_HASH = "invalid"; assert.equal(verifyPassword("a-long-test-password"), false); });

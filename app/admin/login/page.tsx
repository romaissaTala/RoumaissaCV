"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Remplissez tous les champs.");
      return;
    }
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Identifiants incorrects.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--dark-bg)" }}>
      <div
        className="w-full max-w-sm rounded-2xl p-8"
        style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)" }}
      >
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.3)" }}
          >
            <span style={{ fontSize: "24px" }}>🔐</span>
          </div>
          <h1 className="text-xl font-bold text-white">Administration</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Connectez-vous pour gérer votre CV
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="cv-input"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="cv-input"
          />

          {error && (
            <p className="text-sm text-center" style={{ color: "#e05555" }}>
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-50"
            style={{
              background: "var(--gold)",
              color: "#1A1A1A",
            }}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </div>
      </div>
    </div>
  );
}

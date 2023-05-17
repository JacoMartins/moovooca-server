import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";
import { Usuario } from "../types/api/usuario";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import Router from "next/router";
import { AuthContextData, AuthCredenciais, AuthProviderProps } from "../types/contexts/AuthContext";

export const AuthContext = createContext({} as AuthContextData);

export function reload() {
  Router.push('/');
  window.location.href = '/';
}

export function logout() {
  destroyCookie(undefined, '__session');
  destroyCookie(undefined, '__session_refresh');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<Usuario>();
  const [autenticado, setAutenticado] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const {'__session': token} = parseCookies();

    if (token) {
      api.get('/me')
      .then(res => {
        setUsuario(res.data);
        setAutenticado(true);
      })
      .catch(() => {
        logout()
      });
    }
  }, []);

  async function auth({ identificador, senha }: AuthCredenciais) {
    try {
      setBusy(true)

      const {token, refresh_token} = await api.post('/auth', {
        identificador,
        senha
      }).then(res => res.data);

      setBusy(false)

      setCookie(undefined, '__session', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      });

      setCookie(undefined, '__session_refresh', refresh_token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      reload()
    } catch (err) {
      setBusy(false)
    }
  }

  return (
    <AuthContext.Provider value={{ auth, autenticado, usuario, reload, busy }}>
      {children}
    </AuthContext.Provider>
  )
}
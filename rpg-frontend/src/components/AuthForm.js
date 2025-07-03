import React, { useState } from 'react';

export default function AuthForm({ onSubmit, isRegister = false }) {
    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegister) {
            onSubmit({
                nome: form.nome,
                email: form.email,
                senha: form.senha
            });
        } else {
            onSubmit({
                email: form.email,
                senha: form.senha
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {isRegister && (
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
            )}
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Senha:</label>
                <input
                    type="password"
                    name="senha"
                    value={form.senha}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Cadastrar</button>
            <button type="submit">Entrar</button>
        </form>
    );
}

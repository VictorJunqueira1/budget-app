import { NavigationMenuMain } from '@/components/NavigationMenu';
import React, { useState, useEffect } from 'react';

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [newCategory, setNewCategory] = useState<string>('');
    const [editingCategory, setEditingCategory] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:5000/categories');
            if (!response.ok) throw new Error('Erro ao buscar categorias.');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
            setError('Erro ao buscar categorias.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!newCategory.trim()) {
            setError('O nome da categoria é obrigatório.');
            return;
        }

        try {
            const method = editingCategory ? 'PUT' : 'POST';
            const endpoint = editingCategory
                ? `http://localhost:5000/categories/${encodeURIComponent(editingCategory)}`
                : 'http://localhost:5000/categories';

            const body = editingCategory
                ? JSON.stringify({ newName: newCategory }) // Enviando novo nome para PUT
                : JSON.stringify({ name: newCategory });

            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao adicionar/editar a categoria.');
            }

            setNewCategory('');
            setEditingCategory(null);
            setError(null);
            fetchCategories();
            alert('Categoria salva com sucesso!');
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message || 'Erro ao adicionar/editar a categoria.');
            } else {
                setError('Erro desconhecido ao adicionar/editar a categoria.');
            }
        }
    };

    const handleEdit = (name: string) => {
        setNewCategory(name);
        setEditingCategory(name);
    };

    const handleDelete = async (name: string) => {
        if (window.confirm('Tem certeza de que deseja excluir esta categoria?')) {
            try {
                const response = await fetch(`http://localhost:5000/categories/${encodeURIComponent(name)}`, {
                    method: 'DELETE',
                });

                if (!response.ok) throw new Error('Erro ao excluir a categoria.');

                fetchCategories();
                alert('Categoria excluída com sucesso!');
            } catch (error) {
                console.error('Erro ao excluir a categoria:', error);
                setError('Erro ao excluir a categoria.');
            }
        }
    };

    return (
        <div className="p-10 mx-auto max-w-7xl">
            <NavigationMenuMain />
            <h1 className="text-2xl font-bold mb-5">Categorias</h1>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <>
                    <form onSubmit={handleSubmit} className="mb-8 space-y-4">
                        <div>
                            <label className="block mb-2">Nome da Categoria</label>
                            <input
                                type="text"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                className="border p-2 w-full"
                            />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 duration-300">
                            {editingCategory ? 'Atualizar' : 'Adicionar'}
                        </button>
                    </form>

                    {categories.length > 0 ? (
                        <ul className="space-y-2">
                            {categories.map((cat) => (
                                <li key={cat} className="flex justify-between items-center bg-gray-100 p-2 rounded-lg shadow">
                                    <span>{cat}</span>
                                    <div className="space-x-2">
                                        <button
                                            onClick={() => handleEdit(cat)}
                                            className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cat)}
                                            className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Não há categorias disponíveis.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default Categories;
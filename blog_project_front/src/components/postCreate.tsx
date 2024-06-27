import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostCreate: React.FC = () => {

    const navigate = useNavigate();

    const redirectToPostList = () => {
        navigate('/post');
    };

    const redirectToErrorPage = () => {
        navigate('/error');
    };

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: ''
    });

    const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
    };

    const sendRequest = async () => {
        try {
            const request = await axios.post('http://127.0.0.1:8000/api/post/post', formData);
            redirectToPostList();
        } catch (error) {
            console.error('Error en la creación del post:', error);
            redirectToErrorPage();
        }
    };

    const createPost = (e: any) => {
        e.preventDefault();
        console.log('Datos del formulario: ', JSON.stringify(formData));
        sendRequest();
    };

    return (
        <form onSubmit={createPost} className="max-w-sm mx-auto">
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">Post</label>
                <input name="title" value={formData.title} onChange={handleInputChange} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Titulo de tu post" required />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">Autor</label>
                <input name="author" value={formData.author} onChange={handleInputChange} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <label className="block mb-2 text-sm font-medium text-gray-900 ">Contenido</label>
            <textarea name="content" value={formData.content} onChange={handleInputChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Escribe tu contenido acá..." required></textarea>

            <button type="submit" className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Crear</button>
        </form>
    );
}

export default PostCreate;
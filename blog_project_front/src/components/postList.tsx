import React, { useEffect, useState } from "react"
import axios from 'axios';
import { Link } from "react-router-dom";
import { postInterface } from "../interface/post.interface";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PostList: React.FC = () => {
    const [data, setData] = useState<postInterface[]>([]);

    useEffect(() => {
        const getPostData = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/post/get');
            setData(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        getPostData();
      }, []);
      console.log('Los datos son: ', data);
    return (
        <div>
            <h2 className="text-4xl font-extrabold">Lista de post's</h2>
            <div className="... flex items-center justify-center">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                              <th scope="col" className="px-6 py-3">
                                  Title
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Content
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Author
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Created at
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  <span className="sr-only">Edit</span>
                              </th>
                          </tr>
                      </thead>
                      <tbody>      
                          {data.map((item, index) => (
                          <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.title}
                              </th>
                              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.content}
                              </th>
                              <td className="px-6 py-4">
                                {item.author}
                              </td>
                              <td className="px-6 py-4">
                                {item.created_at}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <Link to={`/post/${item.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Detalle</Link>
                              </td>
                          </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
            </div>
        </div>
    );
}

export default PostList
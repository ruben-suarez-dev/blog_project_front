import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postInterface } from "../interface/post.interface";
import axios from "axios";

const PostFilter: React.FC = () => {
    let { id } = useParams<{ id: string }>();

    const [data, setData] = useState<postInterface[]>([]);

    const navigate = useNavigate();

    const redirectToErrorPage = () => {
        navigate('/error');
    };

    useEffect(() => {
        const getPostData = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/post/' + id + '/get');
            setData(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
            redirectToErrorPage();
          }
        };
    
        getPostData();
      }, []);
    
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
                          </tr>
                      </thead>
                      <tbody>      
                          {data.map((item, index) => (
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                          </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
            </div>
        </div>
    );
}

export default PostFilter;
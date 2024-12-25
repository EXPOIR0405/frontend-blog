'use client';

import { useEffect, useState } from 'react';
import api from '@/app/api/axios';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  author: {
    username: string;
  } | null;
  tag: string;
  thumbnail: string;
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts/');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map(post => (
        <Link href={`/blog/${post.id}`} key={post.id}>
          <article className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            {/* 태그 */}
            <div className="px-4 pt-4">
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-600">
                {post.tag || '일반'}
              </span>
            </div>
            
            {/* 썸네일 이미지 */}
            <div className="aspect-video overflow-hidden mt-4">
              <img 
                src={post.thumbnail || '/default-thumbnail.jpg'} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* 컨텐츠 */}
            <div className="p-4">
              <h3 className="text-xl font-medium mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {post.content}
              </p>
              
              {/* 작성자 정보와 날짜 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm text-gray-700">
                    {post.author ? post.author.username : '익명'}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
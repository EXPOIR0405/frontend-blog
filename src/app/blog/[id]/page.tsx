'use client';

import { useEffect, useState } from 'react';
import { getPost, getPosts } from '@/app/api/posts';
import type { Post } from '@/app/api/posts';
import api from '@/app/api/axios';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Comment {
  id: number;
  content: string;
  created_at: string;
  author: {
    username: string;
  };
}

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const postId = params?.id as string;
  
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postResponse, postsResponse] = await Promise.all([
          getPost(parseInt(postId)),
          getPosts()
        ]);
        
        setPost(postResponse.data);
        setComments(postResponse.data.comments || []);
        
        // 현재 게시글을 제외한 최근 게시글 3개를 가져옵니다
        const otherPosts = postsResponse.data
          .filter((p: Post) => p.id !== parseInt(postId))
          .slice(0, 3);
        setRelatedPosts(otherPosts);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !postId) return;

    try {
      const response = await api.post('/comments/', {
        content: newComment,
        post: postId
      });

      setComments(prev => [...prev, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('댓글 작성에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await api.delete(`/posts/${postId}/`);
      router.push('/');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <article className="mb-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              삭제
            </button>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>작성자: {post.author ? post.author.username : '익명'}</span>
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        {post.thumbnail && (
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-auto mb-4 rounded-lg"
          />
        )}
        <div className="prose max-w-none">
          {post.content}
        </div>
        {post.tag && (
          <div className="mt-4">
            <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
              {post.tag}
            </span>
          </div>
        )}
      </article>

      {/* 댓글 섹션 */}
      <section className="mt-8 mb-12">
        <h2 className="text-2xl font-bold mb-4">댓글</h2>
        
        {/* 댓글 작성 폼 */}
        <form onSubmit={handleCommentSubmit} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded-lg mb-2"
            rows={3}
            placeholder="댓글을 작성해주세요"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            댓글 작성
          </button>
        </form>

        {/* 댓글 목록 */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-4">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">
                  {comment.author ? comment.author.username : '익명'}
                </span>
                <span className="text-gray-500">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 다른 게시글 목록 */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">다른 게시글</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPosts.map((relatedPost) => (
            <Link 
              href={`/blog/${relatedPost.id}`} 
              key={relatedPost.id}
              className="block group"
            >
              <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {relatedPost.thumbnail && (
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={relatedPost.thumbnail}
                      alt={relatedPost.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {relatedPost.content.slice(0, 100)}...
                  </p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{relatedPost.author ? relatedPost.author.username : '익명'}</span>
                    <span>{new Date(relatedPost.created_at).toLocaleDateString()}</span>
                  </div>
                  {relatedPost.tag && (
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2">
                      {relatedPost.tag}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
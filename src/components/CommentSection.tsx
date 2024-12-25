'use client'
import { useState } from 'react'

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: '김개발',
      content: '정말 좋은 글이네요! AI에 대해 많이 배웠습니다.',
      date: '2024/01/20'
    },
    {
      id: '2',
      author: '이코딩',
      content: '실제 현장에서도 비슷한 경험을 했습니다.',
      date: '2024/01/21'
    }
  ])
  const [newComment, setNewComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: '익명',  // 실제로는 로그인된 사용자 정보를 사용
      content: newComment,
      date: new Date().toLocaleDateString()
    }

    setComments(prev => [...prev, comment])
    setNewComment('')
  }

  return (
    <section className="border-t pt-8">
      <h2 className="text-2xl font-bold mb-8">댓글</h2>

      {/* 댓글 작성 폼 */}
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 작성해주세요"
          className="w-full p-4 border rounded-lg resize-none h-32 focus:outline-none focus:ring-1 focus:ring-gray-200"
        />
        <div className="flex justify-end mt-2">
          <button 
            type="submit"
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            댓글 작성
          </button>
        </div>
      </form>

      {/* 댓글 목록 */}
      <div className="space-y-6">
        {comments.map(comment => (
          <div key={comment.id} className="border-b pb-6">
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium">{comment.author}</span>
              <span className="text-sm text-gray-500">{comment.date}</span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
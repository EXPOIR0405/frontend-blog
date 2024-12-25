export default function Footer() {
    return (
      <footer className="border-t mt-12">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium mb-2">개발 블로그</h3>
              <p className="text-sm text-gray-600">개발 지식과 경험을 공유합니다</p>
            </div>
            <div className="text-sm text-gray-600">
              <p>© 2024 All rights reserved.</p>
              <p className="mt-1">Built with Next.js</p>
            </div>
          </div>
        </div>
      </footer>
    )
  }
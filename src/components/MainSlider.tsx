'use client'
import { useState, useEffect } from 'react'

const slides = [
  {
    title: "알고리즘 스터디",
    description: "매일 한 개씩 알고리즘 문제를 풀어보며 성장하는 과정을 기록합니다.",
    image: "/algorithm.jpg"
  },
  {
    title: "웹 개발 프로젝트",
    description: "React와 Next.js를 활용한 실전 프로젝트 경험을 공유합니다.",
    image: "/web-dev.jpg"
  },
  {
    title: "CS 지식 정리",
    description: "면접 준비를 위한 CS 핵심 개념들을 정리합니다.",
    image: "/cs.jpg"
  }
]

export default function MainSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[400px] mb-12">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide absolute w-full h-full ${
            index === currentSlide ? 'active' : ''
          }`}
        >
          <div className="bg-gray-100 p-8 rounded-lg h-full">
            <h2 className="text-2xl mb-4">{slide.title}</h2>
            <p>{slide.description}</p>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? 'bg-gray-800' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
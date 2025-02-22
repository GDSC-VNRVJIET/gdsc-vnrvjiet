"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import "./FireWorks.css"

interface Team {
  teamName: string
  rank: number
}

const FireworksCanvas: React.FC = () => {
  const [details, setDetails] = useState<Team[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  async function getDetails() {
    const res = await axios.get(`${process.env.REACT_APP_BACK_URL}/campus/final-leaderboard`)
    console.log(res.data.data)
    const topThreeTeams = res.data.data.slice(0, 3).map((team: any, index: number) => ({
      teamName: team.teamName,
      rank: index + 1,
    }))
    setDetails(topThreeTeams)
    console.log(details)
  }

  useEffect(() => {
    getDetails()
  }, [])

  useEffect(() => {
    const canvas: any = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const fireRocketsArray: FireRocket[] = []
    const fireRocketsSparklesArray: FireRocketSparkle[] = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth 
      canvas.height = window.innerHeight - 1
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    class FireRocket {
      x: number
      y: number
      color: string
      size: number
      speedY: number
      crackRocketY: number

      constructor() {
        this.x = Math.floor(Math.random() * window.innerWidth)
        this.y = window.innerHeight
        this.color = `hsl(${Math.floor(Math.random() * 360)},70%,50%)`
        this.size = Math.floor(Math.random() * 5 + 5)
        this.speedY = Math.random() * 5 + 5
        this.crackRocketY = Math.floor(window.innerHeight - (Math.random() * window.innerHeight + 100))
      }

      update() {
        this.y -= this.speedY
      }

      draw() {
        if (!context) return
        context.fillStyle = this.color
        context.beginPath()
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        context.fill()
      }
    }

    class FireRocketSparkle {
      x: number
      y: number
      color: string
      size: number
      speedY: number
      speedX: number
      velocity: number

      constructor(x: number, y: number, color: string) {
        this.x = x
        this.y = y
        this.color = color
        this.size = Math.floor(Math.random() * 3 + 6)
        this.speedY = Math.random() * 2 - 2
        this.speedX = Math.round((Math.random() - 0.5) * 10)
        this.velocity = Math.random() / 5
      }

      update() {
        if (this.size > 0.2) {
          this.size -= 0.1
        }
        this.y += this.speedY
        this.x += this.speedX
        this.speedY += this.velocity
      }

      draw() {
        if (!context) return
        context.fillStyle = this.color
        context.beginPath()
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        context.fill()
      }
    }

    function renderFireRockets() {
      for (let i = 0; i < fireRocketsArray.length; i++) {
        fireRocketsArray[i].draw()
        fireRocketsArray[i].update()
        if (fireRocketsArray[i].y <= fireRocketsArray[i].crackRocketY) {
          for (let index = 0; index < 20; index++) {
            fireRocketsSparklesArray.push(
              new FireRocketSparkle(fireRocketsArray[i].x, fireRocketsArray[i].y, fireRocketsArray[i].color),
            )
          }
          fireRocketsArray.splice(i, 1)
          i--
        }
      }
    }

    function renderFireRocketsSparkles() {
      for (let i = 0; i < fireRocketsSparklesArray.length; i++) {
        fireRocketsSparklesArray[i].draw()
        fireRocketsSparklesArray[i].update()
        if (fireRocketsSparklesArray[i].size <= 0.2) {
          fireRocketsSparklesArray.splice(i, 1)
          i--
        }
      }
    }

    function animate() {
      if (!context) return
      context.fillStyle = `rgba(24,28,31,.2)`
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.fillStyle = `white`
      renderFireRockets()
      renderFireRocketsSparkles()
      requestAnimationFrame(animate)
    }

    animate()

    const interval = setInterval(() => {
      for (let i = 0; i < 4; i++) {
        fireRocketsArray.push(new FireRocket())
      }
    }, 600)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="fireworks-container">
      <canvas ref={canvasRef} id="canvas"></canvas>
      <div className="leaderboard">
        <h2 className="leaderboard-title">CAMS Leaderboard</h2>
        <ul className="leaderboard-list">
          
            <li className="leaderboard-item">
              <span className="rank">1</span>
              <span className="team-name">Innovate & Excel</span>
            </li>
            <li className="leaderboard-item">
              <span className="rank">2</span>
              <span className="team-name">Ternary Coders</span>
            </li>
            <li className="leaderboard-item">
              <span className="rank">3</span>
              <span className="team-name">VJ Bus</span>
            </li>
         
        </ul>
      </div>
    </div>
  )
}

export default FireworksCanvas
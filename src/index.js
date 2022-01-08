const sectors = [
    { color: '#00FFFF', label: 'Leftovers' },
    { color: '#0080FF', label: 'Chinese' },
    { color: '#0000FF', label: 'Thai' },
    { color: '#8000FF', label: 'Italian' },
    { color: '#FF00FF', label: 'Ask BFF' },
    { color: '#FF00B3', label: 'Japanese' },
    { color: '#FF0080', label: 'Indonesian' },
    { color: '#FF0000', label: 'Vietnamese' },
    { color: '#FF8000', label: 'Mexican' },
    { color: '#FFFF00', label: 'Indian' },
    { color: '#E6FF00', label: 'Malaysian' },
    { color: '#80FF00', label: 'Fast Food' },
    { color: '#00FF80', label: 'Korean' }
]

const rand = (m, M) => Math.random() * (M - m) + m
const tot = sectors.length
const spinEl = document.querySelector('#spin')
const ctx = document.querySelector('#wheel').getContext('2d')
const dia = ctx.canvas.width
const rad = dia / 2
const PI = Math.PI
const TAU = 2 * PI
const arc = TAU / sectors.length

const friction = 0.991 // 0.995=soft, 0.99=mid, 0.98=hard
let angVel = 0 // Angular velocity
let ang = 0 // Angle in radians

const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot

function drawSector(sector, i) {
    const ang = arc * i
    ctx.save()
    // COLOR
    ctx.beginPath()
    ctx.fillStyle = sector.color
    ctx.moveTo(rad, rad)
    ctx.arc(rad, rad, rad, ang, ang + arc)
    ctx.lineTo(rad, rad)
    ctx.fill()
    // TEXT
    ctx.translate(rad, rad)
    ctx.rotate(ang + arc / 2)
    ctx.textAlign = 'right'
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 30px sans-serif'
    ctx.fillText(sector.label, rad - 10, 10)
    //
    ctx.restore()
}

function rotate() {
    const sector = sectors[getIndex()]
    ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`
    spinEl.textContent = !angVel ? 'SPIN' : sector.label
    spinEl.style.background = sector.color
    return sector.label
}

function frame() {
    if (!angVel) return
    angVel *= friction // Decrement velocity by friction
    if (angVel < 0.002) angVel = 0 // Bring to stop
    ang += angVel // Update angle
    ang %= TAU // Normalize angle
    document.querySelector('span#result').innerText = rotate()
}

function engine() {
    frame()
    requestAnimationFrame(engine)
}

function init() {
    sectors.forEach(drawSector)
    rotate() // Initial rotation
    engine() // Start engine
    spinEl.addEventListener('click', () => {
        if (!angVel) angVel = rand(0.25, 0.45)
    })
}

init()
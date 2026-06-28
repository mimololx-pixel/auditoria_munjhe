import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/*
 * Detalle 3D de la portada (solo presentación): un icosaedro low-poly con satélites
 * orbitando y un campo de partículas, en la paleta del sitio (cian + índigo). Gira
 * suavemente y reacciona al mouse (parallax). Se carga de forma diferida (lazy) desde
 * Inicio. Respeta prefers-reduced-motion y libera todos los recursos al desmontar.
 */
export default function Hero3D({ className = '' }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ancho = mount.clientWidth || 400
    const alto = mount.clientHeight || ancho * 0.75

    const escena = new THREE.Scene()
    const camara = new THREE.PerspectiveCamera(45, ancho / alto, 0.1, 100)
    camara.position.z = 4.4

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(ancho, alto)
    mount.appendChild(renderer.domElement)

    const grupo = new THREE.Group()
    escena.add(grupo)

    // Núcleo: icosaedro sólido (cian) con aristas resaltadas (índigo)
    const geo = new THREE.IcosahedronGeometry(1.3, 0)
    const mat = new THREE.MeshStandardMaterial({ color: 0x16bac5, flatShading: true, roughness: 0.45, metalness: 0.15 })
    const malla = new THREE.Mesh(geo, mat)
    const aristasGeo = new THREE.WireframeGeometry(geo)
    const aristasMat = new THREE.LineBasicMaterial({ color: 0x5863f8, transparent: true, opacity: 0.55 })
    const aristas = new THREE.LineSegments(aristasGeo, aristasMat)
    malla.add(aristas)
    grupo.add(malla)

    // Satélites orbitando
    const satGeo = new THREE.OctahedronGeometry(0.18, 0)
    const satMat = new THREE.MeshStandardMaterial({ color: 0x5fbff9, flatShading: true, roughness: 0.3 })
    const satelites = [0, 1, 2].map((i) => {
      const s = new THREE.Mesh(satGeo, satMat)
      s.userData = { r: 2.1 + i * 0.35, vel: 0.4 + i * 0.25, fase: (i * Math.PI * 2) / 3, incl: i * 0.5 }
      grupo.add(s)
      return s
    })

    // Campo de partículas
    const N = 90
    const pos = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 9
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5
    }
    const partGeo = new THREE.BufferGeometry()
    partGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const partMat = new THREE.PointsMaterial({ color: 0x16bac5, size: 0.05, transparent: true, opacity: 0.6 })
    const particulas = new THREE.Points(partGeo, partMat)
    escena.add(particulas)

    // Iluminación
    const luzClave = new THREE.DirectionalLight(0xffffff, 2.2)
    luzClave.position.set(3, 4, 5)
    escena.add(luzClave)
    const luzRelleno = new THREE.DirectionalLight(0x5fbff9, 1.2)
    luzRelleno.position.set(-4, -2, 2)
    escena.add(luzRelleno)
    escena.add(new THREE.AmbientLight(0xffffff, 0.6))

    // Parallax con el mouse
    const objetivo = { x: 0, y: 0 }
    const onMove = (e) => {
      objetivo.x = (e.clientX / window.innerWidth - 0.5) * 0.6
      objetivo.y = (e.clientY / window.innerHeight - 0.5) * 0.6
    }
    if (!reduce) window.addEventListener('pointermove', onMove)

    let raf
    const reloj = new THREE.Clock()
    const render = () => {
      const t = reloj.getElapsedTime()
      malla.rotation.x += 0.003
      malla.rotation.y += 0.005
      satelites.forEach((s) => {
        const a = t * s.userData.vel + s.userData.fase
        s.position.set(
          Math.cos(a) * s.userData.r,
          Math.sin(a) * s.userData.r * Math.sin(s.userData.incl),
          Math.sin(a) * s.userData.r * Math.cos(s.userData.incl),
        )
        s.rotation.x = s.rotation.y = a
      })
      particulas.rotation.y = t * 0.03
      // Suaviza la rotación del grupo hacia el objetivo del mouse
      grupo.rotation.y += (objetivo.x - grupo.rotation.y) * 0.05
      grupo.rotation.x += (objetivo.y - grupo.rotation.x) * 0.05
      renderer.render(escena, camara)
      raf = requestAnimationFrame(render)
    }
    if (reduce) {
      malla.rotation.set(0.4, 0.6, 0)
      renderer.render(escena, camara)
    } else {
      render()
    }

    const onResize = () => {
      const w = mount.clientWidth || 400
      const h = mount.clientHeight || w * 0.75
      camara.aspect = w / h
      camara.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
      geo.dispose(); mat.dispose()
      aristasGeo.dispose(); aristasMat.dispose()
      satGeo.dispose(); satMat.dispose()
      partGeo.dispose(); partMat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className={className} style={{ width: '100%', aspectRatio: '4 / 3' }} aria-hidden="true" />
}

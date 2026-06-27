import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/*
 * Detalle 3D de la portada (solo presentación): un icosaedro low-poly que gira
 * suavemente, en la paleta del sitio (cian + índigo). Se carga de forma diferida
 * (lazy) desde Inicio para no engordar el bundle inicial del resto de secciones.
 * Respeta prefers-reduced-motion y libera todos los recursos al desmontar.
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
    camara.position.z = 4

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(ancho, alto)
    mount.appendChild(renderer.domElement)

    // Icosaedro sólido (cian) con aristas resaltadas (índigo)
    const geo = new THREE.IcosahedronGeometry(1.35, 0)
    const mat = new THREE.MeshStandardMaterial({ color: 0x16bac5, flatShading: true, roughness: 0.45, metalness: 0.1 })
    const malla = new THREE.Mesh(geo, mat)
    const aristas = new THREE.LineSegments(
      new THREE.WireframeGeometry(geo),
      new THREE.LineBasicMaterial({ color: 0x5863f8, transparent: true, opacity: 0.55 }),
    )
    malla.add(aristas)
    escena.add(malla)

    // Iluminación (clave + relleno azul claro + ambiente)
    const luzClave = new THREE.DirectionalLight(0xffffff, 2.2)
    luzClave.position.set(3, 4, 5)
    escena.add(luzClave)
    const luzRelleno = new THREE.DirectionalLight(0x5fbff9, 1.1)
    luzRelleno.position.set(-4, -2, 2)
    escena.add(luzRelleno)
    escena.add(new THREE.AmbientLight(0xffffff, 0.6))

    let raf
    const animar = () => {
      malla.rotation.x += 0.004
      malla.rotation.y += 0.006
      renderer.render(escena, camara)
      raf = requestAnimationFrame(animar)
    }
    if (reduce) {
      malla.rotation.set(0.4, 0.6, 0)
      renderer.render(escena, camara)
    } else {
      animar()
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
      geo.dispose()
      mat.dispose()
      aristas.geometry.dispose()
      aristas.material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className={className} style={{ width: '100%', aspectRatio: '4 / 3' }} aria-hidden="true" />
}

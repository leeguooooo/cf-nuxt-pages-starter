<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, Vector3, CatmullRomCurve3 } from 'three'
import { OrbitControls, Stars, MouseParallax, Levioso, Environment } from '@tresjs/cientos'
import { shallowRef, onMounted, onUnmounted } from 'vue'

const gl = {
  clearColor: '#0b1121',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

// Leo Constellation Stars (Volumetric - added Z depth)
const starsData = [
  { name: 'Regulus', pos: [0, -0.5, 0.5], size: 0.25, color: '#38bdf8' }, // Heart (Front)
  { name: 'Algieba', pos: [0.8, 0.8, -0.2], size: 0.2, color: '#fbbf24' }, // Neck (Mid)
  { name: 'Adhafera', pos: [0.4, 1.8, -0.5], size: 0.15, color: '#ffffff' }, // Mane (Back)
  { name: 'Rasalas', pos: [-0.5, 2.0, 0.2], size: 0.15, color: '#ffffff' }, // Head (Mid-Front)
  { name: 'Algenubi', pos: [-1.2, 1.2, 0.8], size: 0.15, color: '#ffffff' }, // Nose (Very Front)
  { name: 'Zosma', pos: [3.0, 0.8, -0.8], size: 0.18, color: '#ffffff' }, // Hip (Far Back)
  { name: 'Chertan', pos: [3.2, -0.5, 0.3], size: 0.18, color: '#ffffff' }, // Rear Flank (Mid)
  { name: 'Denebola', pos: [4.5, 0.2, -0.2], size: 0.2, color: '#a5b4fc' }, // Tail (Mid)
]

const connections = [
  [0, 1], [1, 2], [2, 3], [3, 4], [1, 5], [0, 6], [5, 6], [5, 7]
]

const tubes = connections.map(([startIdx, endIdx]) => {
  const start = new Vector3(...starsData[startIdx].pos)
  const end = new Vector3(...starsData[endIdx].pos)
  return new CatmullRomCurve3([start, end])
})

// Data Dust (Particles)
const dustCount = 150
const dustParticles = Array.from({ length: dustCount }).map(() => {
  const x = (Math.random() - 0.5) * 15
  const y = (Math.random() - 0.5) * 10
  const z = (Math.random() - 0.5) * 10
  return [x, y, z]
})

const groupRef = shallowRef(null)
let animationFrameId: number

const animate = () => {
  if (groupRef.value) {
    // Subtle overall rotation
    groupRef.value.rotation.y += 0.001
  }
  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  animate()
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0, 10]" :fov="45" :look-at="[1.5, 0.5, 0]" />
    <MouseParallax :factor="1" :ease="3" />
    <OrbitControls enable-zoom="false" enable-pan="false" />
    
    <!-- Lighting & Environment -->
    <TresAmbientLight :intensity="0.5" />
    <TresPointLight :position="[10, 10, 10]" :intensity="2" color="#38bdf8" />
    <TresPointLight :position="[-10, -5, 5]" :intensity="2" color="#f472b6" />
    <Environment preset="city" :blur="1" :background="false" />

    <!-- Floating Group -->
    <Levioso :speed="1" :rotation-factor="0.5" :float-factor="0.2">
      <TresGroup ref="groupRef" :position="[-1.5, 0, 0]">
        
        <!-- Crystal Stars -->
        <TresMesh v-for="(star, index) in starsData" :key="star.name" :position="star.pos">
          <TresIcosahedronGeometry :args="[star.size, 1]" />
          <TresMeshPhysicalMaterial 
            :color="star.color" 
            :transmission="1"
            :thickness="1.5"
            :roughness="0"
            :metalness="0.2"
            :ior="1.5"
            :clearcoat="1"
            :attenuation-color="'#ffffff'"
            :attenuation-distance="0.5"
          />
        </TresMesh>

        <!-- Laser Lines -->
        <TresMesh v-for="(curve, index) in tubes" :key="`line-${index}`">
          <TresTubeGeometry :args="[curve, 64, 0.01, 8, false]" />
          <TresMeshBasicMaterial color="#60a5fa" :transparent="true" :opacity="0.6" />
        </TresMesh>

      </TresGroup>
    </Levioso>

    <!-- Data Dust -->
    <TresGroup>
      <TresMesh v-for="(pos, index) in dustParticles" :key="`dust-${index}`" :position="pos">
        <TresSphereGeometry :args="[0.02, 4, 4]" />
        <TresMeshBasicMaterial color="#ffffff" :transparent="true" :opacity="0.4" />
      </TresMesh>
    </TresGroup>
    
    <Stars :radius="80" :depth="50" :count="5000" :size="0.1" :size-attenuation="true" />
  </TresCanvas>
</template>

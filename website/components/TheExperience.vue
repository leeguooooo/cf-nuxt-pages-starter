<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, Vector3, MathUtils } from 'three'
import { OrbitControls } from '@tresjs/cientos'
import { shallowRef, onMounted, onUnmounted, ref } from 'vue'
import { useMouse, useWindowSize } from '@vueuse/core'

const gl = {
  clearColor: '#e4e0ba', // Creamy beige background (Original style)
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

// Mouse tracking
const { x, y } = useMouse()
const { width, height } = useWindowSize()

// Refs
const headRef = shallowRef(null)
const maneRefs = ref([])
const leftEyeRef = shallowRef(null)
const rightEyeRef = shallowRef(null)
const leftIrisRef = shallowRef(null)
const rightIrisRef = shallowRef(null)
const leftEarRef = shallowRef(null)
const rightEarRef = shallowRef(null)

// Accurate Colors (Chill The Lion Palette)
const colors = {
  body: '#ffc400', // Warm Yellow
  mane: '#cf4526', // Reddish
  eyes: '#333333', // Dark Grey
  iris: '#ffffff', // White
  nose: '#cf4526', // Red nose
  lips: '#5c2010', // Dark brown lips
  earInner: '#cf4526',
}

// Mane Generation (Cylinders/Spikes)
const maneCount = 22 // More dense
const maneParts = Array.from({ length: maneCount }).map((_, i) => {
  const angle = (i / maneCount) * Math.PI * 2
  const radius = 2.2
  return {
    position: [Math.cos(angle) * radius, Math.sin(angle) * radius, 0],
    rotation: [0, 0, angle - Math.PI / 2], // Point outward
    size: [0.6, 0.6, 2.5, 4] // Cylinder: top, bottom, height, segments (4 = square spike)
  }
})

let animationFrameId: number

const animate = () => {
  const time = Date.now() * 0.001
  
  // 1. Head Tracking (Damped)
  if (headRef.value) {
    const nx = (x.value / width.value) * 2 - 1
    const ny = -(y.value / height.value) * 2 + 1
    
    const targetRotX = ny * 0.2
    const targetRotY = nx * 0.4
    
    headRef.value.rotation.x += (targetRotX - headRef.value.rotation.x) * 0.1
    headRef.value.rotation.y += (targetRotY - headRef.value.rotation.y) * 0.1
    
    // Move eyes slightly for parallax
    if (leftIrisRef.value && rightIrisRef.value) {
      leftIrisRef.value.position.x = 0.2 + nx * 0.05
      leftIrisRef.value.position.y = 0.2 + ny * 0.05
      rightIrisRef.value.position.x = 0.2 + nx * 0.05
      rightIrisRef.value.position.y = 0.2 + ny * 0.05
    }
  }

  // 2. Wind Effect (Wave)
  maneRefs.value.forEach((mesh, i) => {
    if (mesh) {
      const offset = i * 0.3
      const wind = Math.sin(time * 2 + offset) * 0.15
      // Rotate around Z to simulate hair blowing
      mesh.rotation.z = maneParts[i].rotation[2] + wind
    }
  })

  // 3. Ear Wiggle
  if (leftEarRef.value && rightEarRef.value) {
    leftEarRef.value.rotation.z = 0.2 + Math.sin(time * 5) * 0.05
    rightEarRef.value.rotation.z = -0.2 + Math.cos(time * 5) * 0.05
  }

  // 4. Blinking
  if (leftEyeRef.value && rightEyeRef.value) {
    if (Math.random() > 0.995) {
      leftEyeRef.value.scale.y = 0.1
      rightEyeRef.value.scale.y = 0.1
      setTimeout(() => {
        if (leftEyeRef.value) leftEyeRef.value.scale.y = 1
        if (rightEyeRef.value) rightEyeRef.value.scale.y = 1
      }, 100)
    }
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
      <TresPerspectiveCamera :position="[0, 0, 15]" :fov="50" :look-at="[0, 0, 0]" />
    <OrbitControls :enable-zoom="false" :enable-pan="false" />
    
    <!-- Lighting (Soft Studio) -->
    <TresHemisphereLight :args="['#ffffff', '#b3858c', 0.8]" />
    <TresDirectionalLight :position="[10, 20, 10]" :intensity="1.2" cast-shadow />
    <TresAmbientLight :intensity="0.4" />

    <!-- Lion Group -->
    <TresGroup :position="[0, -1, 0]">
      
      <!-- Head Group -->
      <TresGroup ref="headRef">
        
        <!-- Face (Main Box) -->
        <TresMesh cast-shadow receive-shadow>
          <TresBoxGeometry :args="[3, 3, 3]" />
          <TresMeshLambertMaterial :color="colors.body" />
        </TresMesh>

        <!-- Muzzle -->
        <TresMesh :position="[0, -0.5, 1.55]" cast-shadow>
          <TresBoxGeometry :args="[1.2, 1.2, 0.5]" />
          <TresMeshLambertMaterial :color="colors.body" />
        </TresMesh>

        <!-- Nose -->
        <TresMesh :position="[0, -0.2, 1.85]" cast-shadow>
          <TresBoxGeometry :args="[0.5, 0.5, 0.2]" />
          <TresMeshLambertMaterial :color="colors.nose" />
        </TresMesh>

        <!-- Eyes (White Sclera + Black Pupil) -->
        <TresGroup :position="[-0.8, 0.5, 1.55]">
          <TresMesh ref="leftEyeRef" cast-shadow>
             <TresBoxGeometry :args="[0.6, 0.6, 0.2]" />
             <TresMeshLambertMaterial :color="colors.iris" />
          </TresMesh>
          <TresMesh ref="leftIrisRef" :position="[0.2, 0.2, 0.11]">
             <TresBoxGeometry :args="[0.2, 0.2, 0.05]" />
             <TresMeshLambertMaterial :color="colors.eyes" />
          </TresMesh>
        </TresGroup>

        <TresGroup :position="[0.8, 0.5, 1.55]">
          <TresMesh ref="rightEyeRef" cast-shadow>
             <TresBoxGeometry :args="[0.6, 0.6, 0.2]" />
             <TresMeshLambertMaterial :color="colors.iris" />
          </TresMesh>
          <TresMesh ref="rightIrisRef" :position="[0.2, 0.2, 0.11]">
             <TresBoxGeometry :args="[0.2, 0.2, 0.05]" />
             <TresMeshLambertMaterial :color="colors.eyes" />
          </TresMesh>
        </TresGroup>

        <!-- Ears -->
        <TresMesh ref="leftEarRef" :position="[-1.2, 1.8, 0]" :rotation="[0, 0, 0.2]" cast-shadow>
          <TresBoxGeometry :args="[0.8, 0.8, 0.4]" />
          <TresMeshLambertMaterial :color="colors.body" />
        </TresMesh>
        <TresMesh ref="rightEarRef" :position="[1.2, 1.8, 0]" :rotation="[0, 0, -0.2]" cast-shadow>
          <TresBoxGeometry :args="[0.8, 0.8, 0.4]" />
          <TresMeshLambertMaterial :color="colors.body" />
        </TresMesh>

        <!-- Mane (Spikes) -->
        <TresGroup :position="[0, 0, -0.5]">
          <TresMesh
            v-for="(part, index) in maneParts"
            :key="index"
            :ref="(el) => {
              if (!el) return
              if (!Array.isArray(maneRefs.value)) maneRefs.value = []
              maneRefs.value[index] = el
            }"
            :position="part.position"
            :rotation="part.rotation"
            cast-shadow
          >
            <!-- Cylinder with 4 segments = Square Spike -->
            <TresCylinderGeometry :args="part.size" />
            <TresMeshLambertMaterial :color="colors.mane" />
          </TresMesh>
        </TresGroup>

      </TresGroup>

    </TresGroup>

  </TresCanvas>
</template>

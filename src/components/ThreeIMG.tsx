import * as React from "react";
import { useEffect, useRef } from "react";
// @ts-ignore
import * as THREE from "three";

interface ThreeImageEffectProps {
    imageUrl: string;
}

const ThreeImageEffect: React.FC<ThreeImageEffectProps> = ({ imageUrl }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!containerRef.current || !imageRef.current) return;

        let scene: THREE.Scene | undefined;
        let camera: THREE.PerspectiveCamera | undefined;
        let renderer: THREE.WebGLRenderer | undefined;
        let planeMesh: THREE.Mesh | undefined;
        let animationFrameId: number | undefined;

        const currentState = { mousePosition: { x: 0, y: 0 }, waveIntensity: 0.005 };
        const targetState = { mousePosition: { x: 0, y: 0 }, waveIntensity: 0.005 };

        const ANIMATION_CONFIG = {
            transitionSpeed: 0.03,
            baseIntensity: 0.005,
            hoverIntensity: 0.009,
        };

        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            uniform float u_time;
            uniform vec2 u_mouse;
            uniform float u_intensity;
            uniform sampler2D u_texture;
            varying vec2 vUv;

            void main() {
                vec2 uv = vUv;
                float wave1 = sin(uv.x * 10.0 + u_time * 0.5 + u_mouse.x * 5.0) * u_intensity;
                float wave2 = sin(uv.y * 12.0 + u_time * 0.8 + u_mouse.y * 4.0) * u_intensity;
                float wave3 = cos(uv.x * 8.0 + u_time * 0.5 + u_mouse.x * 3.0) * u_intensity;
                float wave4 = cos(uv.y * 9.0 + u_time * 0.7 + u_mouse.y * 3.5) * u_intensity;

                uv.y += wave1 + wave2;
                uv.x += wave3 + wave4;

                gl_FragColor = texture2D(u_texture, uv);
            }
        `;

        const initializeScene = (texture: THREE.Texture) => {
            const { offsetWidth: width, offsetHeight: height } = containerRef.current!;
            camera = new THREE.PerspectiveCamera(80, width / height, 0.01, 10);
            camera.position.z = 1;

            scene = new THREE.Scene();

            const shaderUniforms = {
                u_time: { type: "f", value: 1.0 },
                u_mouse: { type: "v2", value: new THREE.Vector2() },
                u_intensity: { type: "f", value: currentState.waveIntensity },
                u_texture: { type: "t", value: texture },
            };

            planeMesh = new THREE.Mesh(
                new THREE.PlaneGeometry(2, 2),
                new THREE.ShaderMaterial({
                    uniforms: shaderUniforms,
                    vertexShader,
                    fragmentShader,
                })
            );
            scene.add(planeMesh);

            renderer = new THREE.WebGLRenderer({ alpha: true });
            renderer.setSize(width, height);
            containerRef.current!.appendChild(renderer.domElement);

            addMouseEvents();
            animate();
        };

        const animate = () => {
            if (!renderer || !scene || !camera || !planeMesh) return;

            animationFrameId = requestAnimationFrame(animate);

            const updateValue = (target: number, current: number, speed: number) =>
                current + (target - current) * speed;

            currentState.mousePosition.x = updateValue(
                targetState.mousePosition.x,
                currentState.mousePosition.x,
                ANIMATION_CONFIG.transitionSpeed
            );
            currentState.mousePosition.y = updateValue(
                targetState.mousePosition.y,
                currentState.mousePosition.y,
                ANIMATION_CONFIG.transitionSpeed
            );
            currentState.waveIntensity = updateValue(
                targetState.waveIntensity,
                currentState.waveIntensity,
                ANIMATION_CONFIG.transitionSpeed
            );

            const uniforms = planeMesh.material.uniforms;
            uniforms.u_intensity.value = currentState.waveIntensity;
            uniforms.u_time.value += 0.005;
            uniforms.u_mouse.value.set(currentState.mousePosition.x, currentState.mousePosition.y);

            renderer.render(scene, camera);
        };

        const addMouseEvents = () => {
            const handleMouseMove = (event: MouseEvent) => {
                const rect = containerRef.current!.getBoundingClientRect();
                targetState.mousePosition.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                targetState.mousePosition.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            };

            const handleMouseOver = () => {
                targetState.waveIntensity = ANIMATION_CONFIG.hoverIntensity;
            };

            const handleMouseOut = () => {
                targetState.waveIntensity = ANIMATION_CONFIG.baseIntensity;
                targetState.mousePosition = { x: 0, y: 0 };
            };

            containerRef.current!.addEventListener("mousemove", handleMouseMove);
            containerRef.current!.addEventListener("mouseover", handleMouseOver);
            containerRef.current!.addEventListener("mouseout", handleMouseOut);

            return () => {
                containerRef.current!.removeEventListener("mousemove", handleMouseMove);
                containerRef.current!.removeEventListener("mouseover", handleMouseOver);
                containerRef.current!.removeEventListener("mouseout", handleMouseOut);
            };
        };

        const texture = new THREE.TextureLoader().load(imageRef.current!.src, () => {
            initializeScene(texture);
        });

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (renderer) renderer.dispose();
        };
    }, [imageUrl]);

    return (
        <div ref={containerRef} className="three-image-effect">
            <img ref={imageRef} src={imageUrl} alt="" style={{ display: "none" }} />
        </div>
    );
};

export default ThreeImageEffect;
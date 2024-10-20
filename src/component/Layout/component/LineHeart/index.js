import React, { useEffect, useRef } from 'react';
import className from 'classnames/bind';
import style from './LineHeart.module.css';
import { gsap } from 'gsap';

const cx = className.bind(style);

const LineHeart = ({ title }) => {
    const svgRef = useRef(null);
    useEffect(() => {
        const like = document.getElementById('like');
        // const sparkles = document.getElementById('sparkles');

        if (localStorage.getItem('clicks') == null) {
            localStorage.setItem('clicks', 0);
        } else if (localStorage.getItem('clicks') >= 10000) {
            like.innerHTML = '⭐';
        }

        const container = document.querySelector('.anim-explode-container');
        // const svg = container.querySelector('.anim-explode');
        const svg = svgRef.current;

        let numberOfShapes = 0;

        let shapes = [
            'M254 286.11a50 50 0 0050-50H204a50 50 0 0050 50z',
            'M255.5 271a20 20 0 10-20-20 20 20 0 0020 20zm0 30a50 50 0 10-50-50 50 50 0 0050 50z',
            'M248.8 202.17a8 8 0 019.4 0l40.6 29.5a8 8 0 012.9 8.94l-15.5 47.73a8 8 0 01-7.61 5.52h-50.18a8 8 0 01-7.61-5.52l-15.5-47.73a8 8 0 012.9-8.94z',
            'M307.5 250a50 50 0 11-50-50 50 50 0 0150 50',
            'M248.08 204.07a11.91 11.91 0 0116.84 0l30.59 30.59a11.91 11.91 0 11-16.85 16.85l-10.25-10.25v47.41a11.91 11.91 0 11-23.82 0v-47.41l-10.25 10.25a11.91 11.91 0 01-16.85-16.85z',
            'M234 237a22.5 22.5 0 0045 0h27.5a50 50 0 01-100 0z',
            'M258 202.5a12 12 0 00-12 12v26h-26a12 12 0 000 24h26v26a12 12 0 0024 0v-26h26a12 12 0 000-24h-26v-26a12 12 0 00-12-12z',
            'M208.055 256.995C212.724 261.668 240.968 285.188 242.927 287.149C244.882 289.106 247.441 290.08 250 290.08C252.559 290.08 255.118 289.101 257.073 287.149C259.036 285.188 287.281 261.664 291.945 256.995C302.685 246.243 302.685 228.816 291.945 218.064C281.204 207.312 263.795 207.312 253.054 218.064C251.891 219.229 250.914 220.503 250 221.809C249.086 220.503 248.109 219.229 246.946 218.064C236.205 207.312 218.796 207.312 208.055 218.064C197.315 228.816 197.315 246.243 208.055 256.995Z',
        ];
        let words = [
            'M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80', // Đường nét cho chữ "C"
            'M30 70 C 30 10, 80 10, 80 70 C 80 130, 30 130, 30 70 Z', // Đường nét cho chữ "ó"
            'M10 80 L 10 10 L 60 10 L 60 80', // Đường nét cho chữ "Y"
            'M60 10 L 60 80 L 100 10', // Đường nét cho chữ "e"
            'M100 10 L 100 80 L 150 80 L 150 10 Z', // Đường nét cho chữ "s"
        ];

        const handleClick = (e) => {
            let clicks = localStorage.getItem('clicks');
            localStorage.setItem('clicks', ++clicks);
            numberOfShapes = Math.floor(clicks / 100);

            let red = Math.floor(Math.random() * 360);
            like.style.color = `hsl(${red}deg, 100%, 80%)`;

            // gsap.fromTo(
            //     sparkles,
            //     {
            //         'box-shadow': '1.5372rem -9.6375rem 0 0rem #ff8080,...', // Giữ nguyên giá trị ban đầu
            //         rotate: '0deg',
            //     },
            //     {
            //         'box-shadow': '1.5372rem -14.0125rem 0 -0.97625rem #ff8080,...',
            //         rotate: '15deg',
            //         duration: 0.5,
            //     },
            // );

            gsap.fromTo(like, { 'font-size': '24px' }, { duration: 0.3, 'font-size': '28px' });

            const animatedShapes = [];

            for (let i = 0; i < (numberOfShapes % 10) + 1; i++) {
                const newElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');

                if (
                    Math.floor(numberOfShapes / 10) >= 1 &&
                    (i == 0 || i < (Math.floor(numberOfShapes / 10) % 10) + 1)
                ) {
                    newElement.setAttribute('d', gsap.utils.random(words));
                } else {
                    newElement.setAttribute('d', gsap.utils.random(shapes));
                }

                newElement.style.fill = gsap.utils.random(['#ff8080', '#ffed80', '#a4ff80', '#80c8ff']);

                svg.appendChild(newElement);

                animatedShapes.push(newElement);
            }

            const killShapes = () => {
                animatedShapes.forEach((shape) => {
                    svg.removeChild(shape);
                });
            };

            gsap.set(animatedShapes, {
                transformOrigin: 'center',
                scale: 'random(0.4, 0.8)',
            });

            gsap.to(animatedShapes, {
                onComplete: killShapes,
                keyframes: [
                    {
                        rotate: 'random(180, -180)',
                        x: 'random([-150, -100, -200, 200, 100, 150, 0, 50, -50])',
                        y: 'random([-150, -100, -200, 200, 100, 150, 0, 50, -50])',
                        ease: 'expo.out',
                        duration: 1,
                        stagger: { amount: 0 },
                    },
                    { opacity: 0, delay: -0.75 },
                ],
            });
        };

        like.addEventListener('click', handleClick);

        // Cleanup event listener on component unmount
        return () => {
            like.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div className={cx('anim-explode-container')}>
            <svg ref={svgRef} className={cx('anim-explode')} role="presentational" viewBox="0 0 500 500"></svg>
            <div id="likes" className={cx('likes')}>
                <span id="like" className={cx('like')}>
                    {title}
                </span>
                {/* <span id="sparkles" className={cx('sparkles')}></span> */}
            </div>
        </div>
    );
};

export default LineHeart;

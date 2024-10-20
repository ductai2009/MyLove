import React, { useEffect, useRef, useState } from 'react';
import mojs from 'mo-js';
import './BtnLove1.module.css'; // Đảm bảo rằng bạn đã tạo file CSS

const LikeButton = () => {
    const [liked, setLiked] = useState(false);
    const likeButtonRef = useRef(null);
    const redHeartRef = useRef(null);
    const firstStrokeRef = useRef(null);
    const secondStrokeRef = useRef(null);

    const colors = {
        yellow: '#fde36d',
        blue: '#97e8f5',
        orange: '#fd706a',
        purple: '#ba7fdd',
        green: '#85f981',
    };

    useEffect(() => {
        const likeButton = likeButtonRef.current;
        const redHeart = redHeartRef.current;
        const firstStroke = firstStrokeRef.current;
        const secondStroke = secondStrokeRef.current;

        const delay = 0.5,
            from = 5,
            to = 15;

        const stroke = new mojs.Tween({
            duration: 400,
            easing: 'expo.out',
            onUpdate: (progress) => {
                firstStroke.setAttribute('r', (progress / (1 - delay)) * (to - from) + from);
                secondStroke.setAttribute('r', (Math.max(progress - delay, 0) / (1 - delay)) * (to - from) + from);
            },
        });

        const scale = new mojs.Tween({
            duration: 400,
            delay: 250,
            onUpdate: (progress) => {
                const bounceProgress = mojs.easing.elastic.out(1.005 * progress - 0.005);
                redHeart.style.transform = `scale3d(${bounceProgress}, ${bounceProgress}, 1)`;
            },
        });

        const burst = new mojs.Burst({
            parent: likeButton,
            delay: 350,
            duration: 600,
            shape: 'circle',
            x: '50%',
            y: '50%',
            opacity: 1,
            childOptions: {
                radius: { 5: 0 },
                type: 'line',
                stroke: [colors.yellow, colors.blue],
                strokeWidth: 2,
            },
            radius: { 25: 40 },
            count: 6,
            isSwirl: true,
            swirlSize: 20,
            isRunLess: true,
            easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
        });

        const burst2 = new mojs.Burst({
            parent: likeButton,
            delay: 400,
            duration: 600,
            shape: 'circle',
            x: '50%',
            y: '50%',
            opacity: 1,
            childOptions: {
                radius: { 5: 0 },
                type: 'line',
                stroke: [colors.orange, colors.purple, colors.blue],
                strokeWidth: 2,
            },
            radius: { 25: 50 },
            count: 6,
            angle: 25,
            isSwirl: true,
            swirlSize: 20,
            isRunLess: true,
            easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
        });

        const burst3 = new mojs.Burst({
            parent: likeButton,
            delay: 500,
            duration: 600,
            shape: 'circle',
            fill: colors.green,
            x: '50%',
            y: '50%',
            opacity: 1,
            radius: { 20: 30 },
            childOptions: {
                radius: { 2: 0 },
            },
            count: 6,
            isRunLess: true,
            easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
        });

        const likeTimeline = new mojs.Timeline();
        likeTimeline.add(stroke, scale, burst, burst2, burst3);

        const reset = () => {
            redHeart.style.transform = `scale3d(0, 0, 1)`;
        };

        const toggleLike = (e) => {
            e.preventDefault();
            setLiked(!liked);
            if (!liked) likeTimeline.start();
            else reset();
        };

        likeButton.addEventListener('click', toggleLike);
        likeButton.addEventListener('touchstart', toggleLike);

        return () => {
            likeButton.removeEventListener('click', toggleLike);
            likeButton.removeEventListener('touchstart', toggleLike);
        };
    }, [liked]);

    return (
        <a href="#" className="like-button" ref={likeButtonRef}>
            <svg className="heart-icon stroke" viewBox="0 0 24 24">
                <defs>
                    <clipPath id="mask">
                        <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
                    </clipPath>
                </defs>
                <circle id="first-stroke" r="0" cx="12" cy="12" clipPath="url(#mask)"></circle>
                <circle id="second-stroke" r="0" cx="12" cy="12" clipPath="url(#mask)"></circle>
            </svg>
            <svg className="heart-icon red" viewBox="0 0 24 24" ref={redHeartRef}>
                <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
            </svg>
            <svg className="heart-icon" viewBox="0 0 24 24">
                <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
            </svg>
        </a>
    );
};

export default LikeButton;

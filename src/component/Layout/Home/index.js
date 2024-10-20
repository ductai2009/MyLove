import React, { Fragment, useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartPulse, faUser, faCakeCandles } from '@fortawesome/free-solid-svg-icons';
import className from 'classnames/bind';
import style from './Home.module.css';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Love from '../Love';
import LineHeart from '~/component/Layout/component/LineHeart';

const cx = className.bind(style);
let ind = 0;
let yes = 0;
function Home() {
    const navigate = useNavigate();
    const [comment, setComment] = useState(
        'Nay 20/10 chúc bé anh ngày càng xinh đẹp học giỏi, nấu ăn với ít ăn mì tôm nha, uống nhiều nước í, tha lỗi cho anh nữa mờ, biết bé anh yêu anh nhất rùi, hong nỡ giận anh đâu mờ nhở',
    );
    // let arrSr = ['Chồng xin lỗi vợ mờ!', 'Chồng biết lỗi rùi í', 'Chồng xin lỗi vợ nhiều lắm', 'Yêu vợ nhiều mờ', 'Vợ'];
    let arrSr = [
        'Chồng xin lỗi vợ mờ!',
        'Chồng biết lỗi rùi í.',
        'Chồng xin lỗi vợ nhiều lắm.',
        'Yêu vợ nhiều mờ!',
        'Thương vợ lắm, đừng giận nữa nha.',
        'Chồng sai rồi, tha lỗi cho chồng nha.',

        'Chồng xin lỗi vợ yêu.',
        'Đừng giận chồng nữa mà, xin lỗi vợ nhiều.',

        'Chồng yêu vợ, xin lỗi vì đã làm vợ buồn.',
        'Anh xin lỗi, vợ tha thứ cho anh nha!',

        'Chồng biết sai rồi í',
    ];

    const [title, setTitle] = useState('KHÔNG');
    // Tạo ref để tham chiếu đến các counter
    const counterRefs = useRef([]);

    // Sử dụng useEffect để cập nhật giá trị của các counter sau khi render
    useEffect(() => {
        counterRefs.current.forEach((counter) => {
            counter.innerText = '0';

            const updateCounter = () => {
                const target = +counter.getAttribute('data-target');
                const c = +counter.innerText;

                const increment = target / 300;

                if (c < target) {
                    counter.innerText = `${Math.ceil(c + increment)}`;
                    setTimeout(updateCounter, 100);
                } else {
                    counter.innerText = target;
                }
            };

            updateCounter();
        });
    }, []); // Chạy effect sau khi render lần đầu
    const setComment_ = () => {
        let length = arrSr.length;
        const randomNumber = Math.floor(Math.random() * length);
        if (yes === 1) {
            navigate('/love');
        }
        if (ind === 13) {
            setTitle('Tha lỗi cho chồng í');
            setComment('Yêu Vợ nhiều nhiều lắm');
            yes = 1;
        } else {
            setComment(arrSr[randomNumber]);
            ind++;
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('comment')}>{comment}</div>
            <FontAwesomeIcon icon={faHeart} className={cx('floating-heart')} />
            <FontAwesomeIcon icon={faHeart} className={cx('floating-heart')} />
            <FontAwesomeIcon icon={faHeart} className={cx('floating-heart')} />
            <div className={cx('box')}>
                <div className={cx('counter-container')}>
                    <FontAwesomeIcon icon={faHeartPulse} />
                    <div className={cx('counter')} data-target="1008" ref={(el) => (counterRefs.current[0] = el)}></div>
                </div>
                <div className={cx('counter-container')}>
                    <FontAwesomeIcon icon={faHeart} />
                    <div className={cx('counter')} data-target="71" ref={(el) => (counterRefs.current[1] = el)}></div>
                </div>
                <div className={cx('counter-container')}>
                    <FontAwesomeIcon icon={faCakeCandles} />
                    <div className={cx('counter')} data-target="2501" ref={(el) => (counterRefs.current[2] = el)}></div>
                </div>
            </div>
            <div className={cx('action-btn')}>
                <Link className={cx('btn-love')} to="/love">
                    Tạm tha
                </Link>
                <div
                    className={cx('btn-custom')}
                    onClick={() => {
                        setComment_();
                    }}
                >
                    <LineHeart title={title} />
                </div>
            </div>

            {/* <div className={cx('LineHeart')}></div> */}
        </div>
    );
}

export default Home;

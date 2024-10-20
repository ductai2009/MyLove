import React, { Fragment, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartPulse, faUser, faCakeCandles } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import style from './Love.module.css';
import images from '~/assets/image';

import { Link, Route, Routes } from 'react-router-dom';

const cx = classNames.bind(style);

function Love() {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('text')}>Yêu vợ</span>
            <div className={cx('heart-container')}>
                <img className={cx('img-account')} src={images.accountNhuY} alt="Account"></img>
                <img className={cx('img-iconLove')} src={images.iconLove} alt="Account"></img>
            </div>

            <div className={cx('back')}></div>
            <div className={cx('heart')}></div>
        </div>
    );
}

export default Love;

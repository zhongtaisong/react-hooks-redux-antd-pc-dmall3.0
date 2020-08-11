import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// 登录 - 组件
import LoginComponents from './components/loginComponents';
// 忘记密码
import ForgetPwdComponents from './components/forgetPwdComponents';
// 新密码
import NewPwdComponents from './components/newPwdComponents';
// 背景图片
import bigImg from '@img/register/bg.png';
// logo图片
import logoImg from '@img/logo2.png';
// 接口服务
import service from './service';
// less样式
import './index.less';

const loginBg = {
    background: `url(${bigImg}) no-repeat`,
    backgroundSize: 'cover'
};

// ----------------------------------------- 登录、忘记密码、新密码 ----------------------------------------- //
export default ({ setIsFooter=()=>{}, setIsHeader=()=>{}, _md5, _service, _key, history, _globalCloseTime, _validatePhone }) => {
    const [code, setCode] = useState(0);
    const [params, setParams] = useState({});

    useEffect(() => {        
        // 隐藏头部、底部组件
        setIsHeader(false);
        setIsFooter(false);
        return () => {
            setIsHeader(true);
            setIsFooter(true);
        }
    }, [])

    // 登录、验证信息、直接登录
    const handleLoginBtn = (key) => {
        let obj = {
            changeCode(num) {
                setCode(num);
            },
            login(values = {}) {
                values.upwd = _md5(values.upwd + _key);
                // 0不记住密码， 1表示记住密码
                values.isRemember = Number(values.isRemember);
                service('postLogData', _service)(values).then(code => {
                    if( code == 200 ) {                        
                        setTimeout(() => {
                            history.push('/home');
                        }, _globalCloseTime * 800);
                    }
                });
            },
            validInfo(values = {}) {
                service('postValiForgetPwdData', _service)(values).then(data => {
                    if(data) {
                        setCode(2);
                        setParams(data);
                    }
                });
            },
            submitNewPwd(values = {}) {
                service('postUpdateUpwdData', _service)({
                    newUpwd: _md5(values.confirm + _key),
                    ...params,
                    isForgetPwd: true
                }).then(code => code == 200 && setCode(0));
            }
        };
        return function() {
            typeof obj[key] === 'function' && obj[key].apply(this, arguments);
        }
    };

    return (
        <div className='dm_Login'>
            <div className='common_width logo'>
                <Link to='/home' title='首页'>
                    <img src={ logoImg } alt='logo' />
                </Link>
            </div>
            <div className='content' style={ loginBg }>
                {
                    [
                        <LoginComponents handleLoginBtn={ handleLoginBtn('login') } changeCode={ handleLoginBtn('changeCode') } />,
                        <ForgetPwdComponents handleLoginBtn={ handleLoginBtn('validInfo') } changeCode={ handleLoginBtn('changeCode') } _validatePhone={ _validatePhone } />,
                        <NewPwdComponents handleLoginBtn={ handleLoginBtn('submitNewPwd') } changeCode={ handleLoginBtn('changeCode') } />
                    ][code]
                }
            </div>
        </div>
    );
};
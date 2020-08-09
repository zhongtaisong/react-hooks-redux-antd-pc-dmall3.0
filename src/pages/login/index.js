import React, { useState, useEffect } from 'react';
import { Form, message, Spin } from 'antd';
import { Link, useLocation } from 'react-router-dom';
// 登录 - 组件
import LoginComponents from './components/loginComponents';
// 忘记密码
// import ForgetPassword from './components/ForgetPassword';
// 新密码
// import NewPassword from './components/NewPassword';
// 设置
// import { indexState, PWD_KEY } from '@config';
// 背景图片
import bigImg from '@img/register/bg.png';
// logo图片
import logoImg from '@img/logo2.png';
// 接口服务
import service from './service';
// 数据
// import state from './state';
// less样式
import './index.less';

const loginBg = {
    background: `url(${bigImg}) no-repeat`,
    backgroundSize: 'cover'
};

// ----------------------------------------- 登录、忘记密码、新密码 ----------------------------------------- //
// class Login extends React.Component {

//     // code: 0表示登录组件，1忘记密码组件，2新密码组件
//     constructor(props) {
//         super(props);
//         this.state = {
//             code: 0
//         };
//     }

//     componentDidMount() {
//         this.props.history && state.setHistory( this.props.history );
//         indexState.oauthData();
//     }

//     // 登录
//     loginSubmit = () => {
//         this.props.form.validateFields((err, values) => {
//             if (!err) {
//                 values.upwd = this.$md5( values.upwd + PWD_KEY );
//                 // 0表示不记住密码， 1表示记住密码
//                 values.isRemember = values.isRemember && values.isRemember.length ? 1 : 0;
//                 state.loginData( values );
//             }
//         });
//     };

//     // 跳转忘记密码组件
//     handleTarget = (that) => {
//         if( that === 'forget' ){
//             this.setState({
//                 code: 1
//             });
//         }else if( that === 'newPwd' ){
//             this.props.form.validateFields(async (err, values) => {
//                 if (!err) {
//                     values.uname = values.uName;
//                     delete values.uName;
//                     const code = await state.forgetPwdData( values );
//                     if( code === 200 ){
//                         this.setState({
//                             code: 2
//                         });
//                     }
//                 }
//             });
//         }else if( that === 'submit' ){
//             this.props.form.validateFields(async (err, values) => {
//                 if (!err) {
//                     const { uPwd, confirm } = values || {};
//                     if( uPwd != confirm ) {                        
//                         message.error('新密码和确认密码不一致！');
//                     }else{
//                         let newUpwd = this.$md5( values.confirm + PWD_KEY );
//                         const code = await state.newPwdData({ newUpwd });
//                         if( code === 200 ){
//                             this.setState({
//                                 code: 0
//                             });
//                         }
//                     }
//                 }
//             });
//         }else{
//             this.setState({
//                 code: 0
//             });
//         }
//     }

//     componentWillUnmount() {
//         state.clearMobxData();
//     }

//     render() {
//         const { code } = this.state;
//     }
// }

export default ({ setIsFooter=()=>{}, setIsHeader=()=>{}, _md5, _service, _key, history, _globalCloseTime }) => {
    const [code, setCode] = useState(0);

    useEffect(() => {        
        // 隐藏头部、底部组件
        setIsHeader(false);
        setIsFooter(false);
        return () => {
            setIsHeader(true);
            setIsFooter(true);
        }
    }, [])

    // 登录
    const handleLoginBtn = (values) => {
        values.upwd = _md5(values.upwd + _key);
        // 0不记住密码， 1表示记住密码
        values.isRemember = Number(values.isRemember);
        service('postLogData', _service, history, _globalCloseTime)(values);
    };

    return (
        <div className='dm_Login'>
            <div className='common_width logo'>
                <Link to='/home' title='首页'>
                    <img src={ logoImg } alt='logo' />
                </Link>
            </div>
            <div className='content' style={ loginBg }>
                <LoginComponents 
                    // form={ this.props.form } 
                    // handleTarget={ this.handleTarget }  
                    handleLoginBtn={ handleLoginBtn }
                />
                {/* {
                    code === 0 ? (
                        <Logins 
                            form={ this.props.form } 
                            handleTarget={ this.handleTarget }  
                            loginSubmit={ this.loginSubmit }
                        />
                    ) : code === 1 ? (
                        <ForgetPassword 
                            form={ this.props.form } 
                            handleTarget={ this.handleTarget }  
                        />
                    ) : code === 2 ? (
                        <NewPassword 
                            form={ this.props.form } 
                            handleTarget={ this.handleTarget } 
                        />
                    ) : ''
                } */}
            </div>
        </div>
    );
};
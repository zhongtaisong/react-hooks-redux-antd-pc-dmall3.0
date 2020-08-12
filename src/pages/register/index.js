import React,{ useEffect } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
// 背景图片
import bigImg from '@img/register/bg.png';
// logo图片
import logoImg from '@img/logo2.png';
// 接口服务
import { postRegData } from './service';
// less样式
import './index.less';

const loginBg = {
    background: `url(${bigImg}) no-repeat`,
    backgroundSize: 'cover'
};

// --------------------------------------------------- 注册 ----------------------------------- //
export default ({ setIsFooter=()=>{}, setIsHeader=()=>{}, _md5, _service, _key, _validatePhone, history }) => {

    useEffect(() => {        
        // 隐藏头部、底部组件
        setIsHeader(false);
        setIsFooter(false);
        return () => {
            setIsHeader(true);
            setIsFooter(true);
        }
    }, [])

    // 完成表单
    const onFinish = values => {
        values.upwd = _md5(values.upwd + _key );
        values.confirm = _md5(values.confirm + _key );
        typeof postRegData === 'function' && postRegData(_service, history)(values);
    };

    return (
        <div className='dm_Register'>
            <div className='common_width logo'>
                <Link to='/home'>
                    <img src={ logoImg } alt='logo' />
                </Link>
            </div>
            <div className='content' style={ loginBg }>
                <Form
                    initialValues={{
                        uname: localStorage.getItem('uname'),
                        isRemember: false
                    }}
                    onFinish={ onFinish }                
                >
                    <Row>
                        <Col span={ 24 }>
                            <Form.Item
                                label='用户名'
                                name='uname'
                                rules={[{ 
                                    required: true, 
                                    message: '必填', 
                                    whitespace: true 
                                }]}
                            >
                                <Input placeholder='请输入' />
                            </Form.Item>
                        </Col>
                        <Col span={ 24 }>
                            <Form.Item
                                label='密码'
                                name='upwd'
                                rules={[{ 
                                    required: true, 
                                    message: '必填', 
                                    whitespace: true 
                                }]}
                                hasFeedback
                            >
                                <Input.Password placeholder='请输入' />
                            </Form.Item>
                        </Col>
                        <Col span={ 24 }>
                            <Form.Item
                                label='确认密码'
                                name='confirm'
                                dependencies={['upwd']}
                                rules={[{ 
                                        required: true, 
                                        message: '必填', 
                                        whitespace: true 
                                    }, ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if(!value || getFieldValue('upwd') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('两次输入的密码不一致！');
                                        },
                                    })
                                ]}
                                hasFeedback
                            >
                                <Input.Password placeholder='请输入' />
                            </Form.Item>
                        </Col>
                        <Col span={ 24 }>
                            <Form.Item
                                label="手机号码"
                                name='phone'
                                rules={[{ 
                                    required: true, 
                                    message: '必填', 
                                    whitespace: true 
                                },{
                                    validator: _validatePhone
                                }]}
                            >
                                <Input placeholder='请输入' />
                            </Form.Item>
                        </Col>
                        <Col span={ 24 }>
                            <Form.Item
                                label="邮箱"
                                name='email'
                                rules={[{
                                    type: 'email',
                                    message: '输入的邮箱无效!'
                                },{
                                    required: true,
                                    message: '必填', 
                                    whitespace: true 
                                }]}
                            >
                                <Input placeholder='请输入' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={ 24 }>
                            <Form.Item style={{ marginBottom: 0 }} label=' ' colon={ false } >
                                <Button type="primary" style={{ width: '100%' }} htmlType="submit">提交注册信息</Button>
                            </Form.Item>
                        </Col>
                        <Col span={ 24 }>
                            <Form.Item label=' ' colon={ false }>
                                <Link to="/login" style={{ color: '#1890ff' }}>已有账号，直接登录</Link>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};
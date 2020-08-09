import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

// --------------------------------------- 登录 --------------------------------- //
export default ({ handleLoginBtn=()=>{} }) => {

    // 完成表单
    const onFinish = values => {
        typeof handleLoginBtn === 'function' && handleLoginBtn(values);
    };

    return (
        <Form className='login'
            initialValues={{
                uname: localStorage.getItem('uname'),
                isRemember: false
            }}
            onFinish={ onFinish }
        >
            <Row>
                <Col span={ 24 }>
                    <Form.Item
                        name='uname'
                        rules={[{ 
                            required: true, 
                            message: '必填', 
                            whitespace: true 
                        }]}
                    >
                        <Input
                            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入用户名"
                        />
                    </Form.Item>
                </Col>
                <Col span={ 24 }>
                    <Form.Item
                        name='upwd'
                        rules={[{ 
                            required: true, 
                            message: '必填', 
                            whitespace: true 
                        }]}
                    >
                        <Input
                            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="请输入密码"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row className='password-operation'>
                <Col span={ 12 }>
                    <Form.Item
                        name='isRemember'
                        valuePropName="checked"
                        rules={[{ 
                            required: false, 
                            message: '非必填'
                        }]}
                    >
                        <Checkbox className='isRemember'>记住密码</Checkbox>
                    </Form.Item>            
                </Col>
                <Col span={ 12 } style={{ textAlign: 'right' }}>
                    <Form.Item>
                        <a>忘记密码？</a>
                    </Form.Item>            
                </Col>
            </Row>
            <Row className='password-operation'>
                <Col span={ 24 }>
                    <Form.Item>
                        <Button type="primary" style={{ width: '100%' }} htmlType="submit">登录</Button>
                    </Form.Item>            
                </Col>
                <Col span={ 24 }>
                    <Form.Item>
                        <Link to="/register">新用户注册</Link>
                    </Form.Item>            
                </Col>
            </Row>
        </Form>
    );
};
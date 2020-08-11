import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

// ----------------------------------------------- 忘记密码 ------------------------------ //
export default ({ handleLoginBtn, _validatePhone, changeCode }) => {

    // 完成表单
    const onFinish = values => {
        typeof handleLoginBtn === 'function' && handleLoginBtn(values);
    };

    return (
        <Form className='dm_ForgetPassword'
            initialValues={{
                uname: localStorage.getItem('uname')
            }}
            onFinish={ onFinish }
        >
            <Row>
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
                <Col span={ 24 }>
                    <Form.Item
                        label="用户名"
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
            </Row>
            <Row className='password-operation'>
                <Col span={ 24 }>
                    <Form.Item style={{ marginBottom: 0 }} label=' ' colon={ false } >
                        <Button type="primary" style={{ width: '100%' }} htmlType="submit">验证信息</Button>
                    </Form.Item>
                </Col>
                <Col span={ 24 }>
                    <Form.Item label=' ' colon={ false }>
                        <a onClick={ () => typeof changeCode === 'function' && changeCode(0) }>直接登录</a>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
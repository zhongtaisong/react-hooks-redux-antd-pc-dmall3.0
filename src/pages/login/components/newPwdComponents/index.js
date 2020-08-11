import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

// ------------------------------------------ 新密码 -------------------------------------------- //
export default ({ handleLoginBtn, changeCode }) => {

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
                        label="密码"
                        name='uPwd'
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
                        label="确认密码"
                        name='confirm'
                        dependencies={['uPwd']}
                        rules={[{
                            required: true,
                            message: '必填', 
                            whitespace: true 
                        }, ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if(!value || getFieldValue('uPwd') === value) {
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
            </Row>
            <Row className='password-operation'>
                <Col span={ 24 }>
                    <Form.Item style={{ marginBottom: 0 }} label=' ' colon={ false } >
                        <Button type="primary" style={{ width: '100%' }} htmlType="submit">提交新密码</Button>
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
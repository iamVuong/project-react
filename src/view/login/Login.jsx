import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Checkbox, Button, Modal } from 'antd';
import Cookies from "js-cookie"
import  "./Login.css";
import {
    MailOutlined,
    LockOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Login(props) {
    let history = useHistory()
    let [visibleModalSignUp, setVisibleModalSignUp] = useState(false)
    let [loadModalSignUp, setLoadModalSignUp] = useState(false)
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [signUpUsename, setSignUpUsename] = useState("")
    let [signUpPassword, setSignUpPassword] = useState("")
    let [signUpEmail, setSignUpEmail] = useState("")
    const showModalSingUp = () => {
        setVisibleModalSignUp(true)
    }
    const hideModalSingUp = () => {
        setVisibleModalSignUp(false)
    }
    const handleOkSignUp = () => {
        setLoadModalSignUp(true);
        setTimeout(() => {
            setVisibleModalSignUp(false)
            setLoadModalSignUp(false);
        }, 3000);
        axios({
            method: "POST",
            url: "/signup",
            data: {
                username: signUpUsename,
                email: signUpEmail,
                password: signUpPassword,
            }
        })
            .then((res) => {
                alert(res.data.mesage)
            })
            .catch((err) => {
                alert(err.response.data.mesage)
            })
    };
    const modalSignUp = (
        <Modal
            className="modalSignUp"
            visible={visibleModalSignUp}
            title="Tạo tài khoản mới"
            onOk={handleOkSignUp}
            onCancel={hideModalSingUp}
            footer={[
                <Button key="submit" type="primary" loading={loadModalSignUp} onClick={handleOkSignUp}>
                    Submit
            </Button>
            ]}
        >
            <div>
                <input type="text" name="username" id="" placeholder="Nhập username"
                    onChange={(e) => {
                        setSignUpUsename(e.target.value)
                    }}
                />
           
                <input type="text" name="email" id="" placeholder="Nhập email"
                    onChange={(e) => {
                        setSignUpEmail(e.target.value)
                    }}
                />
                     <input type="password" name="password" id="" placeholder="Nhập password"
                    onChange={(e) => {
                        setSignUpPassword(e.target.value)
                    }}
                />
            </div>
        </Modal>
    )

    return (
        <>
            {modalSignUp}
            <div className="page-login">
                <div>
                    <Form className="form-login" name="normal_login">
                        <h1>Email</h1>
                        <Form.Item
                            name="email"
                        >
                            <p className="input-style">
                                <span><MailOutlined style={{ fontSize: "22px" }} /></span>
                                <Input placeholder="Nhập email" onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                            </p>
                        </Form.Item>
                        <h1>Password</h1>
                        <Form.Item
                            style={{ marginBottom: "0px" }}
                            name="password"
                        >
                            <p className="input-style">
                                <span><LockOutlined style={{ fontSize: "22px" }} /></span>
                                <Input placeholder="Nhập password" type="password" onChange={(e) => {
                                    setPassword(e.target.value)
                                }} />
                            </p>
                            <p></p>
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit" className="login-btn" onClick={() => {
                                axios({
                                    method: "POST",
                                    url: "/login",
                                    data: {
                                        email: email,
                                        password: password
                                    }
                                })
                                    .then((res) => {
                                        Cookies.set('token', res.data.data, { expires: 7});
                                        if(res.data.data.user.role === "admin"){
                                            history.push("/admin")
                                        }
                                        if(res.data.data.user.role === "user"){
                                            history.push("/")
                                        }
                                    })
                                    .catch((err) => {
                                       alert(err.response.data.mesage);
                                    })
                            }}>
                                Đăng Nhập
                            </Button>
                        </Form.Item>
                        <div className="login-forgot-password"><a href="https://www.google.com/">Quên mật khẩu ?</a></div>
                        <hr style={{ margin: "15px 0" }} />
                        <Form.Item >
                            <Button style={{ backgroundColor: " rgb(62, 238, 62)", border: "none" }}
                                type="primary" className="login-btn"
                                onClick={showModalSingUp}
                            >
                                Đăng Ký
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>

    );
}

export default Login;
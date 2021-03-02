import React, { useEffect, useState, useRef } from 'react';
import axios from "../../config/axios/axios";
import 'antd/dist/antd.css'
import "./User.css";
import { Table, Space, Avatar, Image, Popconfirm, message, Button, Modal} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
function Users(props) {
    let [data, setData] = useState("");
    let [dataSearch, setDataSearch] = useState("")
    let [overview, setOverview] = useState(false)
    let [visible, setVisible] = useState(false);
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [id, setId] = useState("")
    const texts = 'Are you sure to delete this user?';
    useEffect(() => {
        axios({
            method: "GET",
            url: "/DashBoard"
        })
            .then((result) => {
                console.log(result);
                let dataChange = result.data.map((item, index) => {
                    let source = {
                        avatar: <Avatar src={<Image src="https://thuthuatnhanh.com/wp-content/uploads/2018/07/anh-dai-dien-dep.jpg"></Image>}></Avatar>,
                        key: index
                    }

                    return Object.assign(item, source)
                })
                setData(dataChange)
            })
            .catch((err) => {
                alert("no");
            })
    }, [overview])


    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
     
        {
            title: 'Action',
            dataIndex: '_id',
            key: 'action',
            render: (dataIndex, record) => (
                <Space size="middle">
                    <Button onClick={() => {
                        setId(dataIndex)
                        setVisible(true)
                    }}>Edit</Button>    
                    <Popconfirm placement="top" title={texts} onConfirm={() => {
                        axios({
                            method: "DELETE",
                            url: `/${dataIndex}`
                        })
                            .then((res) => {
                                setOverview(!overview)
                                message.info('Delete success');
                            })

                    }} okText="Yes" cancelText="No">
                        <Button>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ]
    const modalUser = (
        <Modal
            title="Edit user"
            visible={visible}
            onOk={() => {
                axios({
                    method: "PUT",
                    url: `/${id}`,
                    data: {
                        username: username,
                    }
                })
                    .then((res) => {
                        setOverview(!overview)
                        setVisible(false)
                    })
                    .catch((err)=>{
                        alert(err.response.data.message)
                    })
            }}
            onCancel={() => {
                setVisible(false)
            }}
        >
            <p>Username</p>
            <input style={{ border: "1px solid black", width: "90%", height: "30px", outline: "none", padding: "0px 15px" }}  type="text" placeholder="Nhập username"
                onChange={(e) => {
                    setUsername(e.target.value)
                }}
            />
        </Modal>
    )
    return (
        <>
            {modalUser}
            <div className="user-findUser">
                <input type="text" placeholder="Search user you want" onChange={(e) => {
                    setDataSearch(e.target.value)
                }} />
                <button onClick={() => {
                    if (data) {
                        if (dataSearch) {
                            let dataFiter = data.filter((item) => {
                                return item.username === dataSearch || item.email === dataSearch
                            });
                            setData(dataFiter)
                        }
                    }
                }
                }><SearchOutlined></SearchOutlined></button>
            </div>
            <div className="users">
                <Table
                    columns={columns}
                    pagination={{total: "10", current: 1}}
                    dataSource={data}
                />
            </div>
        </>
    );
}

export default Users;
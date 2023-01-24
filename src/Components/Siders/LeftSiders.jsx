import {Menu} from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, {useEffect, useState} from 'react';
import {ApartmentOutlined, AudioOutlined, DesktopOutlined, MobileOutlined, RobotOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import Requests from "../../API/Requests";

const icons_categories = [<MobileOutlined/>, <RobotOutlined/>, <AudioOutlined/>, <DesktopOutlined/>,
    <ApartmentOutlined/>]

function transformItemCategory(key, label, icon, disabled) {
    return {
        key,
        label,
        icon,
        disabled
    }
}

const LeftSiders = () => {
    const [currentCategoryItem, setCurrentCategoryItem] = useState(0)
    const [categories, setCategories] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getCategories()
    }, [])

    const fetchCategories = async () => {
        const response = await Requests.getCategoriesRequest()
        return await response.json()
    }

    const getCategories = () => {
        fetchCategories().then(data => {
            const items = []
            data.map(d => {
                let isDisabled = true
                if (d.Id === 1) isDisabled = false
                items.push(transformItemCategory(d.Id, d.Title, icons_categories[d.Id - 1], isDisabled))
            })
            setCategories(items)
        })
    }

    const onClickCategory = (e) => {

        setCurrentCategoryItem(e.key)
        if (e.key == 1) navigate("/phone")
    }


    return (
        <>
            <Sider width={256} style={{
                background: '#ffffff',
                margin: 15,
                borderRadius: 5
            }}>
                <Menu
                    onClick={onClickCategory}
                    selectedKeys={[currentCategoryItem]}
                    style={{
                        borderRadius: 5
                    }}
                    mode="inline"
                    items={categories}
                />
            </Sider>
        </>
    )
}
export default LeftSiders
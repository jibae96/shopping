import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';

const { TextArea } = Input;

const CategoryName = [
    { key:1, value:"Tables" },
    { key:2, value:"Seats" },
    { key:3, value:"Shelves" },
    { key:4, value:"Lighting" },
    { key:5, value:"Accessories" }
]

function UploadProductPage(){

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Category, setCategory] = useState(1)
    const [Images, setImages] = useState([])

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const categoryChangeHandler = (event) => {
        setCategory(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <h2>가구 상품 업로드</h2>
            </div>
            <Form>
                {/* DropZone */}

                <FileUpload refreshFunction={updateImages} />

                <br/>
                <br/>
                <label>이름</label>
                <Input onChange={titleChangeHandler} value={Title}/>
                <br/>
                <br/>
                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description}/>
                <br/>
                <br/>
                <label>가격($)</label>
                <Input type="number" onChange={priceChangeHandler} value={Price}/>
                <br/>
                <br/>
                <select onChange={categoryChangeHandler}>
                    {CategoryName.map(item => (
                        <option key={item.key} value={Category}> {item.value} </option>
                    ))}
                </select>
                <br/>
                <br/>
                <Button>
                    확인   
                </Button>
            </Form>
        </div>
    )
}

export default UploadProductPage
import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const { TextArea } = Input;

const CategoryName = [
    { key:1, value:"Tables" },
    { key:2, value:"Seats" },
    { key:3, value:"Shelves" },
    { key:4, value:"Lighting" },
    { key:5, value:"Accessories" }
]

function UploadProductPage(props){

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

    const submitHandler = (event) => {
        event.preventDefault();

        if(!Title || !Description || !Price || !Category || !Images){
            return alert("빈칸을 모두 채워주세요.")
        }

        // 서버에 채운 값들을 request로 보낸다

        const body = {
            // 로그인된 사람의 ID
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            category: Category
        }

        Axios.post("/api/product", body)
            .then(response => {
                console.log("!!")
                if(response.data.success){
                    alert('상품 업로드에 성공했습니다.')
                    props.history.push('/')
                }else{
                    alert('상품 업로드에 실패했습니다')
                }
            })
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
                <select onChange={categoryChangeHandler} value={Category}>
                    {CategoryName.map(item => (
                        <option key={item.key} value={item.key}> {item.value} </option>
                    ))}
                </select>
                <br/>
                <br/>
                <Button type="submit" onClick={submitHandler}>
                    확인   
                </Button>
            </Form>
        </div>
    )
}

export default UploadProductPage
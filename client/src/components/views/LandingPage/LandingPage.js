import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from "axios"
import { Icon, Meta, Col, Card, Row, Carousel} from 'antd';
import ImageSlider from '../../utils/ImageSlider';

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)

    useEffect(() => {
        
        let body = {
            skip: Skip,
            limit: Limit
        }

        getProducts(body)

    }, [])

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if(response.data.success){
                    //console.log(response.data)
                    if(body.loadMore){
                        setProducts([...Products, ...response.data.productsInfo])
                    }else{
                        setProducts(response.data.productsInfo)
                    }
                    setPostSize(response.data.postSize)
                }else{
                    alert("상품들을 가져오는 데 실패했습니다.")
                }
            })
    }

    const loadMoreHandler = () => {

        let skip = Skip + Limit

        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }

        getProducts(body)
        setSkip(skip)

    }

    const renderCards = Products.map((product, index) => {

        console.log('product', product)

        return <Col lg={6} md={8} xs={24} key={index}>
        
        <Card
            cover={<ImageSlider images={product.images}/>}
        >
            <Card.Meta 
                title={product.title}
                description={`$${product.price}`}
            />
        </Card>
        </Col>
    })


    return (
        <div style={{ width:'75%', margin:'3rem auto' }}>
            <div style={{ textAlign:'center' }}>
                <h2>Let's Take a Look at Furnitures <Icon type="smile" /></h2>
            </div>

            {/* Filter */}

            {/* Search */}

            {/* Card */}

            <Row gutter={[16,16]}>
                {renderCards}
            </Row>

            <br/>

            {PostSize >= Limit && 
                <div style={{ textAlign:'center', justifyContent: 'center' }}>
                <button onClick={loadMoreHandler}>더보기</button>
            </div>
            }
            
        </div>
    )
}

export default LandingPage

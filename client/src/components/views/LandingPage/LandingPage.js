import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from "axios"
import { Icon, Meta, Col, Card, Row, Carousel} from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import Checkbox from './Sections/CheckBox';
import Radiobox from './Sections/RadioBox';
import { category, price } from './Sections/Datas';
import FileUpload from '../../utils/FileUpload';
import SearchFeature from './Sections/SearchFeature';


function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        category: [],
        price: []
    })
    const [SearchTerm, setSearchTerm] = useState("")

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
            cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images}/></a>}
        >
            <Card.Meta 
                title={product.title}
                description={`$${product.price}`}
            />
        </Card>
        </Col>
    })

    const showFilterResults = (filters) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters : filters
        }

        getProducts(body)
        setSkip(0)

    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for(let key in data) {
            if(data[key]._id === parseInt(value, 10)){
                array = data[key].array;
            }
        }
        return array;
    }

    // filter는 체크된 것들의 아이디들이 담겨져 있는 array가 담겨져 있음
    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters
        //console.log('filters', filters)
        
        if(category === "price") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }

        showFilterResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerm = (newSearchTerm) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerm(newSearchTerm)

        getProducts(body)

    }

    return (
        <div style={{ width:'75%', margin:'3rem auto' }}>
            <div style={{ textAlign:'center' }}>
                <h2>Let's Take a Look at Furnitures <Icon type="smile" /></h2>
            </div>

            {/* Filter */}

            <Row gutter={[16,16]}>
                <Col lg={12} xs={24} >
                    {/* CheckBox */}
                    <Checkbox list={category} handleFilters={filters => handleFilters(filters, "category")} />
                </Col>
                <Col lg={12} xs={24} >
                    {/* RadioBox */}
                    <Radiobox list={price} handleFilters={filters => handleFilters(filters, "price")} />
                </Col>
            </Row>
            
            <br/>
            

            {/* Search */}
            <div style={{ display:'flex', justifyContent:'flex-end', margin:'1rem auto' }}>
                <SearchFeature 
                    refreshFunction={updateSearchTerm}
                />
            </div>

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

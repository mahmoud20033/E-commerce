
import axios from 'axios';
import { Stars } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';
import { addData, addToCart } from '../Redux/appSlice';
import { Link } from 'react-router-dom';
const Product = () => {
    const [Product, setProduct] = useState([])
    const [Loading, setLoading] = useState(true)
    const [Error, setError] = useState(null)
    const dispatch = useDispatch()
    const cartProducts = useSelector((state) => state.appReducer.products)
    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then((res) => {
                setProduct(res.data)
                setLoading(false)
            })
    }, [])

    const colorRate = (rate) => {
        if (rate <= 1) {
            return 'red';
        } else if (rate <= 2) {
            return 'orange';
        } else if (rate <= 3) {
            return 'yellow';
        } else if (rate <= 4) {
            return 'green';
        } else {
            return 'blue';
        }
    }
    if (Loading) {
        return <LoadingSpinner duration={2000} color="blue" />
    }
    if (Error) {
        return <h2>{Error}</h2>
    }
    return (
        <div className="container">
            <div className="row">
                {Product.map((Product) => (
                    <div key={Product.id} className="col-lg-3 col-md-6 col-sm-12 mb-4">
                        <Card style={{ height: '100%' }}>
                            <Link to="/AllData"
                                onClick={() =>
                                    dispatch(
                                        addData({
                                            id: Product.id,
                                            title: Product.title,
                                            description: Product.description,
                                            category: Product.category,
                                            price: Product.price,
                                            image: Product.image,
                                            rate: Product.rating.rate,
                                        }))}
                            >
                                <Card.Img variant="top" src={Product.image} style={{ height: '180px', objectFit: 'contain', padding: '1rem' }} />
                            </Link>
                            <Card.Body className="d-flex flex-column">
                                <Card.Text className='text-l h-[50px] overflow-hidden	'>{Product.title}...</Card.Text>
                                < Row className='flex justify-center '>
                                    <Col>
                                        <Card.Text className='text-green-700 text-xl font-bold'>${Product.price}</Card.Text>
                                    </Col>
                                    <Col sm={4} className='flex items-center'  >
                                        <Card.Text style={{ color: colorRate(Product.rating.rate) }} className=' mr-1 text-xl font-bold'>{Product.rating.rate}</Card.Text>
                                        <Stars className='text-[#ffdd00] mb-[15px]' size={20} />
                                    </Col>
                                </Row>

                                <Card.Text>{Product.category}</Card.Text>
                                {cartProducts.find((item) => item.id === Product.id) ? (
                                    <Button variant="success"
                                        disabled={true}
                                        className="mt-auto w-100">
                                        added Successfully
                                    </Button>
                                ) : (
                                    <Button
                                        variant="primary" className="mt-auto w-100"
                                        onClick={() => dispatch(
                                            addToCart({
                                                id: Product.id,
                                                title: Product.title,
                                                description: Product.description,
                                                category: Product.category,
                                                price: Product.price,
                                                image: Product.image,
                                                rate: Product.rating.rate,
                                                quantity: 1
                                            }))}
                                    >
                                        Add to Cart
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Product
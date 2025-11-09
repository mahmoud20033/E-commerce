import { useDispatch, useSelector } from 'react-redux'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { ShoppingCart, X } from 'lucide-react'
import { decrementQuantity, deleteItem, deleteِAllItem, incrementQuantity } from '../Redux/appSlice'


const Cart = () => {
    const products = useSelector((state) => state.appReducer.products)
    const dispatch = useDispatch()
    


    return (
        <div className='cart-container h-full'>        {
            products.length === 0 ?
                (
                    <div className=" flex flex-col h-[400px] items-center justify-center cart container mt-4">
                        <h1>Your cart is empty</h1>
                        <ShoppingCart className='w-20 h-20' />
                    </div>
                ) :

                (
                    <div className="container mt-4 ">
                        <h4 className="mb-4">Shopping Cart</h4>
                        <div className='flex flex-col md:flex-row gap-6'>
                            <div className='flex-grow'>
                                {
                                    products.map((item) => (
                                        <div key={item.id} className="col-lg-12">
                                            <Card className=' relative p-2 sm:w-full md:w-[400px] lg:w-[800px]' >
                                                <X className=' absolute top-3 right-3 cursor-pointer' onClick={() => dispatch(deleteItem(item.id))} />
                                                <Row className='items-center' >
                                                    <Col lg={2} sm={12}>
                                                        <Card.Img variant="left" src={item.image} style={{ height: '150px', objectFit: 'contain', padding: '1rem' }} />
                                                    </Col>

                                                    <Col lg={5} sm={12}>
                                                        <Card.Text className='text-l m-0 h-[50px]'>{item.title}...</Card.Text>
                                                        <Card.Text className='text-green-700 text-xl font-bold'>${item.price}</Card.Text>
                                                    </Col>

                                                    <Col lg={2} sm={12} className='flex items-center  my-3'>
                                                        <Button

                                                            onClick={() => dispatch(decrementQuantity(item.id))}
                                                        >
                                                            -
                                                        </Button>
                                                        <Card.Text className='mx-2.5 my-0' >{item.quantity}</Card.Text>

                                                        <Button
                                                            onClick={() => dispatch(incrementQuantity(item.id))}
                                                        >
                                                            +
                                                        </Button>
                                                    </Col>
                                                    <Col lg={3} sm={12}>
                                                        <Card.Text className='text-blue-700 text-xl font-bold'>
                                                            Total : ${item.price * item.quantity}
                                                        </Card.Text>
                                                    </Col>
                                                </Row>

                                            </Card>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='flex flex-col items-center justify-center  Delete '>
                                <Card.Text className='mx-2 my-0 font-bold' >
                                    Total Produt Price
                                    <span className='text-red-800' >
                                        : ${
                                            products.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                                    </span>
                                </Card.Text>
                                <button
                                    className='bg-red-600 text-white px-4 py-2  rounded-md mx-0 mt-2 hover:bg-red-700 transition-colors '
                                    onClick={() => dispatch(deleteِAllItem())}
                                    variant='danger'>
                                    DeleteAll
                                </button>
                            </div>
                        </div>
                    </div >
                )
        }
        </div>
    )

}

export default Cart
import { useDispatch, useSelector } from "react-redux"
import { Card, Row, Col, Button } from "react-bootstrap"
import { addToCart } from "../Redux/appSlice"

const AllData = () => {
    const selectedProduct = useSelector((state) => state.appReducer.selectedProduct)
    const dispatch = useDispatch()

    return (
        <>
            {
                !selectedProduct ? (
                    <div className="container mt-5"><p>No product selected. Click on a product image to view details.</p></div>

                )
                    :
                    (

                        <div className="container mt-5">
                            <h2 className="mb-4">Product Details</h2 >
                            <Row>
                                <Col lg={8} md={12}>
                                    <Card>
                                        <Card.Img variant="top" src={selectedProduct.image} style={{ height: '400px', objectFit: 'contain', padding: '2rem' }} />
                                        <Card.Body>
                                            <Card.Title className="mb-3">{selectedProduct.title}</Card.Title>
                                            <Card.Text className="text-muted mb-3">{selectedProduct.category}</Card.Text>
                                            <Card.Text className="text-justify mb-3">{selectedProduct.description}</Card.Text>
                                            <Row className="mt-4">
                                                <Col>
                                                    <Card.Text className="mb-0 font-bold ">
                                                        Price :
                                                        <span className="text-red-700 mx-1"> {selectedProduct.price} </span>
                                                    </Card.Text>
                                                </Col>
                                                <Col>
                                                    <Card.Text className="mb-0 font-bold">
                                                        Rating :
                                                        <span className="text-blue-700 mx-1">
                                                            {selectedProduct.rate}
                                                        </span>
                                                        /5
                                                    </Card.Text>
                                                </Col>
                                                <Button variant="primary" className="mt-auto"
                                                    onClick={() => dispatch(
                                                        addToCart({
                                                            id: selectedProduct.id,
                                                            title: selectedProduct.title,
                                                            description: selectedProduct.description,
                                                            category: selectedProduct.category,
                                                            price: selectedProduct.price,
                                                            image: selectedProduct.image,
                                                            rate: selectedProduct.rate,
                                                            quantity: 1
                                                        }))}
                                                >
                                                    Add to Cart
                                                </Button>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </div >
                    )

            }
        </>
    )
}

export default AllData
import React from 'react'
import axios from 'axios';
import {

    Card,
    CardHeader,
    Container,
    Row,
    FormGroup,
    Form,
    Input,
    Col,
    Button,
    
} from "reactstrap";
import Header from 'components/Headers/Header';
import CardBody from 'reactstrap/lib/CardBody';
import { ToastContainer, toast } from 'react-toastify';
import Table from 'reactstrap/lib/Table';


function PaymentRates() {
    const [pricedetails, setPricedetails] = React.useState([]);
    const [action,setAction] = React.useState('create')
    const initialvalues = {
        id: '',
        tier: '',
        validity: '',
        price: '',
        services: ''
    }
    const [paymentvals, setPaymentvals] = React.useState(initialvalues)


    // const handleCheckchange = (e) => {
    //     let valid = e.target.id;
    //     let valchecked = e.target.checked;

    //     var somesubsupdated = pricedetails.filter((val, key) => {

    //         return [pricedetails, (val.id).toString() === valid.toString() ? val.ischecked = valchecked : val.ischecked]


    //     });

    //     setPricedetails(somesubsupdated);

    // }

    // const handleAllChecked = (event) => {

    //     var respplans = pricedetails.map(val => (
    //         { ...val, ischecked: event.target.checked }
    //     ))

    //     setPricedetails(respplans)

    // }

    const fetchpayment = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        };

        try {
            await axios.get('https://app.kiranvoleti.com/paymentrates/', config).then(res => {
                setPricedetails(res.data.response)
            })


        } catch (err) {
            console.log(err)

        }
    }


    React.useEffect(() => {
        fetchpayment();
    }, [])

    const onhandleEdit = (e) => {
        setAction('update')
        var updated = pricedetails.filter((val) => +val.id === +e.target.id);
        updated.map(val => {
            return setPaymentvals({
                ...paymentvals,
                id:val.id,
                tier: val.tier,
                validity: val.validity,
                price: val.price,
                services: val.services
            })

        })



    }
   

    const handleOnChange = (e) => {
        setPaymentvals({
            ...paymentvals,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const form_data = new FormData();
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }
        form_data.append('id', paymentvals.id)
        form_data.append('tier', paymentvals.tier)
        form_data.append('validity', paymentvals.validity)
        form_data.append('price', paymentvals.price)
        form_data.append('services', paymentvals.services)
        form_data.append('action', action)

        try {
            await axios.post('https://app.kiranvoleti.com/entrypayment/', form_data, config)
            .then(res=>{
                fetchpayment();
                setAction('create')
                setPaymentvals(initialvalues)
                tosttrigger('Successfully Inserted', 'success')
            })
            
            

        } catch (err) {
            
            tosttrigger('Something is went wrong', 'error')

        }

    }

    // updateSubmit

    
    // delete
    const onhandleDelete = async (e) => {
        e.preventDefault();

        const form_data = new FormData();
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }
        form_data.append('id', e.target.id)
        form_data.append('action', 'delete')

        try {
            await axios.post('https://app.kiranvoleti.com/entrypayment/', form_data, config)
            .then(res=>{
                fetchpayment()
                setPaymentvals(initialvalues)
                tosttrigger('Successfully Deleted', 'success')

            })
            
            

        } catch (err) {
            
            tosttrigger('Something is went wrong', 'error')

        }

    }
    // End UpdateSubmit

    function tosttrigger(msg, status) {
        if (status === "success") {

            toast.success(msg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } else {
            toast.error(msg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }
    }


    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Payment Plans</h3>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleOnSubmit}>
                                    <Row>
                                        <Col md="6">
                                            <FormGroup>
                                                <Input
                                                    name="tier"
                                                    placeholder="Tier Name"
                                                    type="text"
                                                    onChange={handleOnChange}
                                                    value={paymentvals.tier}
                                                />
                                            </FormGroup>

                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <Input
                                                    name="validity"
                                                    placeholder="validity in years"
                                                    type="text"
                                                    onChange={handleOnChange}
                                                    value={paymentvals.validity}
                                                />

                                            </FormGroup>

                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <Input
                                                    name="price"
                                                    placeholder="price"
                                                    type="text"
                                                    onChange={handleOnChange}
                                                    value={paymentvals.price}
                                                />

                                            </FormGroup>

                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <Input
                                                    name="services"
                                                    placeholder="services"
                                                    type="text"
                                                    onChange={handleOnChange}
                                                    value={paymentvals.services}
                                                />

                                            </FormGroup>

                                        </Col>

                                    </Row>
                                    <Button color="default" type="submit" style={{ borderRadius: '3%' }}>
                                       {action === "create" ? 'Create':'Update'}
                                        </Button>
                                        <Button color="default" onClick={(e) => {setPaymentvals(initialvalues); setAction('create')}} type="button" style={{ borderRadius: '3%' }}>
                                       Reset
                                        </Button>
                                   
                                </Form>

                                <br></br>


                                {/* Table */}
                                <Table className="align-items-center table-flush" responsive>

                                    <thead className="thead-light">
                                        <tr>
                                            

                                            {/* <th scope="col">Name</th> */}
                                            <th scope="col">Tier</th>
                                            <th scope="col">Validity (Yr) </th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Services</th>
                                            <th scope="col">Actions</th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        {pricedetails.map(row => (
                                            <tr key={row.id}>

                                                
                                                <td>{row.tier}</td>
                                                <td>{row.validity}</td>
                                                <td>{row.price}</td>
                                                <td>{row.services}</td>
                                                <td><Button color="primary" type="button" style={{ borderRadius: '3%' }}
                                                    onClick={onhandleEdit}
                                                    id={row.id}
                                                >
                                                    Edit
                                        </Button>
                                                    <Button onClick={onhandleDelete} id={row.id} color="danger" type="button" style={{ borderRadius: '3%' }}>
                                                        Delete
                                        </Button></td>
                                            </tr>
                                        ))}
                                    </tbody>


                                </Table>

                                {/* Table */}

                            </CardBody>
                        </Card>
                    </div>


                </Row>

            </Container>
        </>
    )
}

export default PaymentRates

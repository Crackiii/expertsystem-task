import React, { Fragment, useState } from 'react';
import './index.scss'
import Select from 'react-select';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    CustomInput
} from 'reactstrap';
import { TwitterPicker } from 'react-color';
import {
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux'


const FormModal = (props) => {

    let [displayColorPicker, setDisplayColorPicker] = useState(false)
    let [choosenColor, setchoosenColor] = useState('#eee');
    let [formData, setFormData] = useState({
        flag_type: '',
        flag_name: '',
        flag_tag: '',
        flag_date: '',
        flag_color: '',
        flag_cats: []
    })

    const handleClick = () => setDisplayColorPicker(!displayColorPicker)
    const handleClose = () => setDisplayColorPicker(false)

    const handleColorPick = (event) => {
        let rgba = event.rgb;
        let color = `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
        handleFormInputs({
            target: {
                name: 'flag_color',
                value: color
            }
        })
        setchoosenColor(color)
        setDisplayColorPicker(false)
    }

    const handleSelect = (event, value) => {
        let v = event.map(item => item.label)
        handleFormInputs({
            target: {
                name: value.name,
                value: v
            }
        })
    }

    const handleCheckBox = (event) => {
        handleFormInputs({
            target: {
                name: event.target.name,
                value: event.target.checked
            }
        })
    }

    const handleFormInputs = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
        // if (event.target.name === 'flag_type') {
        //     filterCats(event.target.value)
        // }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.submitForm(formData)
        props.updateFlags(formData)
    }

    // const filterCats = (type) => {
    //     let flag = Object.values(props.flags).filter(flag => flag.title.toLowerCase() === type);

    //     if (flag[0].categories.length > 0) {
    //         setCats(flag[0].categories.map(category => {
    //             return {
    //                 value: category,
    //                 label: category
    //             }
    //         }))
    //     } else {
    //         setCats(flag[0].categories);
    //     }
    // }


    const popover = {
        position: 'absolute',
        zIndex: '2',
        left: '32%',
        top: '100%'
    }
    const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    }
    return (
        <Fragment>
            <Modal isOpen={true}>
                <ModalHeader>
                    Edit Flag
                    <div className='modal_closer' onClick={props.resetClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </ModalHeader>
                <Form onSubmit={handleSubmit}>
                    <ModalBody>

                        <FormGroup>
                            <div className="radios_wrapper">
                                <CustomInput type="radio" id="radio1" name="flag_type"
                                    label="Job" onChange={handleFormInputs} value='job' />
                                <CustomInput type="radio" id="radio2" name="flag_type"
                                    label="Loan Cars" onChange={handleFormInputs} value='loan cars' />
                                <CustomInput type="radio" id="radio3" name="flag_type"
                                    label="Tasks" onChange={handleFormInputs} value='tasks' />
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="flagName" sm={3}>Flag Name</Label>
                            <Col sm={9}>
                                <Input type="text" name="flag_name" id="flagName"
                                    placeholder="Flag Name" onChange={handleFormInputs} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="shortTag" sm={3}>Short Tag</Label>
                            <Col sm={5}>
                                <Input type="text" name="flag_tag" id="shortTag"
                                    placeholder="Tag" onChange={handleFormInputs} />
                            </Col>
                            <Col sm={4}>
                                <div className='color_picker_wrapper'>
                                    <div className='color_display' style={{ 'background': choosenColor }}></div>
                                    <Button color="primary btn-wide" size='sm' onClick={(event) => handleClick(event)}> Pick Color</Button>
                                    {
                                        displayColorPicker ? <div style={popover}>
                                            <div style={cover} onClick={(event) => handleClose(event)} />
                                            <TwitterPicker onChange={(event) => handleColorPick(event)} />
                                        </div> : null
                                    }
                                </div>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="checkbox" sm={3}>Checkbox</Label>
                            <Col sm={9}>
                                <div className='checkbox_wrapper'>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" id="checkbox" name='flag_date' onChange={handleCheckBox} />{' '}Date Applicable</Label>
                                    </FormGroup>
                                </div>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="categories" sm={3}>Category/s</Label>
                            <Col sm={9}>
                                {
                                    <Select
                                        name='flag_cats'
                                        isMulti={true}
                                        onChange={(event, value) => handleSelect(event, value)}
                                        options={[
                                            { value: 'aaa', label: 'aaa' },
                                            { value: 'bbb', label: 'bbb' },
                                            { value: 'ccc', label: 'ccc' },
                                            { value: 'ddd', label: 'ddd' },
                                            { value: 'eee', label: 'eee' },
                                            { value: 'fff', label: 'fff' },
                                            { value: 'ggg', label: 'ggg' }
                                        ]}
                                        theme={theme => ({
                                            ...theme,
                                            colors: {
                                                ...theme.colors,
                                                neutral10: '#545dd836',
                                                neutral80: '#545cd8',
                                            }
                                        })}
                                    />
                                }
                            </Col>
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button type='reset' onClick={props.resetClose}>Cancel</Button>
                        <Button color="primary" type='submit'>Save</Button>{' '}
                    </ModalFooter>
                </Form>
            </Modal>
        </Fragment >
    )
};

const mapStateToProps = (state) => {
    return {
        flags: state.FlagsReducer.flags,
        form: state.FlagsReducer.formData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitForm: (payload) => { dispatch({ type: 'FORM_SUBMITTED', payload }) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FormModal);
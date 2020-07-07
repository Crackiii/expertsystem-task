import React, { Fragment, useState } from 'react';
import './index.scss'
import SingleFlag from './SingleFlag/single_flag';
import Modal from './modal'
import { toggleModal, resetClose, updateFlags, showOccurrence } from './functions'
import { connect } from 'react-redux'


const Flags = (props) => {
    let [showModal, setShowModal] = useState(false)
    return (
        <Fragment>
            <div className="app-main__inner">
                <h1>Flags</h1>
                <div className='flags_wrapper'>
                    {
                        Object.values(props.flags).map((flag, i) => {
                            return (
                                <SingleFlag
                                    showOccurrence={(data, event) => showOccurrence(data, event, props)}
                                    click={() => toggleModal(showModal, setShowModal)}
                                    {...flag}
                                    key={i}
                                />
                            )
                        })
                    }
                </div>
                {
                    showModal ? <Modal
                        resetClose={() => resetClose(showModal, setShowModal)}
                        updateFlags={(data) => updateFlags(props, data)}
                    /> : null
                }

            </div >
        </Fragment >
    )
};

const mapStateToProps = (state) => {
    return {
        flags: state.FlagsReducer.flags
    }
}

const mapDisptachToProps = (dispatch) => {
    return {
        updateFlags: (payload) => { dispatch({ type: "UPDATE_FLAGS", payload }) }
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(Flags);
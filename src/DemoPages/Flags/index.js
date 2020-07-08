import React, { Fragment, useState, useEffect } from 'react';
import './index.scss'
import SingleFlag from './SingleFlag/single_flag';
import Modal from './modal'
import { toggleModal, resetClose, getFlags, showOccurrence } from './functions'
import { connect } from 'react-redux'
import { __fetch } from './services/fetch'

const onDragEnd = (event, _context, props) => {

    let list = Object.values(props.flags).filter(flag => flag.title === _context)
    let result = Array.from(list[0].items);
    const [removed] = result.splice(event.source.index, 1);
    console.log(result)
    result.splice(event.destination.index, 0, removed);
    result = result.map((item, i) => {
        item.pos = i + 1;
        return item;
    })

    list[0].items = [...result]
    props.updateFlags({
        ...props.flags,
        [_context.toLowerCase()]: {
            ...list[0]
        }
    })

    setTimeout(() => {
        console.log("CALL MADE AFTER THREE SECONDS...")
        updatePositionsOnBackend(result)
    }, 3000)

}

const updatePositionsOnBackend = async (data) => {
    let transformedData = data.map(item => ({ id: item.id, pos: item.pos }))
    let payload = {
        flags: {
            ...transformedData
        }
    }
    let result = await __fetch("/update_positions", "PUT", payload)
    console.log(result)
}


const Flags = (props) => {
    let [showModal, setShowModal] = useState(false)

    useEffect(() => {
        getFlags(props)
    }, [])

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
                                    onDragEnd={(event, _context) => onDragEnd(event, _context, props)}
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
                        updateFlags={(data) => getFlags(props, data)}
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
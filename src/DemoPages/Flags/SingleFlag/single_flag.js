import React, { Fragment } from 'react';
import Category from '../Category/category';
import Item from '../Item/item'
import './single_flag.scss'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const handleData = (event, props) => {
    props.showOccurrence(event, props)
}

const handleDragEnd = (event, props) => {
    props.onDragEnd(event, props.title)
}

const SingleFlag = (props) => {
    return (
        <Fragment>
            <div className='flag_wrap' >
                <div className={'flag_head'}>
                    <div className='flag_title'>{props.title}</div>
                    <div className='flad_add' onClick={props.click}> <i className="lnr-plus-circle btn-icon-wrapper"> </i> Add </div>
                </div>
                <div className='flag_categories'>
                    {
                        props.transformed.map((category, i) => {
                            return (
                                <Category key={i} data={category} click={(event) => handleData(event, props)} />
                            )
                        })
                    }

                </div>
                <DragDropContext onDragEnd={(event,) => handleDragEnd(event, props)}>
                    <Droppable droppableId="droppable" direction="horizontal">
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} style={{ display: 'flex', overflow: 'scroll', }}>
                                {
                                    props.items.map((item, i) => {
                                        return (
                                            <Draggable key={item.id.toString()} draggableId={item.id.toString()} index={i}>
                                                {(provided, snapshot) => (
                                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{ ...provided.draggableProps.style }}>
                                                        <Item key={i} data={item} />
                                                    </div>
                                                )
                                                }
                                            </Draggable>
                                        )
                                    })
                                }
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </Fragment >
    )
}

export default SingleFlag;
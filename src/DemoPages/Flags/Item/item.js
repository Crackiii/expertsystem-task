import React, { Fragment } from 'react';
import './item.scss'


const Item = (props) => {
    return (
        <Fragment>
            <div className='item_wrap' style={{ border: props.data.border }}>
                <div className='item_title' style={{ background: `#${props.data.colour}` }}>{props.data.tag}</div>
                <div className='item_text'>{props.data.name}</div>
            </div>
        </Fragment>
    )
}

export default Item;
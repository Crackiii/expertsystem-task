import React, { Fragment } from 'react';
import './category.scss'


const Category = (props) => {
    return (
        <Fragment>
            <div className='category_wrap' onClick={props.click}>
                <div className='category_count'>{props.data.count}</div>
                <div className='category_text'>{props.data.item}</div>
            </div>
        </Fragment>
    )
}

export default Category;
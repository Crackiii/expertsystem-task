import React, { Fragment } from 'react';
import Category from '../Category/category';
import Item from '../Item/item'
import './single_flag.scss'

const handleData = (event, props) => {
    props.showOccurrence(event, props)
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
                        props.tranformed.map((category, i) => {
                            return (
                                <Category key={i} data={category} click={(event) => handleData(event, props)} />
                            )
                        })
                    }

                </div>
                <div>
                    {
                        props.items.map((item, i) => {
                            return (
                                <Item key={i} data={item} />
                            )
                        })
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default SingleFlag;
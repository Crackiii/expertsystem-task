export const toggleModal = (showModal, setShowModal) => {
    setShowModal(!showModal)
}

export const resetClose = (showModal, setShowModal) => {
    setShowModal(!showModal)
}

export const matchSingleObjectList = (list, obj) => {
    return Object.values(list)
        .filter(flag => obj.toLowerCase() === flag.title.toLowerCase())
}

export const getDistinctArray = (oldArray, newArray) => {
    return [...oldArray, ...newArray.filter(item => !oldArray.includes(item))]
}

export const updateFlags = (props, form) => {

    let flag = matchSingleObjectList(props.flags, form.flag_type)

    flag[0].categories = getDistinctArray(flag[0].categories, form.flag_cats)

    flag[0].tranformed = [...flag[0].categories.map(item => ({ item: item, count: 0 }))]


    flag[0].items.push({
        color: form.flag_color,
        icon: form.flag_tag,
        title: form.flag_name,
        categories: form.flag_cats,
        border: '2px dashed transparent'
    })

    flag[0].tranformed = [...flag[0].tranformed.map(trans => {
        let result = 0
        flag[0].items.map(item => {
            if (item.categories.includes(trans.item)) {
                result += 1;
            }
        })
        return {
            item: trans.item,
            count: result
        }
    }).sort((a, b) => a.item < b.item ? -1 : 1)]

    props.updateFlags({
        ...props.flags,
        [flag[0].title.toLowerCase()]: {
            ...flag[0]
        }
    })

}

export const applyStyles = (items, currentItem) => {
    let cs = Array.prototype.slice.call(items, 0);

    cs.forEach(el => {
        el.querySelector('.category_count').style.background = '#a5a5a5'
        el.querySelector('.category_count').style.color = '#000'
        el.querySelector('.category_text').style.color = '#000'
    })

    currentItem.querySelector('.category_count').style.background = '#545cd8'
    currentItem.querySelector('.category_count').style.color = '#fff'
    currentItem.querySelector('.category_text').style.color = '#545cd8'
}

export const showOccurrence = (event, data, props) => {

    applyStyles(event.target.parentElement.parentElement.children, event.target.parentElement)

    let context = Object.values(props.flags).filter(flag => flag.title === data.title);

    context[0].items = context[0].items.map(item => {
        if (item.categories.includes(event.target.textContent)) {
            item.border = '2px dashed #545cd8';
        } else {
            item.border = '2px dashed transparent';
        }
        return item;
    })

    props.updateFlags({
        ...props.flags,
        [data.title.toLowerCase()]: {
            ...context[0]
        }
    })
}



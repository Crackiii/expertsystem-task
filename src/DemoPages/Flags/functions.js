import { __fetch } from './services/fetch'
export const toggleModal = (showModal, setShowModal) => {
    setShowModal(!showModal)
}

export const resetClose = (showModal, setShowModal) => {
    setShowModal(!showModal)
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


export const componentToHex = (c) => {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export const rgbToHex = (r, g, b) => {
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export const getFlags = async (props) => {
    let result = await __fetch(null, "GET", null)

    let r = tranformFlagsForView(result.data)
    props.updateFlags({ ...r })
}

export const tranformFlagsForView = (data) => {
    let jobs = [];
    let carLoans = [];
    let tasks = [];

    data.forEach(datum => {
        if (datum.type === 'job') {
            jobs.push(datum)
        } else if (datum.type === 'loan_car') {
            carLoans.push(datum)
        } else {
            tasks.push(datum)
        }
    })

    return {
        'job': {
            title: 'Job',
            ...createTransformedObject(jobs)
        },
        'loan cars': {
            title: 'Loan Cars',
            ...createTransformedObject(carLoans)
        },
        'tasks': {
            title: 'Tasks',
            ...createTransformedObject(tasks)
        }
    }
}

export const createTransformedObject = (data) => {

    let distictCategories = getDistinctItems(data);
    let occurrences = findOccurrence(distictCategories, data);

    return {
        categories: distictCategories,
        items: [...data].sort((a, b) => a.pos < b.pos ? -1 : 1),
        transformed: [...occurrences]
    }
}

export const getDistinctItems = (flags) => {
    let results = []
    flags.forEach(flag => {
        let filtered = flag.categories.filter(item => !results.includes(item))
        results = [...results, ...filtered]
    })
    return results.sort((a, b) => a < b ? -1 : 1);
}

export const convertToKeyValue = (array) => {
    return array.map(item => ({ item, count: 0 }))
}

export const findOccurrence = (distictCategories, data) => {
    let convertedDistinctCats = convertToKeyValue(distictCategories)

    let results = convertedDistinctCats.map(item => {
        let count = data.filter(datum => datum.categories.includes(item.item)).length;

        return {
            item: item.item,
            count
        }
    })

    return results
}


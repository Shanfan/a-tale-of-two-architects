export default function (selector) {
    let el

    if (typeof selector === 'string') {
        el = document.querySelector(selector).getBoundingClientRect()
    } else if (selector instanceof HTMLElement) {
        el = selector.getBoundingClientRect()
    }

    return {
        top: el.top,
        bottom: el.bottom,
        height: el.height,
        width: el.width
    }
}
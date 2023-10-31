export default function (selector) {
    const el = document.querySelector(selector).getBoundingClientRect()
    return {
        top: el.top,
        bottom: el.bottom,
        height: el.height,
        width: el.width
    }
}
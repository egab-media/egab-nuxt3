/**
 * @function excessiveWork
 * placed heavy logic in here
 */

function excessiveWork ({ rules, errs }) {
    const perRule = 100 / rules.length
    const progress = Math.min(100, 100 - ((errs.length) * perRule))
    self.postMessage(progress)
}

self.addEventListener('message', ({ data }) => {
    const { rules, errs } = data
    excessiveWork({ rules, errs })
})

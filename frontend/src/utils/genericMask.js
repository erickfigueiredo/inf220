const genericMask = (value, pattern) => {
    const vl = value.toString();

    if (vl.length != (pattern.match(/#/g) || []).length) return false;

    let i = 0;

    return pattern.replace(/#/g, ()=> vl[i++] || '');
}

module.exports = genericMask;


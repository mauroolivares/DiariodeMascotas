exports.generarID = () => {
    return (Math.round(Math.random() * (65536 - 1) + (1))).toString();
}

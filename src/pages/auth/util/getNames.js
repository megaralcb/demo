function capitalizeFirstLetter(string) {
    return string
        .charAt(0)
        .toUpperCase() + string.slice(1);
}

export const getNames = (fullName) => {
    const matches = /(\S*)([\\s\\'-]\S*)*/gm.exec(fullName);
    try {
        return capitalizeFirstLetter(matches[0])
    } catch (err) {
        return matches[0]
    }
}

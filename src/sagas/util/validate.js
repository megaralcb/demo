/*

    Description:
        Validate is used in a RRF saga to cycle through RRF errors.

    Params:
        action = {},    from saga
        model = "",     from form

    Returns:
        bool,           true if no errors

    Example:
        const validate = validate(action, "forms.signUp.password")

*/

export const validate = (action, model) => {
    let validate = true;
    if (action.model === model) {
        if (action.actions[0].type === "rrf/setErrors" && action.actions[1].type === "rrf/change") {
            const errorValues = Object.values(action.actions[0].errors);
            for (let i = 0; i < errorValues.length; i++) {
                if (errorValues[i]) {
                    validate = false;
                }
            }
        } else {
            validate = false;
        }
    }
    return validate
}
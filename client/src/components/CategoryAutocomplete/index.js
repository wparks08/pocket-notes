import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import PropTypes from "prop-types";
import API from "../../utils/API";
import store from "../../store";

const filter = createFilterOptions();

function CategoryAutocomplete(props) {
    const [value, setValue] = useState(null);
    const { categories, setCategories, handleCategoryChange, initialValue } = props;
    const username = store.getState().auth.user.email;
    useEffect(() => {
        if (initialValue) {
            setValue(initialValue);
        }
    }, [initialValue]);

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                if (newValue && newValue.inputValue) {
                    API.saveCategory({
                        username: username,
                        category: newValue.inputValue
                    }).then(newCategory => {
                        setCategories([...categories, newCategory.data]);
                        setValue(newCategory.data);
                        handleCategoryChange(newCategory.data);
                    });
                    return;
                }
                handleCategoryChange(newValue);
                setValue(newValue);
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);
                if (params.inputValue !== "") {
                    filtered.push({
                        inputValue: params.inputValue,
                        category: `Add "${params.inputValue}"`
                    });
                }

                return filtered;
            }}
            id="free-solo-with-text-demo"
            options={categories}
            getOptionLabel={option => {
                // e.g value selected with enter, right from the input
                if (typeof option === "string") {
                    return "";
                }
                if (option.inputValue) {
                    return option.inputValue;
                }
                return option.category;
            }}
            renderOption={option => option.category}
            freeSolo
            renderInput={params => (
                <TextField
                    {...params}
                    label="Category"
                    helperText="Select a category or enter a new one"
                    required
                    fullWidth
                />
            )}
        />
    );
}

CategoryAutocomplete.propTypes = {
    categories: PropTypes.array,
    setCategories: PropTypes.func,
    handleCategoryChange: PropTypes.func,
    initialValue: PropTypes.object
};

export default CategoryAutocomplete;

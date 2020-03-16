import React, { useEffect, useState } from "react";
import PocketTable from "../PocketTable";
import API from "../../utils/API";
import CategoryRow from "../CategoryRow";

const headCells = [
    { id: "category", numeric: false, label: "Category" },
    { id: "actions", numeric: true, label: "Actions" }
];

function CategoryTable({ reload, setReload }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = () => {
            API.getCategories("johnsmith")
                .then(response => setCategories(response.data))
                .catch(err => console.log(err));
        };

        loadCategories();
    }, []);

    useEffect(() => {
        if (reload) {
            loadCategories();
            setReload(false);
        }
    }, [reload, setReload]);

    const handleDelete = id => {
        API.deleteCategory(id)
            .then(() => {
                loadCategories();
            })
            .catch(err => console.log(err));
    };

    const loadCategories = () => {
        API.getCategories("johnsmith")
            .then(response => setCategories(response.data))
            .catch(err => console.log(err));
    };

    const displayCategoryRow = category => {
        return <CategoryRow key={category._id} category={category} handleDelete={handleDelete} />;
    };

    return (
        <PocketTable
            items={categories}
            headers={headCells}
            displayRow={displayCategoryRow}
            orderBy="category"
            order="asc"
        />
    );
}

export default CategoryTable;

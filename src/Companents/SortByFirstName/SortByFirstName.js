import React, {useState, useEffect} from "react";

const SortByFirstName = (props) => {

    const [value, setValue] = useState("Сортировка по алфавиту");

    const firstSorting = () => {
        console.log(props.items)
        props.items.sort((a,b) => {
            return a.name.first.localeCompare(b.name.first)
        })
    }

    useEffect(() => {firstSorting()}, [])

    const sortByName = (e) => {
        setValue(e.target.value)
        props.items.sort((a, b) => {
            if (value === "Сортировка по алфавиту") {
                return b.name.first.localeCompare(a.name.first)
            } else if (value === "Обратная сортировка") {
                return a.name.first.localeCompare(b.name.first)
            }
            return props.items;
        })
    }

    return (
        <select name="sort-select" id="sort-select" onChange={sortByName}>
            <option value="Сортировка по алфавиту">Сортировка по алфавиту</option>
            <option value="Обратная сортировка">Обратная сортировка</option>
        </select>
    )
}

export default SortByFirstName;

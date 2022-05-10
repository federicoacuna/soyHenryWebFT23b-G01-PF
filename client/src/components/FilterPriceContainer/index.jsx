import React from "react";

const FilterPriceContainer = () => {
    return (
        <form>
            <select>
                <option value="all">Mas relevantes</option>
                <option value="minPrice">Menor precio</option>
                <option value="maxPrice">Mayor precio</option>
            </select>
        </form>
    )
}
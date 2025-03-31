import React, { useState } from "react";

interface Supply {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

const Supplys: React.FC = () => {
    const [supplies, setSupplies] = useState<Supply[]>([]);
    const [newSupply, setNewSupply] = useState<Supply>({
        id: 0,
        name: "",
        quantity: 0,
        price: 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewSupply({ ...newSupply, [name]: name === "quantity" || name === "price" ? Number(value) : value });
    };

    const addSupply = () => {
        setSupplies([...supplies, { ...newSupply, id: Date.now() }]);
        setNewSupply({ id: 0, name: "", quantity: 0, price: 0 });
    };

    const updateSupply = (id: number) => {
        const updatedSupplies = supplies.map((supply) =>
            supply.id === id ? newSupply : supply
        );
        setSupplies(updatedSupplies);
        setNewSupply({ id: 0, name: "", quantity: 0, price: 0 });
    };

    const deleteSupply = (id: number) => {
        setSupplies(supplies.filter((supply) => supply.id !== id));
    };

    return (
        <div>
            <h1>Supply Management</h1>
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newSupply.name}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={newSupply.quantity}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newSupply.price}
                    onChange={handleInputChange}
                />
                <button onClick={addSupply}>Add Supply</button>
            </div>
            <table border="1" style={{ marginTop: "20px", width: "100%" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {supplies.map((supply) => (
                        <tr key={supply.id}>
                            <td>{supply.name}</td>
                            <td>{supply.quantity}</td>
                            <td>{supply.price}</td>
                            <td>
                                <button onClick={() => setNewSupply(supply)}>Edit</button>
                                <button onClick={() => deleteSupply(supply.id)}>Delete</button>
                                {newSupply.id === supply.id && (
                                    <button onClick={() => updateSupply(supply.id)}>Save</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Supplys;
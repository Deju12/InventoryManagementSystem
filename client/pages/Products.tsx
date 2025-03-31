import React, { useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([
        { id: 1, name: 'Product 1', price: 100, quantity: 10 },
        { id: 2, name: 'Product 2', price: 200, quantity: 5 },
    ]);

    const [newProduct, setNewProduct] = useState<Product>({
        id: 0,
        name: '',
        price: 0,
        quantity: 0,
    });

    const handleAddProduct = () => {
        setProducts([...products, { ...newProduct, id: Date.now() }]);
        setNewProduct({ id: 0, name: '', price: 0, quantity: 0 });
    };

    const handleDeleteProduct = (id: number) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    const handleEditProduct = (id: number, updatedProduct: Product) => {
        setProducts(
            products.map((product) =>
                product.id === id ? { ...product, ...updatedProduct } : product
            )
        );
    };

    return (
        <div>
            <h1>Products</h1>
            <table border="1" style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <button onClick={() => handleDeleteProduct(product.id)}>
                                    Delete
                                </button>
                                <button
                                    onClick={() =>
                                        handleEditProduct(product.id, {
                                            ...product,
                                            name: prompt('Enter new name', product.name) || product.name,
                                            price: parseFloat(
                                                prompt('Enter new price', product.price.toString()) || product.price.toString()
                                            ),
                                            quantity: parseInt(
                                                prompt('Enter new quantity', product.quantity.toString()) || product.quantity.toString()
                                            ),
                                        })
                                    }
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Add Product</h2>
            <input
                type="text"
                placeholder="Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                    setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
                }
            />
            <input
                type="number"
                placeholder="Quantity"
                value={newProduct.quantity}
                onChange={(e) =>
                    setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })
                }
            />
            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default Products;
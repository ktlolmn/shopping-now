async function loadOrder() {
    try {
        const response = await fetch(`${api}?action=order`);
        const orders = await response.json();
        console.log(orders)
    } catch (error) {
        console.error('Error loading products:', error);
    }
}


async function deleteProduct() {
    if (!selectedProductRow) return;
    if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;

    const formData = new FormData();
    formData.append('action', 'delete');
    formData.append('row', selectedProductRow);

    try {
        await fetch(api, {
            method: 'POST',
            body: formData
        });
        loadProducts();
        closeModal();
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}

function editProduct() {
    const product = currentProducts.find(p => p.row === selectedProductRow);
    if (!product) return;

    document.getElementById('productName').value = product['Tên sản phẩm'];
    document.getElementById('productPrice').value = product['Giá'];
    document.getElementById('productImage').value = product['Ảnh'];
    document.getElementById('productDesc').value = product['Mô tả'];
    closeModal();
}
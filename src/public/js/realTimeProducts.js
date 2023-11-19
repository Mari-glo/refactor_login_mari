const socket = io()
alert("Entrando a mi tienda online");
document.getElementById('prod-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const titleInput = document.getElementById('Title');
    const title = titleInput.value;
    titleInput.value = '';

    const descriptionInput = document.getElementById('description');
    const description = descriptionInput.value;
    descriptionInput.value = '';

    const codeInput = document.getElementById('code');
    const code = codeInput.value;
    codeInput.value = '';

    const priceInput = document.getElementById('price');
    const price = priceInput.value;
    priceInput.value = '';

    const stockInput = document.getElementById('stock');
    const stock = stockInput.value;
    stockInput.value = '';

    const categoryInput = document.getElementById('category');
    const category = categoryInput.value;
    categoryInput.value = '';

    

    const newProduct = {
        Title: title,
        description: description,
        code: code,
        price: price,
        stock: stock,
        category: category,
       
    };
    socket.emit("newProd", newProduct);
});

socket.on("success", (data) => {
    Swal.fire({
        icon: 'success',
        title: data,
        text: `Listado de productos actualizado`,
        confirmButtonText: 'Aceptar', 
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload(); 
        }
    });
});
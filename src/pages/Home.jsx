import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import oaklogo from '../assets/oak-removebg-preview.png';
import shopeople from '../assets/undraw_shopping_bags_noba (1).svg';

function Home() {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    setProducts(products);
  }, []);

  const handleGoToProductPage = () => {
    history.push("/product-registration");
  };

  const openDeleteConfirmationModal = (product) => {
    setProductToDelete(product);
  };

  const closeDeleteConfirmationModal = () => {
    setProductToDelete(null);
  };

  const deleteProduct = (product) => {
    try {
      const updatedProducts = products.filter((p) => p.name !== product.name);
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      closeDeleteConfirmationModal();
      toast.success('Produto excluído com sucesso!', {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error('Erro ao excluir o produto:', error);
      toast.error('Erro ao excluir o produto.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const confirmDeleteProduct = () => {
    if (productToDelete) {
      deleteProduct(productToDelete);
    }
  };

  const handleEditProduct = (product) => {
    history.push({
      pathname: '/product-registration',
      state: { product }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center custom-gradient">
      <img src={oaklogo} alt="Bless Basket" className="mb-4 w-54" />
      <div className="bg-white p-8 rounded-3xl shadow-md w-96 opacity-90">
        <img src={shopeople} alt="Bless Basket" className="mb-4 w-54" />

        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800 ">
          CRUD de Estágio!
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-gray-600 pb-5">
            Nenhum produto disponível no momento. Adicione produtos para que apareçam aqui!
          </p>
        ) : (
          <div className="mb-8">
            {products.map((product, index) => (
              <div key={index} className="mb-4 flex items-center justify-between">
                <div>
              {/* Pus pra mostrar apenas o nome e preço de acordo com oque foi pedido no formulário, mas poderia adicionar os outros parâmetros aqui */}
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-600">Preço: R$ {product.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-blue-500 text-white rounded-full font-semibold py-2 px-3 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => openDeleteConfirmationModal(product)}
                    className="bg-red-500 text-white rounded-full font-semibold py-2 px-3 hover:bg-red-600 focus:outline-none focus:bg-red-600"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleGoToProductPage}
          className="w-full bg-custom2 text-white rounded-2xl font-semibold py-2 px-4 hover:bg-darkGreen focus:outline-none focus:bg-darkGreen"
        >
          Cadastro de Produtos
        </button>
      </div>
      <ToastContainer />

      {productToDelete && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <p className="mb-4 text-center">Tem certeza de que deseja excluir o produto?</p>
            <div className="flex justify-center">
              <button
                onClick={confirmDeleteProduct}
                className="bg-red-500 text-white rounded-full font-semibold py-2 px-3 mr-2 hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                Confirmar
              </button>
              <button
                onClick={closeDeleteConfirmationModal}
                className="bg-blue-500 text-white rounded-full font-semibold py-2 px-3 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

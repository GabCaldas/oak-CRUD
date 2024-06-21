import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisProduct() {
  const history = useHistory();
  const location = useLocation();
  const existingProduct = location.state?.product;

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    available: 'sim',
  });

  useEffect(() => {
    if (existingProduct) {
      setProductData(existingProduct);
    }
  }, [existingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };
  { /* Estarei salvando os produtos em localStorage pra priorizar o front */}
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      let products = JSON.parse(localStorage.getItem('products')) || [];

      if (existingProduct) {
        products = products.map((p) =>
          p.name === existingProduct.name ? productData : p
        );
        toast.success('Produto atualizado com sucesso!', {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        products.push(productData);
        toast.success('Produto registrado com sucesso!', {
          position: toast.POSITION.TOP_CENTER,
        });
      }

      localStorage.setItem('products', JSON.stringify(products));

      setProductData({
        name: '',
        description: '',
        price: '',
        available: 'sim',
      });

      history.push('/home');
    } catch (error) {
      console.error('Erro ao registrar o produto:', error);
      toast.error('Erro ao registrar o produto.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center custom-gradient">
      <div className="bg-white p-8 rounded-3xl shadow-md w-96 opacity-90 relative">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          {existingProduct ? 'Atualizar Produto' : 'Registro de Produto'}
        </h1>
        <button
          onClick={() => history.push('/home')}
          className="absolute top-2 right-2 text-blue-500 hover:text-blue-600 focus:outline-none"
        >
          <FontAwesomeIcon icon={faHome} size="2x" />
        </button>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nome do Produto:
            </label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Descrição do Produto:
            </label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Valor do Produto:
            </label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Disponível para Venda:
            </label>
            <select
              name="available"
              value={productData.available}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-300"
              required
            >
              <option value="sim">Sim</option>
              <option value="não">Não</option>
            </select>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-full font-semibold py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              {existingProduct ? 'Atualizar Produto' : 'Registrar Produto'}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RegisProduct;

import API from '../../API';
import { REQUEST_METHODS } from '../../config';

export default {
  state: {
    products: [],
    totalProducts: 0,
  },
  mutations: {
    updateProducts(state, value) {
      state.products = value;
    },
    updateTotalProducts(state, value) {
      state.totalProducts = value;
    },
    updateProduct(state, value) {
      // eslint-disable-next-line
      const productIndex = state.products.findIndex((product) => product._id === value._id);
      state.products.splice(productIndex, 1, value);
    },
    deleteProduct(state, id) {
      // eslint-disable-next-line
      const productIndex = state.products.findIndex((product) => product._id === id);
      state.products.splice(productIndex, 1);
    },
    createdProduct(state, value) {
      state.products.push(value);
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      await API(REQUEST_METHODS.GET, '/products/')
        .then(({ products, totalProducts }) => {
          commit('updateProducts', products, { module: 'product' });
          commit('updateTotalProducts', totalProducts, { module: 'product' });
        })
        .catch((err) => {
          console.log(err);
          // add it to products error message
        });
    },
    async updateProduct({ commit }, { id, item }) {
      // eslint-disable-next-line
      item.price = item.price.toString();
      await API(REQUEST_METHODS.PATCH, `/products/${id}`, item)
        .then(({ updatedProduct }) => {
          commit('updateProduct', updatedProduct, { module: 'product' });
        })
        .catch(console.log);
    },
    async createProduct({ commit }, item) {
      // eslint-disable-next-line
      item.price = item.price.toString();
      await API(REQUEST_METHODS.POST, '/products/create', item)
        .then(({ createdProduct }) => {
          commit('createdProduct', createdProduct, { module: 'product' });
        })
        .catch(console.log);
    },
    async deleteProduct({ commit }, item) {
      // eslint-disable-next-line
      item.price = item.price.toString();
      // eslint-disable-next-line
      await API(REQUEST_METHODS.DELETE, `/products/${item._id}`, item)
        .then(({ deletedProductId }) => {
          commit('deleteProduct', deletedProductId, { module: 'product' });
        })
        .catch(console.log);
    },
  },
  namespaced: true,
};

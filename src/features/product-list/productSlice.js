import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  fetchAllProdocts,
  fetchAllProdoctsByFilters,
  fetchBrands,
  fetchCategories,
  fetchProductById,
  updateProduct,
} from "./productAPI";

const initialState = {
  products: [],
  brands: [],
  categories: [],
  status: "idle",
  totalItems: 0,
  selectedProduct: null,
};

// for product fetch
// export const fetchAllProdoctsAsync = createAsyncThunk(
//   "product/fetchAllProducts",
//   async () => {
//     const response = await fetchAllProdocts();
//     return response.data;
//   }
// );

export const fetchProdoctsByIdAsync = createAsyncThunk(
  "product/fetchProductsById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);

// for Brand fetch
export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);
//for Categories fetch
export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);

//filter thunk
export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchAllProductsByFilters",
  async ({ filter, sort, pagination, admin }) => {
    const response = await fetchAllProdoctsByFilters(
      filter,
      sort,
      pagination,
      admin
    );

    return response.data;
  }
);

// create product
export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    const response = await createProduct(product);

    return response.data;
  }
);

//update product
export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    const response = await updateProduct(product);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    //  productFormAdmin ma Edit product ane addproduct nu form same 6e atle
    // pela no data addproduct ma aave 6e atle tene reset karva nmate nu reducer
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    }, // without async thunk reducer kevay aane
    // pa6u niche tene pass pan karvu pade
  },

  extraReducers: (builder) => {
    builder
      // .addCase(fetchAllProdoctsAsync.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(fetchAllProdoctsAsync.fulfilled, (state, action) => {
      //   state.status = "idle";
      //   state.products = action.payload;
      // })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // productAPI ma je data object resolve 6e temathi
        state.products = action.payload.products;
        // productAPI ma je data object resolve 6e temathiv ke ketli products 6e
        // aa banavyu 6e atle selector pa banavu padse productList ma ane niche
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchProdoctsByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProdoctsByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // create 6e atle push, jo create karelu pelarakhvu hoy to up shift
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle"; // update logic copy from cart update
        // // je product hamna j recent update thaei 6e teni index
        // index find karva ni je item nu id navo add thaye lo action.payload hoy teni
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        //state.item ae array 6e tema nava update thayela product ni index find kari update karva nu
        state.products[index] = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectTotalItems = (state) => state.product.totalItems;

export default productSlice.reducer;

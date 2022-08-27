import React from "react";
import { Auth } from "./Pages/Auth";
import { DataProvider } from "./providers/DataProvider";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import Book from "./Pages/Home/components/book";
import Category from "./Pages/Home/components/category";
import Loan from "./Pages/Home/components/loan";
import "./App.css";
import { ProtectedRoute } from "./utils/router";

export const App = () => (
  <div className="main__app">
    <DataProvider>
      <Routes>
        <Route index element={<Auth />} />

        <Route path="/auth" element={<Auth />} />

        <Route path="/home" element={(
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )}>
          <Route index element={<Book.List />} />
          <Route path="books" element={<Book.List />} />
          <Route path="books/create" element={<Book.Edit mode="create" />} />
          <Route path="books/:id" element={<Book.Edit mode="update" />} />

          <Route path="category" element={<Category.List />} />
          <Route path="category/create" element={<Category.Edit mode="create" />} />
          <Route path="category/:id" element={<Category.Edit mode="update" />} />
          <Route path="/home/loans" element={<Loan.List />} />
          <Route path="/home/loans/create" element={<Loan.Edit mode="create" />} />
        </Route>
      </Routes>
    </DataProvider>
  </div>
);

export default App;

import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import TodoListView from "./views/TodoList.view";
import { useEffect } from "react";
import "./App.css";
import { CreateCollectionView } from "./views/CreateCollection.view";
import { MintView } from "./views/Mint.view";
import { TestView } from "./views/Test.view";

const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "create-collection", element: <CreateCollectionView /> },
        { path: "mint", element: <MintView /> },
        { path: "test", element: <TestView /> },
        {
          path: "todolist",
          element: <TodoListView />,
        },
      ],
    },
  ]);

  return routes;
};

export const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import TodoListView from "./views/TodoList.view";
import { useEffect } from "react";
import "./App.css";
import { CreateCollectionView } from "./views/CreateCollection.view";
import { MintView } from "./views/Mint.view";
import { TestView } from "./views/Test.view";
import { MyCollection } from "./views/MyCollection.view";
import { UploadedTraitsView } from "./views/UploadedTraits.view";

const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "create-collection", element: <CreateCollectionView /> },
        { path: "my-collection", element: <MyCollection /> },
        { path: "mint", element: <MintView /> },
        { path: "test", element: <TestView /> },
        {
          path: "todolist",
          element: <TodoListView />,
        },
        {
          path: "uploaded-traits",
          element: <UploadedTraitsView />,
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
